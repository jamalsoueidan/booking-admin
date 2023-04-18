import { AlphaCard, Columns, Page, Text } from "@shopify/polaris";
import { Suspense } from "react";
import { getUserGetAllQueryOptions } from "~/api/bookingShopifyApi";
import { DashboardGroup } from "~/components/dashboard/Group";
import { Await, deferredLoader, useLoaderData } from "~/lib/loaderData";
import { queryClient } from "~/providers/query-provider";

export const loader = deferredLoader(() => {
  const loadUsers = async () => {
    const response = await queryClient.fetchQuery(getUserGetAllQueryOptions());
    return response.data.payload;
  };

  return { users: loadUsers() };
});

export default function AdminDashboard() {
  const loaderData = useLoaderData<typeof loader>();

  return (
    <Page title="Dashboard">
      <Columns columns={2} alignItems="start" gap="4">
        <AlphaCard>
          <Text variant="bodyMd" fontWeight="bold" as="h2">
            Dashboard
          </Text>
          <p>Welcome to dashboard</p>
        </AlphaCard>
        <Suspense fallback={<>Loading...</>}>
          <Await resolve={loaderData.users} errorElement={<>problems</>}>
            {(users) => <DashboardGroup data={users || []} />}
          </Await>
        </Suspense>
      </Columns>
    </Page>
  );
}
