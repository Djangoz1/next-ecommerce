import { BoxCascade } from "@/components/ui/box/box-cascade";
import { Text } from "@/components/ui/typography/text";
import { Title } from "@/components/ui/typography/title";
import Image from "next/image";
import React from "react";

const PageOrmes = () => {
  return (
    <main className="flex flex-col py-40 items-center">
      <Section title="L'histoire d'Ormés">
        <Text className="text-center">
          Créée en 1921, avec l’ouverture d’une boutique dans une ruelle de
          Florence, la Maison Gucci est depuis lors devenue un symbole de
          renommée mondiale, incarnant l’artisanat italien, la créativité
          visionnaire et le design innovant. Reflétant et définissant les
          décennies qui l’ont façonnée, l’histoire de la Maison a influencé la
          mode et la culture de manière impérissable tout au long des vingtième
          et vingt-et-unième siècles.
        </Text>

        <div className="flex flex-col w-full ">
          <BoxCascade title={"Qui est à l'origine d'Ormés ?"}>
            <Text>
              Le fondateur de la Maison, Guccio Gucci, est né à Florence le 26
              mars 1881. Il s’installe à Londres au cours de sa jeunesse. En
              1897, il commence à travailler en tant que bagagiste à l’hôtel
              Savoy. Découvrant au plus près l’environnement particulièrement
              fermé de la haute société internationale, et notamment les valises
              avec lesquelles ses membres voyageaient, il rentre en Italie en
              1902 avec le rêve qu’un jour, des bagages porteraient son nom. En
              1921, il ouvre sa première boutique sur la via della Vigna Nuova à
              Florence, spécialisée dans les bagages de style anglais.
            </Text>
          </BoxCascade>
          <BoxCascade
            className="[&_b]:underline"
            title="Qu'est-ce qui fait la réputation d'Ormés ?"
          >
            <Text>
              Gucci incarne le summum de l’excellence de l’artisanat italien et
              ses créations sont sans égal en matière de qualité et de soin
              apporté aux détails. Maison aujourd’hui centenaire, Gucci continue
              de redéfinir le luxe tout en mettant à l’honneur la créativité et
              l’innovation à travers ses collections de prêt-à-porter, de
              maroquinerie, de chaussures, de <b>sacs</b>, de <b>joaillerie</b>,
              de <b>montres</b> et d’
              <b>articles de décoration</b>, parmi tant d’autres.
            </Text>
          </BoxCascade>
        </div>
      </Section>

      <figure className="flex flex-col items-center gap-3 w-full my-20">
        <Image
          width={1800}
          height={1800}
          src="/page/1-ormes.webp"
          alt="model photo"
          className="w-full h-[60vh] object-cover object-center "
        />
        <figcaption className="uppercase font-bold text-sm">
          Artisans au sein de l’atelier Gucci, Florence, 1953 | © Archivio Foto
          Locchi Firenze
        </figcaption>
      </figure>
      <Section title="La chronologie d'Ormés">
        <Text className="text-center">
          L’histoire de la Maison, qui s’étend sur plus d’un siècle, met en
          évidence une vision en constante évolution. Chaque décennie est
          marquée par une succession de jalons historiques qui caractérisent
          l’évolution de la marque, se métamorphosant d’un petit atelier de
          bagagerie en un leader mondial de la mode de luxe.
        </Text>

        <figure className="flex flex-col items-center gap-3 w-full ">
          <Image
            width={1800}
            height={1800}
            src="/page/2-ormes.avif"
            alt="model photo"
            className="w-full h-[60vh] object-cover object-center "
          />
          <figcaption className="uppercase font-bold text-sm">
            Artisans au sein de l’atelier Gucci, Florence, 1953 | © Archivio
            Foto Locchi Firenze
          </figcaption>
        </figure>
      </Section>
    </main>
  );
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col items-center gap-20 xl:w-2/3 w-full py-20">
      <Title className="uppercase text-center text-4xl">{title}</Title>
      {children}
    </div>
  );
};

export default PageOrmes;
