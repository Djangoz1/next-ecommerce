import { BoxCascade } from "@/components/ui/box/box-cascade";
import { Title } from "@/components/ui/typography/title";
import React from "react";

const PageMyAccountPromoCodes = () => {
  return (
    <div className="py-20">
      <Title className="text-center px-5">Mon compte & codes promos</Title>
      <div className="flex flex-col divide-y divide-dashed w-full">
        <BoxCascade title="Tout savoir sur le code de 10% bienvenue">
          <p>
            <b>Obtention</b>
            <br />
            <br />
            Pour bénéficier de notre remise de bienvenue, il suﬃt de vous
            inscrire à notre newsletter, en bas de notre page d'accueil, ou
            directement depuis votre espace Compte dans la rubrique Mon profil.
            <br />
            <br />
            Vous recevrez ensuite un email avec un code de 10% de réduction à
            renseigner lors de l’ajout de vos articles dans votre panier.
            <br />
            <br />
            Pensez à bien vérifier votre boîte spams si l’email tarde à arriver.
            Et d'ici là : bienvenue dans La Maison ORMÉS !
            <br />
            <br />
            💡 Notez que ce code promo ne s'applique pas sur nos pièces en
            promotions.
          </p>
        </BoxCascade>

        <BoxCascade title="J'ai oublié d'appliquer mon code promo">
          <p>
            Une fois la commande validée, il n’est pas possible d’en rembourser
            une partie ou d'appliquer un code promo.
            <br />
            <br />
            Celui-ci peut toutefois s'appliquer sur une prochaine commande, dans
            la limite de sa validité.
          </p>
        </BoxCascade>

        <BoxCascade title="Mon code promo ne fonctionne pas">
          <p>Si votre code promo ne fonctionne pas, c’est probablement :</p>
          <ul className="list-disc list-inside">
            <li>
              Que vous n’êtes pas sur le bon site, pensez à vérifier que vous
              êtes bien sur le site de votre pays en allant sur le sélecteur
              pays en bas à gauche ou en haut à droite de notre site.
            </li>
            <li>Qu’il n’est plus valide</li>
            <li>Qu’il a déjà été utilisé</li>
          </ul>
        </BoxCascade>
        <BoxCascade title="Comment suis-je remboursée ?">
          <ul className="list-disc list-inside">
            <li>
              Si vous nous retournez la totalité de votre commande, vous
              recevrez un nouveau code une fois votre remboursement eﬀectué .Il
              faudra donc patienter jusqu’à ce que nous recevions votre retour
            </li>
            <li>
              Si vous nous retournez seulement une partie de votre commande,
              nous ne serons pas en mesure de vous faire bénéficier d’un autre
              code
            </li>
          </ul>
        </BoxCascade>
        <BoxCascade title="Comment gérer mon abonnement à la newsletter ?">
          <p>
            <b>S'inscrire</b>
            <br />
            Pour recevoir nos avant-premières, nos inspirations et un aperçu des
            coulisses de la marque, c'est simple : rendez-vous en bas de notre
            site dans la rubrique "Plus de ORMÉS par ici" et renseignez les
            informations demandées. Vous pouvez aussi vous connecter à votre
            espace Compte et vous abonner directement depuis la rubrique Mon
            profil.
            <br />
            <br />
            <b>Se désinscrire</b>
            <br />
            Si vous souhaitez vous désinscrire de notre newsletter il vous suﬃra
            de cliquer sur “désinscription” en bas de votre newsletter, et de
            suivre les étapes qui vous seront proposées.
            <br />
            Vous pouvez également vous désinscrire directement depuis notre
            newsletter tout en bas de l’email.
          </p>
        </BoxCascade>

        <BoxCascade title="Je souhaite supprimer mon compte, comment faire ?">
          <p>
            Pour supprimer votre compte, nous vous invitons à envoyer un email à
            l'adresse suivante: contact@maison-ormes.com Nous nous chargerons
            par la suite de supprimer l'ensemble de vos données personnelles.
          </p>
        </BoxCascade>
      </div>
    </div>
  );
};

export default PageMyAccountPromoCodes;
