"use client";
import { MultipleInput } from "@/components/form/multiple-input";
import { useGetItemDetails } from "@/hooks/items/use-get-item-details";

import { ItemMetadata } from "@/types/items";
import React from "react";

export const ItemCareMultipleInput = ({
  data,
  isActive,
}: {
  data: ItemMetadata | undefined;
  isActive: string;
}) => {
  const { data: moock } = useGetItemDetails({
    enabled: isActive === "new",
    params: {
      type: "care",
    },
  });

  return (
    <MultipleInput
      placeholder={"Ne pas laver à la machine"}
      title="Entretien"
      defaultValue={data?.care?.content || moock?.[0]?.content}
      id={`care-${isActive}`}
    />
  );
};
