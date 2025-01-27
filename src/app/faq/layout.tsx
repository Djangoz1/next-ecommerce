"use client";
import { Btn } from "@/components/ui/btn";
import { CONTACT } from "@/constants/inc";
import { cn } from "@/utils/cn";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const LayoutFaq = ({ children }: { children: React.ReactNode }) => {
  const isHome = usePathname() === "/faq";
  return (
    <div
      className={cn("py-20 gap-10 flex flex-col w-full", isHome ? "pt-0" : "")}
    >
      {!isHome ? (
        <Btn variant="default" href={"/faq"} className="w-fit ml-auto mr-5">
          <Icon icon="mdi:arrow-left" className="w-4 h-4" />
          Retour
        </Btn>
      ) : null}

      {children}
      <div className="flex flex-col w-full items-center justify-center">
        <p className="font-light">Vous avez d'autres questions ?</p>
        <Link
          className="text-blue-500 underline"
          href={`mailto:${CONTACT.email_customer_service}`}
        >
          {CONTACT.email_customer_service}
        </Link>
      </div>
    </div>
  );
};

export default LayoutFaq;
