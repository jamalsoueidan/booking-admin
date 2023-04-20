import { AlphaCard, Page } from "@shopify/polaris";
import { Suspense } from "react";

import {
  getUserGetByIdQueryOptions,
  getUserShiftGetAllQueryOptions,
} from "~/api/bookingShopifyApi";
import { BadgeStatus } from "~/components/badge-status";
import { LoadingSpinner } from "~/components/loading/loading-spinner";
import { ScheduleCalendar } from "~/components/schedule/schedule-calendar";
import { Await, deferredLoader, useDeferredLoaderData } from "~/lib/loaderData";
import { queryClient } from "~/providers/query-provider";
import { useTranslation } from "~/providers/translate-provider";

export const loader = deferredLoader(({ request, params }) => {
  const searchParams = new URLSearchParams(request.url.split("?")[1]);
  const loadUser = async () => {
    const response = await queryClient.fetchQuery(
      getUserGetByIdQueryOptions(params.userId || "")
    );
    return response.data.payload;
  };

  const loadShifts = async () => {
    const response = await queryClient.fetchQuery(
      getUserShiftGetAllQueryOptions(params.userId || "", {
        start: new Date(searchParams.get("start") || ""),
        end: new Date(searchParams.get("end") || ""),
      })
    );
    return response.data.payload;
  };

  return { user: loadUser(), shifts: loadShifts() };
});

export function Component() {
  const { user, shifts } = useDeferredLoaderData<typeof loader>();
  const { t } = useTranslation({ id: "user-schedule", locales });

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Await resolve={user} errorElement={<>problems</>}>
        {(user) => (
          <Page
            fullWidth
            title={t("title", user)}
            titleMetadata={<BadgeStatus active={user?.active} />}
            backAction={{ content: "user", url: "../" }}
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
