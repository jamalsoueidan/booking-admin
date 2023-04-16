import { Button, Page, Text } from "@shopify/polaris";
import { useI18n } from "@shopify/react-i18n";
import { Meta } from "@storybook/react";
import { useState } from "react";
import { SettingsProvider } from "./settings-context-provider";
import { SettingsContextValues } from "./settings-context.types";
import { LinkComponent, Navigate } from "./stories/helper";

const value: SettingsContextValues = {
  LinkComponent,
  language: "da",
  navigate: Navigate(),
  timeZone: "Europe",
};

const locales = {
  da: {
    choosen: "Du har valgt: ",
    danish: "Dansk",
    english: "Engelsk",
    lang: "dansk",
  },
  en: {
    choosen: "You have choosen: ",
    danish: "Danish",
    english: "English",
    lang: "english",
  },
};

interface MockComponentProps {
  setLanguage: (value: string) => void;
}

const MockComponent = ({ setLanguage }: MockComponentProps) => {
  const [i18n] = useI18n({
    fallback: locales.da,
    id: "settings",
    translations: (locale: string) =>
      locale === "da" ? locales.da : locales.en,
  });

  return (
    <Page title="Example">
      {i18n.translate("choosen")}
      {i18n.translate("lang")}
      <br />
      <Button
        onClick={() => setLanguage("da")}
        pressed={i18n.translate("lang") === "dansk"}
      >
        {i18n.translate("danish")}
      </Button>
      <Button
        onClick={() => setLanguage("en")}
        pressed={i18n.translate("lang") === "english"}
      >
        {i18n.translate("english")}
      </Button>
    </Page>
  );
};

export const Basic = () => {
  const [language, setLanguage] = useState<string>("da");

  return (
    <SettingsProvider value={{ ...value, language }}>
      <MockComponent setLanguage={setLanguage} />
    </SettingsProvider>
  );
};

export const WithLinkComponent = () => {
  const [language] = useState<string>("da");

  return (
    <SettingsProvider value={{ ...value, language }}>
      <Page title="LinkComponent">
        <Text variant="bodyLg" as="h1">
          Provide a linkComponent to settiingsProvider, so all polaris component
          use the linkComponent
        </Text>
        <Button url="test">Test (see console)</Button>
        <Button url="another-route">Route (see console)</Button>
      </Page>
    </SettingsProvider>
  );
};

const meta: Meta<typeof SettingsProvider> = {
  title: "Providers/SettingsProvider",
  component: SettingsProvider,
  args: {
    value,
  },
};

export default meta;
