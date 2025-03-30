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
import {
  Modal,
  ModalPrimitive,
  ModalProvider,
  useModal,
} from "../ui/box/modal";
import { useSession } from "@/context/app";
import { useModal as useModalContext } from "@/context/modal";
import { ReturnOrder } from "../features/return-order";
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
        <div className=" text-sm flex items-center uppercase font-light tracking-wider gap-10 xl:opacity-100 opacity-0 ">
          <Link href={"/shop/dress"} className="hover:underline">
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
        <div className="flex items-center gap-1 relative">
          <AdminBtn />
          <BtnBagAction />
        </div>
      </motion.header>
      <>
        <MobileHeader scroll={scrolled} url={url} />
      </>
    </>
  );
};

const AdminBtn = () => {
  const { user } = useSession();
  if (user?.app_metadata?.role !== "admin") return null;
  return (
    <Modal
      btnProps={{
        variant: "ghost",
        className:
          "absolute top-1/2 -left-2 px-0 py-0  -translate-y-1/2 -translate-x-full",
        children: <Icon icon={"eos-icons:admin"} width={20} height={20} />,
      }}
    >
      <div className="flex flex-col divide-y">
        <Button url={"/admin"}>Articles</Button>
        <Button url={"/admin/order"}>Commandes</Button>
        <Button url={"/admin/stripe"}>Coupons</Button>
        <Button url={"/admin/email"}>Email</Button>
        <Button url={"/admin/newsletter"}>Newsletter</Button>
      </div>
    </Modal>
  );
};

const Sidebar = () => {
  const { setIsOpen } = useModal();
  const { user, logout } = useSession();
  const { showModal } = useModalContext();
  return (
    <ModalPrimitive
      className="pb-40 pt-0"
      btnProps={{
        variant: "ghost",
        children: (
          <Icon icon={"hugeicons:menu-09"} width={"20"} height={"20"} />
        ),
        className: "w-fit h-fit px-1 py-1",
      }}
    >
      <div>
        <motion.div className="flex flex-col divide-y">
          <div onClick={(e) => e.stopPropagation()} className="w-full">
            <Button
              onClick={() => setIsOpen(false)}
              arr={[
                { url: "/shop/dress", children: "Les vêtements" },
                {
                  url: "/shop/miniature",
                  children: "Les minitatures",
                },
                { url: "/shop/painting", children: "La peinture" },
              ]}
            >
              Boutique
            </Button>
          </div>
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
        <div className="flex px-3 flex-col gap-5  py-5 my-10">
          {[
            { url: "/tracking/", children: "Suivre ma commande" },
            {
              component: (
                <>
                  <button
                    onClick={() => showModal(<ReturnOrder />, "slideY")}
                    className="uppercase opacity-50 font-bold text-sm w-fit"
                  >
                    Faire un retour
                  </button>
                </>
              ),
            },
            { url: "/shop/women/", children: "Contactez nous" },
            { url: "/faq/", children: "FAQ" },
          ].map((item, i) =>
            item.component ? (
              <React.Fragment key={`button-sidebar-${i}`}>
                {item.component}
              </React.Fragment>
            ) : (
              <Link
                onClick={() => setIsOpen(false)}
                className="uppercase opacity-50 font-bold text-sm"
                key={`button-sidebar-link-${i}`}
                href={item.url || "#"}
              >
                {item.children}
              </Link>
            )
          )}
        </div>

        <div className="flex py-5 justify-center gap-5 w-full border-y">
          <Icon icon={"circum:instagram"} width={20} height={20} />
          <Icon icon={"circum:facebook"} width={20} height={20} />
          <Icon icon={"ph:whatsapp-logo-thin"} width={20} height={20} />
        </div>
        <div className="mt-10 px-2 flex justify-between">
          <Btn
            onClick={() => setIsOpen(false)}
            variant="link"
            {...(user
              ? { href: "/account", children: "Mon compte" }
              : {
                  href: "/auth/sign-in",
                  children: "Se connecter",
                })}
            size="sm"
          />

          {user ? (
            <Btn variant="link" size="sm" onClick={logout}>
              Se déconnecter
            </Btn>
          ) : null}
        </div>
      </div>
    </ModalPrimitive>
  );
};

const MobileHeader = ({ scroll, url }: { scroll: boolean; url: string }) => {
  return (
    <>
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
          color: !scroll && url == "/" ? "white" : "black",
        }}
        className={cn(
          "xl:hidden z-50  p-2  flex items-center w-screen  justify-between"
        )}
      >
        <ModalProvider>
          <Sidebar />
        </ModalProvider>

        <motion.h1 className="title  text-2xl uppercase tracking-[0.2em]  ">
          <Link href={"/"}>Ormés</Link>
        </motion.h1>

        <div className="flex relative">
          <AdminBtn />

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
  arr?: ({ url: string; children: ReactNode } | { component: ReactNode })[];
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
          {arr.map((item: any, i) =>
            item.component ? (
              <React.Fragment key={`button-sidebar-${i}`}>
                {item.component}
              </React.Fragment>
            ) : (
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
            )
          )}
        </div>
      ) : null}
    </div>
  );
};

export { Button as ButtonHeader };
