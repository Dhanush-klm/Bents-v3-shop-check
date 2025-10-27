import { NextResponse } from 'next/server';
import { Resend } from 'resend';

function getEnv(name: string): string | undefined {
  return process.env[name];
}

export async function GET() {
  try {
    const resendApiKey = getEnv("RESEND_API_KEY");
    
    if (!resendApiKey) {
      return NextResponse.json(
        { error: 'RESEND_API_KEY not configured' },
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);
    
    // Fetch all audiences from Resend
    const audiences = await resend.audiences.list();
    
    return NextResponse.json({
      success: true,
      data: audiences.data,
    });

  } catch (error) {
    console.error('Failed to fetch audiences:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch audiences',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

