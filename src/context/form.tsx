"use client";
import React, { ReactNode } from "react";

import { FormProvider as ReactFormProvider, useForm } from "react-hook-form";

export function FormProvider({
  children,
  onSubmit,
  onChange,
  className,
  formRef,
}: {
  formRef?: React.RefObject<HTMLFormElement>;
  className?: string;
  onSubmit: (e: Record<string, string | number | boolean | string[]>) => void;
  children: ReactNode;
  onChange?: (e: Record<string, string | number | boolean | string[]>) => void;
}) {
  const handleSubmit = (
    e: Record<string, string | number | boolean | string[]>
  ) => {
    console.log("Form submitted", e);

    onSubmit(e);
  };
  const methods = useForm();

  return (
    <>
      <ReactFormProvider {...methods}>
        <form
          ref={formRef}
          className={className}
          onChange={() => {
            if (onChange) onChange(methods.getValues());
          }}
          onSubmit={methods.handleSubmit(handleSubmit)}
        >
          {children}
        </form>
      </ReactFormProvider>
    </>
  );
}
