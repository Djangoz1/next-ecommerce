import { Carousel } from "@/components/ui/box/carousel";
import { Btn } from "@/components/ui/btn";

import Image from "next/image";

export default function Home() {
  return (
    <main className="w-screen max-w-full flex flex-col gap-5">
      <section className="relative w-full">
        <Image
          width={1800}
          height={1800}
          src="/assets/1.JPG"
          alt="model photo"
          className=" w-full max-w-screen xl:h-fit h-screen brightness-75 object-cover object-left-center "
        />
        <div className="font-info text-center flex absolute bottom-20 flex-col gap-6 -translate-x-1/2 left-1/2">
          <Btn
            variant="link"
            className="text-white hover:text-white font-light hover:scale-105"
            href={"/shop/dress"}
          >
            Découvrir nos offres
          </Btn>
        </div>
      </section>

      <section className="xl:grid xl:grid-cols-2 flex flex-col gap-5 items-center xl:px-5 relative  text-white ">
        <div className="flex relative w-full flex-col gap-10 xl:px-0 px-5">
          <Image
            width={1000}
            height={1000}
            src="/model/1.jpg"
            alt="model photo"
            className=" xl:h-screen brightness-75 object-cover object-center  rounded-md shadow w-full"
          />
          <div className="flex absolute flex-col top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 gap-5 items-center ">
            <p className="uppercase text-xs font-light">Nouveauté</p>
            <h6 className=" title xl:text-6xl text-4xl uppercase">Vêtements</h6>
            <Btn
              className="text-xs  whitespace-nowrap text-foreground"
              variant="link"
              href={"/shop/dress"}
            >
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
            className=" xl:h-screen brightness-75 object-cover object-center xl:rounded-md w-full"
          />
          <div className="flex absolute flex-col top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 gap-5  items-center ">
            <p className="uppercase text-xs font-light">Nouveauté</p>

            <h6 className=" title xl:text-6xl text-4xl uppercase">
              Miniatures
            </h6>
            <Btn
              className="text-xs  whitespace-nowrap text-foreground"
              variant="link"
              href={"/shop/miniature"}
            >
              Découvrir
            </Btn>
          </div>
        </div>
        <div className="flex relative w-full flex-col gap-10 xl:px-0 px-5 col-span-2">
          <Image
            width={1000}
            height={1000}
            src="/model/6.jpg"
            alt="model photo"
            className=" xl:h-screen brightness-75 object-cover object-center  rounded-md shadow w-full"
          />
          <div className="flex absolute flex-col top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 gap-5 items-center ">
            <p className="uppercase text-xs font-light">Nouveauté</p>
            <h6 className=" title xl:text-6xl text-4xl uppercase">Peintures</h6>
            <Btn
              className="text-xs  whitespace-nowrap text-foreground"
              variant="link"
              href={"/shop/painting"}
            >
              Découvrir
            </Btn>
          </div>
        </div>
      </section>
      <section>
        <Carousel
          slides={[
            { src: "/model/1.jpg", title: "Robe" },
            { src: "/model/2.jpg", title: "Miniature" },
            { src: "/model/3.jpg", title: "Peinture" },
          ]}
        />
      </section>
    </main>
  );
}
