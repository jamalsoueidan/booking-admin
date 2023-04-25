import { Page } from "@shopify/polaris";

import { subject } from "@casl/ability";
import { Outlet, useLoaderData } from "react-router-dom";
import { BadgeStatus } from "~/components/badge-status";
import { useAbility } from "~/providers/ability-provider";
import { useTranslation } from "~/providers/translate-provider";
import { loader } from "./loader";

export function Component() {
  const user = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const ability = useAbility();
  const { t } = useTranslation({ id: "user-schedule", locales });

  return (
    <Page
      fullWidth
      title={t("title", user)}
      titleMetadata={<BadgeStatus active={user?.active} />}
      backAction={{ content: "user", url: "../users" }}
      primaryAction={
        ability.can("update", subject("user", user)) && {
          content: t("edit"),
          url: `edit`,
        }
      }
    >
      <Outlet />
    </Page>
  );
}

const locales = {
  da: {
    edit: "Redigere bruger",
    title: "{fullname} vagtplan",
  },
  en: {
    edit: "Edit user",
    title: "{fullname} shifts",
  },
};
