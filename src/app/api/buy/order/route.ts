import { getAllBuyingQuery, getBuyingByStatusQuery } from "@/api/buy";
import { Buying, Customer, Item } from "@/types/items";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const status = request.nextUrl.searchParams.get("status") as
    | Buying["status"]
    | undefined;

  try {
    let res;

    if (status) {
      res = await getBuyingByStatusQuery(status);
    } else {
      res = await getAllBuyingQuery();
    }

    const formattedRes = res.reduce(
      (
        acc: Record<
          string,
          {
            items: Omit<
              Buying & { items: Item & { quantity: number } },
              "stripe_id"
            >[];
            customers: Customer;
            stripe_id: string;
            price: number;
            status: Buying["status"];
          }
        >,
        { customers, stripe_id, ...el }
      ) => {
        if (!acc[stripe_id]) {
          acc[stripe_id] = {
            items: [],
            customers,
            stripe_id,

            status: el.status,
            price: 0,
          };
        }
        const index = acc[stripe_id].items.findIndex(
          (item) => item.items.id === el.items.id && item.size === el.size
        );
        if (index !== -1) {
          acc[stripe_id].items[index].items.quantity++;
        } else {
          acc[stripe_id].items.push({
            ...el,
            items: { ...el.items, quantity: 1 },
          });
        }

        if (acc[stripe_id].status === "paid") {
          acc[stripe_id].status = el.status;
        }

        acc[stripe_id].price += Number(el.items.price);
        return acc;
      },
      {} as Record<
        string,
        {
          items: Omit<
            Buying & {
              items: Item & { quantity: number };
            },
            "stripe_id"
          >[];
          customers: Customer;
          stripe_id: string;
          price: number;
          status: Buying["status"];
        }
      >
    );

    return NextResponse.json(
      { message: "OK", result: Object.values(formattedRes) },
      { status: 200 }
    );
  } catch (error) {
    console.log("error /api/buy/order/GET", error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
