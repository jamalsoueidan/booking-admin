import { Page } from "@shopify/polaris";
import { useEffect } from "react";
import { useActionData, useLoaderData } from "react-router-dom";
import { BadgeStatus } from "~/components/badge-status";
import { UserForm } from "~/components/user/user-form";
import { action, loader } from "~/pages/admin/users/edit-user";
import { useToast } from "~/providers/toast";
import { useTranslation } from "~/providers/translate-provider";
import { isUser } from "~/types/user";

export function Component() {
  const { t } = useTranslation({ id: "my-user", locales });
  const { show } = useToast();
  const loaderData = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const actionData = useActionData() as Awaited<ReturnType<typeof action>>;

  useEffect(() => {
    if (isUser(actionData)) {
      show({ content: t("updated") });
    }
  }, [actionData, show, t]);

  return (
    <Page
      fullWidth
      title={t("title")}
      titleMetadata={<BadgeStatus active={loaderData?.active || true} />}
    >
      <UserForm data={loaderData} method="put" />
    </Page>
  );
}

const locales = {
  da: {
    title: "Min konto",
    updated: "Konto opdateret",
  },
  en: {
    title: "My user",
    update: "Account updated",
  },
};
