import { getItemByIdQuery } from "@/api/items";

import { stripe } from "@/services/stripe-node";
import { NextRequest, NextResponse } from "next/server";
import dotenv from "dotenv";
import { pool } from "@/utils/db";
import { createBuyingQuery } from "@/api/buy";
dotenv.config();
// Crée et retourne l'id de la session stripe
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { coupon_id, address_id, user_id, message, items: _arr } = body;
  try {
    const arr = _arr as { id: string; size: string; quantity: number }[];
    const user = (await pool.auth.admin.getUserById(user_id)).data.user;

    if (!user) throw new Error("User not found");
    const address = (
      await pool.from("addresses").select("*").eq("id", address_id).single()
    ).data;
    if (!address) throw new Error("Address not found");

    let coupon = null;
    if (coupon_id) {
      coupon = await stripe.coupons.retrieve(coupon_id);
    }

    if (body.length === 0) throw new Error("No items");
    let total = 0;

    const items: {
      id: number;
      name: string;
      main_image: string;
      price: string;
      discount: number;
      quantity: number;
      size: string;
    }[] = [];
    let isAvailable = true;
    for (let index = 0; index < arr.length; index++) {
      const element = arr[index];
      const item = await getItemByIdQuery(Number(element.id));
      items.push({
        ...element,
        ...item,
      });

      if (!item.stock) {
        isAvailable = false;
      }

      total += Number(item.price) - Number(item.price) / item.discount;
    }

    total -= (total * (coupon?.percent_off || 0)) / 100;

    const sourceUrl = process.env.APP_URL || "http://localhost:3000";

    if (total === 0) throw new Error("Total is 0");

    const discounts = [
      ...(coupon
        ? [
            {
              coupon: coupon?.id,
            },
          ]
        : []),
    ];

    const line_items = [
      ...items.map((el) => ({
        price_data: {
          currency: "eur",
          product_data: {
            name: el.name,
            description: `Taille: ${el.size}`,
            images: [
              el.main_image[0] === "/"
                ? `${process.env.APP_URL || "http://localhost:3000"}${
                    el.main_image
                  }`
                : el.main_image,
            ],
          },

          unit_amount: Math.round(
            (el.discount
              ? Number(el.price) -
                (Number(el.price) * Number(el.discount)) / 100
              : Number(el.price)) * 100
          ),
        },

        quantity: el.quantity,
      })),
    ];
    const result = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      customer_email: user.email,
      tax_id_collection: {
        enabled: true,
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            display_name: "Livraison standard",
            fixed_amount: {
              amount: total > 250 ? 2500 : 0,
              currency: "eur",
            },

            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: isAvailable ? 7 : 50,
              },
              maximum: {
                unit: "business_day",
                value: isAvailable ? 7 : 60,
              },
            },
          },
        },
      ],
      client_reference_id: user.id,

      line_items: [...line_items],
      ...(discounts.length > 0
        ? {
            discounts,
          }
        : {}),
      mode: "payment",
      success_url: `${sourceUrl}/api/buy/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${sourceUrl}/shop/dress`,
      metadata: {
        items: JSON.stringify(arr),
      },
    });

    for (const item of items) {
      await createBuyingQuery(item, {
        size: item.size,
        user_id: user.id,
        stripe_id: result.id,
        address_id: address.id,
        message: message || "",
        status: "pending",
      });
    }

    return NextResponse.json(
      { message: "OK", result: { id: `${result.id}` } },
      { status: 201 }
    );
  } catch (error) {
    console.log({ error });
    return NextResponse.json(
      {
        message: "Error",
        error:
          error instanceof Error
            ? error.message
            : "Internal Error : checkout route",
      },
      { status: 500 }
    );
  }
}

const castArr = (arr: { id: string; size: string }[]) => {
  return Object.values(
    arr.reduce((acc, item) => {
      const key = `${item.id}-${item.size}`;
      if (acc[key]) {
        acc[key].quantity++;
      } else {
        acc[key] = { ...item, quantity: 1 };
      }
      return acc;
    }, {} as { [key: string]: { id: string; size: string; quantity: number } })
  );
};

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("id") as string;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["customer", "payment_intent", "line_items"],
    });

    if (!session.metadata) throw new Error("Metadata not found");

    const arr = JSON.parse(session.metadata.items as string) as {
      id: string;
      size: string;
    }[];

    const items = await Promise.all(
      castArr(arr).map(async (item) => {
        return {
          ...(await getItemByIdQuery(Number(item.id))),
          ...item,
        };
      })
    );

    return NextResponse.json(
      { message: "OK", result: { items, total: session.amount_total } },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
