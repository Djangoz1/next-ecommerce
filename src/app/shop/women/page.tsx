import { Title } from "@/components/ui/typography/title";
import { cn } from "@/utils/cn";
import { Icon } from "@iconify/react/dist/iconify.js";
const items = [
  {
    title: "Vêtements",
    image: "/item/1.avif",
    description:
      "Découvrez les nouveautés de la collection de prêt-à-porter pour femme et les dernières parures pour femme.",
  },
  {
    title: "Kimono",
    image: "/item/2.avif",
    description:
      "Découvrez les nouveautés de la collection de prêt-à-porter pour femme et les dernières parures pour femme.",
  },
  {
    title: "Vêtements",
    image: "/item/3.avif",
    description:
      "Découvrez les nouveautés de la collection de prêt-à-porter pour femme et les dernières parures pour femme.",
  },
  {
    title: "Kimono",
    image: "/item/4.avif",
    description:
      "Découvrez les nouveautés de la collection de prêt-à-porter pour femme et les dernières parures pour femme.",
  },
];
export default () => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col relative">
        <img
          src="/model/2.jpg"
          alt="model photo"
          className="w-full h-[60vh] object-cover object-center brightness-75"
        />
        <div className="flex flex-col gap-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center">
          <Title className="text-xs uppercase">Nouveautés</Title>
          <Title className="text-6xl uppercase my-2">Femme</Title>
          <p className="text-sm">
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

        <div className="grid grid-cols-4 w-full divide-x divide-y">
          {[...items, ...items].map((item, index, arr) => (
            <div
              key={index}
              className={cn(
                "w-full h-[500px] relative",
                index === 0 || index === arr.length - 1 ? "border" : ""
              )}
            >
              <div className="flex justify-between absolute top-0 left-0 p-3">
                <span></span>
                <Icon icon="mdi:heart" />
              </div>
              <img
                src={item.image}
                alt={item.title}
                className="w-full  object-cover object-center"
              />
            </div>
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
