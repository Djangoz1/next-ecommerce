"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { Title } from "../ui/typography/title";

import { BtnBagAction } from "../features/btn-bag-action";
import { Btn } from "../ui/btn";
export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      const percent = scrollPosition / viewportHeight;

      if (percent > 0.6) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const url = usePathname();

  return (
    <>
      <motion.header
        initial={{}}
        animate={{
          color: !scrolled && url == "/" ? "white" : "black",
        }}
        transition={{
          duration: 1,
          type: "spring",
        }}
        className={cn(
          "hidden  xl:flex items-center justify-between xl:px-10 px-5 py-5  w-full   left-0 fixed top-0  z-50 font-info"
        )}
      >
        <div className=" text-sm flex items-center uppercase font-light tracking-wider gap-20 xl:opacity-100 opacity-0 ">
          <Link href={"/shop/women"} className="hover:underline">
            Boutique
          </Link>
          <Link href={"/journal"} className="hover:underline">
            Journal
          </Link>
          <Link href={"/maison-ormes"} className="hover:underline">
            Maison Ormés
          </Link>
        </div>
        <motion.h1 className="title  text-4xl uppercase tracking-[0.2em]  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Link href={"/"}>Ormés</Link>
        </motion.h1>
        <div className="flex gap-5">
          <Link href={"/store"}>
            <Icon
              icon="material-symbols-light:shopping-bag-outline"
              width="30"
              height="30"
            />
          </Link>
        </div>
      </motion.header>
      <MobileHeader scroll={scrolled} url={url} />
    </>
  );
};

const MobileHeader = ({ scroll, url }: { scroll: boolean; url: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{
          opacity: 0,
          x: "200%",
        }}
        animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? "0" : "200%" }}
        transition={{
          duration: 1,
          type: "spring",
        }}
        className={cn(
          "fixed xl:hidden  top-0 left-0 bg-background text-black right-0 bottom-0 backdrop-blur z-50  w-full h-screen flex flex-col py-20",
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        <motion.div className="flex flex-col divide-y">
          <Button
            onClick={() => setIsOpen(false)}
            arr={[
              { url: "/shop/women?t=dress", children: "Les vêtements" },
              { url: "/shop/women?t=miniature", children: "Les minitatures" },
              { url: "/shop/women?t=painting", children: "La peinture" },
            ]}
          >
            Boutique
          </Button>
          <Button onClick={() => setIsOpen(false)} url={"/journal"} arr={[]}>
            Journal
          </Button>
          <Button
            onClick={() => setIsOpen(false)}
            url={"/maison-ormes/"}
            arr={[]}
          >
            Maison Ormès
          </Button>
        </motion.div>
        <div className="flex px-3 flex-col gap-5 uppercase opacity-50 font-bold text-sm py-5 mt-20">
          {[
            { url: "/tracking/", children: "Suivre ma commande" },
            { url: "/shop/women/", children: "Faire un retour" },
            { url: "/shop/women/", children: "Contactez nous" },
            { url: "/faq/", children: "FAQ" },
          ].map((item, i) => (
            <Link
              onClick={() => setIsOpen(false)}
              className=""
              key={`button-sidebar-link-${i}`}
              href={item.url}
            >
              {item.children}
            </Link>
          ))}
        </div>

        <div className="flex py-5 justify-center gap-5 w-full border-y">
          <Icon icon={"circum:instagram"} width={20} height={20} />
          <Icon icon={"circum:facebook"} width={20} height={20} />
          <Icon icon={"ph:whatsapp-logo-thin"} width={20} height={20} />
        </div>
        <div className="mt-auto px-2 flex justify-between">
          <Btn
            onClick={() => setIsOpen(false)}
            variant="link"
            href="/account"
            size="sm"
          >
            Mon compte
          </Btn>
        </div>
      </motion.div>
      <motion.header
        initial={{
          position: "fixed",
          top: "0",
          left: 0,
        }}
        animate={{
          position: "fixed",
          top: "0",
          left: 0,
          color: !scroll && !isOpen && url == "/" ? "white" : "black",
        }}
        className={cn(
          "xl:hidden z-50  p-2  flex items-center w-screen  justify-between",
          isOpen ? "border-b" : ""
        )}
      >
        <div className="flex gap-10 items-center">
          <button onClick={() => setIsOpen(!isOpen)}>
            <Icon
              icon={isOpen ? "system-uicons:cross" : "line-md:menu"}
              width={"20"}
              height={"20"}
            />
          </button>
        </div>

        <motion.h1 className="title  text-2xl uppercase tracking-[0.2em]  ">
          <Link href={"/"}>Ormés</Link>
        </motion.h1>

        <div className="flex">
          <BtnBagAction />
        </div>
      </motion.header>
    </>
  );
};

const Button = ({
  children,
  url,
  arr,
  onClick,
}: {
  arr?: { url: string; children: ReactNode }[];
  children: ReactNode;
  url?: string;
  onClick?: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  return (
    <div
      onClick={() => {
        if (!arr?.length) {
          onClick?.();
        }
        if (url) {
          router.push(url);
        }
        setIsOpen(!isOpen);
      }}
      className="cursor-pointer flex flex-col p-5 px-3 w-full uppercase"
    >
      <div className="flex justify-between w-full items-center">
        <Title className="text-lg">{children}</Title>
        {arr?.length ? (
          <Icon icon={!isOpen ? "mdi-light:plus" : "mdi-light:minus"} />
        ) : null}
      </div>

      {isOpen && arr?.length ? (
        <div className="flex flex-col gap-5 text-[#ADADAD] pt-5 text-xs">
          {arr.map((item, i) => (
            <Link
              key={`button-sidebar-${i}`}
              className="uppercase font-medium"
              onClick={() => {
                onClick?.();
                setIsOpen(!isOpen);
              }}
              href={item.url}
            >
              {item.children}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export { Button as ButtonHeader };
