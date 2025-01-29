import { createNewsletterQuery } from "@/api/newsletter";
import { sendNewsletterEmail } from "@/services/send-mail";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    if (!body.email) {
      throw new Error("Email is required");
    }

    const result = await createNewsletterQuery(body.email);
    if (result.email) {
      let send = await sendNewsletterEmail(result.email);
      console.log("send newsletter email", send);
    }
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
