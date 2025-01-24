import React from "react";
import { Btn } from "../ui/btn";
import { stripePromise } from "@/services/stripe-js";

export const BtnBuyCheckout = ({
  stripeId,
  children = <>Commander</>,
}: {
  stripeId: string;
  children?: React.ReactNode;
}) => {
  return (
    <Btn
      variant={"primary"}
      onClick={async () => {
        const stripe = await stripePromise;
        if (!stripe) return;
        const result = await stripe.redirectToCheckout({
          sessionId: stripeId,
        });
      }}
      className="w-full text-center justify-center"
    >
      {children}
    </Btn>
  );
};
