import { AlphaCard, Page } from "@shopify/polaris";
import { Suspense } from "react";

import { subject } from "@casl/ability";
import { Outlet } from "react-router-dom";
import { BadgeStatus } from "~/components/badge-status";
import { LoadingSpinner } from "~/components/loading/loading-spinner";
import { ScheduleCalendar } from "~/components/schedule/schedule-calendar";
import { Await, useDeferredLoaderData } from "~/lib/loaderData";
import { useAbility } from "~/providers/ability-provider";
import { useTranslation } from "~/providers/translate-provider";
import { loader } from "./loader";

export function Component() {
  const { user, shifts } = useDeferredLoaderData<typeof loader>();
  const ability = useAbility();
  const { t } = useTranslation({ id: "user-schedule", locales });

  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <Await resolve={user}>
          {(user) => (
            <Page
              fullWidth
              title={t("title", user)}
              titleMetadata={<BadgeStatus active={user?.active} />}
              backAction={{ content: "user", url: "../" }}
              primaryAction={
                ability.can("update", subject("user", user)) && {
                  content: t("edit", user),
                  url: `edit`,
                }
              }
              secondaryActions={
                ability.can("update", subject("user", user)) && [
                  {
                    content: t("add"),
                    onAction: () => {},
                  },
                ]
              }
            >
              <AlphaCard>
                <Suspense fallback={<LoadingSpinner />}>
                  <Await resolve={shifts} errorElement={<>problems</>}>
                    {(shifts) => <ScheduleCalendar data={shifts} />}
                  </Await>
                </Suspense>
              </AlphaCard>
            </Page>
          )}
        </Await>
      </Suspense>
      <Outlet />
    </>
  );
}

const locales = {
  da: {
    add: "Tilføj vagt",
    edit: "Redigere {fullname}",
    loading: {
      data: "Henter medarbejder vagtplan",
      user: "Henter medarbejder data",
    },
    title: "{fullname} vagtplan",
  },
  en: {
    add: "Add shift",
    edit: "Edit {fullname}",
    loading: {
      data: "Loading user shifts",
      user: "Loading user data",
    },
    title: "{fullname} shifts",
  },
};
