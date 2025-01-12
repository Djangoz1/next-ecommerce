import { cn } from "@/utils/cn";

import React from "react";

export const Text = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <p className={cn("text-xl font-extralight", className)}>{children}</p>;
};
