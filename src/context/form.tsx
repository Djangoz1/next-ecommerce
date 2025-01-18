"use client";
import React, { FormEvent, ReactNode } from "react";

import {
  FieldValues,
  FormProvider as ReactFormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

export function FormProvider({
  children,
  onSubmit,
  onChange,
  className,
  formRef,
}: {
  formRef?: React.RefObject<HTMLFormElement>;
  className?: string;
  onSubmit: (e: SubmitHandler<FieldValues>) => any;
  children: ReactNode;
  onChange?: (e: FormEvent<HTMLFormElement>) => any;
}) {
  const handleSubmit = (e: SubmitHandler<FieldValues>) => {
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
            if (onChange) onChange(methods.getValues() as any);
          }}
          onSubmit={methods.handleSubmit(handleSubmit as any)}
        >
          {children}
        </form>
      </ReactFormProvider>
    </>
  );
}
