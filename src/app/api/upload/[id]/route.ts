import fs from "fs";
import { pool } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.pathname.split("/").pop();

  try {
    const image = await pool.from("gallery").select().eq("id", id);
    if (image.data?.length === 0) {
      throw new Error("Image not found");
    }
    const filePath = path.join(
      __dirname,
      "..",
      "..",

      image.data?.[0].image.split(process.env.API_URL)[1]
    );
    fs.unlinkSync(filePath);
    await pool.from("gallery").delete().eq("id", id);

    return NextResponse.json(
      { message: "OK", result: { message: "File deleted successfully" } },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
