import { CONTACT } from "@/constants/inc";
import { cn } from "@/utils/cn";
import Link from "next/link";
import React from "react";
import { LayoutClientFaq } from "./___layoutClient";

const LayoutFaq = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={cn(" flex flex-col w-full")}>
      <div className="border-y">
        <LayoutClientFaq />
        {children}
      </div>
      <div className="flex flex-col w-full items-center justify-center py-10 bg-muted">
        <p className=" font-medium">Vous avez d'autres questions ?</p>
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
