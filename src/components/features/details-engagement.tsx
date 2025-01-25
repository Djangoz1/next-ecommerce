import { Item, ItemMetadata } from "@/types/items";
import React from "react";

export const DetailsEngagement = ({
  item,
}: {
  item: Item & { metadata: ItemMetadata };
}) => {
  return (
    <div className="flex flex-col gap-3">
      <>
        <ul className="list-disc list-inside">
          <p className="font-bold underline">Initiatives</p>
          {item.metadata.engagements.content.map((item, i) => (
            <li key={`engagements-metadata--${i}`}>{item}</li>
          ))}
        </ul>
        <ul className="list-disc list-inside">
          <p className="font-bold underline">Traçabilité matières</p>
          {item.metadata.traceability.content.map((item, i) => (
            <li key={`traceability-metadata--${i}`}>{item}</li>
          ))}
        </ul>
      </>
    </div>
  );
};
