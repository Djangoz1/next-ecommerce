import { NextRequest, NextResponse } from "next/server";
import dotenv from "dotenv";

import { orderHtml } from "@/utils/mail/order-html";
import { pool } from "@/utils/db";
import { newsletterHtml } from "@/utils/mail/newsletter-html";

dotenv.config();

export async function GET(request: NextRequest) {
  // Votre template d'email
  const type = request.nextUrl.searchParams.get("type") || "order";

  let htmlTemplate;
  if (type === "order") {
    const items = (await pool.from("buying").select("*, items(*)").limit(5))
      .data;

    htmlTemplate = orderHtml({
      user: {
        name: "Sandra Djangoné",

        email: "sandra@djangone.com",
      },
      items: (items || []).map((item) => ({
        ...item.items,
        price: Number(item.items.price),
        discount: Number(item.items.discount),
        quantity: 1,
        size: "36",
      })),
    });
  } else if (type === "newsletter") {
    htmlTemplate = newsletterHtml({
      user: {
        name: "Sandra Djangoné",

        email: "sandra@djangone.com",
      },
      coupon: {
        id: "JHIDHZLS",
        type: "percent",
        discount: 10,
      },
    });
  }
  return new NextResponse(htmlTemplate, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}
