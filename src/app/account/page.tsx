"use client";

import { Input } from "@/components/form/input";
import { Btn } from "@/components/ui/btn";
import { BtnMenu } from "@/components/ui/btn/btn-menu";
import { Switch } from "@/components/ui/btn/switch";
import { useSession } from "@/context/app";
import { FormProvider } from "@/context/form";
import { useNewsletter } from "@/hooks/accounts/use-newsletter";
import { useToast } from "@/hooks/use-toast";

import { useAsyncApi } from "@/hooks/useAsyncApi";

import { clientDb } from "@/utils/client-db";

import React from "react";

const PageAccount = () => {
  const { mutateAsync } = useAsyncApi({});

  const { user, refresh } = useSession();

  const { data: newsletter } = useNewsletter({
    params: {},
  });
  const { toast } = useToast();
  console.log({ newsletter, user });

  return (
    <div className="py-10">
      <FormProvider
        className="flex flex-col gap-10 px-5"
        onSubmit={async ({ firstName, lastName, ...e }) => {
          if (!user) return;

          const { data, error } = await clientDb.auth.updateUser({
            data: {
              phone: e.phone,
              name: `${e.firstname} ${e.lastname}`,
              birthday: e.birthday,
            },
          });

          if (error)
            throw new Error(`Error set account data : ${error.message}`);

          if (e["newsletter-switch"] && !newsletter) {
            await mutateAsync({
              path: "/newsletter",
              params: {
                email: data?.user.email,
              },
              invalidateQueries: [["api", "/newsletter/" + data?.user.email]],
            });
          }

          refresh();
          await toast({
            description: "Vos informations ont été mises à jour",
          });
        }}
      >
        <Input
          defaultValue={user?.user_metadata?.name?.split(" ")?.[0]}
          required
          placeholder="John"
          title={"Prénom"}
          id={"firstname"}
        />
        <Input
          defaultValue={user?.user_metadata?.name?.split(" ")?.[1]}
          title={"Nom"}
          id={"lastname"}
          placeholder={"Doe"}
          required
        />
        <Input
          defaultValue={user?.user_metadata?.birthday}
          title={"Date de naissance"}
          placeholder={"12/12/1990"}
          id={"birthday"}
          type="date"
        />
        <Input
          defaultValue={user?.user_metadata?.phone}
          title={"Téléphone"}
          placeholder={"06 06 06 06 06"}
          id={"phone"}
          type="tel"
        />
        <Input
          title={"Email"}
          id={"account-email"}
          defaultValue={user?.email}
        />
        <div className="flex flex-col gap-1">
          <p className="font-light text-xs text-muted-foreground">
            Je souhaite recevoir les actualités et offres exclusives par
            <b>sms</b>
          </p>
          <Switch checked={!!newsletter} id={"newsletter-switch"} />
        </div>

        <Btn className="w-full" type="submit" variant="primary">
          Mettre à jour
        </Btn>
        <p className="text-xs text-muted-foreground font-extralight text-center">
          En vous inscrivant, vous acceptez de recevoir la newsletter de Rouje
          et/ou les Filles en Rouje. Pour plus d’informations sur la façon dont
          nous traitons vos informations, vous pouvez consulter notre politique
          de confidentialité.
          <br />
          <br />
          Conformément à la réglementation, vous disposez d'un droit d'accès, de
          rectification, de portabilité, d'effacement de vos données en envoyant
          votre demande à dpo@rouje.com.
        </p>
      </FormProvider>
    </div>
  );
};

export default PageAccount;
