"use client";
import { MultipleInput } from "@/components/form/multiple-input";
import { useApi } from "@/hooks/useApi";
import { ItemMetadata } from "@/types/items";
import React from "react";

export const ItemTraceabilityMultipleInput = ({
  data,
  isActive,
}: {
  data: ItemMetadata | undefined;
  isActive: string;
}) => {
  const { data: moock } = useApi<ItemMetadata["traceability"]>({
    path: "/items/details/traceability",
    method: "GET",

    enabled: isActive === "new",
  });

  return (
    <MultipleInput
      placeholder={"100% Made in France"}
      title="Traçabilité"
      defaultValue={data?.traceability?.content || moock?.content}
      id={`traceability-${isActive}`}
    />
  );
};
