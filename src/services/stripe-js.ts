import { loadStripe } from "@stripe/stripe-js";
export const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || ""
);

export const handleCheckout = async (
  data: {
    id: string;
    size: string;
  }[]
) => {
  const stripe = await stripePromise;
  if (!stripe) return console.error("Stripe not loaded");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/buy/checkout`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  let res = await response.json();

  return res.result.id as string;
};
