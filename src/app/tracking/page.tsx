"use client";

import { Input } from "@/components/form/input";

import { Tabs } from "@/components/ui/box/tabs";
import { Btn } from "@/components/ui/btn";
import { Title } from "@/components/ui/typography/title";
import { FormProvider } from "@/context/form";

import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

const Page = () => {
  const searchParams = useSearchParams();

  return (
    <div className="flex pt-10 flex-col min-h-screen divide-y">
      <div className="flex flex-col w-full px-5 py-10 pb-5 gap-5 text-center items-center">
        <Title className="xl:text-8xl text-4xl">
          Suivre ma <br /> commande
        </Title>

        <span className="text-sm text-muted-foreground font-light">
          Recherche par n° de suivi
        </span>
      </div>
      <FormProvider
        className="flex flex-col gap-5 items-center p-5 py-10"
        onSubmit={() => {}}
      >
        <Input
          title="N° de suivi"
          name="tracking"
          id="tracking"
          type="text"
          placeholder="1234567890"
        />
        <Btn className="w-full" size="sm" variant="primary" type="submit">
          Chercher
        </Btn>
      </FormProvider>
    </div>
  );
};

const WrappedPage = () => (
  <Suspense fallback={<div>Loading ...</div>}>
    <Page />
  </Suspense>
);

export default WrappedPage;
