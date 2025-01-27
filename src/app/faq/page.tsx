"use server";
import { Title } from "@/components/ui/typography/title";

import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const FaqPage = () => {
  return (
    <div>
      <div className="flex w-full relative">
        <Image
          src="/model/6.jpg"
          alt="Modèle près d'une fontaine"
          width={1800}
          height={1800}
        />
        <Title className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 text-white">
          FAQ
        </Title>
      </div>

      <div className="p-5 flex flex-col gap-10">
        <div className="grid grid-cols-2 gap-5">
          <Button
            href={"/faq/product-advice-care"}
            icon="game-icons:shopping-bag"
          >
            Produits Conseils & Entretiens
          </Button>
          <Button href={"/faq/order-payment"} icon="carbon:delivery">
            Commande & Paiement
          </Button>
          <Button
            href={"/faq/delivery"}
            icon="arcticons:samsung-gift-indonesia"
          >
            Livraison
          </Button>
          <Button href={"/faq/return-refund"} icon="hugeicons:cashback">
            Retour & remboursement
          </Button>
          <Button href={"/faq/my-account-promo-codes"} icon="bi:qr-code-scan">
            Mon compte & codes promos
          </Button>
        </div>
      </div>
    </div>
  );
};

const Button = ({
  children,
  icon,
  href,
}: {
  children: React.ReactNode;
  icon: string;
  href: string;
}) => {
  return (
    <Link
      href={href}
      className="flex flex-col gap-2 bg-[#F1E8E0] rounded shadow text-4xl items-center p-10 w-full h-[200px] text-center"
    >
      <div className="w-fit h-fit">
        <Icon icon={icon} className="text-5xl" />
      </div>
      <Title className="text-base">{children}</Title>
    </Link>
  );
};

export default FaqPage;
