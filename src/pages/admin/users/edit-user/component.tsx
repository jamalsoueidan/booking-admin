import { Page } from "@shopify/polaris";
import { useLoaderData } from "react-router-dom";
import { BadgeStatus } from "~/components/badge-status";
import { UserForm } from "~/components/user/user-form";
import { useTranslation } from "~/providers/translate-provider";
import { loader } from "./loader";

export function Component() {
  const { t } = useTranslation({ id: "edit-user", locales });
  const user = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  return (
    <Page
      fullWidth
      title={t("title")}
      backAction={{ content: "User View", url: `../user/${user._id}/shifts` }}
      titleMetadata={<BadgeStatus active={user?.active || true} />}
    >
      <UserForm data={user} method="put" />
    </Page>
  );
}

const locales = {
  da: {
    title: "Redigere bruger",
  },
  en: {
    title: "Edit user",
  },
};
