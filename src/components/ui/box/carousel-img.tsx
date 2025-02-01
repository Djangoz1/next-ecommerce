"use client";
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
  return (
    <div className="flex w-screen overflow-x-hidden relative">
      <motion.div
        initial={{ x: 0, width: `${images.length * 100}vw` }}
        animate={{ x: `-${index * 100}vw`, width: `${images.length * 100}vw` }}
        transition={{ duration: 0.5 }}
        className="flex "
      >
        {images.map((image, i) => (
          <div key={`image-${i}`} className="w-screen min-w-screen h-full">
            <Image
              className="min-w-screen w-screen h-full"
              src={image}
              alt={`image-${i}`}
              width={1000}
              height={1000}
            />
          </div>
        ))}
      </motion.div>
      <div className="flex gap-3 w-screen absolute bottom-2 left-2 px-2 ">
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
