"use client";
import { Loader } from "@/components/ui/box/loader";
import { BtnMenu } from "@/components/ui/btn/btn-menu";
import { useSession } from "@/context/app";
import { redirect } from "next/navigation";
import React from "react";
const LayoutAdmin = ({ children }: { children: React.ReactNode }) => {
  const { user, isFetched } = useSession();

  if (!isFetched) return <Loader />;

  if (user?.app_metadata?.role !== "admin") {
    redirect("/");
  }
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
