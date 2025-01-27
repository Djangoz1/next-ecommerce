"use server";
import { BoxCascade } from "@/components/ui/box/box-cascade";
import { Title } from "@/components/ui/typography/title";
import { CONTACT } from "@/constants/inc";
import React from "react";

const PageDelivery = () => {
  return (
    <div className="">
      <Title className="text-center px-5">Livraison</Title>
      <div className="flex flex-col divide-y divide-dashed w-full">
        <BoxCascade title="Quels sont les délais, les options et frais de livraison ?">
          <h6 className="font-bold uppercase">Livraison</h6>
          <ul className="list-disc list-inside">
            <li>Partout dans le monde.</li>
            <li>Frais calculés en fonction du poids et de la destination.</li>
            <li>
              Livraison offerte en France métropolitaine à partir de 250€
              d'achat.
            </li>
          </ul>
          <h6 className="font-bold uppercase mt-5">Délais de livraison</h6>
          <ul className="list-disc list-inside">
            <li>
              En précommande : lorsqu’une pièce vous est proposée en
              précommande, c’est parcequ’elle n’a pas encore été fabriquée. La
              date de livraison estimée est notée sur la fiche produit et nous
              vous la rappelons dans l’e-mail de confirmation de commande.
            </li>
            <li>
              En stock : le délai de livraison peut varier entre 3 et 7 jours.
            </li>
            <li>
              Livraison offerte en France métropolitaine à partir de 250€
              d'achat.
            </li>
          </ul>
        </BoxCascade>
        <BoxCascade title="Dans quel pays livrez-vous ?">
          <ul className="list-disc list-inside">
            <li>Partout dans le monde.</li>
            <li>Frais calculés en fonction du poids et de la destination.</li>
            <li>
              Livraison offerte en France métropolitaine à partir de 250€
              d'achat.
            </li>
          </ul>
        </BoxCascade>
        <BoxCascade title="Aurais-je des frais de douane à payer?">
          <b>Livraison en France et dans l’Union Européenne :</b>
          <p>
            Les prix sur notre site incluent la TVA, et vous n’aurez donc rien
            d’autre à régler.
            <br />
            <b>
              Les livraisons en Suisse et en Norvège sont hors Union Européenne.
            </b>
            <br />
            <br />
            <b>Livraison au Royaume-Uni :</b>
            <br />
            Depuis le Brexit, nos prix sur notre store UK incluent les taxes, et
            vous n’aurez pas de frais supplémentaires à payer.
            <b>
              <br />
              <br />
              Livraison en dehors de l’Union Européenne :
            </b>
            <br />
            Pour tout envoi en dehors de l'Union Européenne (hors UK), des frais
            de douane ou d’importation peuvent s’appliquer, et sont à votre
            charge. Ils vous seront demandés par le transporteur avant la
            livraison. ORMÉS n’a pas la possibilité de connaitre leur montant en
            avance. Ces taxes dépendent de la réglementation appliquée par les
            gouvernements de chaque pays, et nous vous recommandons donc de vous
            renseigner auprès de votre bureau de douane local. Pour les
            Etats-Unis, ces frais s’appliquent pour toutes commandes au-delà de
            750$.
            <br />
            <br />
            Si vous refusez le paiement des droits et taxes ou la livraison du
            colis, notez qu'en raison des frais occasionnés pour son retour,
            nous déduirons des frais de retour de votre remboursement.
          </p>
        </BoxCascade>
        <BoxCascade title="Que faire si j'ai un problème avec ma livraison ?">
          <p>
            Une fois votre colis est entre les mains du transporteur, sachez que
            la Maison ORMÉS n'est pas en mesure d’intervenir sur votre
            livraison, nous en sommes navrés.
            <br />
            <br />
            Nous vous invitons à contacter directement le transporteur, avec
            votre numéro de colis, que vous trouverez dans le mail de
            confirmation d’expédition.
            <br />
            Attention, si vous avez sélectionné Colissimo, une fois votre colis
            arrivé dans le pays de destination, celui-ci est remis entre les
            mains de votre transporteur local (DPD, SEUR…). Vous pourrez alors
            suivre votre colis, depuis ce transporteur local.
          </p>
        </BoxCascade>
        <BoxCascade title="J'ai reçu une pièce non conforme, que faire ?">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
            dicta illum ipsa accusamus eveniet minima facilis. Dignissimos
            maiores, sit tempore nostrum dolorem alias vitae sint, aliquam
            corporis molestiae, beatae nam.
          </p>
        </BoxCascade>
        <BoxCascade title="Votre colis est retardé ou indiqué comme livré mais non reçu ?">
          <p>
            Nous vous invitons à patienter 7 jours pour voir si le suivi de
            votre colis est finalement mis à jour. Passé ce délai, vous pouvez
            nous contacter
            <a
              href={`mailto:${CONTACT.email_customer_service}`}
              className="text-blue-500 underline"
            >
              {CONTACT.email_customer_service}
            </a>{" "}
            , et nous trouverons une solution.
          </p>
        </BoxCascade>

        <BoxCascade title="Je souhaite modifier mon adresse de livraison ?">
          <p>
            Sachez qu’une fois votre commande validée, nous n’avons plus la
            possibilité de faire de modification. En fonction de votre
            transporteur, il se peut qu’il vous propose l’option de vous faire
            livrer en point relais, ou bien il tentera de vous joindre par
            téléphone. S’il ne peut vous livrer, le colis nous sera retourné et
            nous procéderons à votre remboursement.
          </p>
        </BoxCascade>
        <BoxCascade title="Votre colis a fait un retour à l'expéditeur ?">
          <p>
            Nous sommes désolés que vous n'ayez pu recevoir votre commande. Une
            fois celle-ci retournée à notre atelier logistique, nous procéderons
            à son remboursement sous 5 jours ouvrés.
            <br />
            <br />
            Si vous souhaitez toujours recevoir votre commande, vous pouvez nous
            écrire avant que celle-ci arrive à notre atelier et notre équipe
            fera le maximum pour organiser une réexpédition.
            <br />
            <br />
            En l'absence d'une demande de votre part, votre colis vous sera
            automatiquement remboursé.
            <br />
            <br />
            <b>
              Si le retour expéditeur est dû à un refus de livraison ou un refus
              de paiement des taxes, nous déduirons des frais de retour de votre
              remboursement.
            </b>
          </p>
        </BoxCascade>
        <BoxCascade title="Votre colis est arrivé endommagé ?">
          <p>
            Si vous constatez que votre colis est endommagé, nous vous invitons
            à refuser la
            <br />
            <br />
            Si vous vous êtes aperçus après la livraison que votre colis a été
            endommagé, nous vous invitons à prendre des photos et à nous
            contacter{" "}
            <a
              href={`mailto:${CONTACT.email_customer_service}`}
              className="text-blue-500 underline"
            >
              {CONTACT.email_customer_service}
            </a>
            .
          </p>
        </BoxCascade>

        <BoxCascade title="Y a-t-il des restrictions sur certains produits en fonction du pays de livraison ?">
          <p>
            Non, il n’y a aucunes restrictions concernant les produits ORMÉS.
          </p>
        </BoxCascade>
        <BoxCascade title="J'ai reçu une pièce non conforme, que faire ?">
          <p>
            <b>Ma pièce présente un défaut</b>
            <br />
            Nous sommes vraiment désolés que vous ne soyez pas satisfaite de
            votre pièce ORMÉS, malgré le soin que nous apportons à la confection
            de nos capsules. Les échanges et retours sont faciles et même
            gratuits pour la France et certains pays européens.
            <br />
            <br />
            Veuillez envoyer un mail à l’adresse{" "}
            <a
              href={`mailto:${CONTACT.email_customer_service}`}
              className="text-blue-500 underline"
            >
              {CONTACT.email_customer_service}
            </a>{" "}
            avant de faire un échange ou un retour.
            <br />
            <br />
            <b>J'ai reçu la mauvaise taille ou couleur</b>
            <br />
            Nous vous présentons toutes nos excuses pour cette erreur !
            n’hésitez pas à nous contacter{" "}
            <a
              href={`mailto:${CONTACT.email_customer_service}`}
              className="text-blue-500 underline"
            >
              contact@maison-ormes.com
            </a>{" "}
            et nous serons ravies de vous aider !
            <br />
            <br />
            En cas d'erreur dans la saisie de votre adresse, nous vous invitons
            à contacter directement le transporteur sélectionné une fois votre
            colis expédié. Pour trouver votre numéro de suivi à transmettre au
            transporteur, rendez-vous sur votre espace Compte - Mes commandes -
            Suivre ma commande.
          </p>
        </BoxCascade>
      </div>
    </div>
  );
};

export default PageDelivery;
