import { BoxCascade } from "@/components/ui/box/box-cascade";
import { Title } from "@/components/ui/typography/title";
import { CONTACT } from "@/constants/inc";
import React from "react";

const PageOrderPaymentGiftCard = () => {
  return (
    <div className="py-20">
      <Title className="text-center px-5">Commande & paiement</Title>
      <div className="flex flex-col divide-y divide-dashed w-full">
        <BoxCascade title="Ma commande est-elle validée ?">
          <p>
            Dès que votre commande est validée, nous vous envoyons un email de
            confirmation de commande sur l’adresse email utilisée lors du
            passage de votre commande. Pensez à vérifier dans vos spams :)
            <br />
            <br />
            Vous pouvez facilement retrouver le statut et les détails de vos
            commande depuis la rubrique 🔍 “Suivi de commande” en renseignant
            votre numéro de commande ou votre email accompagné de votre code
            postal.
          </p>
          <ul className="list-disc list-inside my-5">
            <p className="font-bold underline">
              Votre commande a bien été prise en compte si un des statuts
              suivants apparaît :
            </p>
            <li>
              <b>« En cours de traitement »</b> indique que votre commande a
              bien été validée. Notre équipe logistique est en train de la
              préparer pour l’expédition. Promis, nous faisons au plus vite !
              Notez que le délai d’expédition est indépendant du délai de
              préparation, et que nos équipes expédient vos colis en moyenne
              sous 48h du lundi au vendredi hors jours fériés français.
            </li>
            <li>
              <b>« Commande expédiée »</b> indique que votre commande a été
              confiée au service de livraison choisi. Vous devriez la recevoir
              très vite : on a hâte pour vous !
            </li>
          </ul>

          <ul className="list-disc list-inside">
            <p className="font-bold underline">
              Votre commande n’a pas été prise en compte si un des statuts
              suivants apparaît :
            </p>
            <li>
              <b>« En cours de vérification »</b>
              apparait lorsque votre paiement n'est pas encore validé, et ceci
              peut prendre 2h :)
            </li>
            <li>
              Si vous voyez
              <b>« Paiement annulé »</b>, cela signifie que la commande n’a pas
              été validée. Rassurez vous, vous ne serez pas débitée, et nous
              vous invitons à repasser commande.
            </li>
            <li>
              Il peut s'agir d'une erreur de saisie, d'un plafond dépassé, ou
              d’un refus de votre banque. Nous vous invitons à réessayer en
              vérifiant attentivement vos coordonnées bancaires ou en utilisant
              un autre moyen de paiement pour recevoir vos pièces Rouje. Si le
              problème persiste, n'hésitez pas à contacter votre banque qui
              pourra vous aider à comprendre ce qu’il se passe.
            </li>
          </ul>
        </BoxCascade>
        <BoxCascade title="Je souhaite annuler, modifier ou fusionner ma commande, comment faire ?">
          <p>
            Pour annuler, modifier ou fusionner votre commande, vous pouvez
            contacter notre service client à l’adresse suivante :{" "}
            <a
              className="underline text-blue-500"
              href={`mailto:${CONTACT.email_customer_service}`}
            >
              {CONTACT.email_customer_service}
            </a>{" "}
            et nous étudierons au cas par cas ce qu'il est possible de faire.
          </p>
        </BoxCascade>
        <BoxCascade title="Où en est ma commande ?">
          <p>
            Tout au long de la confection de votre pièce, nous vous écrivons
            pour vous donner de ses nouvelles.{" "}
            <b>En cas de retard, nous vous prévenons immédiatement</b> et vous
            pouvez annuler votre commande à tout moment.
          </p>
        </BoxCascade>
        <BoxCascade title="Comment fonctionne la pré-commande ?">
          <h6 className="font-bold">La création</h6>
          <p>
            Inspirées par l’art, la mode , le design et les femmes qui
            m’entourent, chaque création reflète ma vision, nourrie par ma
            passion pour les savoir-faire et enrichie par vos besoins et désirs.
          </p>
          <h6 className="mt-5 font-bold">Le prototype</h6>
          <p>
            Nous transformons l’idée en vêtement avec l’aide des modélistes et
            artisans. Après plusieurs prototypes, nous peaufinons le produit
            pour qu’il soit parfait.
          </p>
          <h6 className="mt-5 font-bold">La commande</h6>
          <p>
            Chaque pièce est mise en ligne sur le site en quantité limitée, pour
            une période de quelques jours seulement.
          </p>
          <h6 className="mt-5 font-bold">La fabrication</h6>
          <p>
            Vos commandes sont envoyées à nos ateliers, exclusivement en Europe,
            et la Maison vous tient informés tout au long du processus.
          </p>
          <h6 className="mt-5 font-bold">La livraison</h6>
          <p>
            Vous recevez votre pièce à domicile. Si elle ne vous convient pas,
            vous pouvez l’échanger ou la retourner.
          </p>
          <h6 className="mt-5 font-bold">Le surplus</h6>
          <p>
            ORMÉS produit 5% de pièces supplémentaires pour garantir les
            échanges. Une fois ces derniers terminés, elles sont proposées à la
            vente et livrées chez vous sous 48h.
          </p>
        </BoxCascade>
        <BoxCascade title="Quels sont les différents moyens de paiement?">
          <p>
            Nous utilisons les services de Stripe pour le paiement de vos
            commandes.
          </p>
        </BoxCascade>
        <BoxCascade title="Les paiements sont-ils bien sécurisés ?">
          <p>
            Bien sûr, nous traitons vos données avec le respect qu'elles
            méritent : nos transactions sont entièrement sécurisées, et aucune
            information personnelle n’est divulguée. Vos coordonnées bancaires
            sont entièrement traitées par nos partenaires financiers Squarespace
            et Stripe, sans que nos équipes ne puissent y avoir accès et cela,
            même si vous choisissez de sauvegarder vos données de paiement pour
            vos prochains achats.
          </p>
        </BoxCascade>

        <BoxCascade title="Comment utiliser mon code de réduction ?">
          <p>
            Vous avez un code de réduction ? Quelle chance! Il vous suﬃt
            d’entrer le code en bas de votre panier au moment de la finalisation
            de votre commande, et de bien cliquer sur “Appliquer”
            <br />
            <br />
            Une fois la commande validée, il n’est pas possible d’en rembourser
            une partie ou d'appliquer un code promo.
            <br />
            <br />
            Celui-ci peut toutefois s'appliquer sur une prochaine commande, dans
            la limite de sa validité.
          </p>
        </BoxCascade>
      </div>
    </div>
  );
};

export default PageOrderPaymentGiftCard;
