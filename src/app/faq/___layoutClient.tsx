"use client";
import { Btn } from "@/components/ui/btn";
import { Icon } from "@iconify/react/dist/iconify.js";
import { usePathname } from "next/navigation";
import React from "react";

export const LayoutClientFaq = () => {
  const isHome = usePathname() === "/faq";
  return (
    <>
      {!isHome ? (
        <div className="w-full  p-5 pt-20 pb-10 flex justify-end border-b mb-10">
          <Btn variant="default" href={"/faq"} size="sm">
            <Icon icon="mdi:arrow-left" className="w-4 h-4" />
            Retour
          </Btn>
        </div>
      ) : null}
    </>
  );
};
