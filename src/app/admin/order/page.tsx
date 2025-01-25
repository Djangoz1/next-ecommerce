"use client";
import { OrderDetails } from "@/components/features/order-details";
import { SelectBtn } from "@/components/form/select-btn";
import { Loader } from "@/components/ui/box/loader";
import { Btn } from "@/components/ui/btn";
import { FormProvider } from "@/context/form";
import { useApi } from "@/hooks/useApi";
import { BuyingApi } from "@/types/items";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

const Page = () => {
  const status = useSearchParams().get("status");

  const { data, isFetched } = useApi<BuyingApi[]>({
    path: `/buy/order`,
    method: "GET",
    queryKey: status || undefined,
    params: status ? { status } : undefined,
  });
  console.log({ data, status });

  return (
    <div className="py-20 flex flex-col gap-5 min-h-screen">
      <div className="flex w-full border-y">
        <Btn
          href={"/admin"}
          className="opacity-50 w-full hover:opacity-100 py-2 text-xs rounded-none justify-center"
          variant="ghost"
        >
          Articles
        </Btn>
        <Btn
          href={"/admin/order"}
          className="text-xs py-2 rounded-none w-full justify-center"
          variant="primary"
        >
          Commandes
        </Btn>
      </div>
      <FormProvider className="px-3 flex flex-col gap-5" onSubmit={() => {}}>
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
