"use client";
import { cn } from "@/utils/cn";
import Image from "next/image";
import React, { ReactNode, useEffect } from "react";
import { Title } from "../ui/typography/title";
import { Input } from "../form/input";
import { useFormContext } from "react-hook-form";
import { Btn } from "../ui/btn";
import { Textarea } from "../form/textarea";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useApi } from "@/hooks/useApi";

import { useQueryClient } from "@tanstack/react-query";
import { MultipleInput } from "../form/multiple-input";
import { SelectBtn } from "../form/select-btn";

import { Loader } from "../ui/box/loader";
import { Item, ItemMetadata } from "@/types/items";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Badge } from "../ui/btn/badge";
import { ItemCareMultipleInput } from "./admin/item-care-multiple-input";
import { ItemEngagementMultipleInput } from "./admin/item-engagement-multiple-input";
import { ItemTraceabilityMultipleInput } from "./admin/item-traceability-multiple-input";
import { useAsyncApi } from "@/hooks/useAsyncApi";

export const AdminItem = ({ isActive }: { isActive: string }) => {
  const { watch, setValue } = useFormContext();
  const client = useQueryClient();

  const { data: item, isFetched } = useApi<
    Item & {
      gallery: { image: string; id: string }[];
      metadata: ItemMetadata;
    }
  >({
    path: `/items/${isActive}`,
    method: "GET",
    enabled: isActive !== "new",
  });

  const { mutateAsync } = useAsyncApi({
    invalidateQueries: [["api", `/items/${isActive}`]],
  });

  const router = useRouter();

  if (isActive !== "new" && !item && !isFetched) {
    return <Loader />;
  }

  return (
    <div
      className="fixed w-screen flex  h-screen top-0 left-0 bg-black/50 backdrop-blur z-[100] "
      onClick={() => router.push("/admin")}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
        exit={{ x: -100 }}
        className="flex pb-40  flex-col divide-y divide-dashed  w-screen xl:w-2/3   bg-background  xl:ml-auto overflow-y-scroll relative"
      >
        <Btn
          size="sm"
          href={`/admin`}
          className="m-5 xl:relative fixed top-5 right-5 xl:top-0 xl:right-0 !ml-auto z-10"
        >
          <Icon icon={"mdi:close"} className="text-2xl" /> Fermer
        </Btn>
        <Box
          title="Fiche du produit"
          description="Informations mise en avant pour la fiche produit"
          className="grid grid-cols-2"
        >
          {isActive === "new" ? (
            <SelectBtn
              className="col-span-2"
              arr={[
                { label: "Les vêtements", value: "dress" },
                { label: "Les miniatures", value: "miniature" },
                { label: "Les peintures", value: "painting" },
              ]}
              id={`type-${isActive}`}
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
            id={`name-${isActive}`}
            required
            type="text"
            defaultValue={item?.name}
          />
          <Input
            placeholder={"Robe longue côtelée cache coeur"}
            key={`input-abstract_description-${isActive}`}
            title="Description courte"
            id={`abstract_description-${isActive}`}
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
            id={`description-${isActive}`}
            defaultValue={item?.description}
          />
        </Box>

        <Box className="grid grid-cols-2" title="Prix" description="Prix en €">
          <Input
            key={`input-price-${isActive}`}
            id={`price-${isActive}`}
            placeholder={"100 €"}
            type="number"
            title="Prix"
            defaultValue={item?.price}
            min={1}
            required
          />
          <Input
            key={`input-discount-${isActive}`}
            id={`discount-${isActive}`}
            type="number"
            title="Solde en %"
            placeholder="10%"
            defaultValue={item?.discount}
            min={0}
            max={100}
          />
          <Input
            title="Stock"
            id={`stock-${isActive}`}
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
            id={`details_title-${isActive}`}
            defaultValue={item?.metadata?.details?.title || ""}
            placeholder={"Robe longue"}
            required
          />
          <MultipleInput
            title={"Liste de détails"}
            defaultValue={item?.metadata?.details?.content}
            placeholder={"Cuir côtelée"}
            id={`details-${isActive}`}
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
                    alt={`image ${i} ${
                      item?.name || watch(`name-${isActive}`)
                    }`}
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

            <div className="w-[150px] relative border bg-background border-black/50  h-[150px] rounded-md shadow flex items-center justify-center cursor-pointer">
              <div className="flex flex-col gap-3 items-center text-center">
                <Icon icon={"line-md:image"} className="text-4xl" />
                <span className="font-light text-xs">
                  <span className="italic">
                    Ajouter une image <br />
                  </span>
                  (800x1500)
                </span>
              </div>

              <input
                type="file"
                className="absolute w-full h-full opacity-0"
                multiple
                onChange={async (e) => {
                  try {
                    console.log({ e: e.target?.files });
                    if (!e.target?.files?.[0]) {
                      return null;
                    }
                    for (const file of e.target?.files || []) {
                      const formData = new FormData();
                      formData.append("file", file);
                      if (isActive !== "new") {
                        formData.append("itemId", isActive);
                      }

                      let data = await mutateAsync({
                        path: `/upload`,
                        method: "POST",
                        params: formData,
                        headers: false,
                        toast: {
                          description: "Image ajoutée",
                        },
                      });

                      if (!watch(`main_image-${isActive}`)) {
                        setValue(`main_image-${isActive}`, data.result.url);
                      }
                    }

                    await client.invalidateQueries({
                      queryKey: ["api", `/items/${isActive}`],
                    });
                  } catch (error) {
                    console.log("error", error);
                  }
                }}
              />
            </div>
          </div>

          <Input
            placeholder={"Le manequin mesure 170cm et porte une taille 36"}
            id={`tall-${isActive}`}
            defaultValue={item?.metadata?.model?.size}
            title="Taille du mannequin"
            type="number"
            required
            min={1}
          />
          <Input
            placeholder={"Henriette"}
            id={`model_name-${isActive}`}
            defaultValue={item?.metadata?.model?.name}
            title="Nom du mannequin"
            required
          />
          <Input
            title="Dimension de la pièce"
            placeholder={"La pièce fait 113cm pour une taille 36"}
            type="number"
            id={`dimension-${isActive}`}
            defaultValue={item?.metadata?.model?.dimension}
            required
            min={1}
          />
          <Input
            placeholder={"1cm par taille supplémentaire"}
            id={`centimeters_by_size-${isActive}`}
            defaultValue={item?.metadata?.model?.centimeters_by_size || "1"}
            type="number"
            title="Centimètre par taille"
            required
            min={1}
          />

          <Input
            title="Taille de la pièce"
            placeholder="Taille 36"
            id={`size-${isActive}`}
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
            id={`regular-${isActive}`}
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
            id={`compo-${isActive}`}
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
      </motion.div>
    </div>
  );
};

const Box = ({
  title,
  children,
  description,
  className = "",
}: {
  title: string;
  children: ReactNode;
  description: ReactNode;
  className?: string;
}) => {
  return (
    <div className="flex justify-between  xl:flex-row flex-col p-5 py-20  gap-10  w-full xl:p-10">
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
