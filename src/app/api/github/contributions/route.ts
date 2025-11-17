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
    console.error("GitHub API error:", error.response?.data || error.message);

    if (error.response?.status === 401) {
      return NextResponse.json(
        { error: "GitHub authentication failed" },
        { status: 401 },
      );
    }

    if (error.response?.status === 403) {
      return NextResponse.json(
        { error: "GitHub API rate limit exceeded" },
        { status: 403 },
      );
    }

    return NextResponse.json(
      { error: error.message || "Failed to fetch GitHub data" },
      { status: error.response?.status || 500 },
    );
  }
}
