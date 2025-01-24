import { getBuyingByStripeIdQuery, updateBuyingQuery } from "@/api/buy";
import { stripe } from "@/services/stripe-node";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const stripeId = request.nextUrl.searchParams.get("session_id") as string;
    const session = await stripe.checkout.sessions.retrieve(stripeId);
    if (!session.metadata) throw new Error("Metadata not found");

    const items = await getBuyingByStripeIdQuery(stripeId);
    items.forEach(async (item) => {
      const res = await updateBuyingQuery({
        data: {
          ...item,
          status: "paid",
          buying_at: new Date().toISOString(),
        },
      });
    });

    // redirection to /success page
    return NextResponse.redirect(
      new URL("/success?id=" + session.id, request.url)
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
