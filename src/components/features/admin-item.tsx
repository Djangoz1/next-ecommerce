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
import { useApi } from "@/hooks/useApi";
import { Item } from "@/app/shop/women/page";
import { useQueryClient } from "@tanstack/react-query";
import { MultipleInput } from "../form/multiple-input";
import { SelectBtn } from "../form/select-btn";
import { ItemMetadata } from "@/app/shop/women/[id]/page";

export const AdminItem = ({ isActive }: { isActive: string }) => {
  const { watch, setValue } = useFormContext();
  const client = useQueryClient();

  const { data: item } = useApi({
    path: `/items/${isActive}`,
    method: "GET",
    enabled: isActive !== "new",
  }) as {
    data:
      | (Item & {
          gallery: { image: string; id: string }[];
          metadata: ItemMetadata;
        })
      | undefined;
  };
  console.log({ item });

  return (
    <>
      <div className="flex flex-col divide-y divide-dashed">
        <Box
          title="Fiche du produit"
          description="Informations mise en avant pour la fiche produit"
          className="grid grid-cols-2"
        >
          <SelectBtn
            className="col-span-2"
            arr={[
              { label: "Les vêtements", value: "dress" },
              { label: "Les miniatures", value: "miniature" },
              { label: "Les peintures", value: "paint" },
            ]}
            id={`type-${isActive}`}
            defaultValue={item?.type || "dress"}
          />
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
            defaultValue={item?.metadata?.details?.title}
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
                        await fetch(
                          `${process.env.NEXT_PUBLIC_API_URL}/upload/${el.id}`,
                          {
                            method: "DELETE",
                          }
                        );
                        await client.invalidateQueries({
                          queryKey: ["api", `/items/${isActive}`],
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
                        const res = await fetch(
                          `${process.env.NEXT_PUBLIC_API_URL}/items/${isActive}`,
                          {
                            method: "PUT",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify(body),
                          }
                        );

                        console.log({ res: await res.json() });
                        await client.invalidateQueries({
                          queryKey: ["api", `/items/${isActive}`],
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
                      console.log({ test: formData });
                      const res = await fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}/upload`,
                        {
                          method: "POST",
                          body: formData,
                        }
                      );
                      const data = await res.json();

                      console.log({ data });

                      if (!watch(`main_image-${isActive}`)) {
                        setValue(`main_image-${isActive}`, data.url);
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
          <MultipleInput
            placeholder={"Ne pas laver à la machine"}
            title="Entretien"
            defaultValue={item?.metadata?.care?.content}
            id={`care-${isActive}`}
          />
        </Box>

        <Box
          title={"Engagements & Traçabilité"}
          description="Décrivez les engagements du produit"
        >
          <MultipleInput
            placeholder={"Transport routier"}
            title="Engagements"
            defaultValue={item?.metadata?.engagements?.content}
            id={`engagements-${isActive}`}
          />
          <MultipleInput
            placeholder={"100% Made in France"}
            title="Traçabilité"
            defaultValue={item?.metadata?.traceability?.content}
            id={`traceability-${isActive}`}
          />
        </Box>
      </div>
    </>
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
    <div className="flex justify-between  xl:flex-row flex-col p-5 py-20  gap-10  w-full xl:p-20">
      <div className="flex flex-col xl:w-1/4">
        <Title className="whitespace-nowrap text-xl">{title}</Title>

        <p className="font-light">{description}</p>
      </div>

      <div className={cn("flex flex-col gap-10 w-full", className)}>
        {children}
      </div>
    </div>
  );
};
