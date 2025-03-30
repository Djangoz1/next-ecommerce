"use client";

import { useState, useRef, useId, useEffect } from "react";

import { cn } from "@/utils/cn";

import { Btn } from "../btn";
import { AnimatePresence, motion, useInView } from "framer-motion";

interface SlideData {
  title: string;

  src: string;
}

interface CarouselProps {
  slides: SlideData[];
}

export function Carousel({ slides }: CarouselProps) {
  const [current, setCurrent] = useState(1);

  const handleSlideClick = (index: number) => {
    setCurrent(index >= 0 ? index : 0);
  };

  const id = useId();
  const _slides = [slides[slides.length - 1], ...slides, slides[0]];
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} className="w-screen overflow-x-hidden bg-secondary py-20">
      <div
        className="relative  w-full h-[70vmin] overflow-x-hidden"
        aria-labelledby={`carousel-heading-${id}`}
      >
        <AnimatePresence>
          <motion.img
            key={`image-${current}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            src={_slides[current].src}
            alt={_slides[current].title}
            width={1000}
            height={1000}
            className="absolute inset-0 w-4/5 xl:w-3/5 h-full object-cover left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shadow-xl border border-black/50 rounded-md"
          />
        </AnimatePresence>
        <div
          className="absolute flex transition-transform duration-1000 ease-in-out justify-between w-full h-full"
          style={{
            transform: `translateX(calc(-${
              current * (100 / 3)
            }% + 50% - 50vw + ${33.33}%))`,
          }}
        >
          {_slides.map((slide, index) => (
            <button
              onClick={() => handleSlideClick(index)}
              key={`carousel-title-${index}`}
              className={cn(
                "font-extralight title text-2xl text-center h-full min-w-[33.33%] uppercase transition-all duration-1000 ease-in-out",
                current === index ? "text-white" : "text-black",
                current > index ? "-translate-x-1/2" : "",
                current < index ? "translate-x-1/2" : ""
              )}
            >
              {slide.title}
            </button>
          ))}
        </div>
      </div>
      <Btn
        className="mt-10 mx-auto"
        size="sm"
        variant="link"
        href={"/shop/dress"}
      >
        Découvrir
      </Btn>
    </div>
  );
}
