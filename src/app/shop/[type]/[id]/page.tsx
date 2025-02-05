"use client";
import { BoxCascade } from "@/components/ui/box/box-cascade";
import { Tabs } from "@/components/ui/box/tabs";
import { Btn } from "@/components/ui/btn";
import { Dropdown } from "@/components/ui/btn/dropdown";
import { Title } from "@/components/ui/typography/title";

import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";

import { cn } from "@/utils/cn";
import { BtnBuyingAction } from "@/components/features/btn-buying-action";
import { BoxError } from "@/components/ui/box/box-error";
import { Loader } from "@/components/ui/box/loader";
import { DetailsDelivery } from "@/components/features/details-delivery";
import { DetailsSize } from "@/components/features/details-size";
import { DetailsCompoAndCare } from "@/components/features/details-compo-and-care";
import { DetailsEngagement } from "@/components/features/details-engagement";
import { Icon } from "@iconify/react/dist/iconify.js";

import { GetItemHook, useGetItem } from "@/hooks/items/use-get-item";
import { ItemDiscount } from "@/components/features/items/item-discount";
import { CarouselImg } from "@/components/ui/box/carousel-img";
import { BtnItemSizeGuide } from "@/components/features/items/btn-item-size-guide";

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

const Page = () => {
  const params = useParams();

  const { data, isFetched } = useGetItem({
    params: {
      id: Number(params.id),
    },
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

const Device = ({ item }: { item: GetItemHook }) => {
  return (
    <div className="hidden xl:flex   w-full relative">
      <div className="relative flex w-full divide-x">
        <div className="flex w-1/2 flex-col">
          <CarouselImg
            images={[item.main_image, ...item.gallery.map((el) => el.image)]}
          />
        </div>
        <div className="w-1/2">
          <div className="flex flex-col gap-5 py-20   mx-auto items-center w-[500px]">
            <div className="flex flex-col gap-2 items-center w-full px-10">
              <Title className="text-2xl">{item.name}</Title>

              <p className="uppercase font-light">
                {item.abstract_description}
              </p>
              <ItemDiscount item={item} />

              <BtnBuyingAction item={item} />
              <BtnItemSizeGuide className="w-fit" />
            </div>

            <Tabs
              className="w-full mt-10 border-t border-dashed border-muted-foreground py-5"
              arr={[
                {
                  title: "Détails",
                  component: (
                    <>
                      {item.metadata.details?.title}
                      <ul className="list-disc list-inside">
                        {item.metadata.details?.content.map((item, i) => (
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

const Mobile = ({ item }: { item: GetItemHook }) => {
  return (
    <div className=" flex xl:hidden  flex-col w-full relative">
      <CarouselImg
        images={[{ image: item.main_image }, ...item.gallery].map(
          (image) => image.image
        )}
      />

      <div className="flex flex-col w-full  py-3 gap-5">
        <div className="flex w-full justify-between items-center gap-2 px-5 ">
          <div className="flex flex-col ">
            <Title className="text-xl">{item.name}</Title>
            <p className="text-sm font-extralight text-muted-foreground">
              {item.abstract_description}
            </p>
          </div>

          <ItemDiscount item={item} />
        </div>
        <div className="px-5 flex flex-col items-center gap-5">
          {item.stock === 0 ? (
            <div className="bg-destructive shadow p-2 py-5 rounded-md border text-destructive-foreground flex  items-center gap-2">
              <Icon icon="mdi:alert-circle" width="30" height="30" />
              <p className="text-xs font-light">
                Cet article est en rupture de stock et n'est disponible qu'en
                précommande
              </p>
            </div>
          ) : null}
          <BtnBuyingAction item={item} />
          <BtnItemSizeGuide />
        </div>

        <div className="flex flex-col w-full border-t divide-y divide-dashed">
          <BoxCascade title="Détails">
            {item.metadata.details ? (
              <>
                {item.metadata.details?.title}
                <ul className="list-disc list-inside">
                  {item.metadata.details?.content.map((item, i) => (
                    <li key={`detail-metadata--${i}`}>{item}</li>
                  ))}
                </ul>
              </>
            ) : (
              <span>Aucun détail </span>
            )}
          </BoxCascade>

          <BoxCascade title="Coupe">
            <DetailsSize item={item} />
          </BoxCascade>

          <BoxCascade title="Compo & Care">
            <DetailsCompoAndCare item={item} />
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
