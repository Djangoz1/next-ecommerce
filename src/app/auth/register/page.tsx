"use client";
import { Logo } from "@/components/app/logo";
import { Input } from "@/components/form/input";
import { InputPassword } from "@/components/form/input-password";
import { BoxCascade } from "@/components/ui/box/box-cascade";
import { Btn } from "@/components/ui/btn";
import { Switch } from "@/components/ui/btn/switch";
import { Title } from "@/components/ui/typography/title";
import { FormProvider } from "@/context/form";
import { useNeedNotAuth } from "@/hooks/accounts/use-need-not-auth";
import { useToast } from "@/hooks/use-toast";

import { useAsyncApi } from "@/hooks/useAsyncApi";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const PageAccountLogin = () => {
  const { data, mutateAsync, ...rest } = useAsyncApi({
    path: "/auth/sign-in",
  });
  useNeedNotAuth();
  const { toast } = useToast();

  return (
    <div className="w-full relative min-h-screen flex xl:flex-row flex-col xl:justify-between">
      <div className="flex   flex-col xl:w-1/3 w-full p-5 bg-background shadow pt-20 h-full">
        <FormProvider
          onSubmit={async (e) => {
            if (e.password !== e.repassword) {
              toast({
                title: "Mot de passe incorrect",
                description: "Les mots de passe ne correspondent pas",
                variant: "destructive",
              });
              return;
            }
            const { data, ...rest } = await mutateAsync({
              path: "/auth/sign-in",
              params: {
                ...e,
                name: `${e.firstname} ${e.lastname}`,
                email: e.email,
                password: e.password,
              },
              toast: {
                title: "Compte créé",
                description: "Vous allez recevoir un email de confirmation",
              },
            });

            console.log({ data, rest });
            if (data?.refresh_token) {
              localStorage.setItem("token", data.refresh_token);
            }
            // router.push("/account");
          }}
          className="flex flex-col gap-5 w-full py-5 "
        >
          <h6 className="text-center  w-full uppercase font-light ">
            Créer un nouveau
            <br />
            <span className="font-medium text-2xl">Compte client</span>
          </h6>

          <Input title="Prénom" required id="firstname" placeholder="John" />
          <Input title="Nom" required id="lastname" placeholder="Doe" />
          <Input
            title="Addresse email"
            required
            type="email"
            id="email"
            placeholder="john.doe@gmail.com"
          />

          <InputPassword id="password" />
          <InputPassword id="repassword" />

          <BoxCascade
            classNameBox="px-0  border-y"
            title="Indiquez vos informations"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex flex-col gap-5"
            >
              <Input
                title="Adresse"
                required
                id="address"
                placeholder="123 rue de la paix"
              />
              <Input
                title="Code postal"
                required
                type="number"
                id="zipcode"
                placeholder="75000"
              />
              <Input title="Ville" required id="city" placeholder="Paris" />
              <Input
                title="Téléphone"
                required
                id="phone"
                type="tel"
                placeholder="06 06 06 06 06"
              />
              <Input title="Pays" required id="country" placeholder="France" />
            </div>
          </BoxCascade>
          <p className="font-light text-xs">
            Je souhaite recevoir les actualités et offres exclusives par{" "}
            <b className="font-bold">email</b>:
          </p>
          <Switch id="newsletter" />

          <Btn type="submit" variant="primary" size="sm" className="w-full">
            Créer un compte
          </Btn>
          <div className="flex justify-end w-full text-muted-foreground">
            <Btn variant="link" size="xs" href="/auth/sign-in">
              J'ai déjà un compte
            </Btn>
          </div>
        </FormProvider>
      </div>
    </div>
  );
};

export default PageAccountLogin;
