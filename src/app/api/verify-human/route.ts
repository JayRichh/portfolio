import { NextResponse } from "next/server";

function generateChallenge() {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const answer = num1 + num2;
  return { challenge: `${num1} + ${num2}`, answer };
}

export async function GET() {
  const { challenge, answer } = generateChallenge();
  return NextResponse.json({ challenge, answer });
}

export async function POST(request: Request) {
  try {
    const { userAnswer, correctAnswer } = await request.json();

    if (parseInt(userAnswer) !== correctAnswer) {
      return NextResponse.json(
        { success: false, message: "Incorrect answer" },
        { status: 400 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Human verification successful",
    });
  } catch (error) {
    console.error("Error in human verification:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
