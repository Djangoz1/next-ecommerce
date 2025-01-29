"use client";
import { Logo } from "@/components/app/logo";
import { Input } from "@/components/form/input";
import { Btn } from "@/components/ui/btn";
import { Title } from "@/components/ui/typography/title";
import { useSession } from "@/context/app";

import { FormProvider } from "@/context/form";
import { useNeedNotAuth } from "@/hooks/accounts/use-need-not-auth";

import { clientDb } from "@/utils/client-db";
import Image from "next/image";

const PageAuthSignIn = () => {
  const { user, refresh } = useSession();
  console.log({ user });
  useNeedNotAuth();

  return (
    <div className="w-full relative h-screen flex xl:flex-row flex-col xl:justify-between">
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
            if (!e.email || !e.password)
              throw new Error("Email or password is required");
            const res = await clientDb.auth.signInWithPassword({
              email: e.email as string,
              password: e.password as string,
            });
            console.log({ logRes: res });
            if (res.error) throw new Error(res.error.message);
            refresh();
          }}
          className="flex flex-col gap-5 w-full py-5 "
        >
          <h6 className="text-center  w-full font-light uppercase">
            Clients
            <br />
            <b className="font-medium text-2xl">enregistrés</b>
          </h6>

          <Input required id="email" placeholder="Addresse email" />
          <Input
            required
            id="password"
            type="password"
            placeholder="Mot de passe"
          />
          <Btn type="submit" variant="primary" size="sm" className="w-full">
            Se connecter
          </Btn>
          <div className="flex justify-between w-full text-muted-foreground">
            <Btn variant="link" size="sm" href="/account/sign-in">
              S'inscrire
            </Btn>
            <Btn variant="link" size="sm" href="/account/register">
              Mot de passe oublié
            </Btn>
          </div>
        </FormProvider>
      </div>
    </div>
  );
};

export default PageAuthSignIn;
