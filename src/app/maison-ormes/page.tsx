import { BoxCascade } from "@/components/ui/box/box-cascade";
import { Btn } from "@/components/ui/btn";
import { Text } from "@/components/ui/typography/text";
import { Title } from "@/components/ui/typography/title";
import Image from "next/image";
import React from "react";

const PageOrmes = () => {
  return (
    <div className="flex flex-col xl:py-40 py-20 items-center gap-10 xl:gap-20">
      <Section title={<span className="normal-case">La Maison ORMÉS</span>}>
        <Text>
          ORMÉS est une maison de création et de savoir-faire.
          <br />
          <br />
          Fondée par Sandra Djangoné, ORMÉS incarne sa vision du vestiaire idéal
          : un vestiaire qui magnifie le quotidien à travers des pièces à la
          fois intemporelles et profondément uniques.
          <br />
          <br />
          Confectionnées à la demande ou en petites séries, les créations ORMÉS
          sont réalisées à partir de matières naturelles d' exception et
          façonnées par des artisans de renom exclusivement en Europe. Chaque
          pièce, bien plus qu ’ un vêtement, est un concentré de savoir-faire,
          portant en elle une âme qui dépasse les saisons et les tendances.
        </Text>
      </Section>
      <div className="flex flex-col w-full divide-dashed border-y">
        <BoxCascade title={"Qui est à l'origine d'Ormés ?"}>
          <Text>
            Le fondateur de la Maison, Guccio Gucci, est né à Florence le 26
            mars 1881. Il s’installe à Londres au cours de sa jeunesse. En 1897,
            il commence à travailler en tant que bagagiste à l’hôtel Savoy.
            Découvrant au plus près l’environnement particulièrement fermé de la
            haute société internationale, et notamment les valises avec
            lesquelles ses membres voyageaient, il rentre en Italie en 1902 avec
            le rêve qu’un jour, des bagages porteraient son nom. En 1921, il
            ouvre sa première boutique sur la via della Vigna Nuova à Florence,
            spécialisée dans les bagages de style anglais.
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

      <figure className="flex flex-col items-center gap-3 w-full px-5">
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
      <Section title="La créatrice">
        <Text>
          La Maison ORMÉS a été fondée par Sandra Djangoné, issue d' une famille
          d' artisans, de passionnés d' art et de vintage.
          <br />
          Cet univers familial a développé chez elle un goût prononcé pour l'
          artisanat, l'élégance et le savoir-faire d' exception qui permettent
          de créer des pièces intemporelles élégantes et durables avec minutie ,
          ce qui donne l'Aura de la Maison ORMÉS .
          <br />
          <br />
          L'histoire commence lorsqu ' elle débute sa formation dans la mode
          chez Chanel où elle a pu s 'imprégner des codes du monde merveilleux
          du luxe, celui de l'intransigeance, de la minutie et du savoir-faire.
          Baignant dans cet univers, la fondatrice rêvait de créer sa maison,
          une mode durable avec une âme composées de pièces fortes aux lignes
          épurées, élégantes et modernes.
          <br />
          <br />
          La fondatrice crée des pièces intemporelles avec un mélange de style
          vintage, moderne et épuré qui peuvent être chéries toute une vie,
          transmises de génération en génération, réinterprétées pour exprimer
          l'individualité de celui qui les porte.
        </Text>
        <p className="text-center">
          <cite>
            « Les femmes qui m ’ entourent m ’inspirent par leur caractère, leur
            style et la façon dont elles pourraient porter ces vêtements. »
          </cite>
          <br />
          Sandra Djangoné
        </p>

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

      <Section title="Manifeste">
        <Text>
          Je pense qu 'il y a trop de vêtements et de matières synthétiques qui
          polluent notre planète.
          <br />
          <br />
          Le modèle de la mode, qui rend chaque saison obsolète, est défaillant.
          <br />
          <br />
          Je pense qu 'il n ' est pas nécessaire d' avoir toujours plus de
          vêtements, mais plutôt quelques pièces d' une qualité exceptionnelle,
          intemporelles, qui offrent chaque jour le plaisir de les porter et d’
          embellir notre quotidien.
          <br />
          <br />
          Les vêtements ont une âme, ils méritent d'être chéris toute une vie et
          de traverser les générations.
        </Text>
      </Section>
      <Section title="Engagements">
        <div className="flex flex-col gap-2 ">
          <h6 className="uppercase text-xl">UNE MODE RESPONSABLE</h6>

          <Text>
            ORMÉS s ’ engage à utiliser exclusivement des ingrédients 100 %
            naturels, issus de sources durables et respectueuses de l’
            environnement. Chaque matière première est soigneusement
            sélectionnée pour sa pureté et son origine responsable, garantissant
            des vêtements authentiques et respectueux de la biodiversité.
          </Text>
        </div>
        <div className="flex flex-col gap-2">
          <h6 className="uppercase text-xl">Des matières naturelles</h6>

          <Text>
            Chaque pièce est conçue pour durer dans le temps, en utilisant
            exclusivement des matières naturelles d’ exception, toutes
            certifiées par des labels écologiques rigoureux.
          </Text>
        </div>
        <div className="flex flex-col gap-2 ">
          <h6 className="uppercase text-xl">
            Une fabrication raisonnée européenne
          </h6>

          <Text>
            La production, 100 % européenne, repose sur un modèle à la demande
            ou en petites séries. Cela permet une fabrication raisonnée, limitée
            à l' essentiel et soucieuse de l'impact environnemental.
          </Text>
        </div>
      </Section>

      <Btn className="text-center" href={"/faq/on-demand"} variant="link">
        En savoir plus sur la fabrication à la demande
      </Btn>
    </div>
  );
};

const Section = ({
  title,
  children,
}: {
  title: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex px-5 flex-col items-center xl:gap-20 gap-10 xl:w-2/3 w-full xl:py-20 py-10">
      <Title className="uppercase text-center text-4xl">{title}</Title>
      {children}
    </div>
  );
};

export default PageOrmes;
