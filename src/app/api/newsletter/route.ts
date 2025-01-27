import { createNewsletterQuery, getNewsletterQuery } from "@/api/newsletter";
import { sendNewsletterEmail } from "@/services/send-mail";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  try {
    if (!body.email) {
      throw new Error("Email is required");
    }
    const result = await createNewsletterQuery(body.email);
    await sendNewsletterEmail(result.email);
    return NextResponse.json({ message: "OK", result }, { status: 201 });
  } catch (error) {
    console.error("Error /api/newsletter/POST", error);
    return NextResponse.json(
      {
        message: "Error",
        error: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const result = await getNewsletterQuery();
    return NextResponse.json({ message: "OK", result }, { status: 200 });
  } catch (error) {
    console.error("Error /api/newsletter/GET", error);
    return NextResponse.json(
      {
        message: "Error",
        error: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}
