import fs from "fs";
import { pool } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function DELETE(request: NextRequest, { params }: any) {
  const id = params.id;
  try {
    const image = await pool.query("SELECT * FROM item_images WHERE id = $1", [
      id,
    ]);
    if (image.rows.length === 0) {
      throw new Error("Image not found");
    }
    const filePath = path.join(
      __dirname,
      "..",
      "..",

      image.rows[0].image.split(process.env.API_URL)[1]
    );
    fs.unlinkSync(filePath);
    await pool.query("DELETE FROM item_images WHERE id = $1", [id]);

    return NextResponse.json(
      { message: "OK", result: { message: "File deleted successfully" } },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
