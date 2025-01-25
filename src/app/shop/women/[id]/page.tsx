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
import { BtnBuyingAction } from "@/components/features/btn-buying-action";
import { BoxError } from "@/components/ui/box/box-error";
import { Loader } from "@/components/ui/box/loader";
import { DetailsDelivery } from "@/components/features/details-delivery";
import { DetailsSize } from "@/components/features/details-size";
import { DetailsCompoAndCare } from "@/components/features/details-compo-and-care";
import { DetailsEngagement } from "@/components/features/details-engagement";

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

const Page = () => {
  const params = useParams();

  const { data, isFetched } = useApi<
    Item & {
      gallery: { image: string; id: string }[];
      metadata: ItemMetadata;
    }
  >({
    path: `/items/${params.id}`,
    method: "GET",
  });
  console.log({ data });
  if (!isFetched) return <Loader />;
  if (!data) return <BoxError />;
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
              className="w-full mt-10 "
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
                  component: <DetailsSize item={item} />,
                },
                {
                  title: "Compo & Care",
                  component: <DetailsCompoAndCare item={item} />,
                },
                {
                  title: "Engagements",
                  component: <DetailsEngagement item={item} />,
                },
                {
                  title: "Livraison",
                  component: <DetailsDelivery item={item} />,
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Mobile = ({
  item,
}: {
  item: Item & {
    gallery: { image: string; id: string }[];
    metadata: ItemMetadata;
  };
}) => {
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
      <div className="flex flex-col w-full  py-3 gap-5">
        <div className="flex w-full justify-between items-center gap-2 px-5">
          <Title className="text-xl">{item.abstract_description}</Title>

          <div className="flex whitespace-nowrap items-center gap-2 font-black text-xs">
            {item.discount ? (
              <>
                <span className="font-medium line-through opacity-50">
                  {item.price} €
                </span>
                <span className="font-black">
                  {(
                    Number(item.price) -
                    Number(item.price) / item.discount
                  ).toFixed(2)}{" "}
                  €
                </span>
              </>
            ) : (
              <span className="">{item.price} €</span>
            )}
          </div>
        </div>
        <div className="px-5 flex flex-col items-center gap-5">
          <BtnBuyingAction item={item} />
          <button className="opacity-75 font-light">Guide des tailles</button>
        </div>

        <div className="flex flex-col w-full border-t divide-y">
          <BoxCascade title="Détails">
            <>
              {item.metadata.details.title}
              <ul className="list-disc list-inside">
                {item.metadata.details.content.map((item, i) => (
                  <li key={`detail-metadata--${i}`}>{item}</li>
                ))}
              </ul>
            </>
          </BoxCascade>

          <BoxCascade title="Coupe">
            <DetailsSize item={item} />
          </BoxCascade>

          <BoxCascade title="Compo & Care">
            <DetailsCompoAndCare item={item} />,
          </BoxCascade>
          <BoxCascade title="Engagements">
            <DetailsEngagement item={item} />
          </BoxCascade>
          <BoxCascade title="Livraison">
            <DetailsDelivery item={item} />
          </BoxCascade>
        </div>
      </div>
    </div>
  );
};
export default Page;
