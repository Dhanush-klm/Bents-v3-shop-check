import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function GET(req: NextRequest) {
  try {
    console.log('[API] Fetching Resend audiences...');
    
    const { data, error } = await resend.audiences.list();
    
    if (error) {
      console.error('[API] Error fetching audiences:', error);
      return NextResponse.json({ error: 'Failed to fetch audiences' }, { status: 500 });
    }
    
    console.log('[API] Successfully fetched audiences:', data);
    return NextResponse.json({ data });
    
  } catch (error) {
    console.error('[API] Exception fetching audiences:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 