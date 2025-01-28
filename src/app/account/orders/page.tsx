"use client";

import { OrderDetails } from "@/components/features/order-details";
import { BtnMenu } from "@/components/ui/btn/btn-menu";
import { useSession } from "@/context/app";
import { useGetOrders } from "@/hooks/orders/use-get-orders";
import { useApi } from "@/hooks/useApi";
import { BuyingApi } from "@/types/items";
import React from "react";

const PageAccountOrders = () => {
  const { user } = useSession();

  const { data } = useGetOrders({
    enabled: !!user?.id,
    params: {
      user_id: user?.id as string,
    },
  });
  console.log({ data, user });

  return (
    <div className="w-full relative min-h-screen flex xl:flex-row flex-col xl:justify-between py-20 ">
      <BtnMenu
        arr={[
          { label: "Mon profil", value: "/account" },
          { label: "Mes commandes", value: "/account/orders" },
          { label: "Mes adresses", value: "/account/addresses" },
          { label: "Déconnexion", value: "/account/logout" },
        ]}
      />
      {data?.map?.length ? (
        <div className="flex flex-col gap-5">
          {data.map((el, i) => (
            <OrderDetails key={`order-${i}`} data={el} />
          ))}
        </div>
      ) : (
        <div>Aucune commande</div>
      )}
    </div>
  );
};

export default PageAccountOrders;
