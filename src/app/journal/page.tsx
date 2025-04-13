"use client";
import { BoxPlayer } from "@/components/ui/box/box-player";
import { Carousel } from "@/components/ui/box/carousel";
import { Btn } from "@/components/ui/btn";
import { Title } from "@/components/ui/typography/title";
import { useModal } from "@/context/modal";
import { cn } from "@/utils/cn";
import Image from "next/image";
import React from "react";

const Journal = () => {
  const { showModal } = useModal();

  return (
    <div className="flex flex-col w-full py-20">
      <div className="flex flex-col items-center gap-5 py-20">
        <h1 className="title uppercase  text-2xl xl:px-80 px-10 text-center">
          La poésie du vêtement : une capsule intemporelle
        </h1>
        <p className="xl:text-center  xl:text-xl  xl:w-2/3 w-full  px-5 text-balance font-extralight text-sm text-center">
          Dans un monde où la mode se renouvelle sans cesse, nous avons choisi
          de créer une capsule de vêtements intemporels, une collection qui
          traverse les saisons et les époques sans jamais perdre son éclat. Mon
          univers est romantique et poétique, inspiré par la délicatesse des
          émotions, la douceur du mouvement et la beauté des détails faits à la
          main.
        </p>
        <Btn size="xs" variant="link">
          En savoir plus
        </Btn>

        <BoxPlayer
          img="/caps/4-model.jpeg"
          source="/pres.mp4"
          className="w-full"
        />

        <Btn size="xs" variant="link">
          Découvrir la collection
        </Btn>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 w-full p-1 xl:w-2/3 mx-auto gap-10  relative">
        {[
          {
            src: "/caps/1-model.jpeg",
            title: "Robe écrue courte",
            description:
              "La robe écrue courte est une ode à l’ artisanat, ornée de pivoines réalisées à la main et d’ un plissé formant un nœud sur les épaules, symbole de grâce et de raffinement.",
          },
          {
            src: "/caps/2-model.jpeg",
            title: "Robe blanche",
            description: `La robe blanche, avec ses manches ballons, son plissé délicat et son bas évasé, évoque une féminité
              aérienne et intemporelle.`,
          },
          {
            src: "/caps/3-model.jpeg",
            title: "Costume",
            description: `Le costume, avec ses lignes épurées et son col de cheval, est un vêtement élégant et sophistiqué.`,
          },
          {
            src: "/caps/4-model.jpeg",
            title: "Robe Longue",
            description: ` La robe longue aux
              manches façon cape et aux fronces délicatement disposées sur le
              bassin joue avec les volumes et les drapés, rappelant les
              silhouettes des héroïnes d’ antan.`,
          },
          {
            src: "/caps/5-model.jpeg",
            title: "Robe rouge",
            description: `La robe rouge vif, majestueuse et prestigieuse, est le
              joyau de cette capsule. Chaque pivoine façonnée et cousue à la
              main ajoute une touche de poésie et de passion, transformant cette
              pièce en une véritable œuvre d’ art.`,
          },
        ].map((el, i) => (
          <div
            className={cn("w-full h-fit", i % 3 === 0 ? "xl:col-span-2" : "")}
            onClick={() =>
              showModal(
                <div className="flex gap-5">
                  <Image
                    src={el.src}
                    alt={el.title}
                    width={1000}
                    height={1000}
                    className="w-1/2"
                  />
                  <div className="flex w-full flex-col gap-2">
                    <Title className="text-xl font-light">{el.title}</Title>
                    <p className="text-sm">{el.description}</p>
                    <Btn variant="primary" size="xs">
                      Commander
                    </Btn>
                  </div>
                </div>,
                "slideY"
              )
            }
            key={`journal-img-${i}`}
          >
            <Image
              src={el.src}
              className="w-full"
              alt={el.title}
              width={1000}
              height={1000}
            />
          </div>
        ))}
        <div className="flex w-full xl:px-0 px-5  flex-col">
          <p>
            Chaque pièce de cette collection raconte une histoire. L’ ensemble
            veste-pantalon, avec ses lignes épurées, incarne l’élégance discrète
            et la force subtile.
            <br />
            <br />
            J’ ai imaginé ces vêtements comme des compagnons de vie, des pièces
            qui subliment les instants précieux et traversent le temps avec
            grâce. Car au-delà des tendances, la mode est avant tout une manière
            de raconter une histoire, et la mienne est celle d’ un romantisme
            intemporel.
            <br />
            <br />
          </p>
          <i className=" ">Sandra Djangoné</i>
        </div>
      </div>

      <div className="flex flex-col gap-2  bg-background relative p-5 py-10 rounded-xl"></div>
    </div>
  );
};
export default Journal;
