import { BoxCascade } from "@/components/ui/box/box-cascade";
import { Tabs } from "@/components/ui/box/tabs";
import { Btn } from "@/components/ui/btn";
import { Dropdown } from "@/components/ui/btn/dropdown";
import { Title } from "@/components/ui/typography/title";

import Image from "next/image";
import React from "react";

const item = {
  id: "1",
  title: "Kimono Model First",
  model: "795430 AAEFI 9110",
  price: "135",
  miniature: false,
  taille: "M",
};

const images = [
  "/model/1.jpg",
  "/model/2.jpg",
  "/model/3.jpg",
  "/model/4.jpg",
  "/model/5.jpg",
];

const Page = () => {
  return (
    <>
      <Device />
      <Mobile />
    </>
  );
};

const Device = () => {
  return (
    <div className="hidden xl:flex   w-full relative">
      <div className="relative flex w-full ">
        <div className="flex w-1/2 flex-col">
          {images.map((image, i) => (
            <Image
              className="w-full"
              key={`image-item-${i}`}
              src={image}
              width={1800}
              height={1800}
              alt={item.title + " image " + i}
            />
          ))}
        </div>
        <div className="fixed right-0 top-0 w-1/2">
          <div className="flex flex-col gap-5 py-40  mx-auto items-center w-[500px]">
            <Title className="text-4xl">{item.title}</Title>

            <p className="uppercase font-light">
              Robe longue en coton crinkle lacée dans le dos
            </p>

            <span className="font-black">€ {item.price}</span>
            <div className="flex w-full items-center gap-10 whitespace-nowrap mb-5">
              <Dropdown
                className="w-full"
                arr={[
                  { title: "Taille" },
                  { title: "M", value: "M" },
                  { title: "L", value: "L" },
                  { title: "XL", value: "XL" },
                  { title: "XXL", value: "XXL" },
                ]}
              />

              <button className="opacity-75 font-light">
                Guide des tailles
              </button>
            </div>
            <Btn
              variant="primary"
              className="w-full text-center justify-center"
            >
              Ajouter à votre panier
            </Btn>
            <Tabs
              className="w-full mt-10"
              arr={[
                {
                  title: "Détails",
                  children: (
                    <>
                      Robe longue.
                      <ul className="list-disc list-inside">
                        <li>Coloris vert</li>
                        <li>Coupe cintrée</li>
                        <li>Laçage dans le dos</li>
                        <li>Manches longues</li>
                        <li>Fabriquée en France</li>
                      </ul>
                    </>
                  ),
                },
                {
                  title: "Coupe",
                  children: (
                    <>
                      Conseils taille :
                      <ul className="list-disc list-inside">
                        <li>
                          Cette pièce taille normalement, prenez votre taille
                          habituelle.
                        </li>
                        <li>
                          Henriette mesure 170 cm, elle porte une taille 36.
                        </li>
                      </ul>
                      Dimensions :
                      <ul className="list-disc list-inside">
                        <li>Longueur totale : 113 cm pour une taille 36</li>
                        <li>Comptez 1 cm en plus par taille supplémentaire.</li>
                      </ul>
                    </>
                  ),
                },
                {
                  title: "Compo & Care",
                  children: (
                    <>
                      Composition:
                      <ul className="list-disc list-inside">
                        <li>
                          Matière principale : 67% coton (67% coton biologique),
                          32% polyamide, 1% élasthanne
                        </li>
                      </ul>
                      Entretien de votre pièce Ormés :
                      <ul className="list-disc list-inside">
                        <li>Lavage à 30°C max avec coloris similaires.</li>
                        <li>Eau de javel interdite</li>
                        <li>Séchage en tambour interdit</li>
                        <li>Repassage à fer doux sur l'envers</li>
                        <li>Nettoyage à sec autorisé</li>
                      </ul>
                    </>
                  ),
                },
                {
                  title: "Engagements",
                  children: (
                    <>
                      Initiatives:
                      <ul className="list-disc list-inside">
                        <li>Fabrication en France (Ile de France)</li>
                        <li>Transport routier</li>
                        <li>
                          67% de coton contenu dans la matière principale de
                          cette pièce est biologique.
                        </li>
                      </ul>
                      Traçabilité matières :
                      <ul className="list-disc list-inside">
                        <li>
                          Filature : polyamide en Chine, élasthanne en Turquie,
                          coton en Turquie
                        </li>
                        <li>Tricotage : Turquie</li>
                        <li>Teinture : Turquie</li>
                        <li>Finition : Turquie</li>
                        <li>Assemblage : France (Ile De France)</li>
                      </ul>
                    </>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Mobile = () => {
  return (
    <div className=" flex xl:hidden  flex-col w-full relative">
      <div className="flex w-screen overflow-x-scroll">
        {images.map((image, i) => (
          <Image
            className="w-screen"
            key={`image-item-${i}`}
            src={image}
            width={1800}
            height={1800}
            alt={item.title + " image " + i}
          />
        ))}
      </div>
      <div className="flex flex-col w-full px-5 py-3 gap-5">
        <div className="flex w-full justify-between items-center">
          <Title className="text-xl">{item.title}</Title>

          <span className="font-black">€ {item.price}</span>
        </div>
        <Btn variant="primary" className="w-full text-center justify-center">
          Ajouter au panier
        </Btn>
        <button className="opacity-75 font-light">Guide des tailles</button>

        <div className="flex flex-col w-full border-t">
          <BoxCascade
            title="Détails"
            children={
              <>
                Robe longue.
                <ul className="list-disc list-inside">
                  <li>Coloris vert</li>
                  <li>Coupe cintrée</li>
                  <li>Laçage dans le dos</li>
                  <li>Manches longues</li>
                  <li>Fabriquée en France</li>
                </ul>
              </>
            }
          />

          <BoxCascade
            title="Coupe"
            children={
              <>
                Conseils taille :
                <ul className="list-disc list-inside">
                  <li>
                    Cette pièce taille normalement, prenez votre taille
                    habituelle.
                  </li>
                  <li>Henriette mesure 170 cm, elle porte une taille 36.</li>
                </ul>
                Dimensions :
                <ul className="list-disc list-inside">
                  <li>Longueur totale : 113 cm pour une taille 36</li>
                  <li>Comptez 1 cm en plus par taille supplémentaire.</li>
                </ul>
              </>
            }
          />
          <BoxCascade
            title="Compo & Care"
            children={
              <>
                Conseils taille :
                <ul className="list-disc list-inside">
                  <li>
                    Cette pièce taille normalement, prenez votre taille
                    habituelle.
                  </li>
                  <li>Henriette mesure 170 cm, elle porte une taille 36.</li>
                </ul>
                Dimensions :
                <ul className="list-disc list-inside">
                  <li>Longueur totale : 113 cm pour une taille 36</li>
                  <li>Comptez 1 cm en plus par taille supplémentaire.</li>
                </ul>
              </>
            }
          />
          <BoxCascade
            title="Engagements"
            children={
              <>
                Initiatives:
                <ul className="list-disc list-inside">
                  <li>Fabrication en France (Ile de France)</li>
                  <li>Transport routier</li>
                  <li>
                    67% de coton contenu dans la matière principale de cette
                    pièce est biologique.
                  </li>
                </ul>
                Traçabilité matières :
                <ul className="list-disc list-inside">
                  <li>
                    Filature : polyamide en Chine, élasthanne en Turquie, coton
                    en Turquie
                  </li>
                  <li>Tricotage : Turquie</li>
                  <li>Teinture : Turquie</li>
                  <li>Finition : Turquie</li>
                  <li>Assemblage : France (Ile De France)</li>
                </ul>
              </>
            }
          />
        </div>
      </div>
    </div>
  );
};
export default Page;
