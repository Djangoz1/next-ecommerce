"use client";

import { Input } from "@/components/form/input";
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
            if (!e.email) throw new Error("Email or password is required");
            const res = await clientDb.auth.resetPasswordForEmail(
              e.email as string,
              {
                redirectTo: `${
                  process.env.APP_URL || "http://localhost:3000"
                }/auth/reset-password`,
              }
            );
            console.log({ logRes: res });
            if (res.error) throw new Error(res.error.message);
          }}
          className="flex flex-col gap-5 w-full py-5 "
        >
          <h6 className="text-center  w-full font-light uppercase">
            <b className="font-medium text-2xl">Mot de passe</b>
            <br />
            oublié
          </h6>
          <p className="text-center text-xs font-light text-muted-foreground">
            Veuillez entrer votre email ci-dessous pour recevoir un lien et
            réinitialiser votre mot de passe.
          </p>

          <Input required id="email" placeholder="Addresse email" />

          <Btn type="submit" variant="primary" size="sm" className="w-full">
            Valider
          </Btn>
          <div className="flex justify-between w-full text-muted-foreground">
            <Btn variant="link" size="sm" href="/auth/sign-in">
              Se connecter
            </Btn>
            <Btn variant="link" size="sm" href="/auth/register">
              Créer un compte
            </Btn>
          </div>
        </FormProvider>
      </div>
    </div>
  );
};

export default PageAuthSignIn;
