import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

function getEnv(name: string): string | undefined {
  return process.env[name];
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ audienceId: string }> }
) {
  try {
    const { audienceId } = await params;

    if (!audienceId) {
      return NextResponse.json(
        { error: 'audienceId is required' },
        { status: 400 }
      );
    }

    const resendApiKey = getEnv("RESEND_API_KEY");
    
    if (!resendApiKey) {
      return NextResponse.json(
        { error: 'RESEND_API_KEY not configured' },
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);
    
    // Fetch all contacts from this audience
    const response = await resend.contacts.list({ audienceId });
    
    return NextResponse.json({
      success: true,
      contacts: response.data?.data || [],
    });

  } catch (error) {
    console.error('Failed to fetch audience contacts:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch contacts',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

