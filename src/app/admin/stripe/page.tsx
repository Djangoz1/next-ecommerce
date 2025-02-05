"use client";
import { Input } from "@/components/form/input";
import { SelectBtn } from "@/components/form/select-btn";
import { Modal } from "@/components/ui/box/modal";
import { Btn } from "@/components/ui/btn";
import { FormProvider } from "@/context/form";
import { useApi } from "@/hooks/useApi";
import { useAsyncApi } from "@/hooks/useAsyncApi";
import React from "react";
import { useFormContext } from "react-hook-form";
import Stripe from "stripe";

const PageStripeManagement = () => {
  const { data } = useApi<Stripe.Coupon[]>({
    path: "/stripe",
    method: "GET",
  });

  const { mutateAsync } = useAsyncApi({
    path: "/stripe",
    method: "POST",
  });
  console.log({ data });
  return (
    <>
      <div className="grid gap-4">
        {data?.map((coupon) => (
          <div key={coupon.id} className="border p-4 rounded">
            <h3 className="font-bold">{coupon.name}</h3>
            <p>
              Réduction:{" "}
              {coupon.percent_off
                ? `${coupon.percent_off}%`
                : `${Number(coupon?.amount_off) / 100}€`}
            </p>
            <p>Durée: {coupon.duration}</p>
            <p>
              Utilisations: {coupon.times_redeemed}/
              {coupon.max_redemptions || "∞"}
            </p>
            <span className="text-xs text-muted-foreground"># {coupon.id}</span>
          </div>
        ))}
      </div>
      <Modal btnProps={{ children: "Créer un coupon" }}>
        <FormProvider
          onSubmit={async ({
            is_amount_off,
            amount_off,
            percent_off,
            is_send_mail,
            ...e
          }) => {
            const res = await mutateAsync({
              params: {
                ...e,
                ...(is_amount_off === "amount_off"
                  ? { amount_off: Number(amount_off) * 100 }
                  : { percent_off: Number(percent_off) }),
                send_mail: is_send_mail === "is_send_mail",
              },
              path: "/stripe",
            });
            console.log({ res });
          }}
          className="flex flex-col gap-5 px-5"
        >
          <Input id="name" name="name" title="Nom" placeholder="Nom" />

          <InputCoupon />
          <SelectBtn
            defaultValue="once"
            arr={[
              { label: "Once", value: "once" },
              { label: "Repeating", value: "repeating" },
              { label: "Forever", value: "forever" },
            ]}
            id="duration"
          />

          <Input
            id="max_redemptions"
            type="number"
            name="max_redemptions"
            title="Nombre max d'utilisations"
            placeholder="Nombre max d'utilisations"
          />
          <Input
            id="expires_at"
            type="date"
            name="expires_at"
            title="Date d'expiration"
            placeholder="Date d'expiration"
          />

          <div className="flex flex-col gap-px">
            <span className="text-xs text-muted-foreground">
              Envoyer un email de réduction à tout les abonnés de la newsletter
            </span>

            <SelectBtn
              defaultValue="is_send_mail"
              arr={[
                { label: "Oui", value: "is_send_mail" },
                { label: "Non", value: "is_not_send_mail" },
              ]}
              id="is_send_mail"
            />
          </div>
          <Btn type="submit">Créer</Btn>
        </FormProvider>
      </Modal>
    </>
  );
};

const InputCoupon = () => {
  const { watch } = useFormContext();
  return (
    <div className="flex flex-col w-full gap-2">
      {watch("is_amount_off") === "amount_off" ? (
        <Input
          id="amount_off"
          type="number"
          name="amount_off"
          title="Montant"
          placeholder="Montant en €"
        />
      ) : (
        <Input
          id="percent_off"
          type="number"
          name="percent_off"
          title="Pourcentage"
          placeholder="Réduction en %age"
        />
      )}
      <div className="flex flex-col gap-px">
        <span className="text-xs text-muted-foreground">
          Réduction en pourcentage
        </span>

        <SelectBtn
          defaultValue="amount_off"
          arr={[
            { label: "Montant", value: "amount_off" },
            { label: "Pourcentage", value: "percent_off" },
          ]}
          id="is_amount_off"
        />
      </div>
    </div>
  );
};

export default PageStripeManagement;
