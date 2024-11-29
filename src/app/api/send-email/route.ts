import { NextRequest, NextResponse } from 'next/server';

const SMTP2GO_API_URL = 'https://api.smtp2go.com/v3/email/send';
const RECIPIENT_EMAIL = 'web@jayrich.dev';

// Simple rate limiting
const RATE_LIMIT = 5; // Max 5 requests
const RATE_LIMIT_WINDOW = 60 * 1000; // per minute (in milliseconds)
const ipRequests = new Map<string, { count: number; timestamp: number }>();

interface EmailAttachment {
  filename: string;
  fileblob: string;
  mimetype: string;
}

function rateLimitCheck(ip: string): boolean {
  const now = Date.now();
  const requestData = ipRequests.get(ip) || { count: 0, timestamp: now };

  if (now - requestData.timestamp > RATE_LIMIT_WINDOW) {
    requestData.count = 1;
    requestData.timestamp = now;
  } else {
    requestData.count++;
  }

  ipRequests.set(ip, requestData);
  return requestData.count <= RATE_LIMIT;
}

function validateEmail(email: string): boolean {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
}

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  );
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || 'unknown';

  if (!rateLimitCheck(ip)) {
    return NextResponse.json(
      { error: 'Rate limit exceeded. Please try again later.' },
      { status: 429 },
    );
  }

  try {
    const { name, email, message, drawing } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      );
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 },
      );
    }

    const apiKey = process.env.NEXT_SMTP_KEY;

    if (!apiKey) {
      console.error('Missing NEXT_SMTP_KEY environment variable');
      return NextResponse.json(
        {
          error: 'Server configuration error',
          details: 'Missing NEXT_SMTP_KEY environment variable',
        },
        { status: 500 },
      );
    }

    const emailBody = `
      Name: ${name}
      Email: ${email}
      Message: ${message}
      ${drawing ? 'Drawing: [Attached]' : ''}
    `;

    const attachments: EmailAttachment[] = [];
    if (drawing) {
      // Remove the 'data:image/png;base64,' prefix if present
      const base64Data = drawing.replace(/^data:image\/png;base64,/, '');
      attachments.push({
        filename: 'drawing.png',
        fileblob: base64Data,
        mimetype: 'image/png',
      });
    }

    const payload = {
      api_key: apiKey,
      to: [RECIPIENT_EMAIL],
      sender: RECIPIENT_EMAIL,
      subject: 'New Contact Form Submission',
      text_body: emailBody,
      attachments: attachments,
    };

    const response = await fetch(SMTP2GO_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('SMTP2GO API error:', errorData);
      return NextResponse.json(
        {
          error: 'Failed to send email. Please try again later.',
          details: JSON.stringify(errorData),
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { 
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      },
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      {
        error: 'Internal server error. Please try again later.',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
