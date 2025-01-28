import { pool } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password, name, address, zipcode, city, phone, country } =
    await req.json();

  try {
    if (!email || !password) throw new Error("Email or password is required");
    const result = await pool.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          address,
          zipcode,
          city,
          phone,
          country,
        },
      },
    });

    if (result.error) throw new Error("Error sign up");
    const { session, user } = result.data;

    return NextResponse.json(
      {
        message: "OK",
        result: {
          ...user,
          refresh_token: session?.refresh_token,
          session: session,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error api/auth/sign-in/POST", error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
