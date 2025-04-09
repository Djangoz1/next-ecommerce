import { OrderInfo } from "@/components/features/order-info";
import { Btn } from "@/components/ui/btn";
import { Title } from "@/components/ui/typography/title";
import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";
import React from "react";
const arr = [
  {
    title: "Soie",
    image: "/textile/silk.webp",
  },
  {
    title: "Coton",
    image: "/textile/cotton.webp",
  },
  {
    title: "Laine",
    image: "/textile/cupro.webp",
  },
  {
    title: "Viscose",
    image: "/textile/viscose.webp",
  },
  {
    title: "Jersey",
    image: "/textile/jersey.webp",
  },
];
const page = () => {
  return (
    <div className="pb-10">
      <div className="flex w-full h-fit relative">
        <Image
          src={"/caps/4-model.jpeg"}
          alt={"care"}
          width={1000}
          height={1000}
          className="w-full h-full object-cover "
        />

        <Title className="absolute top-1/2 left-1/2 text-white -translate-x-1/2 -translate-y-1/2 text-center uppercase">
          Le guide d'entretien
        </Title>
      </div>

      <div className="w-full text-center gap-5 flex items-center flex-col justify-center p-5">
        <Title className="text-lg">
          Quelles sont les matières utilisées chez Ormés ? Comment prendre soin
          de vos pièces au quotidien ?
        </Title>
        <div className="text-muted-foreground text-[10px] uppercase font-light">
          Suivez le guide et les conseils du studio pour entretenir vos
          vêtements et accessoires et les faire durer dans le temps, et pour
          connaître nos engagements durables, c'est{" "}
          <Link href={"/faq"} className="font-bold underline">
            par ici
          </Link>
        </div>
      </div>
      <div className=" relative h-[600px] flex w-full">
        <Image
          src={"/caps/2-model.jpeg"}
          alt={"care"}
          fill
          className="w-full h-full object-cover absolute top-0 left-0"
        />

        <div className="w-full mt-auto mb-10  flex items-center justify-center relative ">
          <Title className="text-center uppercase text-white">Le Coton</Title>
        </div>
      </div>

      <div className="flex flex-col gap-5 text-center w-2/3 mx-auto uppercase [&>p]:font-light [&>p]:text-sm py-20 [&>p]:text-muted-foreground">
        <b className="uppercase text-lg">
          Comment entretenir vos pièces en coton ?
        </b>
        <p>
          Le coton est une matière naturelle particulièrement agréable à porter,
          surtout lors des beaux jours. Nous privilégions désormais une fibre
          issue de l'agriculture biologiqe, plus respectueuse de
          l'environnement, car sa production nécessite moins d'eau et de
          pesticides.
        </p>

        <p>
          Le coton est une matière facile à entretenir: il conserve sa forme
          sans se déformer ni rétrécir.
          <br />
          Pour les pièces brodées ou ajourées, nous recommandons un lavage
          délicat. Privilégier un lavage à 30°C prolonge la durée de vie des
          vêtements tout en réduisant l'impact écologique. De même, opter pour
          un séchage nature est une alternative plus durable et respectueuse de
          la fibre..
        </p>
        <Btn size="sm" variant="primary" className="w-2/3 mx-auto mt-10">
          Découvrir notre collection
        </Btn>
      </div>
      <OrderInfo />
    </div>
  );
};
export default page;
