"use client";

import { OrderDetails } from "@/components/features/order-details";
import { BoxEmpty } from "@/components/ui/box/box-empty";
import { Loader } from "@/components/ui/box/loader";
import { Btn } from "@/components/ui/btn";

import { useSession } from "@/context/app";
import { useGetOrders } from "@/hooks/orders/use-get-orders";

import React from "react";

const PageAccountOrders = () => {
  const { user } = useSession();

  const { data, ...rest } = useGetOrders({
    enabled: !!user?.id,
    params: {
      user_id: user?.id as string,
    },
  });
  console.log({ data, user, rest });

  return (
    <>
      {rest.isFetched ? (
        <div className="flex flex-col divide-y divide-dashed w-full">
          {data?.map?.length ? (
            <div className="flex flex-col divide-y divide-dashed">
              {data.map((el, i) => (
                <OrderDetails key={`order-${i}`} data={el} />
              ))}
            </div>
          ) : (
            <BoxEmpty text="Aucune commande trouvée">
              <Btn variant="primary" className="" size="xs" href="/shop/women">
                Retour à la boutique
              </Btn>
            </BoxEmpty>
          )}
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default PageAccountOrders;
