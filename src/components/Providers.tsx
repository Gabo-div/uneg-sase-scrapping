"use client";

import { SWRConfig } from "swr";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ThemeProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SWRConfig
        value={{
          onError: (error) => {
            console.log("Fetching error: ", { error });
            // if (isRedirect(error)) {
            //   navigate(error);
            // }
          },
        }}
      >
        {children}
        <Analytics />
        <Toaster richColors />
      </SWRConfig>
    </ThemeProvider>
  );
}
