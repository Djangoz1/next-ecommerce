import { useSession } from "@/context/app";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useAuthRedirect = () => {
  const { user } = useSession();

  const router = useRouter();
  return useEffect(() => {
    if (user?.id) {
      router.push("/account");
    }
  }, [user?.id]);
};
