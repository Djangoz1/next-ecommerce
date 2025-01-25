"use client";
import React, { useEffect } from "react";
import { Btn } from "../ui/btn";
import { useFormContext } from "react-hook-form";
import { cn } from "@/utils/cn";
import { useRouter } from "next/navigation";

export const SelectBtn = ({
  arr,
  id,
  defaultValue,
  className = "",
  onUrl = false,
}: {
  className?: string;
  arr: { label: string; value: string | number | boolean }[];
  id: string;
  defaultValue?: string | number | boolean;
  onUrl?: boolean;
}) => {
  const { watch, setValue } = useFormContext();
  useEffect(() => {
    if (watch(id) === undefined && defaultValue !== undefined) {
      setValue(id, defaultValue);
    }
  }, [id, defaultValue, setValue, watch]);
  const router = useRouter();
  return (
    <div
      className={cn(
        "flex w-fit  gap-2 border border-black/50 rounded-full",
        className
      )}
    >
      {arr.map((item, i) => (
        <Btn
          onClick={() => {
            setValue(id, item.value);
            if (onUrl) {
              router.push(item.value as string);
            }
          }}
          variant={
            (watch(id) !== undefined && watch(id) === item.value) ||
            (watch(id) === undefined && defaultValue === item.value)
              ? "primary"
              : "disabled"
          }
          className={"rounded-full px-2 py-1 text-xs "}
          key={"select-btn-" + i}
        >
          {item.label}
        </Btn>
      ))}
    </div>
  );
};
