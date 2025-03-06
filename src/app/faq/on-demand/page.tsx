"use server";
import { BoxCascade } from "@/components/ui/box/box-cascade";
import { Title } from "@/components/ui/typography/title";
import { CONTACT } from "@/constants/inc";
import React from "react";

const PageOnDemand = () => {
  return (
    <div className="">
      <Title className="text-center px-5">La fabrication sur commande</Title>
      <p className="px-5 mt-5">
        Environ six fois par an, la Maison ouvre une période de commande de
        quelques jours, afin de vous offrir la possibilité d' acquérir les
        dernières créations. Une fois cette fenêtre de commande fermée, nos
        ateliers commencent la production des pièces demandées, et la livraison
        a lieu quelques semaines plus tard.
      </p>
      <div className="flex flex-col divide-y divide-dashed w-full">
        <BoxCascade title="Pourquoi fabriquer à la demande ?">
          <p>
            Il n’ est pas question de vouloir vous faire attendre, mais le
            modèle de fabrication à la demande est avant tout un moyen efficace
            de lutter contre la surproduction et le gaspillage. Ainsi, la Maison
            ne produit que ce qui est nécessaire.
            <br />
            <br />
            Ce choix, c ’ est aussi une manière de redonner toute sa valeur au
            temps requis pour la création et la fabrication de vêtements de
            qualité. Il permet de donner du sens à vos achats et à votre
            consommation. L' attente a l' avantage de vous amener à réfléchir :
            ORMÉS ne propose que des pièces dont vous avez réellement besoin ou
            que vous désirez véritablement.
            <br />
            <br />
            C’ est grâce à ce modèle que la Maison peut vous offrir des pièces
            de qualité comparable à celles des maisons de luxe, mais à des prix
            plus accessibles.
          </p>
        </BoxCascade>
        <BoxCascade title="Les étapes de création de nos pièces">
          <ul className="list-disc list-inside">
            <b>1. La création</b>
            <li>
              Inspirées par l’ art, la mode , le design et les femmes qui m’
              entourent, chaque création reflète ma vision, nourrie par ma
              passion pour les savoir-faire et enrichie par vos besoins et
              désirs.
            </li>
            <b>2. Le Prototype</b>
            <li>
              Nous transformons l’idée en vêtement avec l’ aide des modélistes
              et artisans. Après plusieurs prototypes, nous peaufinons le
              produit pour qu ’il soit parfait.
            </li>
            <b>3. La Commande</b>
            <li>
              Chaque pièce est mise en ligne sur le site en quantité limitée,
              pour une période de quelques jours seulement.
            </li>
            <b>4. La Fabrication</b>
            <li>
              Vos commandes sont envoyées à nos ateliers, exclusivement en
              Europe, et la Maison vous tient informés tout au long du
              processus.
            </li>
            <b>5. La Livraison</b>
            <li>
              V ous recevez votre pièce à domicile. Si elle ne vous convient
              pas, vous pouvez l’échanger ou la retourner.
            </li>
            <b>6. Le Surplus</b>
            <li>
              ORMÉS produit 5% de pièces supplémentaires pour garantir les
              échanges. Une fois ces derniers terminés, elles sont proposées à
              la vente et livrées chez vous sous 48h.
            </li>
          </ul>
        </BoxCascade>
        <BoxCascade title="Combien de temps dois-je attendre pour recevoir ma pièce ?">
          <p>
            En général, le délai de fabrication et de livraison de votre pièce
            est de trois à quatre mois. Cela peut sembler long, mais c ’ est le
            temps nécessaire pour garantir la qualité exceptionnelle de chaque
            création.
          </p>
          <ul className="list-decimal list-inside">
            <li>
              <b>Précommande</b> - 15 à 31 jours
            </li>
            <li>
              <b>Production en Union Européenne</b> - 60 à 90 jours
            </li>
            <li>
              <b>Acheminement chez le logisticien</b> - 7 jours
            </li>
            <li>
              <b>Réception et contrôle qualité</b> - 2 jours
            </li>
            <li>
              <b>Livraison chez vous</b> - 1 à 2 jours
            </li>
          </ul>
        </BoxCascade>
        <BoxCascade title="Que faire en cas de retard ?">
          <p className="mb-5">
            Tout au long de la fabrication de votre pièce, la Maison vous tient
            informé de son avancée. En cas de retard, elle vous averti
            immédiatement, et vous avez la possibilité d' annuler votre commande
            à tout moment.
          </p>
          <b className="mt-5 mb-2">
            Comment être sûr(e) qu ’ une pièce va m’ aller ?
          </b>
          <p>
            Acheter un vêtement sans l’ essayer peut être un défi. C’ est
            pourquoi, en plus des guides de tailles détaillés, ORMÉS met à votre
            disposition des photos des pièces portées, disponibles dans les
            stories à la une sur Instagram, pour vous offrir une vision précise
            de leur coupe et de leur tombé.
          </p>
        </BoxCascade>
        <BoxCascade title="Comment procéder si je souhaite échanger ?">
          <p>
            Bien que ORMÉS fabrique uniquement ce qui a été commandé, la Maison
            fait une exception : elle produit systématiquement quelques pièces
            supplémentaires pour faciliter les échanges. Ainsi, si la taille ne
            vous convient pas, vous pourrez la changer sans problème. Les
            échanges et retours sont simples et gratuits pour la France et
            certains pays européens.
          </p>
        </BoxCascade>
      </div>
    </div>
  );
};

export default PageOnDemand;
