import { createContext, useRef } from "react";

interface FetchContextType {
  // @ts-expect-error  no-explicit-any
  cache: Map<string, any>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const FetchContext = createContext<FetchContextType | null>(null);

export const FetchProvider = ({ children }: { children: React.ReactNode }) => {
  const cache = useRef(new Map<string, any>());

  return (
    <FetchContext.Provider value={{ cache: cache.current }}>
      {children}
    </FetchContext.Provider>
  );
};
