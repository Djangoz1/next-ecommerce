"use client";
import React from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
export const Header = () => {
  return (
    <header className="flex items-center  justify-between xl:px-10 px-5 py-5 bg-background w-full    fixed top-0 left-0 right-0 z-50 font-info">
      <div className="flex items-center gap-2 xl:opacity-100 opacity-0 absolute xl:relative">
        <Icon
          icon="line-md:plus"
          className="text-foreground"
          width={"20"}
          height={"20"}
        />
        Nous contacter
      </div>

      <h1 className="title text-4xl uppercase tracking-[0.2em]">Ormés</h1>

      <div className="flex gap-5">
        <Link href={"/store"}>
          <Icon icon="ant-design:shopping-twotone" width="30" height="30" />
        </Link>
        <button>
          <Icon icon="ic:twotone-dark-mode" width="30" height="30" />
        </button>
        <button>
          <Icon
            icon="line-md:menu-fold-left"
            className="text-foreground"
            width={"30"}
            height={"30"}
          />
        </button>
      </div>
    </header>
  );
};
