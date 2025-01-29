import { cn } from "@/utils/cn";
import Link from "next/link";
import React from "react";

export const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <Link
      href={"/"}
      className={cn(
        "text-2xl uppercase tracking-[0.2em] title font-light",
        className
      )}
    >
      Ormés
    </Link>
  );
};
