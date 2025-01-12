import { BoxCascade } from "@/components/ui/box/box-cascade";
import { Btn } from "@/components/ui/btn";
import { Dropdown } from "@/components/ui/btn/dropdown";
import { Title } from "@/components/ui/typography/title";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import React from "react";

const item = {
  id: "1",
  title: "Kimono Model First",
  model: "795430 AAEFI 9110",
  price: "135",
  miniature: false,
  taille: "M",
};

const Page = () => {
  return (
    <main className="flex flex-col w-screen">
      <div className="flex w-screen h-screen relative">
        <Image
          alt="a"
          src="/item/2-1.avif"
          className="w-1/2 h-full object-cover object-center"
          width={1800}
          height={1800}
        />
        <Image
          src="/item/2.avif"
          width={1800}
          height={1800}
          alt=""
          className="w-1/2 h-full object-cover object-center"
        />

        <div className="flex flex-col  w-fit items-center bg-white/60 backdrop-blur rounded-md shadow pt-10 p-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Title className="text-2xl">{item.title}</Title>

          <span className="text-2xl my-10 font-black">€ {item.price}</span>
          <div className="flex items-center gap-10 px-5 mb-5">
            <Dropdown
              arr={[
                { title: "Taille" },
                { title: "M", value: "M" },
                { title: "L", value: "L" },
                { title: "XL", value: "XL" },
                { title: "XXL", value: "XXL" },
              ]}
            />

            <Btn variant="link" className="text-black">
              <Icon icon="la:ruler-horizontal" />
              Guide des tailles
            </Btn>
          </div>
          <Btn variant="primary" className="w-full text-center justify-center">
            Ajouter à votre panier
          </Btn>
        </div>
      </div>
      <div className="flex gap-10 py-20">
        <div className="px-5 flex flex-col divide-y w-full">
          <BoxCascade title="Matériaux et entretien" className="">
            <p className="w-1/2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
              accusamus magnam natus aperiam veritatis enim quasi iure
              consectetur officiis reprehenderit dicta repudiandae, distinctio
              saepe. Perferendis unde omnis consequuntur veniam ullam?
            </p>
          </BoxCascade>
          <BoxCascade title="Expédition, retours et échanges">
            <p className="w-1/2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
              accusamus magnam natus aperiam veritatis enim quasi iure
              consectetur officiis reprehenderit dicta repudiandae, distinctio
              saepe. Perferendis unde omnis consequuntur veniam ullam?
            </p>
          </BoxCascade>
          <BoxCascade title="Paiements">
            <p className="w-1/2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
              accusamus magnam natus aperiam veritatis enim quasi iure
              consectetur officiis reprehenderit dicta repudiandae, distinctio
              saepe. Perferendis unde omnis consequuntur veniam ullam?
            </p>
          </BoxCascade>
        </div>

        <div className="flex flex-col px-5 py-3 w-[700px] border mr-20 items-center bg-white shadow rounded-md gap-10">
          <Image
            src={"/item/2.avif"}
            alt=""
            width={1800}
            height={1800}
            className="w-[200px] h-[200px] object-cover object-center"
          />
          <div className="flex flex-col gap-1 items-center">
            <Icon
              width={40}
              height={40}
              className="text-foreground opacity-90"
              icon="material-symbols-light:globe"
            />
            <span className="font-bold text-sm underline capitalize">
              Notre engagement
            </span>
          </div>

          <div className="flex flex-col gap-5 w-full">
            <Title className="text-xl">Détails du produit</Title>

            <p className="font-light">Modèle {item.model}</p>

            <p className="font-light">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
              quibusdam mollitia veritatis voluptas necessitatibus molestiae
              saepe, numquam ullam non in doloribus perferendis eaque odit illo
              quas tempore? Eius, autem sunt.
            </p>

            <ul className="list-disc list-inside">
              {Array.from({ length: 10 }).map((_, i) => (
                <li className="font-light text-sm" key={i}>
                  Cuir
                </li>
              ))}
            </ul>

            <a className="underline font-bold">Imprimer</a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
