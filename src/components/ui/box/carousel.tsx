"use client";

import { useState, useRef, useId, useEffect } from "react";

import { cn } from "@/utils/cn";

import { Btn } from "../btn";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { cva } from "class-variance-authority";
import Link from "next/link";
import { useIsMobile } from "@/hooks/useIsMobile";

interface SlideData {
  title: string;

  src: string;
}

interface CarouselProps {
  slides: SlideData[];
  size?: "sm" | "md" | "lg";
}

const variants = cva(
  "absolute inset-0 h-full object-cover   left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shadow-xl  ",
  {
    variants: {
      size: {
        sm: "w-4/5 xl:w-3/5",
        md: "w-4/5 xl:w-3/5",
        lg: "w-4/5 xl:w-3/5 h-full",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export function Carousel({ slides, size = "md" }: CarouselProps) {
  const [current, setCurrent] = useState(1);
  const [currentX, setCurrentX] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const isMobile = useIsMobile();

  const handleSlideClick = (index: number) => {
    setCurrent(index >= 0 ? index : 0);
  };

  const id = useId();
  const _slides = [slides[slides.length - 1], ...slides, slides[0]];
  const ref = useRef<HTMLDivElement>(null);

  const handleScrollX = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentX(e.currentTarget.scrollLeft);
    let newPos = 0;
    if (currentX > e.currentTarget.scrollLeft) {
      newPos = current + 1;
    } else {
      newPos = current - 1;
    }

    if (newPos >= _slides.length) {
      newPos = 0;
    } else if (newPos < 0) {
      newPos = _slides.length - 1;
    }
    setCurrent(newPos);
  };

  // Gestion simplifiée du défilement tactile
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEndX(e.changedTouches[0].clientX);
    handleSwipe();
  };

  const handleSwipe = () => {
    const swipeDistance = touchEndX - touchStartX;
    const swipeThreshold = 50; // Seuil de défilement en pixels

    if (Math.abs(swipeDistance) > swipeThreshold) {
      let newPos = swipeDistance > 0 ? current - 1 : current + 1;

      // Gestion des limites
      if (newPos >= _slides.length) {
        newPos = 0;
      } else if (newPos < 0) {
        newPos = _slides.length - 1;
      }

      setCurrent(newPos);
    }
  };

  useEffect(() => {
    if (ref.current && !isMobile) {
      ref.current.addEventListener("wheel", (e) => handleScrollX(e as any));
    }

    return () => {
      if (ref.current && !isMobile) {
        ref.current.removeEventListener("wheel", (e) =>
          handleScrollX(e as any)
        );
      }
    };
  }, [currentX, current, isMobile]);

  return (
    <div
      ref={ref}
      className="w-screen overflow-x-hidden bg-secondary py-20"
      onTouchStart={isMobile ? handleTouchStart : undefined}
      onTouchEnd={isMobile ? handleTouchEnd : undefined}
    >
      <div
        className={cn(
          "relative  w-full  overflow-x-hidden",
          size === "lg" ? "h-[70vh]" : "h-[70vmin]"
        )}
        aria-labelledby={`carousel-heading-${id}`}
      >
        <AnimatePresence>
          <Link href={_slides[current].src} target="_blank">
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
              className={cn(variants({ size }))}
            />
          </Link>
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
              onClick={() => (!isMobile ? handleSlideClick(index) : null)}
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
