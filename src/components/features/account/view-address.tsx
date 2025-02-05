import { GetAddressesHook } from "@/hooks/accounts/use-addresses";
import React from "react";

export const ViewAddress = ({
  data: el,
  id = "main",
}: {
  id: string;
  data: GetAddressesHook[0];
}) => {
  return (
    <div className="flex flex-col whitespace-nowrap">
      {[
        `${el.first_name} ${el.last_name}`,
        ...(el.company ? [el.company] : []),
        el.address,
        ...(el.detail ? [el.detail] : []),
        `${el.zipcode} ${el.city}`,
        el.country,
      ].map((s, j) => (
        <p
          key={`address-detail-${el.id}-${id}-${j}`}
          className="text-muted-foreground text-xs font-light"
        >
          {s}
        </p>
      ))}
    </div>
  );
};
