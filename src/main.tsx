import "@shopify/polaris/build/esm/styles.css";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Application } from "./application";
import { QueryProvider } from "./providers/query-provider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <QueryProvider>
      <Application />
    </QueryProvider>
  </StrictMode>
);
