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
      <div className="max-w-screen">
        <Header />
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
        <Footer />
      </div>
    </AppContext.Provider>
  );
};
