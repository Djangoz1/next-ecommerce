"use client";

import { Input } from "@/components/form/input";
import { Loader } from "@/components/ui/box/loader";
import { Btn } from "@/components/ui/btn";
import { Switch } from "@/components/ui/btn/switch";
import { Title } from "@/components/ui/typography/title";
import { FormProvider } from "@/context/form";
import { useApi } from "@/hooks/useApi";
import { stripePromise } from "@/services/stripe-js";
import { Item } from "@/types/items";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import { useFormContext } from "react-hook-form";

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
  const { watch } = useFormContext();
  console.log({ data, searchParams });

  const total = (data?.total || 0) / 100;

  return data ? (
    <div className="gap-10 flex flex-col py-20 ">
      <div className="bg-[#F6EFE4] flex justify-between items-center w-full px-3 py-5 border-y">
        <span className="font-light text-foreground">Total de la commande</span>
        <span className="text-2xl font-bold">{total} €</span>
      </div>
      <div className="px-3">
        <Input
          type="email"
          title="Compte"
          placeholder="johndoe@gmail.com"
          id="email"
        />
      </div>
      <div className="flex flex-col border-t py-10 gap-10">
        <div className="flex flex-col px-3">
          <Title className="text-2xl">Livraison</Title>
          <p className="opacity-80 font-light text-s">
            Tu ne trouves pas ton pays ? Contacte-nous
          </p>
        </div>
        <div className="flex flex-col gap-5 px-3">
          <Input title="Pays" id="country" placeholder="France" />
          <Input title="Prénom" id="firstName" placeholder="John" />
          <Input title="Nom" id="lastName" placeholder="Doe" />
          <Input
            title="Adresse"
            id="address"
            placeholder="123 rue de la paix"
          />
          <Input title="Code postal" id="zipcode" placeholder="75000" />
          <Input title="Ville" id="city" placeholder="Paris" />
          <Input
            type="tel"
            title="Téléphone"
            id="phone"
            placeholder="06 06 06 06 06"
          />
        </div>
      </div>
      <div className="flex flex-col px-3">
        <Title className="text-2xl">Mode de livraison</Title>
        <p className="opacity-80 font-light text-s">
          En raison du lancement de la maison, nous démarrons sur le système de
          précommande. Vous recevrez vos articles d'ici 3 mois.
        </p>
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
          <Switch id="newsletter" className="mt-5" />
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
            console.log("newsletter", watch("newsletter"));
            if (watch("newsletter")) {
              fetch(`${process.env.NEXT_PUBLIC_API_URL}/newsletter`, {
                method: "POST",
                body: JSON.stringify({
                  email: watch("email"),
                }),
              });
            }

            const form = {
              email: watch("email"),
              country: watch("country"),
              firstName: watch("firstName"),
              lastName: watch("lastName"),
              address: watch("address"),
              zipcode: watch("zipcode"),
              city: watch("city"),
              phone: watch("phone"),
              stripe_id: searchParams.get("id") as string,
            };

            console.log({ form });

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/buy/`, {
              method: "POST",
              body: JSON.stringify(form),
            });
            const result = await res.json();
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
      <FormProvider
        onSubmit={(e) => {
          const form = e as {
            email: string;
            country: string;
            firstName: string;
            lastName: string;
            address: string;
            zipCode: string;
            city: string;
            phone: string;
          };
          console.log("coucou", form);
        }}
      >
        <Page />
      </FormProvider>
    </Suspense>
  );
};
