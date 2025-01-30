import { pool } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

const checkUpdateDefault = async (user_id: string) =>
  await pool
    .from("addresses")
    .update({ default: false })
    .eq("user_id", user_id)
    .eq("default", true)
    .select()
    .single();

export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    if (!body.user_id) throw new Error("Required user id");

    const { data: addresses, error } = await pool
      .from("addresses")
      .select("id")
      .eq("user_id", body.user_id);
    if (error) throw new Error(error.message);

    if ((addresses?.length || 0) >= 5)
      throw new Error("You can only have 5 addresses");

    if (body.default) {
      await checkUpdateDefault(body.user_id);
    }
    const { data: result, error: resultError } = await pool
      .from("addresses")
      .insert({
        ...body,

        default: addresses?.length === 0 || body.default,
      })
      .select()
      .single();

    if (resultError) throw new Error(resultError.message);
    return NextResponse.json(
      { message: "OK", result: result },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error /api/account/address/POST", error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
