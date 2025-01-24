"use client";
import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "./input";
import { Btn } from "../ui/btn";
import { Icon } from "@iconify/react/dist/iconify.js";
import { cn } from "@/utils/cn";

export const MultipleInput = ({
  id,
  className = "",
  title,
  placeholder,
  defaultValue,
}: {
  title?: string;
  placeholder?: string;
  id: string;
  className?: string;
  defaultValue?: string[];
}) => {
  const { watch, setValue } = useFormContext();

  useEffect(() => {
    if (defaultValue && !watch(id)) {
      setValue(id, defaultValue);
    }
  }, [id, defaultValue, setValue, watch]);
  return (
    <div
      className={cn(
        "w-full relative flex divide-dashed divide-black/50 flex-col bg-background border divide-y border-black/50 shadow rounded-md",
        className
      )}
    >
      <div className="flex items-center">
        <Input
          className="border-none shadow-none"
          placeholder={placeholder}
          id={`multiple-${id}-${watch(id)?.length || 0}`}
        />
        <Btn
          variant="ghost"
          className="border-l-black/20 rounded-l-none bg-white/60"
          disabled={!watch(`multiple-${id}-${watch(id)?.length || 0}`)}
          onClick={() =>
            setValue(id, [
              ...(watch(id) || []),
              watch(`multiple-${id}-${watch(id)?.length || 0}`),
            ])
          }
        >
          <Icon icon={"mdi:plus"}></Icon>
        </Btn>
        {title ? (
          <span className="absolute  top-0 left-1 px-2 shadow-none border-none text-sm font-light bg-background -translate-y-1/2">
            {title}
          </span>
        ) : null}
      </div>

      {((watch(id) as string[]) || [])?.map((el, i) => (
        <div
          key={`multiple-input-${id}-${i}`}
          className={cn(
            "flex items-center w-full justify-between  pl-3 hover:bg-black/20  ",
            i % 2 === 0 ? "bg-black/5" : "bg-black/10"
          )}
        >
          <span>{el}</span>
          <Btn
            className="text-red-500"
            variant="ghost"
            onClick={() =>
              setValue(
                id,
                watch(id).filter((e: string) => el != e)
              )
            }
          >
            <Icon icon={"mdi:delete"} />
          </Btn>
        </div>
      ))}
    </div>
  );
};
