import { BoxCascade } from "@/components/ui/box/box-cascade";
import { Title } from "@/components/ui/typography/title";
import React from "react";

const PageMyAccountPromoCodes = () => {
  return (
    <div className="py-20">
      <Title className="text-center px-5">Mon compte & codes promos</Title>
      <div className="flex flex-col divide-y divide-dashed w-full">
        <BoxCascade title="Tout savoir sur le code de 10% bienvenue">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio enim
            maiores architecto aut saepe? Nisi, voluptate fugiat minima
            quibusdam laborum magnam hic minus consequuntur assumenda sit alias
            aspernatur? Tempora, distinctio!
          </p>
        </BoxCascade>
        <BoxCascade title="Comment gérer mon abonnement à la newsletter ?">
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora
            quod culpa eius voluptatem temporibus dolorem. Delectus modi id
            labore beatae fuga iste, ipsam quas cumque quam nesciunt aliquid,
            quibusdam enim.
          </p>
        </BoxCascade>

        <BoxCascade title="Je souhaite supprimer mon compte, comment faire ?">
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

export default PageMyAccountPromoCodes;
