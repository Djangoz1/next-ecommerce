"use client";

import { Input } from "@/components/form/input";
import { Btn } from "@/components/ui/btn";
import { BtnMenu } from "@/components/ui/btn/btn-menu";
import { useSession } from "@/context/app";
import { FormProvider } from "@/context/form";

import { clientDb } from "@/utils/client-db";
import React from "react";

const PageAccountLogin = () => {
  const { user, refresh } = useSession();

  return (
    <div className="w-full relative min-h-screen flex xl:flex-row flex-col xl:justify-between py-20 gap-20">
      <BtnMenu
        arr={[
          { label: "Mon profil", value: "/account" },
          { label: "Mes adresses", value: "/account/addresses" },
          { label: "Mes commandes", value: "/account/orders" },
          { label: "Déconnexion", value: "/account/logout" },
        ]}
      />
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

          refresh();
        }}
      >
        <Input
          defaultValue={user?.user_metadata?.address}
          required
          placeholder="122 rue de la Paix"
          title={"Adresse"}
          id={"address"}
        />
        <div className="flex gap-10">
          <Input
            defaultValue={user?.user_metadata?.city}
            required
            placeholder="Paris"
            title={"Ville"}
            id={"city"}
          />
          <Input
            defaultValue={user?.user_metadata?.zipcode}
            required
            placeholder="75000"
            title={"Code postal"}
            id={"zipcode"}
          />
        </div>
        <Input
          defaultValue={user?.user_metadata?.country}
          required
          placeholder="France"
          title={"Pays"}
          id={"country"}
        />

        <Btn className="w-full" type="submit" variant="primary">
          Mettre à jour
        </Btn>
      </FormProvider>
    </div>
  );
};

export default PageAccountLogin;
