import { useSession } from "@/context/app";
import { redirect } from "next/navigation";

import { useEffect } from "react";

export const useNeedAuth = () => {
  const { user, isFetched, isLoading } = useSession();

  useEffect(() => {
    if (!isFetched || isLoading) return;
    if (!user) {
      redirect("/auth/sign-in");
    }
  }, [user, isFetched]);
};
