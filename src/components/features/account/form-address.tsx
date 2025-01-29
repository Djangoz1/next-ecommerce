"use client";

import { Input } from "@/components/form/input";
import { useModal } from "@/components/ui/box/modal";
import { Btn } from "@/components/ui/btn";

import { Switch } from "@/components/ui/btn/switch";
import { useSession } from "@/context/app";
import { FormProvider } from "@/context/form";
import { GetAddressesHook, useAddresses } from "@/hooks/accounts/use-addresses";
import { cn } from "@/utils/cn";

export const FormAddress = ({
  data,
  className = "",
}: {
  data?: GetAddressesHook[0];
  className?: string;
}) => {
  const { user } = useSession();

  const { execute } = useAddresses({
    enabled: false,
    params: {
      address_id: data?.id,
    },
  });

  const { isOpen, setIsOpen } = useModal();
  console.log({ isOpen, setIsOpen });
  return (
    <>
      <FormProvider
        className={cn("flex flex-col px-5 gap-10", className)}
        onSubmit={async ({ ...e }) => {
          if (!user) return;

          let res = await execute({
            first_name: e.first_name as string,
            last_name: e.last_name as string,
            zipcode: e.zipcode as string,
            city: e.city as string,
            country: e.country as string,
            address: e.address as string,
            detail: e?.detail as string,
            province: e?.province as string,
            company: e?.company as string,
            default: e?.default as boolean,
            method: data ? "PUT" : "POST",
          });
          console.log({ res, isOpen });
          setIsOpen(false);
        }}
      >
        <div className="flex gap-10">
          <Input
            defaultValue={
              data?.first_name || user?.user_metadata?.name.split(" ")[0] || ""
            }
            title="Prénom"
            placeholder={"John"}
            id={"first_name"}
          />
          <Input
            defaultValue={
              data?.last_name || user?.user_metadata?.name.split(" ")[1] || ""
            }
            placeholder="Doe"
            title={"Nom"}
            id={"last_name"}
          />
        </div>
        <Input
          defaultValue={data?.address}
          required
          placeholder="122 rue de la Paix"
          title={"Adresse"}
          id={"address"}
        />
        <div className="flex gap-10">
          <Input
            defaultValue={data?.detail || ""}
            title="Complément d'addresse"
            placeholder={"Optionnel"}
            id={"detail"}
          />
          <Input
            defaultValue={data?.company || ""}
            placeholder="Amazon"
            title={"Optionnel"}
            id={"company"}
          />
        </div>
        <div className="flex gap-10">
          <Input
            defaultValue={data?.city || ""}
            required
            placeholder="Paris"
            title={"Ville"}
            id={"city"}
          />
          <Input
            defaultValue={data?.zipcode || ""}
            required
            placeholder="75000"
            title={"Code postal"}
            id={"zipcode"}
          />
        </div>
        <div className="flex gap-10">
          <Input
            defaultValue={data?.country || ""}
            required
            placeholder="France"
            title={"Pays"}
            id={"country"}
          />
          <Input
            defaultValue={data?.province || ""}
            required
            placeholder="Ile-de-France"
            title={"Région"}
            id={"province"}
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-muted-foreground text-xs font-light">
            Définir comme addresse par défaut
          </p>
          <Switch checked={data?.default} id="default" />
        </div>

        <Btn className="w-full" type="submit" variant="primary">
          {data ? "Mettre à jour" : "Ajouter"}
        </Btn>
      </FormProvider>
    </>
  );
};
