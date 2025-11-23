import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const GITHUB_TOKEN = process.env.NEXT_GITHUB_TOKEN;
const GITHUB_API = "https://api.github.com/graphql";

export async function POST(request: NextRequest) {
  try {
    if (!GITHUB_TOKEN) {
      return NextResponse.json(
        { error: "GitHub token not configured" },
        { status: 500 },
      );
    }

    const body = await request.json();
    const { query, variables } = body;

    const response = await axios.post(
      GITHUB_API,
      { query, variables },
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          "Content-Type": "application/json",
        },
        timeout: 30000,
      },
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    const errorData = error.response?.data;
    const errorMessage = error.message;
    const status = error.response?.status;

    // Check if the error data is HTML (502 errors often return HTML)
    const isHtmlError = typeof errorData === 'string' && errorData.includes('<!DOCTYPE html>') || errorData?.includes('<html>');
    
    if (isHtmlError) {
      console.error("GitHub API returned HTML error (likely 502/503)");
      return NextResponse.json(
        { 
          error: "GitHub API is temporarily unavailable. Please try refreshing the page.",
          data: { errors: [{ message: "GitHub API temporarily unavailable" }] }
        },
        { status: 502 },
      );
    }

    console.error("GitHub API error:", errorData || errorMessage);

    if (status === 401) {
      return NextResponse.json(
        { 
          error: "GitHub authentication failed",
          data: { errors: [{ message: "GitHub authentication failed" }] }
        },
        { status: 401 },
      );
    }

    if (status === 502 || status === 503) {
      return NextResponse.json(
        { 
          error: "GitHub API is temporarily unavailable. Please try refreshing the page.",
          data: { errors: [{ message: "GitHub API temporarily unavailable" }] }
        },
        { status: 502 },
      );
    }

    if (status === 403) {
      return NextResponse.json(
        { 
          error: "GitHub API rate limit exceeded. Please try again later.",
          data: { errors: [{ message: "GitHub API rate limit exceeded" }] }
        },
        { status: 403 },
      );
    }

    return NextResponse.json(
      { 
        error: errorMessage || "Failed to fetch GitHub data",
        data: { errors: [{ message: errorMessage || "Failed to fetch GitHub data" }] }
      },
      { status: status || 500 },
    );
  }
}
