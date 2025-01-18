"use client";
import { cn } from "@/utils/cn";
import React from "react";
import { useFormContext } from "react-hook-form";

export const Textarea = ({
  id = "",
  title,
  classNameBox = "",
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  classNameBox?: string;
}) => {
  const { register } = useFormContext();
  return (
    <div className={cn("relative w-full", classNameBox)}>
      <textarea
        {...props}
        className={cn(
          "border rounded px-3 py-2 w-full bg-background border-black/60 shadow h-fit min-h-[150px] max-h-[40vh]",
          props?.className || ""
        )}
        {...register(id)}
      />
      {title ? (
        <span className="text-sm px-2 font-light bg-background absolute top-0 left-1 -translate-y-1/2">
          {title}
        </span>
      ) : null}
    </div>
  );
};
