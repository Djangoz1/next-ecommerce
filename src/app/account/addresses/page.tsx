"use client";

import { FormAddress } from "@/components/features/account/form-address";
import { ViewAddress } from "@/components/features/account/view-address";
import { BoxEmpty } from "@/components/ui/box/box-empty";
import { Loader } from "@/components/ui/box/loader";

import { Modal } from "@/components/ui/box/modal";
import { Btn } from "@/components/ui/btn";

import { useSession } from "@/context/app";

import { useAddresses } from "@/hooks/accounts/use-addresses";

import React from "react";

const PageAccountAddresses = () => {
  const { user } = useSession();

  const { data, execute, isFetched } = useAddresses({
    enabled: !!user?.id,
    params: {
      user_id: user?.id as string,
    },
  });

  console.log({ addresses: data, isFetched });
  return (
    <>
      {isFetched ? (
        <>
          <div className="flex flex-col divide-y  w-full divide-dashed border-b">
            {data?.length ? (
              data?.map((el, i) => (
                <div
                  key={`address-detail-${el.id}-${i}`}
                  className="flex flex-col gap-5 w-full p-5"
                >
                  {el.default ? (
                    <p className="uppercase font-bold text-sm">
                      Adresse par défaut
                    </p>
                  ) : null}
                  <ViewAddress data={el} id={`${i}`} />
                  <div className="flex flex-row gap-5">
                    <Modal
                      btnProps={{
                        size: "xs",
                        className: "w-32",
                        children: "Modifier",
                        variant: "primary",
                      }}
                      // className="px-5"
                    >
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="w-full "
                      >
                        <FormAddress data={el} />
                      </div>
                    </Modal>
                    <Btn
                      onClick={() => {
                        execute({ method: "DELETE", id: el.id });
                      }}
                      className="w-32"
                      size="xs"
                    >
                      Supprimer
                    </Btn>
                  </div>
                </div>
              ))
            ) : (
              <BoxEmpty text="Vous n'avez pas encore renseigné d'adresse" />
            )}
          </div>
          <Modal
            btnProps={{
              size: "sm",
              className: "mt-20 min-w-80 mx-auto",
              children: "Ajouter une adresse",
              variant: "primary",
            }}
          >
            <FormAddress className="px-10" data={undefined} />
          </Modal>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default PageAccountAddresses;
