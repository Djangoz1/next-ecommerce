import { pool } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const file = body.file;
  try {
    if (!file) {
      throw new Error("File is required");
    }

    console.log({ file });
    const url = `/uploads/${file.originalname}`;

    const result = await pool
      .from("gallery")
      .insert({ image_id: url })
      .select();
    return NextResponse.json({ message: "OK", result }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function GET() {
  try {
    const images = await pool.from("gallery").select();
    return NextResponse.json(
      { message: "OK", result: images.data },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
