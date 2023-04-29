import { Page } from "@shopify/polaris";

import { Outlet, useLoaderData } from "react-router-dom";
import { BadgeStatus } from "~/components/badge-status";
import { useTranslation } from "~/providers/translate-provider";
import { loader } from "./loader";

export function Component() {
  const user = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const { t } = useTranslation({ id: "my-schedule", locales });

  return (
    <Page
      fullWidth
      title={t("title", user)}
      titleMetadata={<BadgeStatus active={user?.active} />}
    >
      <Outlet />
    </Page>
  );
}

const locales = {
  da: {
    title: "Min vagtplan",
  },
  en: {
    title: "My shifts",
  },
};
