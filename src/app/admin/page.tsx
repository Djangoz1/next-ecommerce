"use client";
import { AdminItem } from "@/components/features/admin-item";
import { Title } from "@/components/ui/typography/title";

import { cn } from "@/utils/cn";
import Image from "next/image";

import { Suspense } from "react";
import { Badge } from "@/components/ui/btn/badge";

import { BoxError } from "@/components/ui/box/box-error";
import { Loader } from "@/components/ui/box/loader";

import { useGetItems } from "@/hooks/items/use-get-items";
import { Modal } from "@/components/ui/box/modal";

const PageAdmin = () => {
  const { data, isFetched } = useGetItems({
    params: {},
  });

  return data ? (
    <div className="w-full">
      <div key={`form`} className="flex flex-col divide-y border-y">
        <div className="w-full items-center flex gap-5  p-5 bg-black/5 justify-between border-y border-black">
          <Title className="text-lg"> Sélectionner un produit</Title>
          <Modal
            btnProps={{
              variant: "primary",
              children: "Créer un produit",
              size: "xs",
            }}
          >
            <AdminItem isActive={"new"} />
          </Modal>
        </div>
        {data?.map((item, i) => (
          <Modal
            key={`item-${i}`}
            btnProps={{
              variant: "primitive",
              href: `/admin?item_id=${item.id}`,
              children: (
                <>
                  <div className="w-full flex gap-5  p-5 hover:bg-black/5">
                    <Image
                      src={item.main_image}
                      alt={`image ${item.name}`}
                      width={800}
                      height={800}
                      className={cn("w-[70px] object-cover shadow-2xl rounded")}
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
                  </div>
                </>
              ),
            }}
          >
            <AdminItem isActive={item.id.toString()} />
          </Modal>
        ))}
      </div>
    </div>
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
