import {
  createBuyingQuery,
  getBuyingByStripeIdQuery,
  updateBuyingQuery,
} from "@/api/buy";

import { getItemByIdQuery } from "@/api/items";
import { stripe } from "@/services/stripe-node";
import { pool } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
// Create a buying with stripe session id and customer data
export async function POST(request: NextRequest) {
  const body: {
    email: string;
    country: string;
    firstName: string;
    lastName: string;
    address: string;
    zipcode: string;
    city: string;
    phone: string;
    stripe_id: string;

    user_id?: string;
  } = await request.json();

  try {
    if (!body.stripe_id) throw new Error("Stripe ID not found");

    const result = await stripe.checkout.sessions.retrieve(body.stripe_id);

    if (!result.metadata) throw new Error("Metadata not found");

    if (!body.user_id) {
      throw new Error("User Id not found");
    }

    const arr = JSON.parse(result.metadata!.items) as {
      id: string;
      size: string;
    }[];
    const results = [];
    for (let index = 0; index < arr.length; index++) {
      const item = await getItemByIdQuery(Number(arr[index].id));
      results.push(
        await createBuyingQuery(item, {
          size: arr[index].size,
          user_id: body.user_id,
          stripe_id: body.stripe_id,
          status: "pending",
        })
      );
    }

    return NextResponse.json(
      { message: "OK", result: results },
      { status: 201 }
    );
  } catch (error) {
    console.log("error creating buying", error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const stripe_id = request.nextUrl.searchParams.get("stripe_id") as string;

  try {
    if (!stripe_id) throw new Error("Stripe ID not found");
    const result = await stripe.checkout.sessions.retrieve(stripe_id);

    if (!result.metadata) throw new Error("Metadata not found");
    const items = await getBuyingByStripeIdQuery(stripe_id);

    const arr = await Promise.all(
      items.map(async (item) => {
        return {
          ...(await getItemByIdQuery(Number(item.item_id))),
          details: item,
        };
      })
    );

    if (!arr.length) {
      throw new Error("No items found");
    }
    const {
      data: { user },
      error,
    } = await pool.auth.admin.getUserById(items[0].user_id);
    if (!user || error) throw new Error("User not found");
    return NextResponse.json(
      {
        message: "OK",
        result: {
          items: arr,
          customer: {
            stripe: result.customer_details,
            name: user.user_metadata.name,
            email: user.email,
            phone: user.user_metadata.phone,
            address: user.user_metadata.address,
            zipcode: user.user_metadata.zipcode,
            city: user.user_metadata.city,
          },
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error /api/buy/GET", error);
    return NextResponse.json(
      {
        message: "Error",
        error:
          error instanceof Error ? error.message : "Stripe session not found",
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const tracking = body.tracking as string;
  const stripe_id = body.stripe_id as string;

  try {
    if (!tracking) throw new Error("Tracking not found");
    const items = await getBuyingByStripeIdQuery(stripe_id);

    if (!items.length) throw new Error("No items found");
    for (let index = 0; index < items.length; index++) {
      const { items: _, ...item } = items[index];

      let res = await updateBuyingQuery({
        ...item,
        status: "shipped",
        tracking,
      });
      if (!res) throw new Error("Error updating buying");
    }
    return NextResponse.json(
      { message: "OK", result: { success: true } },
      { status: 200 }
    );
  } catch (error) {
    console.log(
      "Error /api/buy/PUT",
      error instanceof Error ? error.message : "Error"
    );
    return NextResponse.json(
      {
        message: "Error",
        error: error instanceof Error ? error.message : "Error",
      },
      { status: 500 }
    );
  }
}
