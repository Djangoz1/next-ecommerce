import { stripe } from "@/services/stripe-node";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.href.split("/").pop();
  try {
    if (!id) throw new Error("No id provided");
    const result = await stripe.coupons.retrieve(id);
    return NextResponse.json(
      {
        message: "OK",
        result: {
          id: result.id,
          percent_off: result.percent_off,
          amount_off: result.amount_off,
          name: result.name,
          valid: result.valid,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
