"use client";

import { FormAddress } from "@/components/features/account/form-address";
import { ViewAddress } from "@/components/features/account/view-address";
import { ItemTx } from "@/components/features/items/item-tx";
import { ViewOrderItem } from "@/components/features/items/view-order-item";
import { Input } from "@/components/form/input";

import { Loader } from "@/components/ui/box/loader";
import { Modal } from "@/components/ui/box/modal";
import { Btn } from "@/components/ui/btn";
import { Switch, SwitchPrimitive } from "@/components/ui/btn/switch";
import { Title } from "@/components/ui/typography/title";
import { useSession } from "@/context/app";
import { FormProvider } from "@/context/form";

import { useAddresses } from "@/hooks/accounts/use-addresses";
import { useNeedAuth } from "@/hooks/accounts/use-need-auth-redirect";
import { useNewsletter } from "@/hooks/accounts/use-newsletter";
import { useGetTx } from "@/hooks/items/use-get-tx";
import { usePendingItems } from "@/hooks/items/use-pending-items";
import { useApi } from "@/hooks/useApi";
import { useAsyncApi } from "@/hooks/useAsyncApi";
import { stripePromise } from "@/services/stripe-js";
import { Address } from "@/types/customer";
import { Item } from "@/types/items";
import { cn } from "@/utils/cn";
import { Icon } from "@iconify/react/dist/iconify.js";
import { redirect } from "next/navigation";

import React, { Suspense, useState } from "react";
// import { useFormContext } from "react-hook-form";

const Page = () => {
  const { data, isFetched } = usePendingItems();
  const { user } = useSession();

  const tx = useGetTx({ items: data });
  // const { watch, setValue } = useFormContext();
  useNeedAuth();

  const { mutateAsync, isPending } = useAsyncApi({});
  const { data: coupon, mutateAsync: mutateCoupon } = useAsyncApi({});

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

  if (!isFetched) return <Loader />;

  if (!data?.length) redirect("/shop/dress");

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
      <div className="bg-secondary flex justify-between items-center w-full px-3 py-5 border-y ">
        <span className="font-medium uppercase text-foreground text-sm">
          Total de la commande
        </span>
        <span className="text-2xl font-bold">{tx?.net} €</span>
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
      <div className="flex flex-col border-t py-10  px-3">
        <div className="flex flex-col">
          <Title className="text-2xl">Résumé de la commande</Title>
        </div>
        <div className="flex flex-col divide-y divide-dashed">
          {data.map((item, i) => (
            <ViewOrderItem key={`order-item-${i}`} item={item} />
          ))}
        </div>

        <div className="py-5 w-full flex flex-col gap-2 text-sm mt-5">
          {coupon ? (
            <div
              className={cn(
                "flex relative w-full flex-col border-y rounded py-5",
                !coupon.valid ? "opacity-50" : "opacity-100"
              )}
            >
              <p>
                <b>{coupon.name}</b>
              </p>
              <p className="text-muted-foreground font-medium">
                {coupon.percent_off
                  ? `${coupon.percent_off}%`
                  : `${coupon.amount_off}€`}
              </p>
              <p className="absolute right-5 top-1/2">
                {coupon.valid ? (
                  <Icon icon="mdi:check" />
                ) : (
                  <Icon icon="mdi:close" />
                )}
              </p>
            </div>
          ) : (
            <FormProvider
              className="mb-2"
              onSubmit={async (e) => {
                mutateCoupon({
                  path: `/stripe/${e.promo}`,
                  method: "GET",
                  params: {},
                });
              }}
            >
              <Input
                isLoading={isPending}
                required
                submit
                onChange={(e) => {
                  console.log({ e });
                  const id = e as string;
                  if (id.length === 8) {
                    mutateCoupon({
                      path: `/stripe/${id}`,
                      method: "GET",
                      params: {},
                    });
                  }
                }}
                id="promo"
                defaultValue={""}
                placeholder="Code promo"
              />
            </FormProvider>
          )}

          <ItemTx tx={tx} coupon={coupon} />
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
              items: data.map((el) => ({
                id: el.id,
                size: el.size,
                quantity: el.quantity,
              })),

              user_id: user.id,
              coupon_id: coupon?.id,
            };

            console.log({ form });

            const result = await mutateAsync({
              path: "/buy/checkout",
              method: "POST",
              params: form,
            });

            console.log({ result });
            const stripe = await stripePromise;
            if (!stripe) return;
            await stripe.redirectToCheckout({
              sessionId: result.id,
            });
          }}
        >
          Payer maintenant
        </Btn>
      </div>
      <p className="text-xs font-light  p-5 border-t">
        Les articles soldés ne peuvent pas être retournés en boutique et doivent
        être renvoyés par la voie postale uniquement.
        <br />
        <br />
        Bonne nouvelle : Le montant total que vous payez inclut tous les droits
        de douane et taxes applicables.
      </p>
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
