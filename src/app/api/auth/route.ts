import { pool } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  try {
    if (!email || !password) throw new Error("Email or password is required");
    const { data, error } = await pool.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error("Error sign in");
    const { session, user } = data;

    return NextResponse.json(
      {
        message: "OK",
        result: {
          ...user,
          session: {
            refresh_token: session?.refresh_token,
            access_token: session?.access_token,
          },
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error api/auth/POST", error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const refresh_token = request.headers.get("Authorization")?.split(" ")[1];

  try {
    if (!refresh_token)
      throw new Error("Refresh token or access token is required");
    const result = await pool.auth.refreshSession({
      refresh_token: refresh_token,
    });

    return NextResponse.json(
      {
        message: "OK",
        result: {
          user: result.data.user,
          session: {
            access_token: result.data.session?.access_token,
            refresh_token: result.data.session?.refresh_token,
          },
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error api/auth/GET", error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const { id, metadata: newMetadata } = await request.json();

  try {
    if (!id || !newMetadata) throw new Error("Id or metadata is required");
    const result = await pool.auth.updateUser(id, newMetadata);
    console.log({ result });
    return NextResponse.json({ message: "OK", result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
