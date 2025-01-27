import { BoxCascade } from "@/components/ui/box/box-cascade";
import { Title } from "@/components/ui/typography/title";
import React from "react";

const PageOrderPaymentGiftCard = () => {
  return (
    <div className="py-20">
      <Title className="text-center px-5">
        Commande, paiement & cartes cadeaux
      </Title>
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
            contacter notre service client à l’adresse suivante :
            <a href="mailto:contact@rouje.com">contact@rouje.com</a> et nous
            étudierons au cas par cas ce qu'il est possible de faire.
          </p>
        </BoxCascade>
        <BoxCascade title="Où en est ma commande ?">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
            dicta illum ipsa accusamus eveniet minima facilis. Dignissimos
            maiores, sit tempore nostrum dolorem alias vitae sint, aliquam
            corporis molestiae, beatae nam.
          </p>
        </BoxCascade>
        <BoxCascade title="Comment fonctionne la pré-commande ?">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
            dicta illum ipsa accusamus eveniet minima facilis. Dignissimos
            maiores, sit tempore nostrum dolorem alias vitae sint, aliquam
            corporis molestiae, beatae nam.
          </p>
        </BoxCascade>
        <BoxCascade title="Quels sont les différents moyens de paiement?">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
            dicta illum ipsa accusamus eveniet minima facilis. Dignissimos
            maiores, sit tempore nostrum dolorem alias vitae sint, aliquam
            corporis molestiae, beatae nam.
          </p>
        </BoxCascade>
        <BoxCascade title="Les paiements sont-ils bien sécurisés ?">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
            dicta illum ipsa accusamus eveniet minima facilis. Dignissimos
            maiores, sit tempore nostrum dolorem alias vitae sint, aliquam
            corporis molestiae, beatae nam.
          </p>
        </BoxCascade>
        <BoxCascade title="Tout savoir sur les cartes cadeaux">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
            dicta illum ipsa accusamus eveniet minima facilis. Dignissimos
            maiores, sit tempore nostrum dolorem alias vitae sint, aliquam
            corporis molestiae, beatae nam.
          </p>
        </BoxCascade>
        <BoxCascade title="Comment utiliser mon code de réduction ou ma carte cadeau?">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
            dicta illum ipsa accusamus eveniet minima facilis. Dignissimos
            maiores, sit tempore nostrum dolorem alias vitae sint, aliquam
            corporis molestiae, beatae nam.
          </p>
        </BoxCascade>
      </div>
    </div>
  );
};

export default PageOrderPaymentGiftCard;
