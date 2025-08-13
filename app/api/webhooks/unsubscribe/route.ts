import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { Pool } from "pg";
import UnsubscribedMarketing from "@/app/emails/UnsubscribedMarketing";
import UnsubscribedAll from "@/app/emails/UnsubscribedAll";

const resend = new Resend(process.env.RESEND_API_KEY!);
const AUDIENCE_IDS = {
  marketing: process.env.RESEND_AUDIENCE_MARKETING!,
  update: process.env.RESEND_AUDIENCE_UPDATES!,
};
const pool = new Pool({ 
  connectionString: process.env.SUPABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
const dataPool = new Pool({
  connectionString: process.env.SUPABASE_URL_DATA,
  ssl: {
    rejectUnauthorized: false
  }
});

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function handlePreferenceChangeById(
  email: string,
  userId: string,
  preference: "marketing" | "update",
  unsubscribe: boolean
) {
  let columnName: string;
  switch (preference) {
    case "marketing":
      columnName = "out_from_marketing";
      break;
    case "update":
      columnName = "out_from_update";
      break;
  }

  // Update Database
  await pool.query(
    `UPDATE users SET ${columnName} = ${
      unsubscribe ? "NOW()" : "NULL"
    } WHERE id = $1`,
    [userId]
  );
  console.log(
    `[Database] For ${email} (id: ${userId}), set ${columnName} to ${
      unsubscribe ? "a timestamp" : "NULL"
    }`
  );

  // Update Resend Audience
  const audienceId = AUDIENCE_IDS[preference];
  
  if (!audienceId) {
    console.error(`[Resend] No audience ID found for preference: ${preference}`);
    return;
  }

  try {
    if (unsubscribe) {
      const { data, error } = await resend.contacts.remove({
        email,
        audienceId,
      });
      if (error) throw error;
      console.log(
        `[Resend] Removed ${email} from ${preference} audience:`,
        data
      );
    } else {
      // Re-subscribe user
      const { data, error } = await resend.contacts.create({
      email,
      audienceId,
        unsubscribed: false,
    });
      if (error) throw error;
      console.log(
        `[Resend] Added ${email} to ${preference} audience:`,
        data
      );
    }
  } catch (error) {
    // Log errors but don't block other preference updates
    console.error(
      `[Resend] Error updating ${email} in ${preference} audience:`,
      error
    );
  } finally {
    await sleep(500); // Avoid rate-limiting
  }
}

async function resolveUserIdByEmail(email: string): Promise<string | null> {
  if (!process.env.SUPABASE_URL_DATA) {
    console.error("[Database] SUPABASE_URL_DATA is not configured");
    return null;
  }
  const result = await dataPool.query(
    'SELECT id FROM users WHERE email = $1 LIMIT 1',
    [email]
  );
  return result.rows?.[0]?.id || null;
}

async function getUserFullName(email: string): Promise<string> {
  try {
    const userId = await resolveUserIdByEmail(email);
    if (!userId) {
      return "there";
    }
    const result = await pool.query(
      'SELECT full_name FROM users WHERE id = $1',
      [userId]
    );
    if (result.rows.length > 0) {
      const { full_name } = result.rows[0];
      if (full_name) {
        return full_name;
      }
    }
    return "there";
  } catch (error) {
    console.error('[Database] Error fetching user name by id:', error);
    return "there";
  }
}

async function sendUnsubscribedMarketingEmail(email: string) {
  try {
    const username = await getUserFullName(email);
    const resubscribeUrl = `https://loft-ai-002.vercel.app/unsubscribe?email=${encodeURIComponent(email)}`;
    console.log(`[Email] Attempting to send UnsubscribedMarketing email to:`, email, `with username:`, username);
    const { data, error } = await resend.emails.send({
      from: "Loft <noreply@loftit.ai>",
      to: [email],
      subject: "You'll no longer receive Loft updates — but your subscription is still active",
      react: UnsubscribedMarketing({
        username,
        userEmail: email,
        resubscribeUrl,
      }),
    });
    if (error) {
      console.error("[Email] Error sending unsubscribed marketing email:", error);
      throw error;
    }
    console.log("[Email] Successfully sent unsubscribed marketing email to:", email, data);
  } catch (error) {
    console.error("[Email] Failed to send unsubscribed marketing email to:", email, error);
    // Don't throw error to avoid blocking the unsubscribe process
  }
}

async function sendUnsubscribedAllEmail(email: string) {
  try {
    const username = await getUserFullName(email);
    const resubscribeUrl = `https://loft-ai-002.vercel.app/unsubscribe?email=${encodeURIComponent(email)}`;
    console.log(`[Email] Attempting to send UnsubscribedAll email to:`, email, `with username:`, username);
    const { data, error } = await resend.emails.send({
      from: "Loft <noreply@loftit.ai>",
      to: [email],
      subject: "You've unsubscribed — we'll miss you in our inbox",
      react: UnsubscribedAll({
        username,
        userEmail: email,
        resubscribeUrl,
      }),
    });
    if (error) {
      console.error("[Email] Error sending unsubscribed all email:", error);
      throw error;
    }
    console.log("[Email] Successfully sent unsubscribed all email to:", email, data);
  } catch (error) {
    console.error("[Email] Failed to send unsubscribed all email to:", email, error);
    // Don't throw error to avoid blocking the unsubscribe process
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, out_from_marketing } = body;
    const out_from_updates =
      typeof body.out_from_updates === "boolean"
        ? body.out_from_updates
        : typeof body.out_from_update === "boolean"
          ? body.out_from_update
          : undefined;

    console.log(`[Webhook] Received POST /unsubscribe with body:`, body);

    if (!email) {
      console.log(`[Webhook] Missing required field: email`);
      return NextResponse.json(
        { error: "Missing required field: email" },
        { status: 400 }
      );
    }

    const userId = await resolveUserIdByEmail(email);
    if (!userId) {
      console.log(`[Webhook] Email not found in data DB:`, email);
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const tasks = [];
    let shouldSendMarketingEmail = false;
    let shouldSendAllEmail = false;

    if (typeof out_from_marketing === "boolean") {
      console.log(`[Webhook] Processing out_from_marketing:`, out_from_marketing);
      tasks.push(handlePreferenceChangeById(email, userId, "marketing", out_from_marketing));
      if (out_from_marketing === true) {
        shouldSendMarketingEmail = true;
      }
    }
    if (typeof out_from_updates === "boolean") {
      console.log(`[Webhook] Processing out_from_updates:`, out_from_updates);
      tasks.push(handlePreferenceChangeById(email, userId, "update", out_from_updates));
      if (out_from_updates === true) {
        shouldSendAllEmail = true;
      }
    }

    if (tasks.length === 0) {
      console.log(`[Webhook] No preference fields provided.`);
      return NextResponse.json(
        { error: "No preference fields provided" },
        { status: 400 }
      );
    }

    await Promise.all(tasks);
    console.log(`[Webhook] Finished DB and Resend audience updates for:`, email);

    // Add a delay to avoid Resend rate limit
    await sleep(600);

    // Send appropriate email based on unsubscribe preferences
    if (shouldSendMarketingEmail && shouldSendAllEmail) {
      console.log(`[Webhook] Both marketing and updates are true. Sending UnsubscribedAll email.`);
      await sendUnsubscribedAllEmail(email);
    } else if (shouldSendMarketingEmail) {
      console.log(`[Webhook] Only marketing is true. Sending UnsubscribedMarketing email.`);
      await sendUnsubscribedMarketingEmail(email);
    } else {
      console.log(`[Webhook] No email needs to be sent for this request.`);
    }

    return NextResponse.json({ 
      success: true, 
      message: `Successfully updated preferences for ${email}`,
    });
  } catch (error) {
    console.error("[Unsubscribe] Error processing request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    
    if (!email) {
      return NextResponse.json({ error: 'Email parameter is required' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    const userId = await resolveUserIdByEmail(email);
    if (!userId) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Query your users table for current unsubscribe status by id
    const result = await pool.query(
      'SELECT out_from_update, out_from_marketing FROM users WHERE id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const userStatus = result.rows[0];

    // Return the current status
    return NextResponse.json({ 
      success: true, 
      email: email,
      out_from_update: userStatus.out_from_update,      // timestamp or null
      out_from_marketing: userStatus.out_from_marketing  // timestamp or null
    });

  } catch (error) {
    console.error("Error fetching unsubscribe status:", error);
    return NextResponse.json({ 
      success: false, 
      message: "Failed to fetch unsubscribe status" 
    }, { 
      status: 500 
    });
  }
} 