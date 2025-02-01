"use client";
import { MultipleInput } from "@/components/form/multiple-input";
import { useGetItemDetails } from "@/hooks/items/use-get-item-details";

import { ItemMetadata } from "@/types/items";
import React from "react";

export const ItemTraceabilityMultipleInput = ({
  data,
  isActive,
}: {
  data: ItemMetadata | undefined;
  isActive: string;
}) => {
  const { data: moock } = useGetItemDetails({
    enabled: isActive === "new",
    params: {
      type: "traceability",
    },
  });

  console.log({ moock });
  return (
    <MultipleInput
      placeholder={"100% Made in France"}
      title="Traçabilité"
      defaultValue={data?.traceability?.content || moock?.[0]?.content}
      id={`traceability`}
    />
  );
};
