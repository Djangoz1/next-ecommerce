"use client";
import { AdminItem } from "@/components/features/admin-item";

import { Btn } from "@/components/ui/btn";
import { Title } from "@/components/ui/typography/title";
import { FormProvider } from "@/context/form";
import { useApi } from "@/hooks/useApi";
import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Suspense } from "react";
import { Badge } from "@/components/ui/btn/badge";
import { AnimatePresence } from "framer-motion";
import { BoxError } from "@/components/ui/box/box-error";
import { Loader } from "@/components/ui/box/loader";
import { useAsyncApi } from "@/hooks/useAsyncApi";
import { Item } from "@/types/items";
import { useGetItems } from "@/hooks/items/use-get-items";

const PageAdmin = () => {
  const itemId = Number(useSearchParams().get("item_id"));
  const create = useSearchParams().get("create");

  const { mutateAsync, ...rest } = useAsyncApi({
    // path: "/items",
    // method: "POST",
  });

  console.log({ rest });

  return (
    <FormProvider
      onSubmit={async (e) => {
        console.log({ cououc: e });

        const params = {
          name: e[`name-${itemId || "new"}`],
          type: e[`type-${itemId || "new"}`],
          stock: e[`stock-${itemId || "new"}`],
          description: e[`description-${itemId || "new"}`],
          abstract_description: e[`abstract_description-${itemId || "new"}`],
          main_image: e[`main_image-${itemId || "new"}`],
          price: e[`price-${itemId || "new"}`],
          discount: e[`discount-${itemId || "new"}`],
          care: e[`care-${itemId || "new"}`],
          compo: e[`compo-${itemId || "new"}`],
          details: e[`details-${itemId || "new"}`],
          details_title: e[`details_title-${itemId || "new"}`],
          traceability: e[`traceability-${itemId || "new"}`],
          engagements: e[`engagements-${itemId || "new"}`],
          model_name: e[`model_name-${itemId || "new"}`],
          regular: e[`regular-${itemId || "new"}`],
          size: e[`size-${itemId || "new"}`],
          tall: e[`tall-${itemId || "new"}`],
          dimension: e[`dimension-${itemId || "new"}`],
          centimeters_by_size: e[`centimeters_by_size-${itemId || "new"}`],
        };
        console.log({ params });

        // const res = await fetch(
        //   `${process.env.NEXT_PUBLIC_API_URL}/items${
        //     create ? "" : `/${itemId}`
        //   }`,
        //   {
        //     method: create ? "POST" : "PUT",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(params),
        //   }
        // );

        const data = await mutateAsync({
          params,
          method: create ? "POST" : "PUT",
          path: `/items${create ? "" : `/${itemId}`}`,
        });
        console.log({ data });
      }}
      className="w-full"
    >
      <Page />
    </FormProvider>
  );
};

const Page = () => {
  const isActive = Number(useSearchParams().get("item_id"));
  const isCreate = useSearchParams().get("create");
  const { data, isFetched } = useGetItems({
    params: {},
  });

  return data ? (
    <>
      <div key={`form-${isActive}`} className="flex flex-col divide-y border-y">
        <div className="w-full items-center flex gap-5  p-5 bg-black/5 justify-between border-y border-black">
          <Title className="text-lg"> Sélectionner un produit</Title>
          <Btn size="xs" variant="primary" href={`/admin?create=true`}>
            Créer un produit
          </Btn>
        </div>
        {data?.map((item, i) => (
          <Link
            href={isActive === item.id ? `/admin` : `/admin?item_id=${item.id}`}
            key={`item-${i}`}
            className="w-full flex gap-5  p-5 hover:bg-black/5"
          >
            <Image
              src={item.main_image}
              alt={`image ${item.name}`}
              width={800}
              height={800}
              className={cn(
                "w-[70px] object-cover shadow-2xl rounded",
                isActive === item.id
                  ? "opacity-100"
                  : "opacity-50 hover:opacity-80"
              )}
            />

            <div className="flex flex-col gap-px mr-auto">
              <Title className="text-base">{item.name}</Title>
              <Title className="text-base">{item.price}€</Title>
              <p>
                <b>Stock:</b>
                {item.stock}
              </p>
            </div>
            <Badge>{item.type}</Badge>
          </Link>
        ))}
      </div>
      <div className="flex flex-col gap-10">
        <AnimatePresence>
          {isActive ? (
            <AdminItem isActive={isActive.toString()} />
          ) : isCreate ? (
            <AdminItem isActive={"new"} />
          ) : null}
        </AnimatePresence>
      </div>
    </>
  ) : isFetched ? (
    <BoxError />
  ) : (
    <Loader />
  );
};

const PageAdminWrapper = () => (
  <Suspense fallback={<div>Loading ...</div>}>
    <PageAdmin />
  </Suspense>
);

export default PageAdminWrapper;
