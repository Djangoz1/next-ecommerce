"use client";
import { useApi } from "@/hooks/useApi";
import { Item } from "@/types/items";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Title } from "../ui/typography/title";
import Link from "next/link";
import { Btn } from "../ui/btn";

import { handleCheckout } from "@/services/stripe-js";
import { useRouter } from "next/navigation";

export const BtnBagAction = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: pendingItems } = useQuery({
    queryKey: ["pending-items"],
    queryFn: () => JSON.parse(localStorage.getItem("pending-items") || "[]"),
  });

  const handleClick = () => setIsOpen(true);
  return (
    <>
      <button onClick={handleClick} className="relative">
        <Icon icon="tdesign:shop-filled" width="30" height="30" />
        {pendingItems?.length ? (
          <span className="text-white absolute bottom-0 font-bold left-1/2 text-[10px] w-fit z-2 -translate-x-1/2 -translate-y-1/3">
            {pendingItems?.length}
          </span>
        ) : null}
      </button>
      <AnimatePresence>
        {isOpen ? (
          <Div setIsOpen={setIsOpen} pendingItems={pendingItems} />
        ) : null}
      </AnimatePresence>
    </>
  );
};

const Div = ({
  setIsOpen,
  pendingItems,
}: {
  setIsOpen: (isOpen: boolean) => void;
  pendingItems: { id: string; size: string }[];
}) => {
  const [filteredArr, setFilteredArr] = useState<
    { id: string; size: string }[][]
  >([]);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    setFilteredArr(
      Object.values(
        ((pendingItems as { id: string; size: string }[]) || []).reduce(
          (acc, item) => {
            const key = `${item.id}-${item.size}`;
            if (!acc[key]) {
              acc[key] = [];
            }
            acc[key].push(item);

            return acc;
          },
          {} as Record<string, { id: string; size: string }[]>
        )
      )
    );
  }, [pendingItems]);

  const router = useRouter();
  return (
    <>
      <motion.div
        initial={{
          x: 1000,
        }}
        animate={{
          x: 0,
        }}
        exit={{
          x: 1000,
        }}
        transition={{
          duration: 0.7,
        }}
        className="bg-[#FBF6F3] fixed divide-y uppercase top-0 left-0 right-0 bottom-0  flex flex-col"
      >
        <div className="flex items-center justify-between p-3 w-full">
          <Link href="/">
            <Title>Ormés</Title>
          </Link>
          <Btn variant="ghost" onClick={() => setIsOpen(false)}>
            <Icon icon="mdi:close" />
          </Btn>
        </div>

        <p className="underline uppercase font-medium p-3 text-sm">
          Panier ({pendingItems?.length})
        </p>
        <>
          {pendingItems?.length ? (
            <>
              <div className="flex items-center w-full py-5">
                <p className="text-center pb-1 border-b-2 mx-auto font-light w-fit border-black ">
                  Réservez vos articles
                </p>
              </div>
              <div className="  w-full z-[100] text-center flex flex-col divide-y relative overflow-y-scroll ">
                {filteredArr?.map((arr, i) => (
                  <Element setTotal={setTotal} arr={arr} key={`item-${i}`} />
                ))}
              </div>

              <div className="flex flex-col w-full px-3 py-10">
                <Title className="uppercase">Vous aimerez aussi</Title>
              </div>

              <div className=" fixed bottom-0 left-0 h-[200px] w-full bg-[#FBF6F3] flex flex-col p-3 gap-4">
                <div className="flex justify-between items-center uppercase text-xs">
                  <p className="font-medium">Total</p>
                  <p className="font-bold">{total}€</p>
                </div>
                <Btn
                  variant={"primary"}
                  onClick={async () => {
                    const stripe_id = await handleCheckout(pendingItems);

                    router.push(`/checkout?id=${stripe_id}`);
                    setIsOpen(false);
                    return;
                  }}
                  className="w-full text-center justify-center"
                >
                  Commander
                </Btn>
              </div>
            </>
          ) : (
            <div className="flex flex-col p-10 h-full justify-center gap-10 w-full my-auto">
              <Title className="text-4xl font-light text-center">
                Votre
                <br />
                panier
                <br /> est
                <br />
                vide.
              </Title>
              <Btn
                onClick={() => setIsOpen(false)}
                href={"/shop/women"}
                variant="primary"
                className="w-full text-center justify-center text-xs"
              >
                Découvrir notre collection
              </Btn>
            </div>
          )}
        </>
      </motion.div>
    </>
  );
};

