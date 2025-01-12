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
  title: string | React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("flex flex-col w-full py-10 ", className)} {...props}>
      <Title className="xl:text-lg text-sm uppercase ">{title}</Title>
      {children}
    </div>
  );
};
