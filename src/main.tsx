import "@shopify/polaris/build/esm/styles.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Application } from "./application";
import "./main.css";
import { QueryProvider } from "./providers/query-provider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryProvider>
      <BrowserRouter>
        <Application />
      </BrowserRouter>
    </QueryProvider>
  </React.StrictMode>
);
