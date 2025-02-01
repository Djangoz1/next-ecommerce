import { Item, ItemMetadata } from "@/types/items";
import React from "react";

export const DetailsCompoAndCare = ({
  item,
}: {
  item: Item & { metadata: ItemMetadata };
}) => {
  return (
    <div className="flex flex-col gap-3">
      <ul className="list-disc list-inside">
        <p className="font-bold underline">Composition matière principale</p>
        {item.metadata?.compo?.content.map((item, i) => (
          <li key={`compo-metadata--${i}`}>{item}</li>
        ))}
      </ul>
      <ul className="list-disc list-inside">
        <p className="font-bold underline">Entretien de votre pièce Ormés</p>
        {item.metadata?.care?.content.map((item, i) => (
          <li key={`care-metadata--${i}`}>{item}</li>
        ))}
      </ul>
    </div>
  );
};
