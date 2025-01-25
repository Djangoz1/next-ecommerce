import { Item } from "@/types/items";
import React from "react";

export const DetailsDelivery = ({ item }: { item: Item }) => {
  return (
    <div className="flex flex-col gap-3">
      <ul className="list-disc list-inside">
        <p className="font-bold underline">Expédition</p>
        <li>Partout dans le monde.</li>
        <li>Frais calculés en fonction du poids et de la destination.</li>
        <li>
          Livraison offerte en France métropolitaine à partir de 250€ d'achat.
        </li>
      </ul>
      <ul className="list-disc list-inside">
        <p className="font-bold underline">Délais de livraison</p>
        {Number(item.stock) === 0 ? (
          <>
            <li>
              Cet article est disponible en précommande. La date de livraison
              est notée sur la fiche produit qui vous sera envoyée lors de la
              commande.
            </li>
          </>
        ) : (
          <li>Le délai de livraison est de 3 à 7 jours ouvrés.</li>
        )}
      </ul>

      <ul className="list-disc list-inside">
        <p className="font-bold underline">Échange & retours</p>
        <>
          <li>
            Gratuit pour la France métropolitaine, le Royaume-Uni, la Suisse,
            l'Allemagne, l'Autriche, la Belgique, le Danemark, l'Espagne,
            l'Estonie, la Finlande, la Grèce, l'Irlande, l'Italie, la Lituanie,
            le Luxembourg, Malte, les Pays-Bas, la Pologne, le Portugal, la
            Slovaquie, la Suède, la République Tchèque et Monaco.
          </li>
          <li>
            Vous avez 14 jours à réception de votre colis pour exercer votre
            droit d'échange ou de retour.
          </li>
          <li>Un guide de retour sera joint à votre colis.</li>
          <li>Remboursement ou échange à la réception de l'article.</li>
        </>
      </ul>
    </div>
  );
};
