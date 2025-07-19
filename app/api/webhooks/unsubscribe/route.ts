import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { Pool } from "pg";

const resend = new Resend(process.env.RESEND_API_KEY!);
const AUDIENCE_IDS = {
  marketing: process.env.RESEND_AUDIENCE_MARKETING!,
  update: process.env.RESEND_AUDIENCE_UPDATES!,
  product: process.env.RESEND_AUDIENCE_ALL!,
};
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function updateUserPreference(email: string, preference: string) {
  let columnName: string;
  
  switch (preference.toLowerCase()) {
    case 'marketing':
      columnName = 'out_from_marketing';
      break;
    case 'update':
      columnName = 'out_from_update';
      break;
    case 'product':
      // For product, we might want to handle differently or use a different column
      columnName = 'out_from_marketing'; // Default fallback
      break;
    default:
      throw new Error(`Invalid preference: ${preference}`);
  }

  await pool.query(
    `UPDATE users SET ${columnName} = NOW() WHERE email = $1`,
    [email]
  );
}

async function removeFromResendAudience(email: string, preference: string) {
  const audienceId = AUDIENCE_IDS[preference.toLowerCase() as keyof typeof AUDIENCE_IDS];
  
  if (!audienceId) {
    console.error(`[Unsubscribe] No audience ID found for preference: ${preference}`);
    return;
  }

  try {
    const removeResult = await resend.contacts.remove({
      email,
      audienceId,
    });
    console.log(`[Resend] Removed ${email} from ${preference} audience:`, removeResult);
    await sleep(600); // Rate limiting
  } catch (error) {
    console.error(`[Resend] Error removing ${email} from ${preference} audience:`, error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, preference } = body;

    if (!email || !preference) {
      return NextResponse.json(
        { error: "Missing required fields: email and preference" },
        { status: 400 }
      );
    }

    console.log(`[Unsubscribe] Processing unsubscribe for ${email} from ${preference}`);

    // Update database
    await updateUserPreference(email, preference);
    console.log(`[Database] Updated ${email} preference for ${preference}`);

    // Remove from Resend audience
    await removeFromResendAudience(email, preference);

    return NextResponse.json({ 
      success: true, 
      message: `Successfully unsubscribed ${email} from ${preference}` 
    });

  } catch (error) {
    console.error("[Unsubscribe] Error processing unsubscribe:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  // Handle GET requests (e.g., unsubscribe links)
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');
  const preference = searchParams.get('preference') || 'marketing'; // Default to marketing

  if (!email) {
    return NextResponse.json(
      { error: "Missing email parameter" },
      { status: 400 }
    );
  }

  try {
    console.log(`[Unsubscribe] Processing GET unsubscribe for ${email} from ${preference}`);

    // Update database
    await updateUserPreference(email, preference);
    console.log(`[Database] Updated ${email} preference for ${preference}`);

    // Remove from Resend audience
    await removeFromResendAudience(email, preference);

    // Return a success page or redirect
    return NextResponse.json({ 
      success: true, 
      message: `Successfully unsubscribed ${email} from ${preference}` 
    });

  } catch (error) {
    console.error("[Unsubscribe] Error processing GET unsubscribe:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 