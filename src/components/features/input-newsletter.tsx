"use client";
import { FormProvider } from "@/context/form";

import { Input } from "../form/input";
import { useAsyncApi } from "@/hooks/useAsyncApi";

export const InputNewsletter = () => {
  const { mutateAsync, data } = useAsyncApi({
    path: "/newsletter",
    method: "POST",
  });
  return (
    <FormProvider
      onSubmit={async (e) => {
        await mutateAsync({
          params: { email: e.email },
          toast: {
            title: "Inscription réussie",
            description: "Merci pour votre inscription à la newsletter !",
          },
        });
      }}
    >
      {data ? (
        <p className="uppercase font-extralight text-sm">
          Merci pour votre inscription à la newsletter !
        </p>
      ) : (
        <Input
          submit
          defaultValue={""}
          placeholder="Addresse email"
          id="email"
        />
      )}
    </FormProvider>
  );
};
