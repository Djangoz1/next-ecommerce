import { BoxCascade } from "@/components/ui/box/box-cascade";
import { Title } from "@/components/ui/typography/title";
import React from "react";

const PageReturnRefund = () => {
  return (
    <div className="py-20">
      <Title className="text-center px-5">Retour & Remboursement</Title>
      <div className="flex flex-col divide-y divide-dashed w-full">
        <BoxCascade title="Comment faire mon retour ?">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio enim
            maiores architecto aut saepe? Nisi, voluptate fugiat minima
            quibusdam laborum magnam hic minus consequuntur assumenda sit alias
            aspernatur? Tempora, distinctio!
          </p>
        </BoxCascade>
        <BoxCascade title="Quelles sont les conditions de retour ">
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora
            quod culpa eius voluptatem temporibus dolorem. Delectus modi id
            labore beatae fuga iste, ipsam quas cumque quam nesciunt aliquid,
            quibusdam enim.
          </p>
        </BoxCascade>
        <BoxCascade title="Quels sont les frais de retour d'une commande?">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
            dicta illum ipsa accusamus eveniet minima facilis. Dignissimos
            maiores, sit tempore nostrum dolorem alias vitae sint, aliquam
            corporis molestiae, beatae nam.
          </p>
        </BoxCascade>
        <BoxCascade title="Puis-je faire un échange ?">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
            dicta illum ipsa accusamus eveniet minima facilis. Dignissimos
            maiores, sit tempore nostrum dolorem alias vitae sint, aliquam
            corporis molestiae, beatae nam.
          </p>
        </BoxCascade>
        <BoxCascade title="Puis-je retourner ou échanger ma commande dans une boutique Rouje ?">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
            dicta illum ipsa accusamus eveniet minima facilis. Dignissimos
            maiores, sit tempore nostrum dolorem alias vitae sint, aliquam
            corporis molestiae, beatae nam.
          </p>
        </BoxCascade>
        <BoxCascade title="Je souhaite modifier ma demande de retour, comment faire?">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
            dicta illum ipsa accusamus eveniet minima facilis. Dignissimos
            maiores, sit tempore nostrum dolorem alias vitae sint, aliquam
            corporis molestiae, beatae nam.
          </p>
        </BoxCascade>
        <BoxCascade title="Puis-je retourner deux commandes dans le même colis ?">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
            dicta illum ipsa accusamus eveniet minima facilis. Dignissimos
            maiores, sit tempore nostrum dolorem alias vitae sint, aliquam
            corporis molestiae, beatae nam.
          </p>
        </BoxCascade>
        <BoxCascade title="Quand, et comment vais-je recevoir mon remboursement ?">
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

export default PageReturnRefund;
