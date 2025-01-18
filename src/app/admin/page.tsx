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

import { Item } from "../shop/women/page";

const PageAdmin = () => {
  const itemId = Number(useSearchParams().get("item_id"));
  const create = useSearchParams().get("create");
  return (
    <FormProvider
      onSubmit={async (e: any) => {
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
  const { data, ...rest } = useApi({
    path: "/items",
    method: "GET",
  }) as { data: Item[] | undefined; isLoading: boolean; error: any };

  console.log({ data, rest });

  if (!data) return null;
  return (
    <>
      <div
        key={`form-${isActive}`}
        className="flex flex-wrap w-full  border-y p-20 gap-4"
      >
        {data?.map((item, i) => (
          <Link
            href={isActive === item.id ? `/admin` : `/admin?item_id=${item.id}`}
            key={`item-${i}`}
            className="w-[100px]"
          >
            <Image
              src={item.main_image}
              alt={`image ${item.name}`}
              width={800}
              height={800}
              className={cn(
                "w-full shadow-2xl rounded",
                isActive === item.id ? "opacity-100" : "opacity-50"
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
          <div className="w-full items-center flex-col flex gap-5 justify-center h-full py-40">
            <Title>Aucun produit sélectionné</Title>
            <Btn href={`/admin?create=true`}>Créer un produit</Btn>
          </div>
        )}
      </div>
    </>
  );
};

export default PageAdmin;
