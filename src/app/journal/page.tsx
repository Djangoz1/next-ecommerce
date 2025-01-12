import { Btn } from "@/components/ui/btn";
import Image from "next/image";
import React from "react";

const Journal = () => {
  return (
    <main className="flex flex-col w-full py-40">
      <div className="flex flex-col items-center gap-5 py-20">
        <h1 className="title uppercase text-6xl">We will always have London</h1>
        <p className="text-center text-3xl  w-1/2 font-extralight">
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
    </main>
  );
};

export default Journal;
