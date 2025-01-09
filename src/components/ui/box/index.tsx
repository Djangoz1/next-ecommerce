import React from "react";
import { Title } from "../typography/title";
import { cn } from "@/utils/cn";

export const Box = ({
  children,
  title,
  className = "",
  ...props
}: {
  children: React.ReactNode;
  title: string;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("flex flex-col w-full", className)} {...props}>
      <Title className="text-lg uppercase ">{title}</Title>
      {children}
    </div>
  );
};
