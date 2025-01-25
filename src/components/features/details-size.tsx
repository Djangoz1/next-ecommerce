import { Item, ItemMetadata } from "@/types/items";
import React from "react";

export const DetailsSize = ({
  item,
}: {
  item: Item & { metadata: ItemMetadata };
}) => {
  return (
    <div className="flex flex-col gap-3">
      <ul className="list-disc list-inside">
        <p className="font-bold underline">Conseils taille</p>
        <li>
          {item.metadata.model.regular
            ? "Cette pièce taille normalement, prenez votre taille habituelle."
            : "Cette pièce taille petite, prenez votre taille habituelle moins 1."}
        </li>
        <li>
          <b>{item.metadata.model.name}</b> mesure{" "}
          <b>{item.metadata.model.tall}</b> cm, elle porte une taille{" "}
          <b>{item.metadata.model.size}.</b>
        </li>
      </ul>
      <ul className="list-disc list-inside">
        <p className="font-bold underline">Dimensions</p>
        <li>
          Longueur totale : <b>{item.metadata.model.dimension}</b> cm pour une
          taille <b>{item.metadata.model.size}</b>
        </li>
        <li>
          Comptez <b>{item.metadata.model.centimeters_by_size}</b> cm en plus
          par taille supplémentaire.
        </li>
      </ul>
    </div>
  );
};
