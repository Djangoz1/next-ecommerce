"use client";
import { cn } from "@/utils/cn";

import * as React from "react";

import { useFormContext } from "react-hook-form";

export const Input = ({
  title,
  classNameBox = "",
  variant = "primary",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  classNameBox?: string;
  onChange?: (value: string) => void;
  variant?: "primary" | "secondary";
}) => {
  const { register, setValue, watch } = useFormContext();
  React.useEffect(() => {
    if (!watch(props.id as string) && props?.defaultValue) {
      setValue(props.id as string, props.defaultValue);
    }
  }, [props.id, props?.defaultValue, setValue, watch]);

  return (
    <div className={cn("relative w-full", classNameBox)}>
      <input
        key={`input-${props.id}`}
        {...props}
        className={cn(
          "w-full px-3 py-2 border rounded xl:text-sm text-xs shadow bg-background  h-fit",
          props?.className || "",
          {
            primary: "bg-background",
            secondary: "bg-white",
          }[variant]
        )}
        {...register(props.id as string)}
        onChange={(e) => {
          setValue(props.id as string, e.target.value);
          props.onChange?.(e.target.value);
        }}
        value={watch(props.id as string)}
      />
      {title ? (
        <label
          htmlFor={props.id as string}
          className={cn(
            "text-sm px-2 font-light  absolute top-0 left-1 -translate-y-1/2",
            {
              primary: "bg-background",
              secondary: "bg-white",
            }[variant]
          )}
        >
          {title}
        </label>
      ) : null}
    </div>
  );
};
