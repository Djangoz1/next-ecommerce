import { OrderInfo } from "@/components/features/order-info";
import { Btn } from "@/components/ui/btn";
import { Title } from "@/components/ui/typography/title";
import { cn } from "@/utils/cn";
import Image from "next/image";
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
      <div className="grid grid-cols-5  relative">
        <Image
          src={"/textile/cotton.webp"}
          alt={"care"}
          fill
          className="w-full h-full object-cover absolute top-0 left-0"
        />
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={"care-textile-" + index}
            className={cn(
              "w-full h-[500px] items-center border-4 border-background gap-3 relative",
              index >= 1 ? "order-3" : ""
            )}
          >
            {/* <Image
              src={item.image}
              alt={item.title}
              fill
              className="w-full h-full object-cover"
            /> */}
            {/* <Title className="text-white absolute bottom-5 left-1/2 -translate-x-1/2">
              {item.title}
            </Title> */}
          </div>
        ))}
        <div className="w-full h-full order-2 flex items-center justify-center relative bg-background col-span-3">
          <Title className="text-center uppercase">Coton</Title>
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
