import React, { ReactNode } from "react";
import { Title } from "../ui/typography/title";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className=" z-50 xl:px-10 px-5 xl:py-20 py-10  bg-black text-white gap-20 flex flex-col">
      <div className="flex xl:flex-row flex-col gap-20  justify-between">
        <Col
          id="1"
          arr={[
            {
              link: "/",
              children: "Nous contacter",
            },
            {
              link: "/",
              children: "Ma commande",
            },
            {
              link: "/",
              children: "Foire aux Questions",
            },
            {
              link: "/",
              children: "Désinscription à la Newsletter",
            },
          ]}
        >
          Besoin d'aide ?
        </Col>

        <Col
          id="2"
          arr={[
            {
              link: "/",
              children: "À propos d'Ormès",
            },
            {
              link: "/",
              children: "Ormès inspiration",
            },
            {
              link: "/",
              children: "Code éthique",
            },
            {
              link: "/",
              children: "Carrières",
            },
          ]}
        >
          Informations de la société
        </Col>
        <div className="flex flex-col gap-10 text-sm text-left">
          <Title className="text-lg opacity-50">
            Inscrivez vous pour suivre l'actualité d'Ormès
          </Title>

          <p className="font-extralight  w-1/2 ">
            Recevez des informations exclusives sur le lancement de la
            collection, des communication personnalisée et les dernières
            actualités de la Maison.
          </p>
        </div>
      </div>

      <p className="text-sm text-light">
        © 2025 Ormès - Tous droits réservés G Commerce Europe S.p.A. - IT VAT nr
        05142860484. LICENCE SIAE N. 2294/I/1936 et 5647/I/1936
      </p>
    </div>
  );
};

const Col = ({
  arr,
  id = "1",
  children,
}: {
  arr: { link: string; children: ReactNode }[];
  id: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-10 text-sm whitespace-nowrap">
      <h6 className="text-lg font-info font-bold opacity-50">{children}</h6>
      <div className="flex flex-col gap-4">
        {arr.map((item, i) => (
          <Link
            className="underline "
            key={`footer-link-${id}-${i}`}
            href={item.link}
          >
            {item.children}
          </Link>
        ))}
      </div>
    </div>
  );
};
