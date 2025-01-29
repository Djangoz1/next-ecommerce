"use client";

import { FormAddress } from "@/components/features/account/form-address";

import { Modal } from "@/components/ui/box/modal";
import { Btn } from "@/components/ui/btn";

import { BtnMenu } from "@/components/ui/btn/btn-menu";

import { useSession } from "@/context/app";

import { useAddresses } from "@/hooks/accounts/use-addresses";

import React from "react";

const PageAccountLogin = () => {
  const { user } = useSession();

  const { data, execute } = useAddresses({
    enabled: !!user?.id,
    params: {
      user_id: user?.id as string,
    },
  });
  console.log({ addresses: data });
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

      <div className="flex flex-col divide-y  w-full divide-dashed">
        {data?.map((el, i) => (
          <div
            key={`address-detail-${el.id}-${i}`}
            className="flex flex-col gap-5 w-full p-5"
          >
            {el.default ? (
              <p className="uppercase font-bold">Adresse par défaut</p>
            ) : null}
            <div className="flex flex-col">
              {[
                user?.user_metadata.name,
                ...(el.company ? [el.company] : []),
                el.address,
                ...(el.detail ? [el.detail] : []),
                `${el.zipcode} ${el.city}`,
                el.country,
              ].map((el, j) => (
                <p
                  key={`address-detail-${el.id}-${i}-${j}`}
                  className="text-muted-foreground text-xs font-light"
                >
                  {el}
                </p>
              ))}
            </div>
            <div className="flex flex-row gap-5">
              <Modal classNameBtn="w-32" btn={"Modifier"}>
                <FormAddress data={el} />
              </Modal>
              <Btn
                onClick={() => {
                  execute({ method: "DELETE", id: el.id });
                }}
                className="w-32"
                size="sm"
              >
                Supprimer
              </Btn>
            </div>
          </div>
        ))}

        <Modal classNameBtn=" mt-40 mx-auto" btn={"Ajouter une adresse"}>
          <FormAddress className="px-10" data={undefined} />
        </Modal>
      </div>
    </div>
  );
};

export default PageAccountLogin;
