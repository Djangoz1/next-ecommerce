"use client";
import { Footer } from "@/components/app/footer";
import { Header } from "@/components/app/header";

import { Toaster } from "@/components/ui/toaster";

import { SessionType } from "@/types/session";
import { clientDb } from "@/utils/client-db";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { createContext, useContext } from "react";

const queryClient = new QueryClient();
export const AppContext = createContext<SessionType & { refresh: () => void }>({
  user: null,
  session: null,
  refresh: () => {},
});

const Element = ({ children }: { children: React.ReactNode }) => {
  const { data } = useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      const { data, error } = await clientDb.auth.getSession();
      if (error) throw new Error(error.message);
      return { ...data, user: data.session?.user } as SessionType;
    },
  });

  const client = useQueryClient();

  return (
    <>
      <AppContext.Provider
        value={{
          refresh: () => client.invalidateQueries({ queryKey: ["auth"] }),
          user: data?.user || null,
          session: data?.session || null,
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
