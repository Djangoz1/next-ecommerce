import { getBuyingByStripeIdQuery, updateBuyingQuery } from "@/api/buy";

import { updateItemQuery } from "@/api/items";
import { sendOrderConfirmationEmail } from "@/services/send-mail";
import { stripe } from "@/services/stripe-node";
import { pool } from "@/utils/db";

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

    if (!items[0].user_id) throw new Error("Customer not found");
    const {
      data: { user },
      error,
    } = await pool.auth.admin.getUserById(items[0].user_id);
    if (!user || error) throw new Error("User not found");
    await sendOrderConfirmationEmail({
      items,
      user: {
        email: user.email as string,
        name: user.user_metadata.name as string,
        phone: user.user_metadata.phone as string,
        address: user.user_metadata.address as string,
        zipcode: user.user_metadata.zipcode as string,
        city: user.user_metadata.city as string,
      },
    });

    // redirection to /success page
    return NextResponse.redirect(
      new URL("/success?id=" + session.id, request.url)
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
