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

    const result = await pool.query(
      "INSERT INTO item_images (image) VALUES ($1) RETURNING id",
      [url]
    );
    return NextResponse.json({ message: "OK", result }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function GET() {
  try {
    const images = await pool.query("SELECT * FROM item_images");
    return NextResponse.json(
      { message: "OK", result: images.rows },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
