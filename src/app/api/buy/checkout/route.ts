import { getItemByIdQuery } from "@/api/items";

import { stripe } from "@/services/stripe-node";
import { NextRequest, NextResponse } from "next/server";

// Crée et retourne l'id de la session stripe
export async function POST(request: NextRequest) {
  const body = await request.json();
  try {
    const arr: { id: string; size: string }[] = body;

    if (body.length === 0) throw new Error("No items");
    let total = 0;

    for (let index = 0; index < arr.length; index++) {
      const element = arr[index];
      const item = await getItemByIdQuery(Number(element.id));

      //  TODO: add discount
      total += Number(item.price) * 100;
    }

    const sourceUrl = process.env.APP_URL || "http://localhost:3000";

    if (total === 0) throw new Error("Total is 0");

    const result = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: `${arr.length} articles`,
            },
            unit_amount: total,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${sourceUrl}/api/buy/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${sourceUrl}/shop/women`,
      metadata: {
        items: JSON.stringify(arr),
      },
    });

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
