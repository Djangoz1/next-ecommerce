"use client";
import { cn } from "@/utils/cn";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { useState } from "react";

const variants = {
  default: " bg-background text-foreground",
  primary: "bg-black text-white",
  ghost: "bg-transparent border-black/0 shadow-none hover:bg-black/10",
  disabled:
    "bg-transparent border-black/0 shadow-none hover:bg-black/10 opacity-75 hover:opacity-100",
  secondary:
    "bg-black/10 border-2 backdrop-blur-xl text-white border-white hover:bg-black/30",
  link: "shadow-none text-black hover:text-gray-500 border-none underline font-medium",
};

const sizes = {
  xs: "px-3 py-1 text-xs",
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-3 text-base",
  lg: "px-3 py-2 text-lg",
};

export type BtnProps = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  href?: string;
  target?: React.HTMLAttributeAnchorTarget;
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement | HTMLDivElement>
  ) => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
export const Btn = ({
  children,
  className = "",
  variant = "default",
  target,
  size = "md",
  type = "button",
  ...props
}: BtnProps) => {
  const [isLoading, setIsLoading] = useState(false);

  return props.href ? (
    <Link
      target={target}
      href={props.href}
      onClick={(e) => {
        if (isLoading) return;
        setIsLoading(true);
        props?.onClick?.(e);
        setIsLoading(false);
      }}
      className={cn(
        "border relative flex gap-2 h-fit justify-center items-center w-fit border-black/50 rounded-md shadow tracking-wider uppercase font-info font-semibold text-sm  transition-all hover:scale-105",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {isLoading ? (
        <Icon
          icon="line-md:loading-alt-loop"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl"
        />
      ) : null}

      <div
        className={cn(
          "flex gap-2 items-center justify-center",
          isLoading ? "opacity-0 " : ""
        )}
      >
        {children}
      </div>
    </Link>
  ) : (
    <button
      type={type}
      className={cn(
        "[&:disabled]:opacity-40 relative h-fit justify-center [&:disabled]:cursor-not-allowed border flex gap-2 items-center w-fit border-black/50 rounded-md shadow tracking-wider uppercase font-info font-semibold text-sm  transition-all hover:scale-105",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
      onClick={async (e) => {
        if (isLoading) return;
        try {
          setIsLoading(true);
          await props?.onClick?.(e);
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
        }
      }}
    >
      {isLoading ? (
        <Icon
          icon="line-md:loading-alt-loop"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl"
        />
      ) : null}

      <div
        className={cn(
          "flex gap-2 items-center justify-center",
          isLoading ? "opacity-0 " : ""
        )}
      >
        {children}
      </div>
    </button>
  );
};
