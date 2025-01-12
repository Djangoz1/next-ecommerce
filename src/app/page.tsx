import { Btn } from "@/components/ui/btn";
import { Text } from "@/components/ui/typography/text";
import { Title } from "@/components/ui/typography/title";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";

export default function Home() {
  return (
    <main className="w-screen max-w-full ">
      <section className="relative w-full">
        <Image
          width={1800}
          height={1800}
          src="/page/H-HEADER.webp"
          alt="model photo"
          className=" w-full max-w-screen xl:h-fit h-screen brightness-75 object-cover object-left-center "
        />
        <div className="font-info text-center flex absolute bottom-20 flex-col gap-6 -translate-x-1/2 left-1/2">
          <Btn
            variant="link"
            className="text-white hover:text-white font-light hover:scale-105"
            href={"/shop/women"}
          >
            Découvrir nos offres
          </Btn>
        </div>
      </section>

      <section className="flex flex-col xl:gap-20 gap-5  xl:px-10 px-5 xl:py-40 py-20 items-center">
        <div className="flex flex-col gap-2 items-center">
          <Title className="uppercase xl:text-4xl text-2xl">
            La sélection de la maison
          </Title>
          <Btn className="text-xs" variant="link">
            Découvrir plus
          </Btn>
        </div>

        <div className="grid xl:grid-cols-4 grid-cols-2 w-full xl:gap-10 gap-y-10 gap-2">
          {[
            {
              title: "Sacs",
              price: "1000",
              href: "/",
              img: "/model/3.jpg",
            },
            {
              title: "Chaussure Femme",
              price: "1000",
              href: "/",
              img: "/model/4.jpg",
            },
            {
              title: "Sacs pour Homme",
              price: "1000",
              href: "/",
              img: "/model/5.jpg",
            },
            {
              title: "Miniatures",
              price: "1000",
              href: "/",
              img: "/model/6.jpg",
            },
          ].map((el, i) => (
            <div
              key={`items-${i}`}
              className="flex flex-col w-full items-center xl:gap-5 gap-2 xl:text-lg"
            >
              <Image
                src={el.img}
                alt={el.title}
                width={800}
                height={800}
                className="w-full xl:h-[600px] h-[300px] hover:scale-90 object-cover object-center shadow-xl rounded brightness-75 hover:brightness-100 transition-all duration-300"
              />
              <div className="flex items-center justify-between w-full">
                <p className="font-bold">{el.title}</p>

                <span className="font-extralight text-sm">{el.price} €</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="xl:grid xl:grid-cols-2 flex flex-col gap-5 items-center px-5 relative  text-white">
        <div className="flex relative w-full flex-col gap-10 ">
          <Image
            width={1000}
            height={1000}
            src="/model/1.jpg"
            alt="model photo"
            className=" xl:h-screen brightness-75 object-cover object-center  rounded-md shadow w-full"
          />
          <div className="flex absolute flex-col top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 gap-5 items-center ">
            <p className="uppercase font-light">Soldes</p>
            <h6 className=" title xl:text-8xl text-6xl uppercase">Vêtements</h6>
            <Btn className="text-xs  whitespace-nowrap" variant="link">
              Découvrir
            </Btn>
          </div>
        </div>
        <div className="flex relative w-full flex-col gap-10 ">
          <Image
            width={1000}
            height={1000}
            src="/model/7.jpg"
            alt="model photo"
            className=" xl:h-screen brightness-75 object-cover object-center  rounded-md shadow w-full"
          />
          <div className="flex absolute flex-col top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 gap-5 items-center ">
            <p className="uppercase font-light">Soldes</p>
            <h6 className=" title xl:text-8xl text-6xl uppercase">
              Miniatures
            </h6>
            <Btn className="text-xs  whitespace-nowrap" variant="link">
              Découvrir
            </Btn>
          </div>
        </div>
        <div className="flex xl:flex-row flex-col items-center relative w-full xl:gap-10 gap-5 col-span-2 text-black">
          <Image
            width={1000}
            height={1000}
            src="/model/6.jpg"
            alt="model photo"
            className="xl:w-2/3 w-full  object-cover object-center  rounded-md shadow"
          />
          <div className="flex  flex-col  gap-5 items-center mx-auto">
            <p className="uppercase font-light">Soldes</p>
            <h6 className=" title text-6xl uppercase">Peintures</h6>
            <Btn className="text-xs  whitespace-nowrap" variant="link">
              Découvrir
            </Btn>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center gap-10 xl:py-20 py-10">
        <Title className="uppercase xl:text-sm text-center text-xs">
          Inscrivez-vous pour suivre l'actualité d'Ormès
        </Title>

        <Text className=" xl:text-3xl text-sm w-1/2 text-center ">
          Recevez des informations exclusives sur le lancement de la collection,
          des communication personnalisée et les dernières actualités de la
          Maison.
        </Text>

        <Btn variant="link" className="text-black normal-case">
          <Icon icon="mdi:plus" />
          S'abonner
        </Btn>
      </section>
    </main>
  );
}
