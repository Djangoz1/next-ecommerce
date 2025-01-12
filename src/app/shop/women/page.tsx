import { Title } from "@/components/ui/typography/title";
import Image from "next/image";
import Link from "next/link";

const items = [
  {
    id: "1",
    title: "Vêtements",
    image: "/model/1.jpg",
    thumbnail: "/item/2.avif",
    price: 200,
    description:
      "Découvrez les nouveautés de la collection de prêt-à-porter pour femme et les dernières parures pour femme.",
  },
  {
    id: "2",
    title: "Kimono",
    image: "/model/2.jpg",
    thumbnail: "/model/3.jpg",
    price: 200,
    description:
      "Découvrez les nouveautés de la collection de prêt-à-porter pour femme et les dernières parures pour femme.",
  },
  {
    id: "3",
    title: "Vêtements",
    image: "/model/3.jpg",
    thumbnail: "/model/4.jpg",
    price: 200,
    description:
      "Découvrez les nouveautés de la collection de prêt-à-porter pour femme et les dernières parures pour femme.",
  },
  {
    id: "4",
    title: "Kimono",
    image: "/model/4.jpg",
    thumbnail: "/model/5.jpg",
    price: 200,
    description:
      "Découvrez les nouveautés de la collection de prêt-à-porter pour femme et les dernières parures pour femme.",
  },
];
const StorePage = () => {
  return (
    <div className="flex flex-col w-full divide-y">
      <div className="flex flex-col relative pt-32 gap-4 items-center py-10 ">
        <Title className="xl:text-6xl">Vêtements</Title>
        <span className="text-xs uppercase font-light opacity-50">
          {items.length} produits
        </span>
      </div>

      <div className="flex text-sm opacity-75  uppercase items-center overflow-x-auto">
        <div className="flex px-5 border-r py-2">Filtres</div>
        <Link href={"#"} className="px-5">
          Vêtements
        </Link>
        <Link href={"#"} className="px-5">
          Miniatures
        </Link>
        <Link href={"#"} className="px-5">
          Peintures
        </Link>
      </div>
      <div className="flex flex-col p-5 xl:grid xl:grid-cols-4  w-full gap-10">
        {[...items, ...items].map((item, index) => (
          <Link
            href={`/shop/women/${item.id}`}
            key={`item-${index}`}
            className="w-full flex flex-col gap-2 transition-all hover:scale-105"
          >
            <Image
              src={item.image}
              alt={item.title}
              width={1200}
              height={1200}
              className="w-full h-full"
            />
            <div className="flex justify-between items-center">
              <span className="text-sm uppercase">{item.title}</span>
              <span className="text-sm opacity-50">{item.price} €</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default StorePage;
