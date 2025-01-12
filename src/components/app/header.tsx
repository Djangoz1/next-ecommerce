"use client";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
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
    <motion.header
      initial={{
        background: "transparent",
      }}
      animate={{
        background: scrolled ? "#fff7f7" : "#fff7f700",
        color: !scrolled && url == "/" ? "white" : "black",
      }}
      transition={{
        duration: 1,
        type: "spring",
      }}
      className={cn(
        "flex items-center  justify-between xl:px-10 px-5 py-5  w-screen    fixed top-0 left-0 right-0 z-50 font-info"
        // scrolled ? "bg-background" : "bg-transparent"
      )}
    >
      <div className="font-semibold text-sm flex items-center gap-2 xl:opacity-100 opacity-0 absolute xl:relative tracking-wider">
        <Icon icon="line-md:plus" width={"15"} height={"15"} />
        Nous Contacter
      </div>

      <motion.h1
        initial={{
          position: "relative",
          // top: 0,
          // left: 0,
          // right: 0,
          // bottom: 0,
        }}
        animate={{
          color: !scrolled && url == "/" ? "white" : "black",
          ...(url !== "/"
            ? {}
            : {
                transform: !scrolled ? "translateY(300%)" : "translateY(0)",
                fontSize: !scrolled ? "80px" : "40px",
              }),
        }}
        className="title text-4xl uppercase tracking-[0.2em]"
      >
        <Link href={"/"}>Ormés</Link>
      </motion.h1>

      <div className="flex gap-5">
        <Link href={"/store"}>
          <Icon icon="ant-design:shopping-twotone" width="30" height="30" />
        </Link>
        <button>
          <Icon icon="ic:twotone-dark-mode" width="30" height="30" />
        </button>
        <Sidebar />
      </div>
    </motion.header>
  );
};

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  console.log(isOpen);
  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        <Icon icon="line-md:menu" className="" width={"30"} height={"30"} />
      </button>
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
        onClick={() => setIsOpen(false)}
        className={cn(
          "fixed top-0 left-0 text-black right-0 bottom-0 backdrop-blur z-50 bg-black/50 w-screen h-screen flex justify-end",
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        <motion.div className="  h-screen bg-white w-[500px]  px-10 p-20 flex flex-col gap-5">
          <button
            onClick={() => setIsOpen(false)}
            className="bg-black rounded-full w-12 flex items-center justify-center h-12 shadow absolute top-5 right-10"
          >
            <Icon icon="system-uicons:cross" className="text-white" />
          </button>
          <Link className="font-semibold" href={"/shop/women/"}>
            Vêtements
          </Link>
          <Link className="font-semibold" href={"/shop/women/"}>
            Miniatures
          </Link>
          <Link className="font-semibold" href={"/shop/women/"}>
            Inspirations
          </Link>
          <Link className="mt-20 underline" href={"/shop/women/"}>
            Connexion
          </Link>
        </motion.div>
      </motion.div>
    </>
  );
};
