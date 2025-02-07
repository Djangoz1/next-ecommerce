"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Title } from "../ui/typography/title";
import { Btn } from "../ui/btn";
import { handleCheckout } from "@/services/stripe-js";

import { Modal, useModal } from "../ui/box/modal";
import { useSession } from "@/context/app";
import { ViewOrderItem } from "./items/view-order-item";
import { PendingItem, usePendingItems } from "@/hooks/items/use-pending-items";
import { Item } from "@/types/items";

export const BtnBagAction = () => {
  const { data: pendingItems } = usePendingItems();

  return (
    <>
      <Modal
        btnProps={{
          children: (
            <>
              <Icon icon="tdesign:shop-filled" className="text-xl" />
              {pendingItems?.length ? (
                <span className="text-white absolute bottom-0 font-bold left-1/2 text-[10px] w-fit z-2 -translate-x-1/2 -translate-y-1/3">
                  {pendingItems?.length}
                </span>
              ) : null}
            </>
          ),
          variant: "ghost",
          size: "sm",
          className: "relative py-0 px-0 w-fit h-fit ",
        }}
        className="py-0"
      >
        <>
          <Div pendingItems={pendingItems} />
        </>
      </Modal>
    </>
  );
};

const Div = ({ pendingItems }: { pendingItems: PendingItem | undefined }) => {
  const { setIsOpen } = useModal();

  const [total, setTotal] = useState(0);

  const { user } = useSession();

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex flex-col divide-y h-full"
    >
      <p className="underline uppercase font-medium p-3 text-xs bg-secondary">
        Panier ({pendingItems?.length})
      </p>
      <>
        {pendingItems?.length ? (
          <>
            <div className="flex items-center w-full py-5">
              <p className="text-center text-sm pb-1 border-b-2 mx-auto font-light w-fit border-black uppercase">
                Réservez vos articles
              </p>
            </div>
            <div className="  w-full z-[100] text-center flex flex-col divide-y relative overflow-y-scroll ">
              {pendingItems?.map((el, i) => (
                <Element setTotal={setTotal} item={el} key={`item-${i}`} />
              ))}
            </div>

            <div className="flex flex-col w-full px-3 py-10 items-center">
              <Title className="uppercase xl:text-4xl text-xl">
                Vous aimerez aussi
              </Title>
            </div>

            <div className=" pb-20 pt-5 mt-auto w-full bg-secondary flex flex-col p-3 gap-4">
              {user ? (
                <>
                  <div className="flex justify-between items-center uppercase text-xs">
                    <p className="font-medium">Total</p>
                    <p className="font-bold">{total}€</p>
                  </div>
                  <Btn
                    variant={"primary"}
                    href="/checkout"
                    onClick={async () => {
                      // const stripe_id = await handleCheckout(pendingItems);

                      // router.push(`/checkout`);
                      setIsOpen(false);
                      return;
                    }}
                    className="w-full text-center justify-center"
                  >
                    Commander
                  </Btn>
                </>
              ) : (
                <>
                  <p className="font-light text-xs">
                    Vous devez vous connecter pour commander
                  </p>
                  <Btn
                    onClick={() => setIsOpen(false)}
                    href="/auth/sign-in"
                    variant="primary"
                    className="w-full"
                  >
                    Se connecter
                  </Btn>
                </>
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-col p-10 h-full  gap-10 w-full ">
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
              href={"/shop/dress"}
              variant="primary"
              className="w-full text-center justify-center text-xs"
            >
              Découvrir notre collection
            </Btn>
          </div>
        )}
      </>
    </div>
  );
};

const Element = ({
  item,
  setTotal,
}: {
  item: Item & { size: string; quantity: number };
  setTotal: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const index = 0;

  const queryClient = useQueryClient();

  useEffect(() => {
    if (!item) return;
    setTotal((prev: number) =>
      Number(
        (
          prev +
          (Number(item.price) - Number(item.price) / item.discount) *
            item.quantity
        ).toFixed(2)
      )
    );
  }, [item]);
  if (!item) return null;
  return (
    <div className="flex flex-col pb-5 px-5 text-left ">
      <ViewOrderItem item={{ ...item }} />
      <div className="flex mt-auto items-center  justify-end w-full">
        <div className="flex border rounded-md  h-8 items-center">
          <Btn
            onClick={() => {
              const currentItem = JSON.parse(
                localStorage.getItem("pending-items") || "[]"
              );

              const indexToRemove = currentItem.findIndex(
                (el: { id: number; size: string }) =>
                  item.id === el.id && item.size === el.size
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
            className="text-xs  h-full py-0"
            size="xs"
            variant="ghost"
          >
            -
          </Btn>
          <div className=" flex items-center w-12 justify-center border-x text-xs">
            <span>{item.quantity}</span>
          </div>
          <Btn
            size="xs"
            onClick={() => {
              const currentItem = JSON.parse(
                localStorage.getItem("pending-items") || "[]"
              );
              currentItem.push({ id: item.id, size: item.size });
              localStorage.setItem(
                "pending-items",
                JSON.stringify(currentItem)
              );
              queryClient.invalidateQueries({
                queryKey: ["pending-items"],
              });
            }}
            variant="ghost"
            className="text-xs  h-full py-0"
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
              (el: { id: number; size: string }) =>
                item.id !== el.id && item.size !== el.size
            );
            localStorage.setItem("pending-items", JSON.stringify(currentItem));
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
  );
};
