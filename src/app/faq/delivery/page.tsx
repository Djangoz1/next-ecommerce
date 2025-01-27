import { BoxCascade } from "@/components/ui/box/box-cascade";
import { Title } from "@/components/ui/typography/title";
import React from "react";

const PageDelivery = () => {
  return (
    <div className="py-20">
      <Title className="text-center px-5">Livraison</Title>
      <div className="flex flex-col divide-y divide-dashed w-full">
        <BoxCascade title="Quels sont les délais, les options et frais de livraison ?">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
            suscipit provident voluptate maxime accusamus id unde adipisci!
            Eligendi, voluptatem facilis sunt unde, cupiditate expedita numquam
            totam, nisi aliquam quo error!
          </p>
        </BoxCascade>
        <BoxCascade title="Dans quel pays livrez-vous ?">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
            dicta illum ipsa accusamus eveniet minima facilis. Dignissimos
            maiores, sit tempore nostrum dolorem alias vitae sint, aliquam
            corporis molestiae, beatae nam.
          </p>
        </BoxCascade>
        <BoxCascade title="Aurais-je des frais de douane à payer?">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
            dicta illum ipsa accusamus eveniet minima facilis. Dignissimos
            maiores, sit tempore nostrum dolorem alias vitae sint, aliquam
            corporis molestiae, beatae nam.
          </p>
        </BoxCascade>
        <BoxCascade title="Que faire si j'ai un problème avec ma livraison ?">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
            dicta illum ipsa accusamus eveniet minima facilis. Dignissimos
            maiores, sit tempore nostrum dolorem alias vitae sint, aliquam
            corporis molestiae, beatae nam.
          </p>
        </BoxCascade>
        <BoxCascade title="J'ai reçu une pièce non conforme, que faire ?">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
            dicta illum ipsa accusamus eveniet minima facilis. Dignissimos
            maiores, sit tempore nostrum dolorem alias vitae sint, aliquam
            corporis molestiae, beatae nam.
          </p>
        </BoxCascade>
        <BoxCascade title="Je souhaite modifier mon adresse de livraison ?">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
            dicta illum ipsa accusamus eveniet minima facilis. Dignissimos
            maiores, sit tempore nostrum dolorem alias vitae sint, aliquam
            corporis molestiae, beatae nam.
          </p>
        </BoxCascade>
        <BoxCascade title="Y a-t-il des restrictions sur certains produits en fonction du pays de livraison ?">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
            dicta illum ipsa accusamus eveniet minima facilis. Dignissimos
            maiores, sit tempore nostrum dolorem alias vitae sint, aliquam
            corporis molestiae, beatae nam.
          </p>
        </BoxCascade>
      </div>
    </div>
  );
};

export default PageDelivery;
