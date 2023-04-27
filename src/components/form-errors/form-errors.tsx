import { Banner, Box } from "@shopify/polaris";
import { FormError } from "@shopify/react-form";
import { useTranslation } from "~/providers/translate-provider";

export interface FormErrorsProps {
  errors?: FormError[];
}

export const FormErrors = ({ errors }: FormErrorsProps) => {
  const { t } = useTranslation({
    id: "form-errors",
    locales,
  });

  if (errors && errors.length > 0) {
    return (
      <Box paddingBlockEnd={{ md: "0", lg: "6" }}>
        <Banner status="critical" title={t("error", { total: errors.length })}>
          {errors.map(({ message }, index) => (
            <p key={index}>{message}</p>
          ))}
        </Banner>
      </Box>
    );
  }

  return <></>;
};

const locales = {
  da: {
    error: "Der findes {total} fejl:",
  },
  en: {
    error: "There is {total} error with this:",
  },
};
