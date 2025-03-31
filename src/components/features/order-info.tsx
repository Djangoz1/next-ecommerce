import React from "react";
import { Title } from "../ui/typography/title";

export const OrderInfo = () => {
  return (
    <div className="w-full px-4">
      <div className="w-full flex xl:flex-row flex-col gap-10 items-center justify-center py-10 text-center bg-secondary">
        <Element
          title={
            <>
              Livraison <br /> Offerte
            </>
          }
          children="Dès 250€"
        />
        <Element
          title={
            <>
              Paiement <br /> Sécurisé
            </>
          }
          children="Par carte bancaire"
        />
        <Element
          title={
            <>
              Retours
              <br />
              Facilités
            </>
          }
          children="Retours et échanges sous 15 jours"
        />
      </div>
    </div>
  );
};

const Element = ({
  title,
  children,
}: {
  title: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-2 uppercase">
      <Title className="font-light text-lg uppercase">{title}</Title>
      <span className="text-[10px] font-light text-muted-foreground">
        {children}
      </span>
    </div>
  );
};
