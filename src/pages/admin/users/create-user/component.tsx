import { Page } from "@shopify/polaris";
import { UserForm } from "~/components/user/user-form";

import { useTranslation } from "~/providers/translate-provider";

export function Component() {
  const { t } = useTranslation({
    id: "create-user",
    locales,
  });

  return (
    <Page
      fullWidth
      title={t("title")}
      backAction={{ content: "Staff", url: "../users" }}
    >
      <UserForm method="post" />
    </Page>
  );
}

const locales = {
  da: {
    title: "Opret bruger",
  },
  en: {
    title: "Create user",
  },
};
