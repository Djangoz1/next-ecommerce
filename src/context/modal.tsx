import { cn } from "@/utils/cn";
import { cva } from "class-variance-authority";
import { AnimatePresence, motion, PanInfo } from "framer-motion";
import React, { createContext, useContext, useState } from "react";

type TransitionType = "slideY" | "slideX" | "popup";

interface ModalContextType {
  showModal: (
    content: React.ReactNode,
    transitionType?: TransitionType
  ) => void;
  closeModal: () => void;
  modalContent: React.ReactNode | null;
  isOpen: boolean;
  transitionType: TransitionType;
}

const transitions = {
  slideY: {
    initial: { y: 100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 100 },
  },
  slideX: {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 100 },
  },
  popup: {
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.5, opacity: 0 },
  },
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(
    null
  );
  const [isOpen, setIsOpen] = useState(false);
  const [transitionType, setTransitionType] =
    useState<TransitionType>("slideY");

  const showModal = (
    content: React.ReactNode,
    type: TransitionType = "slideY"
  ) => {
    setModalContent(content);
    setTransitionType(type);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalContent(null);
  };

  return (
    <ModalContext.Provider
      value={{ showModal, closeModal, modalContent, isOpen, transitionType }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

const variantsAutority = cva(
  "fixed  flex px-5 pt-10 pb-20 items-center justify-center  overflow-y-auto z-50 bg-background",
  {
    variants: {
      transitionType: {
        slideY: "rounded-t-xl bottom-0 w-full h-[70vh] max-h-[90vh] ",
        slideX: "rounded-l-xl",
        popup: "rounded-xl",
      },
    },
  }
);

export const Modal = () => {
  const { isOpen, closeModal, modalContent, transitionType } = useModal();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50"
            onClick={closeModal}
          />
          <motion.div
            className={cn(
              "fixed  flex px-5 pt-10 pb-20 items-center justify-center  overflow-y-auto z-50 bg-background",
              variantsAutority({ transitionType })
            )}
            onClick={(e) => e.stopPropagation()}
            {...transitions[transitionType]}
            transition={{ duration: 0.3 }}
          >
            {modalContent}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
