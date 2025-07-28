import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  try {
    console.log('[API] Fetching Resend audiences...');
    
    const result = await resend.audiences.list();
    
    console.log('[API] Successfully fetched audiences:', result);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('[API] Error fetching audiences:', error);
    return NextResponse.json(
      { error: 'Failed to fetch audiences' }, 
      { status: 500 }
    );
  }
} 