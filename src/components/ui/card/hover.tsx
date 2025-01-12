"use client";

import { cn } from "@/utils/cn";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Title } from "../typography/title";
import { Btn } from "../btn";

const items = [
  {
    id: "1",
    title: "Vêtements",
    image: "/item/1.avif",
    thumbnail: "/item/2.avif",
    price: 200,
    description:
      "Découvrez les nouveautés de la collection de prêt-à-porter pour femme et les dernières parures pour femme.",
  },
];

export const HoveredCard = ({ item }: { item: (typeof items)[0] }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={cn("w-full h-[600px] relative")}
      initial={{ zIndex: 0 }}
      animate={{ zIndex: hovered ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <Image
        src={item.image}
        alt={item.title}
        width={1200}
        height={1200}
        className="w-full h-full object-cover object-center"
      />

      {hovered ? (
        <div className="absolute border top-0 left-0 w-full h-[130%] bg-white flex flex-col">
          <Image
            src={item.thumbnail}
            alt={item.title}
            width={1200}
            height={1200}
            className="w-full h-[80%] object-cover object-center"
          />

          <div className="flex flex-col  gap-2 items-center justify-center p-5">
            <Title className="text-xl uppercase">{item.title}</Title>

            <p className="text-xl font-light">{item.price} €</p>

            <Btn href={`/shop/women/${item.id}`} variant="link">
              Acheter
            </Btn>
          </div>
        </div>
      ) : (
        <></>
      )}

      <div className="flex justify-between absolute top-0 left-0 p-3 w-full z-5">
        <span></span>
        <Icon icon="line-md:heart" />
      </div>
    </motion.div>
  );
};
