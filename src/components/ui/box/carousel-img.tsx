"use client";
import { useIsMobile } from "@/hooks/useIsMobile";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export const CarouselImg = ({ images }: { images: string[] }) => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % images.length);
      }, 10000);
      return () => clearInterval(interval);
    }
  }, []);
  const isMobile = useIsMobile();
  console.log({ isMobile });
  return (
    <div className="flex w-screen xl:w-full xl:flex-col overflow-x-hidden xl:overflow-y-hidden relative h-screen xl:h-fit">
      <motion.div
        initial={{
          ...(isMobile
            ? {
                x: 0,
                width: `${images.length * 100}vw`,
                height: "fit-content",
              }
            : { height: `${images.length * 100}vh` }),
        }}
        animate={{
          ...(isMobile
            ? {
                x: `-${index * 100}vw`,
                width: `${images.length * 100}vw`,
              }
            : {
                y: `-${index * 100}vh`,
                height: `${images.length * 100}vh`,
              }),
        }}
        transition={{ duration: 0.5 }}
        className="flex xl:flex-col max-h-screen"
      >
        {images.map((image, i) => (
          <div
            key={`image-${i}`}
            className="w-screen min-w-screen xl:w-full xl:min-w-full xl:h-fit h-full "
          >
            <Image
              className="min-w-screen w-screen xl:min-w-full xl:w-full xl:h-fit  h-full"
              src={image}
              alt={`image-${i}`}
              width={1000}
              height={1000}
            />
          </div>
        ))}
      </motion.div>
      <div className="flex gap-3 w-screen xl:w-full absolute bottom-2 left-2 px-2 xl:top-1/3 xl:items-end xl:flex-col ">
        {images.map((el, i) => (
          <motion.div
            key={`image-btn-${i}`}
            onClick={() => setIndex(i)}
            className="w-5 h-5 py-1 rounded-full"
            initial={{
              backgroundColor: "#fff",
            }}
            animate={{
              backgroundColor: index === i ? "#000" : "#fff",
            }}
          />
        ))}
      </div>
    </div>
  );
};
