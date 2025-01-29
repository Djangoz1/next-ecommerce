import { useSession } from "@/context/app";
import { redirect } from "next/navigation";

import { useEffect } from "react";

export const useNeedNotAuth = () => {
  const { user, isLoading, isFetched } = useSession();

  useEffect(() => {
    console.log({ user, isFetched });
    if (!isFetched || !isLoading) return;
    if (user) {
      redirect("/account");
    }
  }, [user, isFetched]);
};
