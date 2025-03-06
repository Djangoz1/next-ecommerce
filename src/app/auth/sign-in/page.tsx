"use client";

import { Input } from "@/components/form/input";
import { InputPassword } from "@/components/form/input-password";
import { Btn } from "@/components/ui/btn";

import { useSession } from "@/context/app";

import { FormProvider } from "@/context/form";
import { useNeedNotAuth } from "@/hooks/accounts/use-need-not-auth";

import { clientDb } from "@/utils/client-db";
import { useRouter } from "next/navigation";

const PageAuthSignIn = () => {
  const { user, refresh } = useSession();
  console.log({ user });
  useNeedNotAuth();
  const router = useRouter();
  return (
    <div className="w-full relative h-screen flex xl:flex-row flex-col xl:justify-between">
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
            if (!res.data.user) throw new Error("User not found");
            refresh();
            router.push("/account");
          }}
          className="flex flex-col gap-5 w-full py-5 "
        >
          <h6 className="text-center  w-full font-light uppercase">
            Clients
            <br />
            <b className="font-medium text-2xl">enregistrés</b>
          </h6>

          <Input required id="email" placeholder="Addresse email" />
          <InputPassword />
          <Btn type="submit" variant="primary" size="sm" className="w-full">
            Se connecter
          </Btn>
          <div className="flex justify-between w-full text-muted-foreground">
            <Btn variant="link" size="sm" href="/auth/register">
              S'inscrire
            </Btn>
            <Btn variant="link" size="sm" href="/auth/recover">
              Mot de passe oublié
            </Btn>
          </div>
        </FormProvider>
      </div>
    </div>
  );
};

export default PageAuthSignIn;
