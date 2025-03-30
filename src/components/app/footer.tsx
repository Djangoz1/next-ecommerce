import { Title } from "../ui/typography/title";

import { ButtonHeader } from "./header";
import { Icon } from "@iconify/react/dist/iconify.js";
import { InputNewsletter } from "../features/input-newsletter";
import { CONTACT } from "@/constants/inc";
import { BtnItemSizeGuide } from "../features/items/btn-item-size-guide";
import { Btn } from "../ui/btn";
import { ReturnOrder } from "../features/return-order";
import { useModal } from "@/context/modal";

export const Footer = () => {
  const { showModal } = useModal();
  return (
    <footer className="  xl:py-20 py-10  bg-secondary border-t border-black/50  gap-20 flex flex-col">
      <div className="flex flex-col divide-y divide-dashed divide-black/30">
        <div className="flex flex-col gap-5 px-3 pb-10">
          <Title className="uppercase text-2xl">Plus d'Ormés ici</Title>
          <p className="opacity-50 font-light text-sm">
            Venez découvrir la #MaisonOrmes
            <br />
            Recevez des informations exclusives sur le lancement des capsules,
            des communication personnalisée et les dernières actualités de la
            Maison.
          </p>
          <InputNewsletter />
        </div>
        <ButtonHeader
          arr={[
            {
              url: "/tracking",
              children: <>Suivre ma commande</>,
            },
            {
              component: (
                <>
                  <button
                    onClick={() => showModal(<ReturnOrder />, "slideY")}
                    className="uppercase text-[#ADADAD] font-medium text-xs w-fit"
                  >
                    Gérer mon retour
                  </button>
                </>
              ),
            },
            {
              url: "/account",
              children: <>Mon compte</>,
            },
          ]}
        >
          Commande
        </ButtonHeader>
        <ButtonHeader
          arr={[
            {
              url: `mailto:${CONTACT.email_customer_service}`,
              children: <>Contactez-nous</>,
            },
            {
              url: `#`,
              children: <>Envoyez une demande</>,
            },
            {
              url: "/faq",
              children: <>FAQ</>,
            },

            {
              url: "#",
              children: <>Guide d'entretien</>,
            },

            {
              url: "#",
              children: <>Guide des tailles</>,
            },
          ]}
        >
          Aide
        </ButtonHeader>
        <ButtonHeader
          arr={[
            {
              url: "/maison-ormes",
              children: <>La Maison Ormés</>,
            },
            {
              url: "/journal",
              children: <>Le journal</>,
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
          <Btn
            variant="ghost"
            href="
https://www.instagram.com/maison.ormes?igsh=MXFsc3Jhbjk5bHN4cg%3D%3D&utm_source=qr"
          >
            <Icon icon={"circum:instagram"} width={20} height={20} />
          </Btn>
          <Btn variant="ghost" href="https://www.facebook.com/maisonormes">
            <Icon icon={"circum:facebook"} width={20} height={20} />
          </Btn>
          <Btn variant="ghost" href="https://wa.me/33669384336">
            <Icon icon={"ph:whatsapp-logo-thin"} width={20} height={20} />
          </Btn>
        </div>
        <Title className="text-8xl uppercase py-5 text-center w-full">
          Ormés
        </Title>
      </div>
    </footer>
  );
};
