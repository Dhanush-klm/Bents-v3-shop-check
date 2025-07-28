import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function GET() {
  try {
    console.log('[Campaign History API] Fetching campaign history...');

    // Fetch all campaigns ordered by most recent first
    const result = await pool.query(`
      SELECT 
        id,
        template_name,
        audience_name,
        subject_line,
        recipients_count,
        when_sent
      FROM "campaign-details" 
      ORDER BY when_sent DESC
    `);

    console.log(`[Campaign History API] Found ${result.rows.length} campaigns`);

    return NextResponse.json({
      success: true,
      campaigns: result.rows,
      total: result.rows.length
    });

  } catch (error) {
    console.error('[Campaign History API] Error fetching campaigns:', error);
    return NextResponse.json(
      { error: 'Failed to fetch campaign history' }, 
      { status: 500 }
    );
  }
} 