const Element = ({
  arr,
  setTotal,
}: {
  arr: { id: string; size: string }[];
  setTotal: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const index = 0;
  const { data: item } = useApi({
    path: `/items/${arr[index].id}`,
    method: "GET",
    enabled: !!arr[index].id,
  }) as { data: Item };
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!item) return;
    setTotal((prev: number) =>
      Number(
        (
          prev +
          (Number(item.price) - Number(item.price) / item.discount) * arr.length
        ).toFixed(2)
      )
    );
  }, [item]);
  if (!item) return null;
  return (
    <div className="flex gap-5 px-3 py-10  ">
      <Image
        className="w-[80px]"
        width={800}
        height={800}
        src={item.main_image}
        alt={item.name}
      />

      <div className="flex flex-col gap-1 text-xs items-start">
        <h6 className="text-xs font-bold">{item.name}</h6>
        <p className="text-[10px]">
          Taille: <b>{arr[index].size}</b>
        </p>
        <div className="flex mt-auto items-center">
          <div className="flex border rounded-md  h-fit">
            <Btn
              onClick={() => {
                const currentItem = JSON.parse(
                  localStorage.getItem("pending-items") || "[]"
                );

                const indexToRemove = currentItem.findIndex(
                  (item: { id: string; size: string }) =>
                    item.id === arr[index].id && item.size === arr[index].size
                );

                if (indexToRemove !== -1) {
                  currentItem.splice(indexToRemove, 1);
                }
                localStorage.setItem(
                  "pending-items",
                  JSON.stringify(currentItem)
                );

                queryClient.invalidateQueries({
                  queryKey: ["pending-items"],
                });
              }}
              className="text-xs py-2 h-fit px-2"
              variant="ghost"
            >
              -
            </Btn>
            <div className="py-2 flex items-center w-12 justify-center border-x ">
              <span>{arr.length}</span>
            </div>
            <Btn
              onClick={() => {
                const currentItem = JSON.parse(
                  localStorage.getItem("pending-items") || "[]"
                );
                currentItem.push({ id: item.id, size: arr[index].size });
                localStorage.setItem(
                  "pending-items",
                  JSON.stringify(currentItem)
                );
                queryClient.invalidateQueries({
                  queryKey: ["pending-items"],
                });
              }}
              variant="ghost"
              className="text-xs py-2 h-fit px-2"
            >
              +
            </Btn>
          </div>
          <Btn
            onClick={() => {
              const currentItem = JSON.parse(
                localStorage.getItem("pending-items") || "[]"
              );
              currentItem.filter(
                (item: { id: string; size: string }) =>
                  item.id !== arr[index].id && item.size !== arr[index].size
              );
              localStorage.setItem(
                "pending-items",
                JSON.stringify(currentItem)
              );
              queryClient.invalidateQueries({
                queryKey: ["pending-items"],
              });
            }}
            variant="ghost"
            className="text-[10px] h-fit py-0"
          >
            Supprimer
          </Btn>
        </div>
      </div>

      <p className="flex gap-2 text-xs ml-auto ">
        {item.discount ? (
          <>
            <span className="line-through opacity-75">
              {Number(item.price) * arr.length}€
            </span>
            <span>
              {(
                (Number(item.price) - Number(item.price) / item.discount) *
                arr.length
              ).toFixed(2)}
              €
            </span>
          </>
        ) : null}
      </p>
    </div>
  );
};
