// .storybook/preview.tsx
import "@shopify/polaris/build/esm/styles.css";
import { Preview } from "@storybook/react";
import { setDefaultOptions } from "date-fns";
import da from "date-fns/locale/da";
import React, { useMemo } from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { LinkComponent } from "../src/components/application/link-component";
import { SettingsProvider } from "../src/providers/setting-provider";
import { FrameExample } from "./frame";

export const Decorator = ({ children }: { children: React.ReactNode }) => {
  const value = useMemo(
    () => ({
      LinkComponent: LinkComponent,
      language: "da",
      timeZone: "Europe/Copenhagen",
    }),
    []
  );

  setDefaultOptions({ locale: value.language === "da" ? da : undefined });

  return <SettingsProvider value={value}>{children}</SettingsProvider>;
};

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <RouterProvider
        router={createBrowserRouter(
          createRoutesFromElements(
            <Route
              path="*"
              element={
                <Decorator>
                  <FrameExample>
                    <Story />
                  </FrameExample>
                </Decorator>
              }
            />
          )
        )}
      />
    ),
  ],
};

export default preview;
