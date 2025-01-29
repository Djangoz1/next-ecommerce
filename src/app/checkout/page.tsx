"use client";

import { FormAddress } from "@/components/features/account/form-address";
import { ViewAddress } from "@/components/features/account/view-address";

import { Loader } from "@/components/ui/box/loader";
import { Modal } from "@/components/ui/box/modal";
import { Btn } from "@/components/ui/btn";
import { Switch, SwitchPrimitive } from "@/components/ui/btn/switch";
import { Title } from "@/components/ui/typography/title";
import { useSession } from "@/context/app";

import { useAddresses } from "@/hooks/accounts/use-addresses";
import { useNewsletter } from "@/hooks/accounts/use-newsletter";
import { useApi } from "@/hooks/useApi";
import { useAsyncApi } from "@/hooks/useAsyncApi";
import { stripePromise } from "@/services/stripe-js";
import { Address } from "@/types/customer";
import { Item } from "@/types/items";
import { cn } from "@/utils/cn";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useState } from "react";
// import { useFormContext } from "react-hook-form";

const Page = () => {
  const searchParams = useSearchParams();
  const { data, isFetched } = useApi<{
    items: (Item & { size: string })[];
    total: number;
  }>({
    path: "/buy/checkout",
    method: "GET",
    params: {
      id: searchParams.get("id") as string,
    },
  });
  const { user } = useSession();
  // const { watch, setValue } = useFormContext();
  console.log({ data, searchParams });

  const { mutateAsync } = useAsyncApi({});

  const { data: newsletter } = useNewsletter({
    params: {},
  });

  const { data: addresses } = useAddresses({
    params: {
      user_id: user?.id,
    },
  });

  const [isData, setIsData] = useState<{
    address_id: Address["id"] | null;
    newsletter: boolean;
  }>({
    address_id: null,
    newsletter: !!newsletter,
  });
  const total = (data?.total || 0) / 100;

  return data ? (
    <div className=" flex flex-col py-20 ">
      <div className="px-3 flex justify-between w-full pb-10">
        <div className="flex flex-col gap-">
          <p className="w-full uppercase font-medium">
            Hello,
            <br />
            <b>{user?.user_metadata?.name}</b>
          </p>
          <span className="flex items-center gap-2 text-sm">
            <Icon icon={"mdi:email"} />
            <span className="text-muted-foreground font-light">
              {user?.email}
            </span>
          </span>
        </div>
        <Btn className="whitespace-nowrap" size="xs" onClick={() => {}}>
          Changer de compte
        </Btn>
      </div>
      <div className="bg-secondary flex justify-between items-center w-full px-3 py-5 border-y">
        <span className="font-medium uppercase text-foreground">
          Total de la commande
        </span>
        <span className="text-2xl font-bold">{total} €</span>
      </div>
      <div className="flex flex-col border-t py-10 gap-10">
        <div className="flex flex-col px-3">
          <Title className="text-2xl">Livraison</Title>
          <p className="text-muted-foreground font-light text-sm w-2/3">
            En raison du lancement de la maison, nous démarrons sur le système
            de précommande. Vous recevrez vos articles d'ici 3 mois.
          </p>
        </div>

        <div className="flex flex-col divide-y divide-d">
          {!addresses?.length ? (
            <p className="p-20 w-full uppercase text-muted-foreground text-sm font-medium text-center">
              Aucune addresse trouvée
            </p>
          ) : (
            addresses?.map((el, i) => (
              <div
                key={`address-customer-${el.id}-${i}`}
                className={cn(
                  "flex flex-col gap-5 w-full p-5 "
                  // watch("address_id") === el.id ||
                  //   (!watch("address_id") && el.default)
                  //   ? "bg-black text-white"
                  //   : ""
                )}
              >
                <ViewAddress data={el} id={`${i}`} />
                <Btn
                  className="min-w-32 text-xs whitespace-nowrap"
                  onClick={() => setIsData({ ...isData, address_id: el.id })}
                  size="sm"
                  {...(isData.address_id === el.id ||
                  (!isData.address_id && el.default)
                    ? {
                        variant: "primary",

                        children: <Icon icon="mdi:check" />,
                      }
                    : { variant: "secondary", children: "Choisi" })}
                />
              </div>
            ))
          )}

          <Modal
            btnProps={{
              children: "Ajouter une adresse",
              variant: "primary",
              className: "w-80 mx-auto",
            }}
          >
            <FormAddress />
          </Modal>
        </div>
      </div>

      <div className="flex flex-col border-t px-3 py-10 gap-10">
        <div className="flex flex-col ">
          <Title className="text-2xl">Paiement</Title>
          <p className="opacity-80 font-light text-s">
            Toutes les transactions sont sécurisées par Stripe.
          </p>
        </div>
        <Btn className="flex items-center gap-2 w-full">
          <Icon icon="mdi:credit-card" />
          Carte de crédit
        </Btn>
      </div>
      <div className="flex flex-col border-t px-3 py-10 gap-10">
        <div className="flex flex-col ">
          <Title className="text-2xl">Newsletter</Title>

          <p className="opacity-80 font-light text-s">
            Restez informé de nos nouveautés, promotions et évènements de la
            Maison Ormés.
          </p>
          <SwitchPrimitive
            _value={isData.newsletter as boolean}
            setValue={(value) => setIsData({ ...isData, newsletter: value })}
            id="newsletter"
            className="mt-5"
            defaultChecked={!!newsletter}
          />
        </div>
      </div>
      <div className="flex flex-col border-t py-10 gap-10 px-3">
        <div className="flex flex-col">
          <Title className="text-2xl">Résumé de la commande</Title>
        </div>
        <div className="flex w-full gap-5">
          <div className="relative">
            <Image
              src={data?.items[0].main_image}
              alt={data?.items[0].name}
              width={100}
              height={100}
            />
            <span className="absolute w-10 h-10 bg-black text-white flex items-center justify-center rounded-full shadow-sm top-0 right-0 translate-x-1">
              {data?.items?.length}
            </span>
          </div>
          <div className="flex flex-col">
            <Title className="text-xl">{data?.items[0].name}</Title>
            <p className="opacity-80 font-light text-s">
              Taille : {data?.items[0].size}
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <Title className="text-xl">Expédition</Title>
          <p className="opacity-80 font-light text-s">
            {total > 250 ? 0 : 25} €
          </p>
        </div>
        <div className="flex justify-between items-center">
          <Title className="text-xl">Total</Title>
          <p className="opacity-80 font-light text-s">
            {total > 250 ? total : total + 25} €
          </p>
        </div>

        <Btn
          variant="primary"
          className="w-full text-center"
          onClick={async () => {
            if (!user) throw new Error("Required authenticated user");
            if (isData.newsletter && !newsletter) {
              fetch(`${process.env.NEXT_PUBLIC_API_URL}/newsletter`, {
                method: "POST",
                body: JSON.stringify({
                  email: user?.email,
                }),
              });
            }

            const form = {
              address_id:
                isData.address_id || addresses?.find((el) => el.default)?.id,
              // message: "",
              stripe_id: searchParams.get("id") as string,
              user_id: user.id,
            };

            console.log({ form });

            const result = await mutateAsync({
              path: "/buy",
              method: "POST",
              params: form,
            });

            console.log({ result });
            const stripe = await stripePromise;
            if (!stripe) return;
            await stripe.redirectToCheckout({
              sessionId: searchParams.get("id") as string,
            });
          }}
        >
          Payer maintenant
        </Btn>
      </div>
    </div>
  ) : isFetched ? (
    <div>Aucune commande trouvée</div>
  ) : (
    <Loader />
  );
};

export default () => {
  return (
    <Suspense fallback={<div>Loading ...</div>}>
      <div>
        <Page />
      </div>
    </Suspense>
  );
};
