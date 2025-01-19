// Input component extends from shadcnui - https://ui.shadcn.com/docs/components/input
"use client";
import { cn } from "@/utils/cn";
import { span } from "framer-motion/client";
import * as React from "react";

import { useFormContext } from "react-hook-form";

export const Input = ({
  title,
  classNameBox = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  classNameBox?: string;
}) => {
  const { register, setValue, watch } = useFormContext();
  React.useEffect(() => {
    if (!watch(props.id as string) && props.defaultValue) {
      setValue(props.id as string, props.defaultValue);
    }
  }, [props.id]);

  return (
    <div className={cn("relative w-full", classNameBox)}>
      <input
        key={`input-${props.id}`}
        {...props}
        className={cn(
          "w-full px-3 py-2 border-2 rounded border-black/60 shadow bg-background  h-fit",
          props?.className || ""
        )}
        {...register(props.id as string)}
        onChange={(e) => {
          setValue(props.id as string, e.target.value);
          props.onChange?.(e.target.value as any);
        }}
        value={watch(props.id as string)}
      />
      {title ? (
        <label
          htmlFor={props.id as string}
          className="text-sm px-2 font-light bg-background absolute top-0 left-1 -translate-y-1/2"
        >
          {title}
        </label>
      ) : null}
    </div>
  );
};
