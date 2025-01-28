"use client";
import { OrderDetails } from "@/components/features/order-details";
import { SelectBtn } from "@/components/form/select-btn";
import { Loader } from "@/components/ui/box/loader";

import { FormProvider } from "@/context/form";
import { useGetOrders } from "@/hooks/orders/use-get-orders";

import { Buying } from "@/types/items";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

const Page = () => {
  const status = useSearchParams().get("status") as Buying["status"];

  const { data, isFetched } = useGetOrders({
    params: { status },
  });

  console.log({ data });
  return (
    <div className="flex flex-col gap-5 ">
      <FormProvider className=" flex justify-center" onSubmit={() => {}}>
        <SelectBtn
          onUrl
          defaultValue={
            status ? `/admin/order?status=${status}` : `/admin/order`
          }
          arr={[
            {
              label: "Tous",
              value: "/admin/order",
            },
            {
              label: "En production",
              value: "/admin/order?status=paid",
            },
            {
              label: "En livraison",
              value: "/admin/order?status=shipped",
            },
            {
              label: "Livré",
              value: "/admin/order?status=delivered",
            },
          ]}
          id="status"
        />
      </FormProvider>
      {data?.length ? (
        <div className="flex flex-col divide-y border-y">
          {data.map((el, i) => (
            <OrderDetails data={el} key={`order-${i}`} />
          ))}
        </div>
      ) : !isFetched ? (
        <Loader />
      ) : (
        <div className="w-full h-full py-20 flex justify-center items-center">
          <span>Pas de commandes trouvées</span>
        </div>
      )}
    </div>
  );
};

const PageOrder = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Page />
  </Suspense>
);

export default PageOrder;
