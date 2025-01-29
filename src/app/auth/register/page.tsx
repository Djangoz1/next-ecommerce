"use client";
import { Logo } from "@/components/app/logo";
import { Input } from "@/components/form/input";
import { BoxCascade } from "@/components/ui/box/box-cascade";
import { Btn } from "@/components/ui/btn";
import { Switch } from "@/components/ui/btn/switch";
import { Title } from "@/components/ui/typography/title";
import { FormProvider } from "@/context/form";
import { useNeedNotAuth } from "@/hooks/accounts/use-need-not-auth";

import { useAsyncApi } from "@/hooks/useAsyncApi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const PageAccountLogin = () => {
  const { data, mutateAsync, ...rest } = useAsyncApi({
    path: "/auth/sign-in",
  });
  useNeedNotAuth();
  const router = useRouter();

  return (
    <div className="w-full relative min-h-screen flex xl:flex-row flex-col xl:justify-between">
      <Image
        src={"/model/1.jpg"}
        alt="model"
        width={1000}
        height={1000}
        className="xl:absolute top-0 left-0 h-[300px] w-screen xl:h-full object-cover"
      />

      <div className="flex  absolute top-0 left-0 h-[300px] text-white  xl:h-full xl:w-1/2 w-full flex-col justify-center items-center">
        <Logo className="" />
        <Title className="">Se connecter</Title>
      </div>

      <div className="flex   flex-col xl:w-1/3 w-full p-5 bg-background shadow pt-20 h-full">
        <FormProvider
          onSubmit={async (e) => {
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

            if (data.refresh_token) {
              localStorage.setItem("token", data.refresh_token);
            }
            // router.push("/account");

            console.log({ data, rest });
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
          <Input
            required
            id="password"
            type="password"
            title="Mot de passe"
            placeholder="********"
          />

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
            <Btn variant="link" size="xs" href="/account/login">
              J'ai déjà un compte
            </Btn>
          </div>
        </FormProvider>
      </div>
    </div>
  );
};

export default PageAccountLogin;
