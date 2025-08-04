import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({ 
  connectionString: process.env.SUPABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export async function POST(req: NextRequest) {
  try {
    const { templateName, audienceName, subjectLine, recipientsCount } = await req.json();
    
    console.log('[Campaign API] Saving campaign details:', {
      templateName,
      audienceName,
      subjectLine,
      recipientsCount
    });

    // Validate required fields
    if (!templateName || !audienceName || !subjectLine || recipientsCount === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' }, 
        { status: 400 }
      );
    }

    // Insert campaign details into database
    const result = await pool.query(`
      INSERT INTO "campaign-details" (
        template_name, 
        audience_name, 
        subject_line, 
        recipients_count
      ) VALUES ($1, $2, $3, $4)
      RETURNING id, when_sent
    `, [templateName, audienceName, subjectLine, recipientsCount]);

    console.log('[Campaign API] Campaign saved successfully:', result.rows[0]);

    return NextResponse.json({
      success: true,
      campaign: result.rows[0],
      message: 'Campaign details saved successfully'
    });

  } catch (error) {
    console.error('[Campaign API] Error saving campaign:', error);
    return NextResponse.json(
      { error: 'Failed to save campaign details' }, 
      { status: 500 }
    );
  }
} 