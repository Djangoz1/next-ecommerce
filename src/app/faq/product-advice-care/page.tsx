"use server";
import { BoxCascade } from "@/components/ui/box/box-cascade";
import { Title } from "@/components/ui/typography/title";
import React from "react";

const PageProductAdviceAndCare = () => {
  return (
    <div className="">
      <Title className="text-center px-5">
        Produits, Conseils & Entretiens
      </Title>
      <div className="flex flex-col divide-y divide-dashed w-full">
        <BoxCascade title="Quelle taille choisir ?">
          <p>
            Vous avez un doute sur la taille à prendre pour une de nos créations
            ?
            <br />
            <br />
            Notre équipe de style a créé un guide 🔍 afin de vous accompagner
            pour choisir la taille qui vous ira le mieux. Vous pourrez retrouver
            ce guide sur chaque page de nos pièces, en cliquant sur "guide des
            tailles", et vous trouverez également une équivalence de nos
            tailles.
            <br />
            <br />
            Les tailles changeant beaucoup en fonction des marques et des
            morphologies, nous vous recommandons de prendre vos mesures (tour de
            buste, taille, et hanches) et de les comparer à notre guide des
            tailles afin de choisir la taille qui vous ira le mieux.
            <br />
            <br />
            Si la pièce que vous recherchez taille petit ou grand ce sera bien
            indiqué sur chaque article.
            <br />
            <br />
            Il arrive que certains modèles taillent petit ou grand : cette
            information est alors indiquée sur la fiche produit dans la rubrique
            "Coupe".
            <br />
            <br />
            Nous proposons également des images de nos pièces portées dans nos
            stories à la une sur Instagram, vous offrant ainsi une vision claire
            de l'allure et du tombé de nos créations.
          </p>
        </BoxCascade>
        <BoxCascade title="Comment être informé des futurs lancements, réassorts ou promotions ?">
          <h6 className="font-bold">LANCEMENTS</h6>
          <p>
            Quatre à six fois par an, nous ouvrons une période de commande de
            quelques jours pour vous permettre d'acquérir nos dernières
            créations. Une fois cette fenêtre de commande limitée clôturée, nos
            ateliers se lancent dans la fabrication des pièces commandées, et la
            livraison s'effectue quelques semaines après.
            <br />
            Inscrivez-vous à notre newsletter ou suivez-nous sur Instagram pour
            être informée de toutes nos nouveautés !
          </p>
          <h6 className="mt-5 font-bold">REASSORTS</h6>
          <p>
            Notre équipe de style travaille avec pour objectif premier d'avoir
            la production la plus raisonnée possible en produisant les quantités
            les plus justes pour chaque création ce qui peut générer des
            ruptures. Afin de minimiser la surproduction, nous faisons des
            petites séries, puis les pièces les plus demandées sont réassorties
            en cours de saison.
          </p>
          <h6 className="mt-5 font-bold">PROMOTIONS</h6>
          <p>
            Nous pouvons proposer quelques promotions exceptionnelles par an,
            vous pourrez retrouver des pièces de la capsule actuelle ou des
            capsules précédentes à prix doux.
            <br />
            <br />
            Les dates sont fixées quelques semaines avant : nous vous invitons à
            garder l'œil ouvert grâce à notre newsletter et notre compte
            Instagram pour être informée des lancements.
          </p>
        </BoxCascade>
        <BoxCascade title="Comment entretenir ma pièce ?">
          <p>
            Pour faire durer vos pièces ORMÉS le plus longtemps,vous retrouverez
            quelques conseils d’entretien directement sur la fiche produit, dans
            la rubrique « Compo & Care ».
          </p>
        </BoxCascade>
      </div>
    </div>
  );
};

export default PageProductAdviceAndCare;
