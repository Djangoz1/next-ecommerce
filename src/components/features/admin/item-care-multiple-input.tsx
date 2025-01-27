"use client";
import { MultipleInput } from "@/components/form/multiple-input";
import { useApi } from "@/hooks/useApi";
import { ItemMetadata } from "@/types/items";
import React from "react";

export const ItemCareMultipleInput = ({
  data,
  isActive,
}: {
  data: ItemMetadata | undefined;
  isActive: string;
}) => {
  const { data: moock, ...rest } = useApi<ItemMetadata["care"]>({
    path: "/items/details/care",
    method: "GET",

    enabled: isActive === "new",
  });

  return (
    <MultipleInput
      placeholder={"Ne pas laver à la machine"}
      title="Entretien"
      defaultValue={data?.care?.content || moock?.content}
      id={`care-${isActive}`}
    />
  );
};
