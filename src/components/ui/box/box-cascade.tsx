"use client";
import React, { useState } from "react";
import { Box } from ".";

export const BoxCascade = ({
  className,
  children,
  title,
}: {
  className: string;
  children: React.ReactNode;
  title: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Box onClick={() => setIsOpen(!isOpen)} title={title}>
      {isOpen ? <div className={className}>{children}</div> : <></>}
    </Box>
  );
};
