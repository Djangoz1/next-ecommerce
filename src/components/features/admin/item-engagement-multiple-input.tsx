"use client";
import { MultipleInput } from "@/components/form/multiple-input";
import { useGetItemDetails } from "@/hooks/items/use-get-item-details";

import { ItemMetadata } from "@/types/items";
import React from "react";

export const ItemEngagementMultipleInput = ({
  data,
  isActive,
}: {
  data: ItemMetadata | undefined;
  isActive: string;
}) => {
  const { data: moock } = useGetItemDetails({
    enabled: isActive === "new",
    params: {
      type: "engagements",
    },
  });

  return (
    <MultipleInput
      placeholder={"Transport routier"}
      title="Engagements"
      defaultValue={data?.engagements?.content || moock?.[0]?.content}
      id={`engagements`}
    />
  );
};
