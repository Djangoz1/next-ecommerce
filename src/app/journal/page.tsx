import { Btn } from "@/components/ui/btn";
import Image from "next/image";
import React from "react";

const Journal = () => {
  return (
    <div className="flex flex-col w-full py-20">
      <div className="flex flex-col items-center gap-5 py-20">
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
      />
    </div>
  );
};

export default Journal;
