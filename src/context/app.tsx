"use client";
import { Footer } from "@/components/app/footer";
import { Header } from "@/components/app/header";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { createContext, useContext } from "react";

const queryClient = new QueryClient();
export const AppContext = createContext({
  uniqueId: "",
});

const Element = ({ children }: { children: React.ReactNode }) => {
  const { data } = useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      if (localStorage.getItem("uniqueId")) {
        return localStorage.getItem("uniqueId");
      }
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth`, {
        method: "POST",
      });
      const data = await response.json();
      localStorage.setItem("uniqueId", data.result);

      return data.result;
    },
  });

  console.log({ uniqueId: data });

  return (
    <>
      <AppContext.Provider value={{ uniqueId: data }}>
        <div className="w-full max-w-full  absolute h-screen flex flex-col  ">
          <main className="w-full  flex flex-col overflow overflow-x-hidden ">
            {children}
          </main>
          <Footer />
        </div>
        <Header />
      </AppContext.Provider>
    </>
  );
};
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Element>{children}</Element>
    </QueryClientProvider>
  );
};

export const useSession = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useSession must be used within a AppProvider");
  return context;
};
