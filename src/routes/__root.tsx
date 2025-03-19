import {
  Outlet,
  createRootRoute,
  isRedirect,
  useNavigate,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { SWRConfig } from "swr";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ThemeProvider";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const navigate = useNavigate();

  return (
    <ThemeProvider>
      <SWRConfig
        value={{
          onError: (error) => {
            console.log("Fetching error: ", { error });
            if (isRedirect(error)) {
              navigate(error);
            }
          },
        }}
      >
        <Outlet />
        <TanStackRouterDevtools />
        <Analytics />
        <Toaster richColors />
      </SWRConfig>
    </ThemeProvider>
  );
}
