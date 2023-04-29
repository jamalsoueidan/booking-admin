import { Page } from "@shopify/polaris";
import { useEffect } from "react";
import { useActionData, useLoaderData } from "react-router-dom";
import { BadgeStatus } from "~/components/badge-status";
import { UserForm } from "~/components/user/user-form";
import { useToast } from "~/providers/toast";
import { useTranslation } from "~/providers/translate-provider";
import { isUser } from "~/types/user";
import { action } from "./action";
import { loader } from "./loader";

export function Component() {
  const { t } = useTranslation({ id: "edit-user", locales });
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
      backAction={{
        content: "User View",
        url: `../user/${loaderData._id}/shifts`,
      }}
      titleMetadata={<BadgeStatus active={loaderData?.active || true} />}
    >
      <UserForm data={loaderData} method="put" />
    </Page>
  );
}

const locales = {
  da: {
    title: "Redigere bruger",
    updated: "Konto opdateret",
  },
  en: {
    title: "Edit user",
    update: "Account updated",
  },
};
