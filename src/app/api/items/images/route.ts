import { pool } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  const image = request.nextUrl.searchParams.get("image");
  try {
    const result = await pool
      .from("gallery")
      .insert({ image_id: image, item_id: id })
      .select();
    return NextResponse.json({ message: "OK", result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
