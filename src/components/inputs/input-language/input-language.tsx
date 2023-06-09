import { Select, SelectProps } from "@shopify/polaris";
import { Field } from "@shopify/react-form";
import { useMemo } from "react";
import { useTranslation } from "~/providers/translate-provider";

export interface InputLanguageProps
  extends Field<string>,
    Omit<SelectProps, "error" | "onBlur" | "onChange" | "value" | "label"> {
  label?: string;
  placeholder?: string;
}

export const InputLanguage = (field: InputLanguageProps) => {
  const { t } = useTranslation({
    id: "input-language",
    locales,
  });

  const languageOptions = useMemo(
    () => [
      {
        label: t("languages.danish"),
        value: "da",
      },
      {
        label: t("languages.english"),
        value: "en",
      },
    ],
    [t]
  );

  return (
    <Select
      label={t("label")}
      placeholder={t("placeholder")}
      options={languageOptions}
      {...field}
    />
  );
};

const locales = {
  da: {
    label: "Sprog",
    languages: {
      danish: "Dansk",
      english: "Engelsk",
    },
    placeholder: "Vælge sprog",
  },
  en: {
    label: "Language",
    languages: {
      danish: "Danish",
      english: "English",
    },
    placeholder: "Choose language",
  },
};
