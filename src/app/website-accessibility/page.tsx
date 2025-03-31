import { Title } from "@/components/ui/typography/title";
import { CONTACT } from "@/constants/inc";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col gap-20 py-20 [&_b]:mr-0.5 [&_ul]:list-disc [&_ul]:list-inside px-5 xl:px-10 text-xs">
      <Title className="text-center">Déclaration d'accessibilité</Title>
      <Element title="Engagement en faveur de l'accessibilité">
        <p>
          ORMÉS s’engage à rendre son site web <b>maison-ormes.com</b>{" "}
          accessible à tous, y compris aux personnes en situation de handicap.
          Nous travaillons continuellement à améliorer l’expérience utilisateur
          et à assurer une navigation fluide pour tous les visiteurs, quelles
          que soient leurs capacités.
          <br />
          Cette déclaration d’accessibilité explique les mesures mises en place
          pour garantir une meilleure accessibilité numérique.
        </p>
      </Element>
      <Element title="Conformité aux normes">
        <p>
          Notre site vise à respecter les recommandations du{" "}
          <b>Référentiel Général d’Amélioration de l’Accessibilité (RGAA)</b> et
          les <b>Web Content Accessibility Guidelines (WCAG)2.1 niveau AA.</b>
          <br />
          Nous prenons en compte plusieurs aspects pour améliorer
          l’accessibilité de notre site, notamment :
        </p>
        <ul>
          <li>
            <>
              <b>Un contraste de couleurs suffisant</b>
              pour une meilleure lisibilité.
            </>
          </li>
          <li>
            <>
              <b>Une navigation au clavier</b>
              permettant l’accès aux fonctionnalités sans utilisation de la
              souris.
            </>
          </li>
          <li>
            <>
              <b>Des descriptions alternatives (alt text)</b>
              pour les images et contenus visuels.
            </>
          </li>
          <li>
            <b>Une structure HTML optimisée</b>
            pour faciliter l’usage des lecteurs d’écran.
          </li>
          <li>
            <b>Un code propre et sémantique</b>
            respectant les standards du web.
          </li>
        </ul>
      </Element>
      <Element title="Aides à la navigation">
        <p>
          Pour faciliter l’accès aux contenus, notre site propose plusieurs
          fonctionnalités d’accessibilité :
        </p>
        <ul>
          <li>
            <>
              <b>Une navigation simplifiée</b>
              et un fil d’Ariane pour s’orienter facilement.
            </>
          </li>
          <li>
            <>
              <b>La possibilité d’ajuster la taille du texte</b>
              via les paramètres du navigateur.
            </>
          </li>
          <li>
            <>
              <b>
                Un temps d’affichage optimisé pour éviter les délais excessifs.
              </b>
              via les paramètres du navigateur.
            </>
          </li>
          <li>
            <>
              <b>Une compatibilité avec les technologies d’assistance,</b>
              comme les lecteurs d’écran et logiciels de synthèse vocale.
            </>
          </li>
        </ul>
      </Element>
      <Element title="État de conformité">
        <p>
          Nous sommes conscients que certaines parties du site pourraient encore
          être optimisées et nous travaillons activement à résoudre ces
          problèmes.
        </p>
      </Element>

      <Element title="Retour d'expérience et contact">
        <p>
          Si vous rencontrez des difficultés lors de l’utilisation de notre
          site, veuillez nous contacter à l’adresse suivante :
        </p>
        <a
          href={`mailto:${CONTACT.email_customer_service}`}
          className="underline font-medium cursor-pointer"
        >
          {CONTACT.email_customer_service}
        </a>

        <p>
          Nous nous engageons à vous répondre dans les meilleurs délais et à
          vous proposer des solutions adaptées.
        </p>
      </Element>

      <Element title="Recours en cas de non-accessibilité">
        <p>
          Si vous estimez que nous ne respectons pas nos engagements en matière
          d’accessibilité et que vous n’obtenez pas de réponse satisfaisante à
          votre demande, vous pouvez saisir le Défenseur des droits via :
        </p>
        <ul>
          <li>
            <b>Le formulaire en ligne :</b>{" "}
            <a
              href="https://www.defenseurdesdroits.fr"
              target="_blank"
              className="underline font-medium cursor-pointer"
            >
              www.defenseurdesdroits.fr
            </a>
          </li>
          <li>
            <b>Le téléphone :</b>{" "}
            <a
              href="tel:0969390000"
              className="underline font-medium cursor-pointer"
            >
              09 69 39 00 00
            </a>{" "}
            (appel non surtaxé)
          </li>
          <li>
            <b>Un courrier postal à l’adresse :</b>
            <br />
            Défenseur des droits 3435,
            <br />
            Paris Cedex 07
          </li>
        </ul>
      </Element>

      <Element title="Mise à jour de la déclaration">
        <p>
          Nous effectuons régulièrement des audits pour améliorer
          l’accessibilité de notre site et nous nous engageons à publier les
          mises à jour pertinentes.
        </p>
      </Element>
    </div>
  );
};

export default page;

const Element = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-5">
      <Title className="text-xl">{title}</Title>
      {children}
    </div>
  );
};
