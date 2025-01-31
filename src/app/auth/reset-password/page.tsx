"use client";

import { Input } from "@/components/form/input";
import { Btn } from "@/components/ui/btn";

import { useSession } from "@/context/app";

import { FormProvider } from "@/context/form";
import { useNeedNotAuth } from "@/hooks/accounts/use-need-not-auth";

import { clientDb } from "@/utils/client-db";
import { useRouter } from "next/navigation";

const PageAuthResetPassword = () => {
  const { user, refresh } = useSession();
  console.log({ user });
  useNeedNotAuth();

  return (
    <div className="w-full relative h-screen flex xl:flex-row flex-col xl:justify-between">
      <div className="flex   flex-col xl:w-1/3 w-full p-5 bg-background shadow pt-20 h-full">
        <FormProvider
          onSubmit={async (e) => {
            if (!e.password) throw new Error("Password is required");
            if (e.password !== e.password_confirm)
              throw new Error("Passwords do not match");
            const res = await clientDb.auth.updateUser({
              password: e.password as string,
            });
            console.log({ logRes: res });
            if (res.error) throw new Error(res.error.message);
            refresh();
          }}
          className="flex flex-col gap-5 w-full py-5 "
        >
          <h6 className="text-center  w-full font-light uppercase">
            Récupérer votre
            <br />
            <b className="font-medium text-2xl">mot de passe</b>
          </h6>

          <Input
            required
            type="password"
            id="password"
            placeholder="Mot de passe"
          />
          <Input
            required
            id="password_confirm"
            type="password"
            placeholder="Confirmer mot de passe"
          />
          <Btn type="submit" variant="primary" size="sm" className="w-full">
            Valider
          </Btn>
        </FormProvider>
      </div>
    </div>
  );
};

export default PageAuthResetPassword;
