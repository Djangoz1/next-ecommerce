import {
  createBuyingQuery,
  getBuyingByIdQuery,
  getBuyingByStripeIdQuery,
} from "@/api/buy";
import { createCustomer, getCustomerByIdQuery } from "@/api/customer";
import { getItemByIdQuery } from "@/api/items";
import { stripe } from "@/services/stripe-node";
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
    customer_id?: string;
  } = await request.json();

  try {
    if (!body.stripe_id) throw new Error("Stripe ID not found");

    const result = await stripe.checkout.sessions.retrieve(body.stripe_id);

    if (!result.metadata) throw new Error("Metadata not found");

    let customer_id = Number(body?.customer_id);
    if (!body.customer_id) {
      const customer = await createCustomer({
        email: body.email,
        name: `${body.firstName} ${body.lastName}`,
        phone: body.phone,
        address: body.address,
        zipcode: body.zipcode,
        city: body.city,
      });

      customer_id = Number(customer.id);
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
          customer_id,
          stripe_id: body.stripe_id,
          created_at: new Date().toISOString(),
          buying_at: new Date().toISOString(),
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

    return NextResponse.json(
      {
        message: "OK",
        result: {
          items: arr,
          customer: {
            stripe: result.customer_details,
            ...(await getCustomerByIdQuery(Number(arr[0].details.customer_id))),
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
