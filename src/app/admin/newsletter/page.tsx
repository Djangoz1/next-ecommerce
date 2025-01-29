"use client";
import { BoxError } from "@/components/ui/box/box-error";
import { Loader } from "@/components/ui/box/loader";
import { Btn } from "@/components/ui/btn";

import { useAsyncApi } from "@/hooks/useAsyncApi";
import { Newsletter } from "@/types/items";
import { clientDb } from "@/utils/client-db";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useQuery } from "@tanstack/react-query";

import React from "react";

const PageNewsletter = () => {
  const { data, isFetched } = useQuery({
    queryKey: ["newsletters"],
    queryFn: async () => {
      const { data, error } = await clientDb.from("newsletter").select("*");
      if (error) throw new Error(error.message);
      return data as Newsletter[];
    },
  });

  const { mutateAsync } = useAsyncApi({
    invalidateQueries: [["api", "/newsletter"]],
  });

  return data ? (
    <div className="flex flex-col divide-y">
      <div className="uppercase font-medium p-5 flex justify-end">
        Total : {data.length}
      </div>
      {data.map((el, i) => (
        <div
          className="p-5 flex gap-2 justify-between items-center"
          key={`newsletter-${i}`}
        >
          <div className="flex flex-col">
            <div className="flex gap-2 items-center">
              <Icon icon="mdi:email" className="text-2xl" />
              <span className="text-gray-500">Email</span>
            </div>
            <span>{el.email}</span>
            {/* format created_at */}
            <div className="text-xs font-extralight text-gray-500  mt-2">
              {new Date(el.created_at).toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </div>
          </div>
          <div className="flex gap-5">
            <Btn
              onClick={async () => {
                await mutateAsync({
                  path: `/newsletter/${el.id}`,
                  method: "DELETE",
                  params: {},
                  toast: {
                    title: "Client supprimé à la newsletter",
                    description: "Votre client sera notifié de sa suppression",
                  },
                });
              }}
              className="border-red-500 border text-red-500"
              size="sm"
            >
              <Icon icon="mdi:delete" className="text-sm" />
              <span className="hidden xl:block">Supprimer</span>
            </Btn>
            <Btn href={`mailto:${el.email}`} variant="primary" size="sm">
              <Icon icon="mdi:email" className="text-sm" />
              <span className="hidden xl:block">Contacter</span>
            </Btn>
          </div>
        </div>
      ))}
    </div>
  ) : isFetched ? (
    <BoxError />
  ) : (
    <Loader />
  );
};

export default PageNewsletter;
