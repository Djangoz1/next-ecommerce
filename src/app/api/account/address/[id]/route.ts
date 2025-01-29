import { pool } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export const checkUpdateDefault = async (user_id: string) =>
  await pool
    .from("addresses")
    .update({ default: false })
    .eq("user_id", user_id)
    .eq("default", true)
    .select()
    .single();

export async function PUT(request: NextRequest) {
  const urls = request.nextUrl.pathname.split("/");
  const id = urls[urls.length - 1];
  const body = await request.json();

  try {
    if (!id) throw new Error("Required id");
    if (!body.user_id) throw new Error("Required user_id");
    await checkUpdateDefault(body.user_id);
    const { data: addresses, error } = await pool
      .from("addresses")
      .update({ ...body })
      .eq("id", id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return NextResponse.json(
      { message: "OK", result: addresses },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const urls = request.nextUrl.pathname.split("/");
  const id = urls[urls.length - 1];
  try {
    if (!id) throw new Error("Required id");

    const { data: result, error } = await pool
      .from("addresses")
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (result.default) {
      await pool
        .from("addresses")
        .update({ default: true })
        .eq("user_id", result.user_id)
        .select()
        .single();
    }

    if (error) throw new Error(error.message);
    return NextResponse.json({ message: "OK", result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
