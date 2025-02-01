"use client";
import { cn } from "@/utils/cn";
import Image from "next/image";
import React, { ReactNode } from "react";
import { Title } from "../ui/typography/title";
import { Input } from "../form/input";
import { useFormContext } from "react-hook-form";
import { Btn } from "../ui/btn";
import { Textarea } from "../form/textarea";
import { Icon } from "@iconify/react/dist/iconify.js";
import { MultipleInput } from "../form/multiple-input";
import { SelectBtn } from "../form/select-btn";

import { Loader } from "../ui/box/loader";

import { useRouter } from "next/navigation";
import { Badge } from "../ui/btn/badge";
import { ItemCareMultipleInput } from "./admin/item-care-multiple-input";
import { ItemEngagementMultipleInput } from "./admin/item-engagement-multiple-input";
import { ItemTraceabilityMultipleInput } from "./admin/item-traceability-multiple-input";
import { useAsyncApi } from "@/hooks/useAsyncApi";
import { useGetItem } from "@/hooks/items/use-get-item";
import { InputFile } from "../form/input-file";
import { FormProvider } from "@/context/form";
import { useModal } from "../ui/box/modal";
import { useToast } from "@/hooks/use-toast";

export const AdminItem = ({ isActive }: { isActive: string }) => {
  const { mutateAsync } = useAsyncApi({
    invalidateQueries: [["api", `/items/${isActive}`]],
  });

  const { toast } = useToast();

  const { setIsOpen } = useModal();

  return (
    <>
      <FormProvider
        onSubmit={async (e) => {
          console.log({ cououc: e });
          if (!e["main_image"]) {
            return toast({
              title: "Erreur",
              description: "Veuillez ajouter une image",
              variant: "destructive",
            });
          }
          const params = {
            name: e[`name`],
            type: e[`type`],
            stock: e[`stock`],
            description: e[`description`],
            abstract_description: e[`abstract_description`],
            main_image: e[`main_image`],
            price: e[`price`],
            discount: e[`discount`],
            care: e[`care`],
            compo: e[`compo`],
            details: e[`details`],
            details_title: e[`details_title`],
            traceability: e[`traceability`],
            engagements: e[`engagements`],
            model_name: e[`model_name`],
            regular: e[`regular`],
            size: e[`size`],
            tall: e[`tall`],
            dimension: e[`dimension`],
            centimeters_by_size: e[`centimeters_by_size`],
          };
          console.log({ params });

          const data = await mutateAsync({
            params,
            invalidateQueries: [["item", `${isActive}`], ["items"]],
            ...(isActive === "new"
              ? {
                  method: "POST",
                  path: "/items",
                  toast: {
                    description: "Produit créé",
                  },
                }
              : {
                  method: "PUT",
                  path: `/items/${isActive}`,
                  toast: {
                    description: "Produit modifié",
                  },
                }),
          });
          console.log({ data });
          setIsOpen(false);
        }}
        className="flex flex-col divide-y divide-dashed pb-40 divide-muted-foreground"
      >
        <Element isActive={isActive} />
      </FormProvider>
    </>
  );
};
const Element = ({ isActive }: { isActive: string }) => {
  const { watch } = useFormContext();
  const router = useRouter();

  const { data: item, isFetched } = useGetItem({
    params: { id: isActive === "new" ? undefined : Number(isActive) },
    enabled: isActive !== "new",
  });

  const { mutateAsync } = useAsyncApi({
    invalidateQueries: [["api", `/items/${isActive}`]],
  });

  if (isActive !== "new" && !item && !isFetched) {
    return <Loader />;
  }

  return (
    <>
      <>
        <Box
          title="Fiche du produit"
          description="Informations mise en avant pour la fiche produit"
          className="grid grid-cols-2"
          classNameBox="pt-0"
        >
          {isActive === "new" ? (
            <SelectBtn
              className="col-span-2"
              arr={[
                { label: "Les vêtements", value: "dress" },
                { label: "Les miniatures", value: "miniature" },
                { label: "Les peintures", value: "painting" },
              ]}
              id={`type`}
              defaultValue={item?.type || "dress"}
            />
          ) : (
            <Badge className="col-span-2 py-1 text-base uppercase font-semibold">
              {
                {
                  dress: "Vêtements",
                  miniature: "Miniatures",
                  painting: "Peintures",
                }[item?.type || "dress"]
              }
            </Badge>
          )}
          <Input
            title="Nom du produit"
            placeholder={"Robe Mila"}
            key={`input-name-${isActive}`}
            id={`name`}
            required
            type="text"
            defaultValue={item?.name}
          />
          <Input
            placeholder={"Robe longue côtelée cache coeur"}
            key={`input-abstract_description`}
            title="Description courte"
            id={`abstract_description`}
            required
            defaultValue={item?.abstract_description}
          />
          <Textarea
            classNameBox="col-span-2"
            title="Description longue"
            placeholder={
              "Robe longue côtelée cache coeur pour les soirées d'été"
            }
            required
            key={`textarea-description-${isActive}`}
            id={`description`}
            defaultValue={item?.description}
          />
        </Box>

        <Box className="grid grid-cols-2" title="Prix" description="Prix en €">
          <Input
            key={`input-price-${isActive}`}
            id={`price`}
            placeholder={"100 €"}
            type="number"
            title="Prix"
            defaultValue={item?.price}
            min={1}
            required
          />
          <Input
            key={`input-discount-${isActive}`}
            id={`discount`}
            type="number"
            title="Solde en %"
            placeholder="10%"
            defaultValue={item?.discount}
            min={0}
            max={100}
          />
          <Input
            title="Stock"
            id={`stock`}
            type="number"
            placeholder={"10 pièces"}
            key={`input-stock-${isActive}`}
            defaultValue={item?.stock || 1}
            required
          />
        </Box>

        <Box title="Détails" description="Décrivez les détails du produit">
          <Input
            title="Type du produit"
            id={`details_title`}
            defaultValue={item?.metadata?.details?.title || ""}
            placeholder={"Robe longue"}
            required
          />
          <MultipleInput
            title={"Liste de détails"}
            defaultValue={item?.metadata?.details?.content}
            placeholder={"Cuir côtelée"}
            id={`details`}
          />
        </Box>

        <Box
          title="Photos"
          className="grid grid-cols-2"
          description={
            <>
              Gallerie d'images du produit
              <br />
              Décrivez les dimensions du produit et du mannequin
            </>
          }
        >
          <div className="flex flex-wrap w-full gap-2 col-span-2">
            {[...(item?.gallery || [])]
              .filter((el) => !!el)
              .map((el, i) => (
                <div
                  className="relative w-[150px] h-[150px]"
                  key={`image-${i}`}
                >
                  <Image
                    src={el.image}
                    alt={`image ${i} ${item?.name || watch(`name`)}`}
                    width={800}
                    height={800}
                    className="w-full h-full object-cover"
                  />
                  <div className="flex items-center absolute top-2 right-2 gap-2">
                    <Btn
                      className="px-1 py-1 text-red-500"
                      onClick={async () => {
                        await mutateAsync({
                          path: `/upload/${el.id}`,
                          method: "DELETE",
                          params: {},

                          toast: {
                            description: "Image supprimée",
                          },
                        });
                      }}
                    >
                      <Icon icon={"mdi:delete"} className="text-sm" />
                    </Btn>
                    <Btn
                      onClick={async () => {
                        if (!item) throw new Error("Item not found");
                        const { gallery, metadata, ...data } = item;
                        const body = {
                          ...data,
                          main_image: el.image,
                        };

                        console.log({ body });

                        await mutateAsync({
                          path: `/items/${isActive}`,
                          method: "PUT",
                          params: body,
                          toast: {
                            description: "Image principale mise à jour",
                          },
                        });
                      }}
                      variant={
                        el.image === item?.main_image ? "default" : "primary"
                      }
                      className={cn(
                        "px-1 py-1 ",
                        el.image === item?.main_image
                          ? ""
                          : "opacity-50 hover:opacity-100"
                      )}
                    >
                      <Icon icon={"mdi:star"} className="text-sm" />
                    </Btn>
                  </div>
                </div>
              ))}

            <InputFile
              required
              id={`main_image`}
              keys={["api", `/items/${isActive}`]}
              defaultValue={item?.main_image}
              fn={(formData) => {
                if (isActive !== "new") {
                  formData.append("itemId", isActive);
                }
                return formData;
              }}
            />
          </div>

          <Input
            placeholder={"Le manequin mesure 170cm et porte une taille 36"}
            id={`tall`}
            defaultValue={item?.metadata?.model?.size}
            title="Taille du mannequin"
            type="number"
            required
            min={1}
          />
          <Input
            placeholder={"Henriette"}
            id={`model_name`}
            defaultValue={item?.metadata?.model?.name}
            title="Nom du mannequin"
            required
          />
          <Input
            title="Dimension de la pièce"
            placeholder={"La pièce fait 113cm pour une taille 36"}
            type="number"
            id={`dimension`}
            defaultValue={item?.metadata?.model?.dimension}
            required
            min={1}
          />
          <Input
            placeholder={"1cm par taille supplémentaire"}
            id={`centimeters_by_size`}
            defaultValue={item?.metadata?.model?.centimeters_by_size || "1"}
            type="number"
            title="Centimètre par taille"
            required
            min={1}
          />

          <Input
            title="Taille de la pièce"
            placeholder="Taille 36"
            id={`size`}
            defaultValue={item?.metadata?.model?.size}
            type="number"
            required
            min={1}
          />

          <SelectBtn
            arr={[
              {
                label: "Taille normal",
                value: true,
              },
              {
                label: "Taille petite",
                value: false,
              },
            ]}
            id={`regular`}
            defaultValue={item?.metadata?.model?.regular || true}
          />
        </Box>

        <Box
          title="Composition & Entretien"
          description="Décrivez la composition et l'entretien du tissus"
        >
          <MultipleInput
            title="Composition"
            defaultValue={item?.metadata?.compo?.content}
            placeholder={"52% viscose"}
            id={`compo`}
          />
          <ItemCareMultipleInput data={item?.metadata} isActive={isActive} />
        </Box>

        <Box
          title={"Engagements & Traçabilité"}
          description="Décrivez les engagements du produit"
        >
          <ItemEngagementMultipleInput
            data={item?.metadata}
            isActive={isActive}
          />
          <ItemTraceabilityMultipleInput
            data={item?.metadata}
            isActive={isActive}
          />
        </Box>

        {isActive ? (
          <div className=" fixed bottom-10 xl:right-20  right-10 flex gap-5   !border-0">
            {isActive !== "new" ? (
              <Btn
                onClick={async () => {
                  await mutateAsync({
                    path: `/items/${isActive}`,
                    method: "DELETE",
                    params: {},
                    invalidateQueries: [
                      ["api", `/items/${isActive}`],
                      ["api", `/items`],
                    ],
                    toast: {
                      description: "Produit supprimé",
                    },
                  });

                  router.push("/admin");
                }}
                variant="default"
              >
                Supprimer
              </Btn>
            ) : null}
            <Btn type="submit" variant="primary">
              Enregistrer
            </Btn>
          </div>
        ) : (
          <></>
        )}
      </>
    </>
  );
};

const Box = ({
  title,
  children,
  description,
  className = "",
  classNameBox = "",
}: {
  title: string;
  children: ReactNode;
  description: ReactNode;
  className?: string;
  classNameBox?: string;
}) => {
  return (
    <div
      className={cn(
        "flex justify-between  xl:flex-row flex-col p-5 py-20 pt-10  gap-10  w-full xl:p-10",
        classNameBox
      )}
    >
      <div className="flex flex-col xl:w-1/4">
        <Title className=" text-xl">{title}</Title>

        <p className="font-light">{description}</p>
      </div>

      <div className={cn("flex flex-col gap-10 w-full", className)}>
        {children}
      </div>
    </div>
  );
};
