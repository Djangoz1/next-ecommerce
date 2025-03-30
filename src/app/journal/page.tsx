import { Btn } from "@/components/ui/btn";
import { Title } from "@/components/ui/typography/title";
import Image from "next/image";
import React from "react";

const Journal = () => {
  return (
    <div className="flex flex-col w-full py-20">
      {/* <div className="flex flex-col items-center gap-5 py-20">
        <h1 className="title uppercase xl:text-6xl text-3xl px-10 text-center">
          We will always have London
        </h1>
        <p className="xl:text-center  xl:text-3xl  xl:w-1/2 w-full  px-5 text-balance font-extralight text-2xl">
          Une histoire faite de lieux, d’individus et de moments : Debbie Harry
          et Kelsey Lu sont les égéries d’une nouvelle campagne signée du
          Directeur de la création Sabato De Sarno et immortalisée par Nan
          Goldin pour présenter le sac Gucci Blondie et la collection Cruise
          2025.
        </p>

        <Btn variant="link">En savoir plus</Btn>
      </div>

      <Image
        width={1800}
        height={1800}
        src="/model/8.avif"
        alt="Journal Hero"
        className="w-full"
      /> */}

      <div className="max-w-4xl gap-2 flex flex-col items-center mx-auto mt-5 xl:px-10 px-2 relative">
        <img
          src="/assets/2.JPG"
          alt="Journal Hero"
          className="w-full rounded-xl h-[300px] object-cover absolute top-0 left-0"
        />
        <div className="flex flex-col gap-2 mt-40 bg-background relative p-5 py-10 rounded-xl">
          <Title>La poésie du vêtement : une capsule intemporelle</Title>
          <div className="flex w-full gap-20 xl:flex-row flex-col">
            <p>
              Dans un monde où la mode se renouvelle sans cesse, nous avons
              choisi de créer une capsule de vêtements intemporels, une
              collection qui traverse les saisons et les époques sans jamais
              perdre son éclat. Mon univers est romantique et poétique, inspiré
              par la délicatesse des émotions, la douceur du mouvement et la
              beauté des détails faits à la main.
              <br />
              <br />
              Chaque pièce de cette collection raconte une histoire. L’ ensemble
              veste-pantalon, avec ses lignes épurées, incarne l’élégance
              discrète et la force subtile. La robe blanche, avec ses manches
              ballons, son plissé délicat et son bas évasé, évoque une féminité
              aérienne et intemporelle.
              <br />
              <br />
              La robe écrue courte est une ode à l’ artisanat, ornée de pivoines
              réalisées à la main et d’ un plissé formant un nœud sur les
              épaules, symbole de grâce et de raffinement. La robe longue aux
              manches façon cape et aux fronces délicatement disposées sur le
              bassin joue avec les volumes et les drapés, rappelant les
              silhouettes des héroïnes d’ antan.
              <br />
              <br />
              Enfin, la robe rouge vif, majestueuse et prestigieuse, est le
              joyau de cette capsule. Chaque pivoine façonnée et cousue à la
              main ajoute une touche de poésie et de passion, transformant cette
              pièce en une véritable œuvre d’ art.
              <br />
              <br />
              J’ ai imaginé ces vêtements comme des compagnons de vie, des
              pièces qui subliment les instants précieux et traversent le temps
              avec grâce. Car au-delà des tendances, la mode est avant tout une
              manière de raconter une histoire, et la mienne est celle d’ un
              romantisme intemporel.
              <br />
              <br />
              <i>Sandra Djangoné</i>
            </p>

            <div className="flex xl:flex-col flex-row gap-2 xl:min-w-[200px] xl:w-[200px] xl:overflow-hidden overflow-auto">
              {[
                "/assets/1.JPG",
                "/model/1.jpg",
                "/model/2.jpg",
                "/model/3.jpg",
              ].map((item, i) => (
                <img
                  src={item}
                  key={"capsule-item-" + i}
                  alt="capsule item"
                  className="w-full rounded-xl object-cover"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journal;
