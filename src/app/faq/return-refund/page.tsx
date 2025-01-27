import { BoxCascade } from "@/components/ui/box/box-cascade";
import { Title } from "@/components/ui/typography/title";
import { CONTACT } from "@/constants/inc";
import React from "react";

const PageReturnRefund = () => {
  return (
    <div className="py-20">
      <Title className="text-center px-5">Retour & Remboursement</Title>
      <div className="flex flex-col divide-y divide-dashed w-full">
        <BoxCascade title="Comment faire mon retour ?">
          <p>
            Bien que nous ne produisions que ce qui a été commandé, nous nous
            autorisons une entorse à la règle : nous produisons toujours
            quelques pièces en plus pour faciliter les échanges. Vous pourrez
            donc changer de taille si ça ne vous convient pas. Les échanges et
            retours sont faciles et même gratuits pour la France et certains
            pays européens.
          </p>
        </BoxCascade>

        <BoxCascade title="Quelles sont les conditions de retour ">
          <p>
            Vous avez 14 jours suivant la réception de votre commande pour
            changer d’avis et nous la retourner contre remboursement.
          </p>
          <ul className="list-inside list-disc flex flex-col gap-2 my-5">
            <li>
              Gratuits pour la France métropolitaine, le Royaume-Uni, la Suisse,
              l'Allemagne, l'Autriche,la Belgique, le Danemark, l'Espagne,
              l'Estonie, la Finlande, la Grèce, l'Irlande, l'Italie, la
              Lituanie, le Luxembourg, Malte, les Pays-Bas, la Pologne, le
              Portugal, la Slovaquie, la Suède, la République tchèque, et
              Monaco.
            </li>
            <li>
              Vous avez 14 jours à réception de votre commande pour nous
              renvoyer le produit dans son emballage.
            </li>
            <li>Un guide de retour sera joint à votre colis.</li>
            <li>Remboursement ou échange à la réception de la pièce.</li>
            <p className="mt-5">
              Pour s’assurer d’être remboursée, voici quelques informations clés
              à bien respecter :
            </p>
            <li>
              Votre pièce doit être retournée intacte, dans son emballage
              d’origine, ne pas présenter de traces d’utilisation, et
              l’étiquette ne doit pas avoir été détachée.
            </li>
          </ul>
          <p>
            Tout retour non conforme sera refusé, et le renvoi sera à vos frais.
            <br />
            Tout retour non complet (sans bon de retour RMA, ou avec les pièces
            ne correspondant pas au RMA envoyé, ou avec des pièces en plus ou en
            moins) seront sujet à un traitement plus long de la part de nos
            équipes. Les articles en promotion bénéficient des mêmes conditions
            de retour.
          </p>
        </BoxCascade>
        <BoxCascade title="Quels sont les frais de retour d'une commande?">
          <p>
            Gratuits pour la France métropolitaine, le Royaume-Uni, la Suisse,
            l'Allemagne, l'Autriche,la Belgique, le Danemark, l'Espagne,
            l'Estonie, la Finlande, la Grèce, l'Irlande, l'Italie, la Lituanie,
            le Luxembourg, Malte, les Pays-Bas, la Pologne, le Portugal, la
            Slovaquie, la Suède, la République tchèque, et Monaco.
          </p>
        </BoxCascade>
        <BoxCascade title="Puis-je faire un échange ?">
          <p>
            Bien que nous ne produisions que ce qui a été commandé, nous nous
            autorisons une entorse à la règle : nous produisons toujours
            quelques pièces en plus pour faciliter les échanges. Vous pourrez
            donc changer de taille si ça ne vous convient pas. Les échanges et
            retours sont faciles et même gratuits pour la France et certains
            pays européens.
          </p>
        </BoxCascade>

        <BoxCascade title="Je souhaite modifier ma demande de retour, comment faire?">
          <p>
            Nous vous invitons à nous contacter{" "}
            <a
              className="text-blue-500 underline"
              href={`mailto:${CONTACT.email_customer_service}`}
            >
              {CONTACT.email_customer_service}
            </a>{" "}
            avec la liste des pièces que vous souhaitez retourner, et nous
            prendrons soin d'adapter votre retour pour que votre remboursement
            soit juste !
          </p>
        </BoxCascade>
        <BoxCascade title="Puis-je retourner deux commandes dans le même colis ?">
          <h6 className="font-bold uppercase">Vous êtes en Union Européenne</h6>
          <p>
            Vous pouvez retourner deux commandes (ou plus) dans le même colis
            afin d'économiser sur les frais de retour
          </p>
          <ul className="list-inside list-decimal flex flex-col gap-2 my-5">
            <p>Cependant, il faudra suivre la procédure suivante :</p>
            <li>
              Créer une demande de retour pour <b>CHAQUE</b> commande que vous
              souhaitez retourner. Vous obtiendrez un formulaire de retour et
              une étiquette pour chaque commande.
            </li>
            <li>
              Il faudra bien ajouter <b>TOUS</b> les formulaires de retour à
              l’intérieur du colis, et n’utiliser qu’une seule des étiquettes
              transporteur pour poster votre colis retour.
            </li>
            <li>
              Votre retour sera traité sous 5 jours ouvrés suivant sa réception
              à notre entrepôt. Une fois que vous aurez reçu votre
              remboursement, nous vous invitons à nous contacter
              contact@maison-ormes.com, afin d’être remboursée des étiquettes
              facturées mais non utilisées.
            </li>
          </ul>
          <h6 className="font-bold uppercase">Vous êtes hors UE</h6>
          <p>
            En dehors de l'union Européenne, il n’est pas possible de renvoyer
            plusieurs commandes dans le même colis. Nous en sommes désolées.
            <br />
            <br />
            Chaque demande de retour internationale génère automatiquement une
            étiquette d’expédition liée à une déclaration de douane pour les
            articles que vous avez déclarés dans votre retour.
            <br />
            <br />
            Si la douane constate que les articles de votre colis ne
            correspondent pas à ce qui a été déclaré, celui-ci peut être bloqué
            ou vous être retourné, entrainant ainsi des frais supplémentaires.
            <br />
            <br />
            Pour cette raison, il n’est pas possible de grouper plusieurs
            retours de commandes dans un seul et même colis, et nous déclinons
            toute responsabilité si votre colis est retenu ou retourné pour
            cette raison.
          </p>
        </BoxCascade>
        <BoxCascade title="Quand, et comment vais-je recevoir mon remboursement ?">
          <h6 className="font-bold uppercase">
            Dans combien de temps vais-je recevoir mon remboursement ?
          </h6>
          <p>
            Une fois votre colis retour reçu à notre atelier logistique, nous
            vous envoyons un premier email pour vous confirmer sa bonne
            réception. Votre retour est ensuite traité sous 5 jours ouvrés
            suivant sa réception, puis nous vous envoyons un second email pour
            vous confirmer votre remboursement. Celui-ci peut ensuite mettre
            jusqu’à 48 heures pour apparaitre sur votre compte.
          </p>

          <h6 className="font-bold uppercase">
            Comment est effectué mon remboursement ?
          </h6>
          <p>
            Votre remboursement est automatiquement recrédité sur le moyen de
            paiement utilisé lors du passage de votre commande.
          </p>
          <h6 className="font-bold uppercase">
            Code de bienvenue et code anniversaire
          </h6>
          <p>
            Si vous nous retournez la totalité de votre commande, votre code
            sera automatiquement réactivé lorsque nous procéderons à votre
            remboursement, il faudra seulement patienter jusqu’à ce que nous
            recevions votre retour - Si vous nous retournez seulement une partie
            de votre commande, nous ne serons pas en mesure de vous faire
            bénéficier d’un autre code
          </p>
          <h6>Autre promotion</h6>
          <p>
            Si vous retournez une commande sur laquelle vous aviez bénéficié
            d’une promotion, n’hésitez pas à nous contacter
            contact@maison-ormes.com, afin de voir s’il est possible de
            conserver votre avantage.
          </p>
        </BoxCascade>
        <BoxCascade title="Vous n'avez pas reçu le bon montant ?">
          <p>
            Si vous rencontrez le moindre souci, n’hésitez pas à nous contacter{" "}
            <a
              className="text-blue-500 underline"
              href={`mailto:${CONTACT.email_customer_service}`}
            >
              {CONTACT.email_customer_service}
            </a>{" "}
            , et nous serons heureuses de vous aider.
          </p>
        </BoxCascade>
      </div>
    </div>
  );
};

export default PageReturnRefund;
