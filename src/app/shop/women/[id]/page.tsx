"use client";
import { BoxCascade } from "@/components/ui/box/box-cascade";
import { Tabs } from "@/components/ui/box/tabs";
import { Btn } from "@/components/ui/btn";
import { Dropdown } from "@/components/ui/btn/dropdown";
import { Title } from "@/components/ui/typography/title";
import { useApi } from "@/hooks/useApi";

import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
import { Item } from "../page";
import { cn } from "@/utils/cn";

type BaseMetadata = {
  title: string;
  content: string[];
};

export type ItemMetadata = {
  care: BaseMetadata;
  compo: BaseMetadata;
  details: BaseMetadata;
  traceability: BaseMetadata;
  engagements: BaseMetadata;
  model: {
    dimension: number;
    tall: number;
    centimeters_by_size: number;
    regular: boolean;
    size: number;
    name: string;
  };
};

const images = [
  "/model/1.jpg",
  "/model/2.jpg",
  "/model/3.jpg",
  "/model/4.jpg",
  "/model/5.jpg",
];

const Page = ({ ctx }: { params: { id: string }; ctx: any }) => {
  const params = useParams();
  console.log({ params, ctx });
  const { data } = useApi({
    path: `/items/${params.id}`,
    method: "GET",
  });
  console.log({ data });
  if (!data) return null;
  return (
    <>
      <Device item={data} />
      <Mobile item={data} />
    </>
  );
};

