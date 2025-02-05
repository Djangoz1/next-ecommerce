import { createNewsletterQuery } from "@/api/newsletter";
import { sendNewsletterEmail } from "@/services/send-mail";
import { stripe } from "@/services/stripe-node";
import { pool } from "@/utils/db";
import dotenv from "dotenv";
dotenv.config();
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    if (!body.email) {
      throw new Error("Email is required");
    }

    const result = await createNewsletterQuery(body.email);
    if (result.email) {
      const coupon = await stripe.coupons.retrieve(
        process.env.COUPON_WELCOME_ID || ""
      );
      let send = await sendNewsletterEmail({
        coupon: {
          id: coupon.id,
          discount: coupon.amount_off
            ? coupon.amount_off / 100
            : coupon.percent_off || 0,
          type: coupon.amount_off ? "amount" : "percent",
        },
        user: { email: result.email, name: result.email },
      });
      console.log("send newsletter email", send);
    } else {
      throw new Error("Something went wrong when creating newsletter");
    }
    return NextResponse.json({ message: "OK", result }, { status: 201 });
  } catch (error) {
    console.error("Error /api/newsletter/POST", error);
    return NextResponse.json(
      {
        message: "Error",
        error: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}
