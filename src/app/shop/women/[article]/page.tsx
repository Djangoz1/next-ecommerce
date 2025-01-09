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
  price: "135",
  miniature: false,
  taille: "M",
};

export default () => {
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

      <div className="px-5 py-10">
        <BoxCascade title="Sésame ouvre toi" className="grid grid-cols-4 gap-5">
          Sésame ouvre toi
        </BoxCascade>
      </div>
    </main>
  );
};
