import { NextResponse } from "next/server";
import { stripe } from "@/services/stripe-node";
import { newsletterHtml } from "@/utils/mail/newsletter-html";
import { pool } from "@/utils/db";
import { sendCouponEmail, sendNewsletterEmail } from "@/services/send-mail";

export async function POST(req: Request) {
  try {
    const {
      name,
      amount_off, // montant de réduction
      percent_off, // pourcentage de réduction
      duration, // 'once', 'repeating', ou 'forever'
      duration_in_months, // optionnel, pour 'repeating'
      max_redemptions, // nombre max d'utilisations
      send_mail,
    } = await req.json();
    if (!name) {
      throw new Error("Name is required");
    }

    console.log({ send_mail });
    if (!amount_off && !percent_off) {
      throw new Error("Amount or percent off is required");
    }

    if (amount_off && percent_off) {
      throw new Error("Amount and percent off cannot be set at the same time");
    }

    const coupon = await stripe.coupons.create({
      name,
      ...(amount_off && { amount_off: Number(amount_off), currency: "eur" }),
      ...(percent_off && { percent_off }),
      duration,
      duration_in_months,
      max_redemptions,
      //   expires_at,
    });

    if (send_mail) {
      const contacts = await pool.from("newsletter").select("email");
      console.log({ contacts });
      for (const contact of contacts?.data || []) {
        sendCouponEmail({
          user: {
            email: contact.email,
            name: contact.email,
          },
          coupon: {
            id: coupon.id,
            discount: Number(coupon.percent_off || coupon.amount_off),
            type: coupon.amount_off ? "amount" : "percent",
          },
        });
      }
    }

    return NextResponse.json(coupon);
  } catch (error) {
    console.log({ error });
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 400 }
    );
  }
}

// Récupérer tous les coupons
export async function GET() {
  try {
    const coupons = await stripe.coupons.list({
      limit: 100,
    });

    return NextResponse.json(
      { message: "OK", result: coupons.data },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 400 }
    );
  }
}
