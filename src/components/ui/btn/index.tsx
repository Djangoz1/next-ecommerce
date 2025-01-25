"use client";
import { cn } from "@/utils/cn";
import Link from "next/link";

const variants = {
  default: " bg-background text-foreground",
  primary: "bg-black text-white",
  ghost: "bg-transparent border-black/0 shadow-none hover:bg-black/10",
  disabled:
    "bg-transparent border-black/0 shadow-none hover:bg-black/10 opacity-75 hover:opacity-100",
  secondary:
    "bg-black/10 border-2 backdrop-blur-xl text-white border-white hover:bg-black/30",
  link: "shadow-none   hover:text-blue-700 border-none underline font-medium",
};

const sizes = {
  xs: "px-3 py-1 text-xs",
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-3 text-base",
  lg: "px-3 py-2 text-lg",
};

type BtnProps = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  href?: string;
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
export const Btn = ({
  children,
  className = "",
  variant = "default",
  size = "md",
  type = "button",
  ...props
}: BtnProps) => {
  return props.href ? (
    <Link
      href={props.href}
      onClick={(e) => props?.onClick?.(e)}
      className={cn(
        "border flex gap-2 justify-center items-center w-fit border-black/50 rounded-md shadow tracking-wider uppercase font-info font-semibold text-sm  transition-all hover:scale-105",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </Link>
  ) : (
    <button
      type={type}
      className={cn(
        "[&:disabled]:opacity-40 justify-center [&:disabled]:cursor-not-allowed border flex gap-2 items-center w-fit border-black/50 rounded-md shadow tracking-wider uppercase font-info font-semibold text-sm  transition-all hover:scale-105",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
