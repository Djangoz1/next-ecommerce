"use client";
import React, { ReactNode } from "react";

import { BtnMenu } from "@/components/ui/btn/btn-menu";

import { useSession } from "@/context/app";

import { useNeedAuth } from "@/hooks/accounts/use-need-auth-redirect";

const LayoutAccount = ({ children }: { children: ReactNode }) => {
  const { user, logout } = useSession();

  useNeedAuth();
  return (
    <div className="py-14 w-full min-h-screen">
      <BtnMenu
        arr={[
          { label: "Mon profil", value: "/account" },
          { label: "Mes adresses", value: "/account/addresses" },
          { label: "Mes commandes", value: "/account/orders" },
          { label: "Déconnexion", value: "/", onClick: logout },
        ]}
      />

      {children}
    </div>
  );
};

export default LayoutAccount;
