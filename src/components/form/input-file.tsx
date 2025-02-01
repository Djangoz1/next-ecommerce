"use client";
import { useAsyncApi } from "@/hooks/useAsyncApi";
import { Icon } from "@iconify/react/dist/iconify.js";

import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";

export const InputFile = ({
  id,
  fn,
  required = false,
  ...props
}: {
  keys?: string[];
  defaultValue?: string;
  required?: boolean;
  id: string;
  className?: string;
  fn?: (formData: FormData) => FormData;
}) => {
  const { watch, setValue } = useFormContext();
  const { mutateAsync } = useAsyncApi({});
  useEffect(() => {
    if (props.defaultValue) {
      setValue(id, props.defaultValue);
    }
  }, [props.defaultValue]);

  return (
    <>
      {watch(`${id}`) ? (
        <img
          src={watch(`${id}`)}
          className="w-[150px]   h-[150px] rounded-md shadow"
        ></img>
      ) : null}
      <div className="w-[150px] relative border bg-background border-black/50  h-[150px] rounded-md shadow flex items-center justify-center cursor-pointer">
        <div className="flex flex-col gap-3 items-center text-center">
          <Icon icon={"line-md:image"} className="text-4xl" />
          <span className="font-light text-xs">
            <span className="italic">
              Ajouter une image <br />
            </span>
            (800x1500)
          </span>
        </div>

        <input
          type="file"
          className="absolute w-full h-full opacity-0"
          required={required}
          multiple
          onChange={async (e) => {
            try {
              console.log({ e: e.target?.files });
              if (!e.target?.files?.[0]) {
                return null;
              }
              for (const file of e.target?.files || []) {
                const formData = new FormData();
                formData.append("file", file);
                const form = fn ? fn(formData) : formData;

                let data = await mutateAsync({
                  path: `/upload`,
                  method: "POST",
                  params: form,
                  headers: false,
                  invalidateQueries: props.keys ? [props.keys] : undefined,
                  toast: {
                    description: "Image ajoutée",
                  },
                });

                console.log({ datadkqsjdqskdjqsdkjqsd: data });

                if (!watch(`${id}`)) {
                  setValue(`${id}`, data.url);
                }
              }
            } catch (error) {
              console.log("error upload file", error);
            }
          }}
        />
      </div>
    </>
  );
};
