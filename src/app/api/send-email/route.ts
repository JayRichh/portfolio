import { NextRequest, NextResponse } from "next/server";

const SMTP2GO_API_URL = "https://api.smtp2go.com/v3/email/send";
const RECIPIENT_EMAIL = "web@jayrich.dev";

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

export async function POST(req: NextRequest) {
  console.log("Starting email send process...");
  const ip = req.headers.get("x-forwarded-for") || "unknown";

  if (!rateLimitCheck(ip)) {
    console.log("Rate limit exceeded for IP:", ip);
    return NextResponse.json(
      { error: "Rate limit exceeded. Please try again later." },
      { status: 429 },
    );
  }

  try {
    const { name, email, message, drawing } = await req.json();
    console.log("Received request data:", {
      name,
      email,
      message,
      hasDrawing: !!drawing,
    });

    if (!name || !email || !message) {
      console.log("Missing required fields");
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    if (!validateEmail(email)) {
      console.log("Invalid email:", email);
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 },
      );
    }

    const apiKey = process.env.NEXT_SMTP_KEY;
    if (!apiKey) {
      console.error("NEXT_SMTP_KEY is not set in environment variables");
      return NextResponse.json(
        {
          error: "Server configuration error",
          details: "Missing NEXT_SMTP_KEY environment variable",
        },
        { status: 500 },
      );
    }

    // Format the email body with HTML
    const htmlBody = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
      ${drawing ? "<p>Drawing attached below</p>" : ""}
    `;

    const attachments: EmailAttachment[] = [];
    if (drawing) {
      // Remove the 'data:image/png;base64,' prefix if present
      const base64Data = drawing.replace(/^data:image\/png;base64,/, "");
      attachments.push({
        filename: "drawing.png",
        fileblob: base64Data,
        mimetype: "image/png",
      });
    }

    // Structure the payload according to SMTP2GO's API requirements
    const payload = {
      api_key: apiKey,
      to: [RECIPIENT_EMAIL],
      sender: RECIPIENT_EMAIL,
      subject: `New Contact Form Submission from ${name}`,
      html_body: htmlBody,
      custom_headers: [
        {
          header: "Reply-To",
          value: email,
        },
      ],
      attachments: attachments.length > 0 ? attachments : undefined,
    };

    console.log("Preparing to send request to SMTP2GO...", {
      to: payload.to,
      sender: payload.sender,
      subject: payload.subject,
      hasAttachments: !!payload.attachments,
    });

    const response = await fetch(SMTP2GO_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const responseData = await response.json();
    console.log("SMTP2GO API response:", responseData);

    if (!response.ok) {
      console.error("SMTP2GO API error response:", {
        status: response.status,
        statusText: response.statusText,
        data: responseData,
      });
      return NextResponse.json(
        {
          error: "Failed to send email. Please try again later.",
          details: JSON.stringify(responseData),
        },
        { status: 500 },
      );
    }

    console.log("Email sent successfully");
    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Unexpected error in email sending:", error);
    return NextResponse.json(
      {
        error: "Internal server error. Please try again later.",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
