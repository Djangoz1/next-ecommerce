"use client";
import { Buying, Item } from "@/types/items";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { ReactNode, useState } from "react";
import { Title } from "../ui/typography/title";
import { cn } from "@/utils/cn";
import { Btn } from "../ui/btn";
import Image from "next/image";
import { Badge } from "../ui/btn/badge";
import { Tabs } from "../ui/box/tabs";
import { FormProvider } from "@/context/form";
import { Input } from "../form/input";
import { useAsyncApi } from "@/hooks/useAsyncApi";
import { useSession } from "@/context/app";

export const OrderDetails = ({
  data,
}: {
  data: {
    items: (Buying & { items: Item & { quantity: number } })[];
    stripe_id: string;
    price: number;
  };
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync } = useAsyncApi({
    path: `/buy`,
    method: "PUT",
    invalidateQueries: [["orders"]],
  });

  const { user } = useSession();

  return (
    <div
      className={cn(
        "flex flex-col w-full",
        isOpen ? "bg-white" : "bg-transparent"
      )}
    >
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex gap-10 px-3 py-5  items-center"
      >
        <div className="flex flex-col w-fit ">
          <div className="flex items-center gap-3">
            <div className="text-lg font-bold">Commande n°{data.stripe_id}</div>
            <div className="px-3 py-px text-xs rounded-full bg-black uppercase text-white">
              {data.items[0].status}
            </div>
          </div>
          <div className="text-sm text-gray-500">
            {user?.user_metadata?.name}
            <p className="font-light text-xs">
              Nombre d'articles : {data.items.length}
            </p>
          </div>

          {isOpen ? (
            <div className="mt-5" onClick={(e) => e.stopPropagation()}>
              <Tabs
                arr={[
                  {
                    component: (
                      <FormProvider
                        className="flex flex-col gap-5"
                        onSubmit={async (e) => {
                          await mutateAsync({
                            params: {
                              tracking: e.tracking,
                              stripe_id: data.stripe_id,
                            },
                            toast: {
                              title: "Suivi ajouté",
                              description: "Votre client sera notifié par mail",
                            },
                          });
                        }}
                      >
                        {data.items[0].tracking ? (
                          <div className="flex flex-col gap-1">
                            <p className="text-sm">Numéro de suivi </p>
                            <p className="text-sm font-light">
                              {data.items[0].tracking}
                            </p>
                          </div>
                        ) : (
                          <>
                            <Input
                              required
                              title="Numéro de suivi"
                              placeholder="0E-123456"
                              id="tracking"
                              variant="secondary"
                            />
                            <Btn size="xs" type="submit" variant="primary">
                              Expédier
                            </Btn>
                          </>
                        )}
                      </FormProvider>
                    ),
                    title: "Production",
                  },
                  {
                    component: (
                      <div>
                        <span>Status</span>
                      </div>
                    ),
                    title: "Livraison",
                  },
                  {
                    component: (
                      <div>
                        <span>Status</span>
                      </div>
                    ),
                    title: "Réception",
                  },
                ]}
              ></Tabs>
            </div>
          ) : null}
        </div>
        <Btn
          className="ml-auto px-1 py-1  "
          variant="ghost"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Icon
            icon="line-md:chevron-down"
            className={cn("text-sm", isOpen ? "rotate-180" : "")}
          />
        </Btn>
      </div>
      {isOpen ? (
        <div className="flex flex-col   py-5">
          <div className="flex flex-col gap-5 border-y pt-5">
            <Title className="text-sm px-5">Détails de la commande</Title>

            <div className="flex flex-col  divide-y border-y">
              {data.items.map((item, i) => (
                <div
                  key={`order-item-${item.id}-${i}`}
                  className={cn(
                    "flex p-5  gap-5",
                    i % 2 === 0 ? "bg-gray-100" : "bg-gray-300"
                  )}
                >
                  <Image
                    src={item.items.main_image}
                    alt={item.items.name}
                    width={100}
                    height={100}
                    className="w-28"
                  />

                  <div className="flex flex-col justify-between w-full ">
                    <div className="flex flex-col w-full">
                      <div className="flex gap-2 items-center w-full justify-between">
                        <Title className="text-lg">{item.items.name}</Title>
                        <Badge>
                          {
                            {
                              dress: "Vêtements",
                              painting: "Peintures",
                              miniature: "Miniatures",
                            }[item.items.type]
                          }
                        </Badge>
                      </div>
                      <p className="font-light text-xs">
                        {item.items.abstract_description}
                      </p>
                    </div>
                    <div className="flex flex-col  mt-auto">
                      <p className="text-xs">Taille : {item.size}</p>
                      <div className="flex gap-10 items-end justify-between w-full">
                        <p className="text-xs">
                          €{Number(item.items.price) * item.items.quantity}
                        </p>
                        <p className="font-bold">x{item.items.quantity}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5 w-full my-5 p-5">
            <BoxData icon="line-md:account" title="Client">
              {user?.user_metadata?.name}
            </BoxData>
            <BoxData icon="line-md:email-filled" title="Email">
              {user?.user_metadata?.email}
            </BoxData>
            <BoxData icon="line-md:phone-filled" title="Téléphone">
              {user?.user_metadata?.phone}
            </BoxData>
            <BoxData icon="solar:euro-broken" title="Montant total">
              {data.price} €
            </BoxData>
          </div>
          <div className="flex flex-col p-5">
            <Title className="text-sm">Address</Title>

            <p className="opacity-50 font-light">
              {user?.user_metadata?.address}
              <br />
              {user?.user_metadata?.city}
              <br />
              {user?.user_metadata?.zipcode}
              <br />
            </p>
          </div>
          <span className="opacity-50 hover:opacity-100 hover:underline text-xs font-extralight px-5">
            # {data.stripe_id}
          </span>
        </div>
      ) : null}
    </div>
  );
};

const BoxData = ({
  icon,
  title,
  children,
  className = "",
}: {
  icon: string;
  title: string;
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex items-end gap-5", className)}>
      <div className="w-fit">
        <Icon icon={icon} className="text-xl" />
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-bold">{title}</p>
        <p className="text-sm">{children}</p>
      </div>
    </div>
  );
};
