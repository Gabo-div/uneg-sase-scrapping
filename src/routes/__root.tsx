import {
  Outlet,
  createRootRoute,
  isRedirect,
  useNavigate,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { SWRConfig } from "swr";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const navigate = useNavigate();

  return (
    <SWRConfig
      value={{
        onError: (error) => {
          if (isRedirect(error)) {
            navigate(error);
          }
        },
      }}
    >
      <Outlet />
      <TanStackRouterDevtools />
    </SWRConfig>
  );
}
