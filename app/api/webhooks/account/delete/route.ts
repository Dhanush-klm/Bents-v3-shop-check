import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";
import { Resend } from "resend";

const pool = new Pool({
  connectionString: process.env.SUPABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const dataPool = new Pool({
  connectionString: process.env.SUPABASE_URL_DATA,
  ssl: { rejectUnauthorized: false }
});

const resend = new Resend(process.env.RESEND_API_KEY!);
const AUDIENCE_IDS = [
  process.env.RESEND_AUDIENCE_ALL!,
  process.env.RESEND_AUDIENCE_MARKETING!,
  process.env.RESEND_AUDIENCE_UPDATES!
].filter(Boolean);

async function resolveUserIdByEmail(email: string): Promise<string | null> {
  if (!process.env.SUPABASE_URL_DATA) {
    console.error("[Database] SUPABASE_URL_DATA is not configured");
    return null;
  }
  const result = await dataPool.query('SELECT id FROM users WHERE email = $1 LIMIT 1', [email]);
  return result.rows?.[0]?.id || null;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, remove_from_resend } = body || {};

    if (!email) {
      return NextResponse.json({ error: "Missing required field: email" }, { status: 400 });
    }

    const userId = await resolveUserIdByEmail(email);
    if (!userId) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await pool.query('UPDATE users SET account_deleted = NOW() WHERE id = $1', [userId]);
    
    const shouldRemoveFromResend = remove_from_resend !== false; // default true
    if (shouldRemoveFromResend && AUDIENCE_IDS.length > 0 && process.env.RESEND_API_KEY) {
      try {
        await Promise.all(
          AUDIENCE_IDS.map((audienceId) =>
            resend.contacts.remove({ email, audienceId })
          )
        );
      } catch (err) {
        console.error('[Resend] Failed to remove user from one or more audiences:', err);
        // continue; do not fail the whole request
      }
    }

    const prefsResult = await pool.query(
      'SELECT out_from_update, out_from_marketing, account_deleted FROM users WHERE id = $1',
      [userId]
    );
    const preferences = prefsResult.rows?.[0] || {};

    return NextResponse.json({ 
      success: true, 
      message: `Account deleted for ${email}`,
      userId,
      email,
      preferences
    });
  } catch (error) {
    console.error("[Account Delete] Error processing request:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}


