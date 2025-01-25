import { getBuyingByStripeIdQuery, updateBuyingQuery } from "@/api/buy";
import { getCustomerByIdQuery } from "@/api/customer";
import { updateItemQuery } from "@/api/items";
import { sendOrderConfirmationEmail } from "@/services/send-mail";
import { stripe } from "@/services/stripe-node";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const stripeId = request.nextUrl.searchParams.get("session_id") as string;
    const session = await stripe.checkout.sessions.retrieve(stripeId);
    if (!session.metadata) throw new Error("Metadata not found");

    const items = await getBuyingByStripeIdQuery(stripeId);

    items.forEach(async ({ items, ...item }) => {
      await updateItemQuery({
        ...items,
        stock: items.stock > 1 ? Number(items.stock) - 1 : 0,
      });

      await updateBuyingQuery({
        ...{
          ...item,
          status: "paid",
          buying_at: new Date().toISOString(),
        },
      });
    });

    if (!items[0].customer_id) throw new Error("Customer not found");

    const send = await sendOrderConfirmationEmail({
      items,
      customers: await getCustomerByIdQuery(items[0].customer_id),
    });

    console.log({ send });
    // redirection to /success page
    return NextResponse.redirect(
      new URL("/success?id=" + session.id, request.url)
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
