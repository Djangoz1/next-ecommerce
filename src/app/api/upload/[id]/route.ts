import { pool } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.pathname.split("/").pop();

  try {
    const res = await pool
      .from("gallery")
      .delete()
      .eq("id", id)
      .select()
      .single();

    const name = res.data.image.split("/");
    await pool.storage.from("images").remove([name[name.length - 1]]);

    return NextResponse.json(
      { message: "OK", result: { message: "File deleted successfully" } },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error /api/upload/[id]/DELETE", error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
