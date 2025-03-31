import { Title as TitleUI } from "@/components/ui/typography/title";
import { CONTACT } from "@/constants/inc";
import React from "react";

export default function PageConfidentialityPolicy() {
  return (
    <div className="flex flex-col text-xs xl:p-10 p-5 py-20 gap-20  [&_ul]:list-disc [&_ul]:list-inside [&_b]:mr-0.5">
      <TitleUI className="xl:mb-40 mb-20 text-center mx-auto">
        Politique de confidentialité
      </TitleUI>
      <p>
        La protection de vos données personnelles est une priorité pour ORMÉS.
        Cette Politique de Confidentialité vise à vous informer sur la manière
        dont nous collectons, utilisons et protégeons vos informations lorsque
        vous utilisez notre site maison-ormes.com. En utilisant notre site, vous
        acceptez les pratiques décrites dans cette politique.
      </p>

      <Element title="Données collectées">
        <p>
          Nous collectons différentes catégories de données personnelles,
          notamment :
        </p>
        <ul className="list-disc list-inside">
          <li>
            <>
              <b>Données d'identification :</b>
              nom, prénom, adresse e-mail, numéro de téléphone.
            </>
          </li>
          <li>
            <>
              <b>Données de paiement :</b>
              informations bancaires (gérées de manière sécurisée par notre
              prestataires de paiement Stripe).
            </>
          </li>

          <li>
            <>
              <b>Données de commande :</b> historique des achats, adresses de
              livraison et de facturation.
            </>
          </li>
        </ul>
        <div className="flex flex-col gap-2">
          <p>Nous collectons ces informations lorsque vous :</p>
          <ul className="list-disc list-inside">
            <li>
              <>Passez une commande sur notre site.</>
            </li>
            <li>
              <>Créez un compte client.</>
            </li>
            <li>
              <>Vous inscrivez à notre newsletter.</>
            </li>
            <li>
              <>Contactez notre service client.</>
            </li>
          </ul>
        </div>
      </Element>
      <Element title="Finalités du traitement des données">
        <p>Nous utilisons vos données personnelles pour :</p>
        <ul>
          <li>
            <>
              <b>Gérer vos commandes</b>
              et assurer leur livraison.
            </>
          </li>
          <li>
            <b>Améliorer votre expérience utilisateur</b>
            sur notre site.
          </li>
          <li>
            <b>Envoyer des communications marketing</b>
            (avec votre consentement).
          </li>
          <li>
            <b>Assurer la sécurité du site</b>
            et prévenir la fraude.
          </li>
          <li>
            <b>Répondre à vos demandes et réclamations</b>
            via notre service client.
          </li>
        </ul>
      </Element>

      <Element title="Partage des données">
        <p>
          Nous ne vendons ni ne louons vos données personnelles. Toutefois, nous
          pouvons être amenés à partager certaines informations avec :
        </p>
        <ul>
          <li>
            <>
              <b>Nos prestataires de paiement</b>
              pour le traitement sécurisé des
            </>
          </li>
          <li>
            <>
              <b>Nos transporteurs</b> pour assurer la livraison de vos
              commandes.
            </>
          </li>
          <li>
            <>
              <b>Nos partenaires marketing</b>
              pour l’envoi de newsletters et offres promotionnelles (si vous
              avez donné votre consentement).
            </>
          </li>
          <li>
            <>
              <b>Les autorités légales</b>, si la loi nous y oblige. Tous nos
              partenaires sont soumis à des obligations strictes de
              confidentialité et de protection des données.
            </>
          </li>
        </ul>
      </Element>

      <Element title="Sécurité des données">
        <p>
          Nous mettons en place des mesures de sécurité adaptées pour protéger
          vos données contre toute perte, accès non autorisé ou divulgation :
        </p>
        <ul>
          <li>
            <>
              <b>Chiffrement des paiements</b>
              via des technologies sécurisées (ex. SSL).
            </>
          </li>
          <li>
            <>
              <b>Stockage sécurisé des données</b>
              sur des serveurs protégés.
            </>
          </li>
          <li>
            <>
              <b>Accès restreint aux informations personnelles</b>, limité aux
              employés et prestataires ayant besoin de ces données pour leurs
              missions.
            </>
          </li>
        </ul>
      </Element>

      <Element title="Vos droits">
        <p>
          Conformément au Règlement Général sur la Protection des Données
          (RGPD), vous disposez des droits suivants :
        </p>
        <ul>
          <li>
            <>
              <b>Droit d’accès :</b> obtenir une copie des données vous
              concernant.
            </>
          </li>
          <li>
            <>
              <b>Droit de rectification :</b> corriger des informations
              inexactes ou incomplètes.
            </>
          </li>
          <li>
            <>
              <b>Droit à l’effacement :</b> demander la suppression de vos
              données sous certaines conditions.
            </>
          </li>
          <li>
            <>
              <b>Droit d’opposition :</b> vous opposer à l’utilisation de vos
              données à des fins marketing.
            </>
          </li>
          <li>
            <>
              <b>Droit à la portabilité :</b> récupérer vos données sous un
              format exploitable.
            </>
          </li>
        </ul>

        <p>
          Pour exercer ces droits, vous pouvez nous contacter à
          <a href={`mailto:${CONTACT.email_customer_service}`}>
            {CONTACT.email_customer_service}
          </a>
        </p>
      </Element>
      <Element title="Cookies et technologies similaires">
        Nous n'utisons pas de cookies pour le moment jusqu'à ce que nous
        décidions de mettre en place un système de cookies.
      </Element>
      <Element title="Durée de conservation des données">
        <p>
          Nous conservons vos données personnelles aussi longtemps que
          nécessaire pour remplir les finalités mentionnées dans cette
          politique, sauf obligation légale contraire.
        </p>
        <ul>
          <li>
            <>
              <b>Données de commande :</b> conservées 5 ans à des fins
              comptables et légales.
            </>
          </li>
          <li>
            <>
              <b>Données de compte client :</b> conservées jusqu’à demande de
              suppression.
            </>
          </li>
          <li>
            <>
              <b>Données marketing :</b> conservées 3 ans après votre dernière
              interaction avec nous.
            </>
          </li>
        </ul>
      </Element>
      <Element title="Mise à jour de la politique de confidentialité">
        <p>
          Nous nous réservons le droit de modifier cette politique de
          confidentialité à tout moment.
        </p>
      </Element>
      <Element title="Contactez-nous">
        <p>
          Pour toute question ou demande relative à votre confidentialité,
          veuillez nous contacter à
          <a href={`mailto:${CONTACT.email_customer_service}`}>
            {CONTACT.email_customer_service}
          </a>
        </p>
      </Element>
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
      <TitleUI className="text-lg">{title}</TitleUI>
      <>{children}</>
    </div>
  );
};
