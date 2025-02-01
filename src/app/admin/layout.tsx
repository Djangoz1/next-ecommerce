import { BtnMenu } from "@/components/ui/btn/btn-menu";
import React from "react";
const LayoutAdmin = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col py-20">
      <BtnMenu
        arr={[
          {
            label: "Articles",
            value: "/admin",
          },
          {
            label: "Commandes",
            value: "/admin/order",
          },
          {
            label: "Newsletter",
            value: "/admin/newsletter",
          },
        ]}
      />

      {children}
    </div>
  );
};

export default LayoutAdmin;
