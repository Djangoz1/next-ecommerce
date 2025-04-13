"use client";
import { cn } from "@/utils/cn";
import Image from "next/image";
import React, { useState } from "react";
import { Btn } from "../btn";
import { PlayIcon } from "lucide-react";
import { motion } from "framer-motion";

export const BoxPlayer = ({
  img,
  className = "",
  source,
}: {
  img: string;
  className?: string;
  source: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className={cn("relative w-full h-64 xl:h-[50vh]", className)}>
        <Image className="object-cover" src={img} fill alt="image" />
        <Btn
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          size="xs"
          onClick={() => setIsOpen(true)}
          variant="secondary"
        >
          <PlayIcon className="w-4 h-4" />
        </Btn>
      </div>

      {isOpen ? (
        <motion.div
          onClick={() => setIsOpen(false)}
          className="fixed flex items-center inset-0 bg-black/50 backdrop-blur-sm"
        >
          <video
            src={source}
            autoPlay
            muted
            loop
            playsInline
            controls
            className="aspect-video bg-black"
          />
        </motion.div>
      ) : null}
    </>
  );
};
