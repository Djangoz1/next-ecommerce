import { OrderInfo } from "@/components/features/order-info";
import { Title as TitleUI } from "@/components/ui/typography/title";
import { CONTACT } from "@/constants/inc";
import React from "react";

const Title = ({ children }: { children: React.ReactNode }) => {
  return <TitleUI className="text-lg">{children}</TitleUI>;
};

export default function PageTermsOfSale() {
  return (
    <div className="flex flex-col text-xs xl:p-10 p-5 py-20 gap-20 ">
      <TitleUI className="xl:mb-40 mb-20 text-center mx-auto">
        Conditions générales de vente
      </TitleUI>
      <p>
        Les présentes Conditions Générales de Vente (CGV) régissent les ventes
        de produits effectuées par ORMÉS sur le site maison-ormes.com
      </p>

      <Element title="Article 1: Présentation de la Société">
        <p>
          Les présentes Conditions Générales de Vente (CGV) régissent les ventes
          de produits effectuées par ORMÉS sur le site maison-ormes.com
        </p>
      </Element>
      <Element title="Article 2: Objet">
        <p>
          Les présentes CGV définissent les droits et obligations des parties
          dans le cadre de la vente de vêtements éco-responsables proposés par
          ORMÉS. Toute commande passée sur le site implique l'acceptation sans
          réserve des présentes CGV par le client.
        </p>
      </Element>
      <Element title="Article 3: Produits">
        <p>
          Les produits proposés sont décrits avec la plus grande précision
          possible. Les photographies et descriptions sont fournies à titre
          indicatif. Nos vêtements sont confectionnés à partir de matières
          naturelles et respectueuses de l'environnement.
        </p>
      </Element>
      <Element title="Article 4: Commandes">
        <p>
          <b>a) Processus de commande</b>
        </p>
        <p>
          Le client sélectionne les produits de son choix et les ajoute à son
          panier. Après validation du panier, il suit le processus de commande
          en fournissant les informations requises et en choisissant le mode de
          livraison. La commande est confirmée après validation du paiement.
        </p>
        <p>
          <b>b) Disponibilité</b>
        </p>
        <p>
          Les produits sont proposés dans la limite des stocks disponibles. En
          cas d'indisponibilité après passation de la commande, le client sera
          informé et aura la possibilité d'annuler ou de modifier sa commande.
        </p>
      </Element>
      <Element title="Article 5: Prix">
        <p>
          Les prix sont indiqués en euros, toutes taxes comprises (TTC), hors
          frais de livraison. ORMÉS se réserve le droit de modifier ses prix à
          tout moment, mais les produits seront facturés sur la base des tarifs
          en vigueur au moment de la validation de la commande.
        </p>
      </Element>
      <Element title="Article 6: Paiement">
        <p>
          Le paiement s'effectue en ligne par carte bancaire ou tout autre moyen
          proposé sur le site. La commande est considérée comme effective après
          confirmation de l'accord des centres de paiement bancaire.
        </p>
      </Element>
      <Element title="Article 7: Livraison">
        <p>
          <b>a) Modalités de livraison</b>
        </p>
        <p>
          Les livraisons sont effectuées à l'adresse indiquée par le client lors
          de la commande. ORMÉS propose plusieurs modes de livraison, dont les
          détails sont précisés lors de la commande.
        </p>
        <p>
          <b>b) Délais de livraison</b>
        </p>
        <p>
          Les délais de livraison varient en fonction du mode de livraison
          choisi et de la destination. Ils sont indiqués à titre indicatif et
          peuvent être soumis à des aléas indépendants de la volonté de ORMÉS.
        </p>
      </Element>
      <Element title="Article 8: Retours et échanges">
        <p>
          <b>a) Droit de rétractation</b>
        </p>
        <p>
          Conformément à la législation en vigueur, le client dispose d'un délai
          de 14 jours à compter de la réception des produits pour exercer son
          droit de rétractation sans avoir à justifier de motifs ni à payer de
          pénalités.
        </p>
        <p>
          <b>b) Modalités de retours</b>
        </p>
        <p>
          Les produits doivent être retournés dans leur état d'origine, non
          portés, non lavés, avec leurs étiquettes et emballages d'origine. Les
          frais de retour sont à la charge du client, sauf en cas de produit
          défectueux ou d'erreur de ORMÉS.
        </p>
      </Element>
      <Element title="Article 9: Garanties et Responsabilité">
        <p>
          Les produits bénéficient de la garantie légale de conformité et de la
          garantie contre les vices cachés. La responsabilité de ORMÉS ne
          saurait être engagée en cas de non-respect de la législation du pays
          où les produits sont livrés.
        </p>
      </Element>
      <Element title="Article 10: Protection des Données Personnelles">
        <p>
          Les informations collectées sont nécessaires à la gestion des
          commandes et aux relations commerciales. Elles sont traitées
          conformément à la politique de confidentialité de ORMÉS.
        </p>
      </Element>
      <Element title="Article 11: Propriété intellectuelle">
        <p>
          Tous les éléments du site sont la propriété intellectuelle exclusive
          de ORMÉS. Toute reproduction ou utilisation sans autorisation est
          strictement interdite.
        </p>
      </Element>
      <Element title="Article 12: Droit applicable et litiges">
        <p>
          Les présentes CGV sont soumises au droit français. En cas de litige,
          une solution amiable sera recherchée avant toute action judiciaire. À
          défaut, les tribunaux compétents seront ceux du ressort de Paris.
        </p>
      </Element>
      <Element title="Article 13: Service Client">
        <p>
          Pour toute question ou demande, veuillez nous contacter à l'adresse
          suivante :{" "}
          <a
            className="underline cursor-pointer"
            href={`mailto:${CONTACT.email_customer_service}`}
          >
            {CONTACT.email_customer_service}
          </a>{" "}
          ou via le formulaire de contact disponible sur le site.
        </p>
      </Element>
      <OrderInfo />
    </div>
  );
}

const Element = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-5">
      <Title>{title}</Title>
      <>{children}</>
    </div>
  );
};
