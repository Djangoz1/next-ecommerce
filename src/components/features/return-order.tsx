"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Title } from "../ui/typography/title";
import { Input } from "../form/input";
import { FormProvider } from "@/context/form";
import { Btn } from "../ui/btn";
export const ReturnOrder = () => {
  return (
    <>
      <div className="flex flex-col gap-5">
        <h6 className="text-lg font-bold">Demande de retour</h6>

        <p className="text-muted-foreground font-light text-xs">
          Entrez votre commande et votre email / numéro de suivi pour démarrer
          votre demande de retour
        </p>

        <FormProvider className="gap-3 flex flex-col" onSubmit={() => {}}>
          <div className="flex flex-col gap-2">
            <b>Numéro de commande</b>
            <Input id="order" placeholder="EA00001" />
          </div>

          <div className="flex flex-col gap-2">
            <b>Email</b>
            <Input id="email" placeholder="Email" />
          </div>
          <Btn size="sm" className="w-full" variant="secondary" type="submit">
            Trouver ma commande
          </Btn>
        </FormProvider>
      </div>
    </>
  );
};
