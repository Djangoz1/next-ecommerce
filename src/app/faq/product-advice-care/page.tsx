import { BoxCascade } from "@/components/ui/box/box-cascade";
import { Title } from "@/components/ui/typography/title";
import React from "react";

const PageProductAdviceAndCare = () => {
  return (
    <div className="py-20">
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
            tailles afin de choisir la taille qui vous ira le mieux :)
            <br />
            <br />
            Si la pièce que vous recherchez taille petit ou grand ce sera bien
            indiqué sur chaque article ;)
            <br />
            <br />
            Il arrive que certains modèles taillent petit ou grand : cette
            information est alors indiquée sur la fiche produit dans la rubrique
            "Coupe".
          </p>
        </BoxCascade>
        <BoxCascade title="Comment être informé des futurs lancements, réassorts ou promotions ?">
          <h6 className="font-bold">LANCEMENTS</h6>
          <p>
            Nous avons 2 collections par an, la collection automne hiver et
            printemps été. Plusieurs capsules alimenteront ces collections tout
            au long de l’année. Inscrivez-vous à notre newsletter ou suivez-nous
            sur Instagram 🔍 pour être informée de toutes nos nouveautés !
            <br />
            <br />
            Si la pièce que vous désirez n'est plus en stock, inscrivez vous à
            l'alerte stock qui apparait sur la fiche produit, vous serez
            notifiée en premier en cas de réassort ! On croise les doigts pour
            vous.
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
            Nous proposons plusieurs fois par an des promotions, vous pourrez
            retrouver des pièces de la collection actuelle ou des collections
            précédentes à prix doux.
            <br />
            <br />
            Les dates sont fixées quelques semaines avant : nous vous invitons à
            garder l'œil ouvert grâce à notre newsletter et notre compte
            Instagram 🔍 pour être informée des lancements.
          </p>
        </BoxCascade>
        <BoxCascade title="Comment entretenir ma pièce ?">
          <p>
            Pour faire durer vos pièces Rouje le plus longtemps, rendez-vous
            directement ici 🔍 et découvrez tous nos conseils ! Vous retrouverez
            quelques conseils d’entretien directement sur la fiche produit, dans
            la rubrique « Compo & Care ».
          </p>
        </BoxCascade>
      </div>
    </div>
  );
};

export default PageProductAdviceAndCare;
