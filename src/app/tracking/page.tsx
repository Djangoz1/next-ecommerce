"use client";
import { OrderDetails } from "@/components/features/order-details";
import { Input } from "@/components/form/input";
import { Loader } from "@/components/ui/box/loader";
import { Tabs } from "@/components/ui/box/tabs";
import { Btn } from "@/components/ui/btn";
import { Title } from "@/components/ui/typography/title";
import { FormProvider } from "@/context/form";
import { useGetOrders } from "@/hooks/orders/use-get-orders";

import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

const Page = () => {
  const searchParams = useSearchParams();

  const { email, zipcode } = {
    email: searchParams.get("email"),
    zipcode: searchParams.get("zipcode"),
  };

  const router = useRouter();
  return (
    <div className="flex pt-10 flex-col min-h-screen divide-y">
      <div className="flex flex-col w-full px-5 py-10 gap-5 text-center items-center">
        <Title className="xl:text-8xl text-4xl">
          Suivre ma <br /> commande
        </Title>
      </div>

      {email && zipcode ? (
        <Element email={email} zipcode={zipcode} />
      ) : (
        <Tabs
          className="px-5"
          arr={[
            {
              title: "Recherche par email",
              component: (
                <FormProvider
                  className="flex flex-col gap-5 items-center "
                  onSubmit={(e) => {
                    router.push(
                      `/tracking?email=${e.email}&zipcode=${e.zipcode}`
                    );
                  }}
                >
                  <Input
                    title="Adresse email"
                    name="email"
                    id="email"
                    required
                    type="email"
                    placeholder="john@mail.com"
                  />
                  <Input
                    title="Code postal"
                    name="zipcode"
                    id="zipcode"
                    required
                    placeholder="75000"
                  />
                  <Btn className="w-full" type="submit">
                    Chercher
                  </Btn>
                </FormProvider>
              ),
            },
            {
              title: "Recherche par n° de suivi",
              component: (
                <FormProvider
                  className="flex flex-col gap-5 items-center "
                  onSubmit={() => {}}
                >
                  <Input
                    title="N° de suivi"
                    name="tracking"
                    id="tracking"
                    type="text"
                    placeholder="1234567890"
                  />
                  <Btn className="w-full" type="submit">
                    Chercher
                  </Btn>
                </FormProvider>
              ),
            },
          ]}
        />
      )}
    </div>
  );
};

const Element = ({ email, zipcode }: { email: string; zipcode: string }) => {
  const { data, isFetched } = useGetOrders({
    params: { email, zipcode },
  });

  console.log({ data });
  return data?.length ? (
    <div>
      {data?.map((item, i) => (
        <OrderDetails key={`order-${i}`} data={item} />
      ))}
    </div>
  ) : isFetched ? (
    <div className="flex flex-col py-20 items-center text-center gap-4">
      Aucune commande trouvée
      <Btn href="/tracking">Retour</Btn>
    </div>
  ) : (
    <Loader />
  );
};

const WrappedPage = () => (
  <Suspense fallback={<div>Loading ...</div>}>
    <Page />
  </Suspense>
);

export default WrappedPage;
