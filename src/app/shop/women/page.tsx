import { HoveredCard } from "@/components/ui/card/hover";
import { Title } from "@/components/ui/typography/title";
import { cn } from "@/utils/cn";
import { Icon } from "@iconify/react/dist/iconify.js";

import Image from "next/image";

const items = [
  {
    id: "1",
    title: "Vêtements",
    image: "/item/1.avif",
    thumbnail: "/item/2.avif",
    price: 200,
    description:
      "Découvrez les nouveautés de la collection de prêt-à-porter pour femme et les dernières parures pour femme.",
  },
  {
    id: "2",
    title: "Kimono",
    image: "/item/2.avif",
    thumbnail: "/item/3.avif",
    price: 200,
    description:
      "Découvrez les nouveautés de la collection de prêt-à-porter pour femme et les dernières parures pour femme.",
  },
  {
    id: "3",
    title: "Vêtements",
    image: "/item/3.avif",
    thumbnail: "/item/4.avif",
    price: 200,
    description:
      "Découvrez les nouveautés de la collection de prêt-à-porter pour femme et les dernières parures pour femme.",
  },
  {
    id: "4",
    title: "Kimono",
    image: "/item/4.avif",
    thumbnail: "/item/3.avif",
    price: 200,
    description:
      "Découvrez les nouveautés de la collection de prêt-à-porter pour femme et les dernières parures pour femme.",
  },
];
export default () => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col relative">
        <Image
          width={1200}
          height={1200}
          src="/model/2.jpg"
          alt="model photo"
          className="w-full h-[60vh] object-cover object-center brightness-75"
        />
        <div className="flex flex-col gap-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center">
          <Title className="text-lg uppercase">Nouveautés</Title>
          <Title className="text-6xl uppercase my-2">Femme</Title>
          <p className="text-xl font-light">
            Découvrez les nouveautés de la collection de prêt-à-porter pour
            femme et les dernières parures pour femme.
          </p>
        </div>
      </div>

      <div className="flex flex-col pb-10 w-full pl-5 pr-10">
        <div className="flex justify-between py-5">
          <div className="flex gap-2">
            <a className="underline" href="#">
              Collection
            </a>
            <span>/</span>
            <a href="#">Nouveautés Femme</a>
          </div>
          <div className="flex gap-5">
            <Dropdown children="Catégorie" arr={[]} />
            <Dropdown children="Ligne" arr={[]} />
            <Dropdown children="Filtres" arr={[]} />
          </div>
        </div>

        <div className="grid grid-cols-4 w-full divide-x divide-y border">
          {[...items, ...items].map((item, index, arr) => (
            <HoveredCard key={`item-${index}`} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

const Dropdown = ({
  children,
  arr,
}: {
  children: React.ReactNode;
  arr: { title: string; id: string }[];
}) => {
  return (
    <div className="flex gap-1 items-center ">
      <span className="underline font-light uppercase text-sm">{children}</span>
      <Icon icon="mdi:chevron-down" />
    </div>
  );
};
