"use client";
import { Footer } from "@/components/app/footer";
import { Header } from "@/components/app/header";

import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";

import { SessionType } from "@/types/session";
import { clientDb } from "@/utils/client-db";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createContext, useContext } from "react";

const queryClient = new QueryClient();
export const AppContext = createContext<
  SessionType & {
    refresh: () => void;
    logout: () => void;
    isFetched: boolean;
    isLoading: boolean;
  }
>({
  user: null,
  session: null,
  refresh: () => {},
  isLoading: false,
  isFetched: false,
  logout: () => {},
});

const Element = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading, isFetched } = useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      const { data, error } = await clientDb.auth.getSession();
      if (error) throw new Error(error.message);
      return { ...data, user: data.session?.user } as SessionType;
    },
  });

  const { toast } = useToast();
  const client = useQueryClient();
  const router = useRouter();
  return (
    <>
      <AppContext.Provider
        value={{
          isLoading,
          isFetched,
          refresh: () => client.invalidateQueries({ queryKey: ["auth"] }),
          user: data?.user || null,
          session: data?.session || null,
          logout: () => {
            if (data?.user) {
              const name = data?.user?.user_metadata?.name;
              clientDb.auth.signOut();
              client.invalidateQueries({ queryKey: ["auth"] });
              toast({
                title: "Vous avez été déconnecté",
                description: `À bientôt ${name}`,
              });
              router.push("/");
            }
          },
        }}
      >
        <div className="w-full max-w-full   flex flex-col  ">
          <main className="w-full  flex flex-col overflow overflow-x-hidden ">
            {children}
          </main>
        </div>
        <Footer />
        <Header />
      </AppContext.Provider>
    </>
  );
};
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Element>{children}</Element>
      <Toaster />
    </QueryClientProvider>
  );
};

export const useSession = () => {
  const context = useContext(AppContext);

  if (!context) throw new Error("useSession must be used within a AppProvider");
  return context;
};