const Device = ({
  item,
}: {
  item: Item & {
    gallery: { image: string; id: string }[];
    metadata: ItemMetadata;
  };
}) => {
  return (
    <div className="hidden xl:flex   w-full relative">
      <div className="relative flex w-full ">
        <div className="flex w-1/2 flex-col">
          {[{ image: item.main_image }, ...item.gallery].map((image, i) => (
            <Image
              className="w-full"
              key={`image-item-${i}`}
              src={image.image}
              width={1800}
              height={1800}
              alt={item.name + " image " + i}
            />
          ))}
        </div>
        <div className="fixed right-0 top-0 w-1/2">
          <div className="flex flex-col gap-5 py-40  mx-auto items-center w-[500px]">
            <Title className="text-4xl">{item.name}</Title>

            <p className="uppercase font-light">{item.abstract_description}</p>
            <div className="flex items-center gap-2">
              {item.discount ? (
                <span className="font-black">
                  €{" "}
                  {(
                    Number(item.price) -
                    Number(item.price) / item.discount
                  ).toFixed(2)}
                </span>
              ) : null}
              <span
                className={cn(
                  "font-black",
                  item.discount ? "line-through opacity-50" : ""
                )}
              >
                € {item.price}
              </span>
            </div>
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
                  component: (
                    <>
                      {item.metadata.details.title}
                      <ul className="list-disc list-inside">
                        {item.metadata.details.content.map((item, i) => (
                          <li key={`detail-metadata--${i}`}>{item}</li>
                        ))}
                      </ul>
                    </>
                  ),
                },
                {
                  title: "Coupe",
                  component: (
                    <>
                      Conseils taille :
                      <ul className="list-disc list-inside">
                        <li>
                          {item.metadata.model.regular
                            ? "Cette pièce taille normalement, prenez votre taille habituelle."
                            : "Cette pièce taille petite, prenez votre taille habituelle moins 1."}
                        </li>
                        <li>
                          <b>{item.metadata.model.name}</b> mesure{" "}
                          <b>{item.metadata.model.tall}</b> cm, elle porte une
                          taille <b>{item.metadata.model.size}.</b>
                        </li>
                      </ul>
                      Dimensions :
                      <ul className="list-disc list-inside">
                        <li>
                          Longueur totale :{" "}
                          <b>{item.metadata.model.dimension}</b> cm pour une
                          taille <b>{item.metadata.model.size}</b>
                        </li>
                        <li>
                          Comptez{" "}
                          <b>{item.metadata.model.centimeters_by_size}</b> cm en
                          plus par taille supplémentaire.
                        </li>
                      </ul>
                    </>
                  ),
                },
                {
                  title: "Compo & Care",
                  component: (
                    <>
                      Composition matière principale :
                      <ul className="list-disc list-inside">
                        {item.metadata.compo.content.map((item, i) => (
                          <li key={`compo-metadata--${i}`}>{item}</li>
                        ))}
                      </ul>
                      Entretien de votre pièce Ormés :
                      <ul className="list-disc list-inside">
                        {item.metadata.care.content.map((item, i) => (
                          <li key={`care-metadata--${i}`}>{item}</li>
                        ))}
                      </ul>
                    </>
                  ),
                },
                {
                  title: "Engagements",
                  component: (
                    <>
                      Initiatives :
                      <ul className="list-disc list-inside">
                        {item.metadata.engagements.content.map((item, i) => (
                          <li key={`engagements-metadata--${i}`}>{item}</li>
                        ))}
                      </ul>
                      Traçabilité matières :
                      <ul className="list-disc list-inside">
                        {item.metadata.traceability.content.map((item, i) => (
                          <li key={`traceability-metadata--${i}`}>{item}</li>
                        ))}
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

const Mobile = ({ item }: { item: Item }) => {
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
            alt={item.name + " image " + i}
          />
        ))}
      </div>
      <div className="flex flex-col w-full px-5 py-3 gap-5">
        <div className="flex w-full justify-between items-center">
          <Title className="text-xl">{item.abstract_description}</Title>

          <span className="font-black">€ {item.price}</span>
        </div>
        <Btn variant="primary" className="w-full text-center justify-center">
          Ajouter au panier
        </Btn>
        <button className="opacity-75 font-light">Guide des tailles</button>

        <div className="flex flex-col w-full border-t">
          <BoxCascade title="Détails">
            Robe longue.
            <ul className="list-disc list-inside">
              <li>Coloris vert</li>
              <li>Coupe cintrée</li>
              <li>Laçage dans le dos</li>
              <li>Manches longues</li>
              <li>Fabriquée en France</li>
            </ul>
          </BoxCascade>

          <BoxCascade title="Coupe">
            Conseils taille :
            <ul className="list-disc list-inside">
              <li>
                Cette pièce taille normalement, prenez votre taille habituelle.
              </li>
              <li>Henriette mesure 170 cm, elle porte une taille 36.</li>
            </ul>
            Dimensions :
            <ul className="list-disc list-inside">
              <li>Longueur totale : 113 cm pour une taille 36</li>
              <li>Comptez 1 cm en plus par taille supplémentaire.</li>
            </ul>
          </BoxCascade>

          <BoxCascade title="Compo & Care">
            Conseils taille :
            <ul className="list-disc list-inside">
              <li>
                Cette pièce taille normalement, prenez votre taille habituelle.
              </li>
              <li>Henriette mesure 170 cm, elle porte une taille 36.</li>
            </ul>
            Dimensions :
            <ul className="list-disc list-inside">
              <li>Longueur totale : 113 cm pour une taille 36</li>
              <li>Comptez 1 cm en plus par taille supplémentaire.</li>
            </ul>
          </BoxCascade>
          <BoxCascade title="Engagements">
            Initiatives:
            <ul className="list-disc list-inside">
              <li>Fabrication en France (Ile de France)</li>
              <li>Transport routier</li>
              <li>
                67% de coton contenu dans la matière principale de cette pièce
                est biologique.
              </li>
            </ul>
            Traçabilité matières :
            <ul className="list-disc list-inside">
              <li>
                Filature : polyamide en Chine, élasthanne en Turquie, coton en
                Turquie
              </li>
              <li>Tricotage : Turquie</li>
              <li>Teinture : Turquie</li>
              <li>Finition : Turquie</li>
              <li>Assemblage : France (Ile De France)</li>
            </ul>
          </BoxCascade>
        </div>
      </div>
    </div>
  );
};
export default Page;
