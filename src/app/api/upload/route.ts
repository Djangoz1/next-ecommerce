import { pool } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File;
  const itemId = formData.get("itemId") as string;
  try {
    if (!file) {
      throw new Error("File is required");
    }

    const name = `${itemId}-${file.name}-${Date.now()}`;
    const { data, error } = await pool.storage
      .from("images")
      .upload(name, file);

    if (error) {
      throw error;
    }

    const { data: url } = await pool.storage
      .from("images")
      .getPublicUrl(data.path);

    if (itemId) {
      let res = await pool.from("gallery").insert({
        item_id: itemId,
        image: url.publicUrl,
      });
      console.log({ res });
    }

    return NextResponse.json(
      { message: "OK", result: { data, url: url.publicUrl } },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error /api/upload/POST", error);
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
    console.log("Error /api/upload/GET", error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
