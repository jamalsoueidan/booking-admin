// .storybook/preview.tsx
import "@shopify/polaris/build/esm/styles.css";
import type { Preview } from "@storybook/react";
import { setDefaultOptions } from "date-fns";
import da from "date-fns/locale/da";
import React, { useMemo } from "react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { LinkComponent } from "../src/components/application/link-component";
import { SettingsProvider } from "../src/providers/setting-provider";

export const Decorator = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const value = useMemo(
    () => ({
      LinkComponent: LinkComponent,
      language: "da",
      timeZone: "Europe/Copenhagen",
      navigate,
    }),
    [navigate]
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
      <BrowserRouter>
        <Decorator>
          <Story />
        </Decorator>
      </BrowserRouter>
    ),
  ],
};

export default preview;
