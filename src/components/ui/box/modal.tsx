"use client";
import { AnimatePresence, motion } from "framer-motion";
import React, { createContext, useContext, useState } from "react";
import { Btn, BtnProps } from "../btn";
import { cn } from "@/utils/cn";
import { Icon } from "@iconify/react/dist/iconify.js";

const ModalContext = createContext({
  isOpen: false,
  setIsOpen: (isOpen: boolean) => {},
});

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ModalContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  return useContext(ModalContext);
};

export const Modal = ({
  ...props
}: {
  btn: React.ReactNode;
  children: React.ReactNode;
  classNameBtn?: string;
  btnVariant?: BtnProps["variant"];
  className?: string;
}) => {
  return (
    <ModalProvider>
      <Element {...props} />
    </ModalProvider>
  );
};

const Element = ({
  btn,
  children,
  className = "",
  btnVariant = "primary",
  ...props
}: {
  btn: React.ReactNode;
  children: React.ReactNode;
  classNameBtn?: string;
  btnVariant?: BtnProps["variant"];
  className?: string;
}) => {
  const { isOpen, setIsOpen } = useModal();

  return (
    <ModalProvider>
      <Btn
        size="sm"
        variant={btnVariant}
        onClick={() => setIsOpen(true)}
        className={props?.classNameBtn}
      >
        {btn}
      </Btn>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ x: "100%" }}
            exit={{ x: "-100%" }}
            transition={{
              duration: 0.3,
            }}
            animate={{ x: 0 }}
            className={cn(
              "bg-background z-50 fixed px-5 py-20 top-0 right-0 w-screen h-screen"
            )}
          >
            <Btn
              className="mb-10 ml-auto"
              size="xs"
              onClick={() => setIsOpen(false)}
            >
              <Icon icon="mdi:close"></Icon> Fermer
            </Btn>

            {children}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </ModalProvider>
  );
};
