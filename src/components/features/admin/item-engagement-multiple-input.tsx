"use client";
import { MultipleInput } from "@/components/form/multiple-input";
import { useApi } from "@/hooks/useApi";
import { ItemMetadata } from "@/types/items";
import React from "react";

export const ItemEngagementMultipleInput = ({
  data,
  isActive,
}: {
  data: ItemMetadata | undefined;
  isActive: string;
}) => {
  const { data: moock } = useApi<ItemMetadata["engagements"]>({
    path: "/items/details/engagements",
    method: "GET",

    enabled: isActive === "new",
  });

  console.log({ moock });
  return (
    <MultipleInput
      placeholder={"Transport routier"}
      title="Engagements"
      defaultValue={data?.engagements?.content || moock?.content}
      id={`engagements-${isActive}`}
    />
  );
};
