import { pool } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const type = request.nextUrl.pathname.split("/").pop();
  try {
    const result = await pool
      .from("item_details")
      .select("*")
      .eq("type", type)
      .limit(1);

    return NextResponse.json(
      { message: "OK", result: result.data?.[0] },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching item details", error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
