import { Btn } from "@/components/ui/btn";
import { Title } from "@/components/ui/typography/title";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";

export default function Home() {
  return (
    <main className="">
      <section className="relative">
        <Image
          width={1800}
          height={1800}
          src="/model/2.jpg"
          alt="model photo"
          className="w-screen h-screen brightness-75 object-cover object-center "
        />
        <div className="font-info text-center flex absolute bottom-20 flex-col gap-6 -translate-x-1/2 left-1/2">
          <Title className="text-white">Nouveautés</Title>

          <div className="flex gap-5">
            <Btn>Vêtements</Btn>
            <Btn>Miniatures</Btn>
          </div>
        </div>
      </section>

      <section className="flex flex-col xl:gap-20 gap-5  xl:px-10 px-5 xl:py-40 py-20 items-center">
        <Title className="uppercase xl:text-4xl text-lg">
          La sélection de la maison
        </Title>

        <div className="grid xl:grid-cols-4 grid-cols-2 w-full xl:gap-10 gap-y-10 gap-2">
          {[
            {
              title: "Sacs",
              href: "/",
              img: "/model/3.jpg",
            },
            {
              title: "Chaussure Femme",
              href: "/",
              img: "/model/4.jpg",
            },
            {
              title: "Sacs pour Homme",
              href: "/",
              img: "/model/5.jpg",
            },
            {
              title: "Miniatures",
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
                className="w-full xl:h-[600px] h-[300px] hover:scale-90 object-cover object-center shadow-lg rounded-sm brightness-75 hover:brightness-100 transition-all duration-300"
              />
              <h6>{el.title}</h6>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col items-center px-5 relative ">
        <Image
          width={1000}
          height={1000}
          src="/model/7.jpg"
          alt="model photo"
          className="xl:w-5/6 w-full h-[60vh] object-cover object-center brightness-50 rounded-md shadow"
        />
        <div className="flex absolute flex-col top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 gap-5 items-center">
          <Title className="text-white xl:text-4xl text-xl">
            Model & Miniatures
          </Title>
          <Btn
            className="text-xs xl:text-xl whitespace-nowrap"
            variant="secondary"
          >
            Découvrir la collection
          </Btn>
        </div>
      </section>

      <section className="flex flex-col items-center xl:p-20 px-5 py-40 gap-10 xl:gap-20">
        <Title className="uppercase text-sm font-black">À la une</Title>
        <div className="flex xl:gap-40 gap-10 items-center xl:flex-row flex-col">
          <Image
            src="/model/1.jpg"
            alt="model photo"
            className="xl:w-1/2 w-full rounded-md shadow brightness-90"
            width={800}
            height={800}
          />
          <div className="flex flex-col gap-10 text-center">
            <h6 className="xl:text-4xl text-xl uppercase title ">
              We will always have
              <br />
              london
            </h6>

            <p className="font-extralight xl:text-md text-sm">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam,
              labore. Et earum officiis temporibus quis dolorum quas molestias
              officia impedit libero! Veniam ipsam hic molestias quo molestiae
              illum aspernatur voluptas.
            </p>
            <Btn className="mx-auto" variant="link">
              Découvrir plus
            </Btn>
          </div>
        </div>
      </section>
      <section className="flex flex-col items-center gap-10 xl:py-20 py-10">
        <Title className="uppercase xl:text-sm text-center text-xs">
          Inscrivez-vous pour suivre l'actualité d'Ormès
        </Title>

        <p className="font-extralight xl:text-3xl text-sm w-1/2 text-center">
          Recevez des informations exclusives sur le lancement de la collection,
          des communication personnalisée et les dernières actualités de la
          Maison.
        </p>

        <Btn variant="link" className="text-black normal-case">
          <Icon icon="mdi:plus" />
          S'abonner
        </Btn>
      </section>
    </main>
  );
}
