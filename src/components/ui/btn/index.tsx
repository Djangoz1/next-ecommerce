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

type BtnProps = {
  variant?: keyof typeof variants;
  href?: string;
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
export const Btn = ({
  children,
  className = "",
  variant = "default",
  type = "button",
  ...props
}: BtnProps) => {
  return props.href ? (
    <Link
      href={props.href}
      onClick={(e) => props?.onClick?.(e)}
      className={cn(
        "p-4 border flex gap-2 items-center w-fit border-black/50 rounded-md shadow tracking-wider uppercase font-info font-semibold text-sm  transition-all hover:scale-105",
        variants[variant],
        className
      )}
    >
      {children}
    </Link>
  ) : (
    <button
      type={type}
      className={cn(
        "p-4 [&:disabled]:opacity-40 [&:disabled]:cursor-not-allowed border flex gap-2 items-center w-fit border-black/50 rounded-md shadow tracking-wider uppercase font-info font-semibold text-sm  transition-all hover:scale-105",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
