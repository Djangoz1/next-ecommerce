import { Title } from "../ui/typography/title";

import { FormProvider } from "@/context/form";
import { Input } from "../form/input";
import { ButtonHeader } from "./header";
import { Icon } from "@iconify/react/dist/iconify.js";

export const Footer = () => {
  return (
    <footer className=" z-50  xl:py-20 py-10  bg-[#FAF7F2] border-t  gap-20 flex flex-col">
      <div className="flex flex-col divide-y">
        <div className="flex flex-col gap-5 px-3 pb-10">
          <Title className="uppercase text-2xl">Plus d'Ormés ici</Title>
          <p className="opacity-50 font-light text-sm">
            Venez découvrir la #MaisonOrmes
            <br />
            Recevez des informations exclusives sur le lancement des capsules,
            des communication personnalisée et les dernières actualités de la
            Maison.
          </p>
          <FormProvider onSubmit={() => {}}>
            <Input placeholder="Addresse email" name="email" id="email" />
          </FormProvider>
        </div>
        <ButtonHeader
          arr={[
            {
              url: "#",
              children: <>Suivre ma commande</>,
            },
            {
              url: "#",
              children: <>Gérer mon retour</>,
            },
            {
              url: "#",
              children: <>Mon compte</>,
            },
          ]}
        >
          Commande
        </ButtonHeader>
        <ButtonHeader
          arr={[
            {
              url: "#",
              children: <>Contactez-nous</>,
            },
            {
              url: "#",
              children: <>FAQ</>,
            },
            {
              url: "#",
              children: <>Guide des tailles</>,
            },
            {
              url: "#",
              children: <>Guide d'entretien</>,
            },
          ]}
        >
          Aide
        </ButtonHeader>
        <ButtonHeader
          arr={[
            {
              url: "#",
              children: <>La Maison Ormés</>,
            },
            {
              url: "#",
              children: <>Le journal</>,
            },
            {
              url: "#",
              children: <>Nos addresses</>,
            },
            {
              url: "#",
              children: <>Nos emballages</>,
            },
          ]}
        >
          À propos
        </ButtonHeader>
        <ButtonHeader
          arr={[
            {
              url: "#",
              children: <>CGV</>,
            },
            {
              url: "#",
              children: <>Politique de confidentialité</>,
            },
            {
              url: "#",
              children: <>Mentions légales</>,
            },
            {
              url: "#",
              children: <>Accessibilité</>,
            },
            {
              url: "#",
              children: <>Cookies</>,
            },
          ]}
        >
          Légal
        </ButtonHeader>
        <div className="flex py-5 justify-center gap-5 w-full border-y">
          <Icon icon={"circum:instagram"} width={20} height={20} />
          <Icon icon={"circum:facebook"} width={20} height={20} />
          <Icon icon={"ph:whatsapp-logo-thin"} width={20} height={20} />
        </div>
        <Title className="text-8xl uppercase py-5 text-center w-full">
          Ormés
        </Title>
      </div>
    </footer>
  );
};
