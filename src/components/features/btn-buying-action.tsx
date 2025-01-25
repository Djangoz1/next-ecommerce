"use client";
import React, { useState } from "react";
import { Btn } from "../ui/btn";
import { Item } from "@/types/items";

import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@iconify/react/dist/iconify.js";
import { QueryClient, useQueryClient } from "@tanstack/react-query";

export const clearPendingItems = (queryClient: QueryClient) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("pending-items");
    queryClient.invalidateQueries({
      queryKey: ["pending-items"],
    });
  }
};

export const BtnBuyingAction = ({ item }: { item: Item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  return (
    <>
      <Btn
        onClick={() => setIsOpen(true)}
        variant="primary"
        className="w-full text-center justify-center"
      >
        Ajouter au panier
      </Btn>
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            onClick={() => setIsOpen(false)}
            className="fixed top-0 left-0 right-0 bottom-0 bg-black/40 z-[100] flex flex-col justify-end "
          >
            <motion.div
              initial={{ y: 300 }}
              animate={{ y: 0 }}
              exit={{ y: 300 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className=" bg-[#FBF6F3] w-full z-[100] text-center flex flex-col divide-y relative"
            >
              <h6 className="uppercase text-sm py-5 font-bold">Taille</h6>
              <Btn
                variant="ghost"
                className="absolute top-0 right-0"
                onClick={() => setIsOpen(false)}
              >
                <Icon icon="mdi:close" />
              </Btn>
              <div className="flex flex-col divide-y h-[200px] overflow-y-scroll divide-gray-400/10">
                {["34", "36", "38", "40", "42", "44", "46", "48", "50"].map(
                  (size) => (
                    <button
                      onClick={() => {
                        const currentItem = JSON.parse(
                          localStorage.getItem("pending-items") || "[]"
                        );
                        currentItem.push({ id: item.id, size });
                        localStorage.setItem(
                          "pending-items",
                          JSON.stringify(currentItem)
                        );
                        setIsOpen(false);
                        queryClient.invalidateQueries({
                          queryKey: ["pending-items"],
                        });
                      }}
                      key={`size-${size}`}
                      className="w-full text-center text-xs font-bold py-4"
                    >
                      <>{size}</>
                    </button>
                  )
                )}
              </div>
              <Btn
                variant="ghost"
                className="w-full text-center !text-[10px] underline justify-center border-t-black/50 rounded-none"
              >
                Guide des tailles
              </Btn>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
};
