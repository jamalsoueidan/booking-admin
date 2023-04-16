import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactNode } from "react";

export function QueryProvider({ children }: { children: ReactNode }) {
  const client = new QueryClient({
    mutationCache: new MutationCache(),
    queryCache: new QueryCache(),
  });

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
