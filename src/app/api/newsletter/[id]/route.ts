import {
  deleteNewsletterQuery,
  getNewsletterByEmailQuery,
} from "@/api/newsletter";
import { sendDeleteNewsletterEmail } from "@/services/send-mail";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.pathname.split("/").pop();

  try {
    if (!id) throw new Error("Id is required");
    const result = await deleteNewsletterQuery(Number(id));

    await sendDeleteNewsletterEmail(result.email);

    return NextResponse.json({ message: "OK", result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const email = request.nextUrl.pathname.split("/").pop() as string;

  try {
    const result = await getNewsletterByEmailQuery(email);
    return NextResponse.json({ message: "OK", result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
