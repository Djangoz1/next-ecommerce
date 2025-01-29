import { pool } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import { checkUpdateDefault } from "./[id]/route";

export async function POST(request: NextRequest) {
  const {
    country,
    zipcode,
    city,
    address,
    detail,
    user_id,
    company,
    province,
    default: _default,
  } = await request.json();

  try {
    if (!user_id) throw new Error("Required user id");

    if (!country || !zipcode || !city || !address || !province)
      throw new Error("Required fields");

    const { data: addresses, error } = await pool
      .from("addresses")
      .select("id")
      .eq("user_id", user_id);
    if (error) throw new Error(error.message);

    if ((addresses?.length || 0) >= 5)
      throw new Error("You can only have 5 addresses");

    if (_default) {
      await checkUpdateDefault(user_id);
    }
    const { data: result, error: resultError } = await pool
      .from("addresses")
      .insert({
        country,
        zipcode,
        city,
        address,
        detail,
        province,
        company,
        default: addresses?.length === 0 || _default,
        user_id,
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
