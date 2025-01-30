"use client";
import { AnimatePresence, motion } from "framer-motion";
import React, { createContext, useContext, useState } from "react";
import { Btn, BtnProps } from "../btn";
import { cn } from "@/utils/cn";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Logo } from "@/components/app/logo";
type Ctx = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};
const ModalContext = createContext<Ctx | undefined>(undefined);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ModalContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within a ModalProvider");
  return ctx;
};

export const ModalPrimitive = ({
  ...props
}: {
  children: React.ReactNode;
  btnProps: BtnProps;
  className?: string;
}) => {
  return <Element {...props} />;
};

export const Modal = ({
  ...props
}: {
  children: React.ReactNode;

  btnProps: BtnProps;

  className?: string;
}) => {
  return (
    <ModalProvider>
      <Element {...props} />
    </ModalProvider>
  );
};

const Element = ({
  children,
  className = "",

  ...props
}: {
  btnProps: BtnProps;
  children: React.ReactNode;

  className?: string;
}) => {
  const { isOpen, setIsOpen } = useModal();

  return (
    <>
      <Btn
        size="sm"
        onClick={(e) => {
          setIsOpen(true);
          props?.btnProps?.onClick?.(e);
        }}
        {...props.btnProps}
      />

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ x: "100%" }}
            exit={{ x: "-100%" }}
            transition={{
              duration: 0.3,
            }}
            animate={{ x: 0, zIndex: 1000 }}
            className={cn(
              "bg-background text-black z-50 fixed  top-0 right-0 w-screen h-screen max-h-screen"
            )}
            onClick={(e) => setIsOpen(false)}
          >
            <div className="flex justify-between p-5 border-b">
              <>
                <Logo />
              </>
              <Btn
                className="ml-auto"
                size="sm"
                variant="primary"
                onClick={() => setIsOpen(false)}
              >
                <Icon icon="mdi:close"></Icon>
              </Btn>
            </div>
            <div
              className={cn("py-10 w-full h-full overflow-y-auto", className)}
            >
              {children}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
};
