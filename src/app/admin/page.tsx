"use client";
import { AdminItem } from "@/components/features/admin-item";

import { Btn } from "@/components/ui/btn";
import { Title } from "@/components/ui/typography/title";
import { FormProvider } from "@/context/form";
import { useApi } from "@/hooks/useApi";
import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { Item } from "../shop/women/page";
import { useQueryClient } from "@tanstack/react-query";
import { Suspense } from "react";

const PageAdmin = () => {
  const itemId = Number(useSearchParams().get("item_id"));
  const create = useSearchParams().get("create");

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

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/items${
            create ? "" : `/${itemId}`
          }`,
          {
            method: create ? "POST" : "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(params),
          }
        );

        const data = await res.json();
        console.log({ res, data });
      }}
      className="w-screen py-40"
    >
      <Page />
    </FormProvider>
  );
};

const Page = () => {
  const isActive = Number(useSearchParams().get("item_id"));
  const isCreate = useSearchParams().get("create");
  const { data } = useApi({
    path: "/items",
    method: "GET",
  }) as { data: Item[] | undefined };
  const router = useRouter();
  const client = useQueryClient();

  if (!data) return null;
  return (
    <>
      <div
        key={`form-${isActive}`}
        className="flex xl:flex-wrap overflow-x-auto  overflow-y-hidden w-full  border-y xl:px-20 xl:gap-4"
      >
        {data?.map((item, i) => (
          <Link
            href={isActive === item.id ? `/admin` : `/admin?item_id=${item.id}`}
            key={`item-${i}`}
            className="xl:h-[300px] h-[150px] w-fit"
          >
            <Image
              src={item.main_image}
              alt={`image ${item.name}`}
              width={800}
              height={800}
              className={cn(
                "h-full xl:max-w-[300px] max-w-[150px] object-cover shadow-2xl rounded",
                isActive === item.id
                  ? "opacity-100"
                  : "opacity-50 hover:opacity-80"
              )}
            />
          </Link>
        ))}
      </div>
      <div className="flex flex-col gap-10">
        {isActive ? (
          <AdminItem isActive={isActive.toString()} />
        ) : isCreate ? (
          <AdminItem isActive={"new"} />
        ) : (
          <div className="w-full items-center flex-col flex gap-5 justify-center h-full py-40 text-center">
            <Title>Aucun produit sélectionné</Title>
            <div className="flex gap-3">
              <Btn variant="primary" href={`/admin?create=true`}>
                Créer un produit
              </Btn>
              <Btn href={`/admin/order`}>Voir les commandes</Btn>
            </div>
          </div>
        )}
        {isActive || isCreate ? (
          <div className="fixed bottom-10 right-10 flex gap-5  justify-end">
            {!isCreate ? (
              <Btn
                onClick={async () => {
                  const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/items/${isActive}`,
                    {
                      method: "DELETE",
                    }
                  );
                  console.log({ res });

                  await client.invalidateQueries({
                    queryKey: ["api", `/items/${isActive}`],
                  });
                  await client.invalidateQueries({
                    queryKey: ["api", `/items`],
                  });
                  router.push("/admin");
                }}
                variant="default"
              >
                Supprimer
              </Btn>
            ) : null}
            <Btn type="submit" variant="primary">
              Enregistrer
            </Btn>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

const PageAdminWrapper = () => (
  <Suspense fallback={<div>Loading ...</div>}>
    <PageAdmin />
  </Suspense>
);

export default PageAdminWrapper;
