import "@shopify/polaris/build/esm/styles.css";
import ReactDOM from "react-dom/client";
import { Application } from "./application";
import { QueryProvider } from "./providers/query-provider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryProvider>
    <Application />
  </QueryProvider>
);
