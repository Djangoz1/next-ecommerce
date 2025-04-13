"use client";
import { useEffect, useState } from "react";

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  let bool = false;
  try {
    bool = typeof window !== "undefined";
  } catch (error) {
    return false;
  }
  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
  }, [window.innerWidth]);
  return isMobile;
};
