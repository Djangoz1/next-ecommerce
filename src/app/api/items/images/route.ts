import { pool } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  const image = request.nextUrl.searchParams.get("image");
  try {
    const query = `INSERT INTO gallery (image_id, item_id) VALUES ($1, $2)`;
    const values = [image, id];
    const result = await pool.query(query, values);
    return NextResponse.json({ message: "OK", result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
