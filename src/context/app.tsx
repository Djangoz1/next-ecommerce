"use client";
import { Footer } from "@/components/app/footer";
import { Header } from "@/components/app/header";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext } from "react";

const queryClient = new QueryClient();
export const AppContext = createContext({});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppContext.Provider value={{}}>
      <div className="w-full max-w-full  absolute h-screen flex flex-col  ">
        <QueryClientProvider client={queryClient}>
          <main className="w-full  flex flex-col overflow overflow-x-hidden ">
            {children}
          </main>
          <Footer />
        </QueryClientProvider>
      </div>
      <Header />
    </AppContext.Provider>
  );
};
