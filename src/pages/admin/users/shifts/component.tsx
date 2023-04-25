import { AlphaCard } from "@shopify/polaris";
import { Suspense } from "react";

import { Outlet } from "react-router-dom";
import { LoadingSpinner } from "~/components/loading/loading-spinner";
import { ScheduleCalendar } from "~/components/schedule-calendar";
import { Await, useDeferredLoaderData } from "~/lib/loader-data";
import { loader } from "./loader";

export function Component() {
  const { shifts } = useDeferredLoaderData<typeof loader>();

  return (
    <>
      <AlphaCard>
        <Suspense fallback={<LoadingSpinner />}>
          <Await resolve={shifts}>
            {(shifts) => <ScheduleCalendar data={shifts} />}
          </Await>
        </Suspense>
      </AlphaCard>
      <Outlet />
    </>
  );
}
