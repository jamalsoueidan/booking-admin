import "@shopify/polaris/build/esm/styles.css";
import axios from "axios";
import ReactDOM from "react-dom/client";
import { Application } from "./application";
import { QueryProvider } from "./providers/query-provider";

axios.interceptors.request.use((config) => {
  console.log(config);
  return {
    ...config,
    baseURL: "/api",
  };
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryProvider>
    <Application />
  </QueryProvider>
);
