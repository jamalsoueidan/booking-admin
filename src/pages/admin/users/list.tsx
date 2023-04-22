import { AlphaCard, Avatar, Page, Text } from "@shopify/polaris";

import { useCallback } from "react";
import { useLoaderData } from "react-router-dom";
import { getUserGetAllQueryOptions } from "~/api/bookingShopifyApi";
import { User } from "~/api/model";
import { BadgeStatus } from "~/components/badge-status";
import { StaffEmpty } from "~/components/staff/staff-empty";
import { StaffResourceList } from "~/components/staff/staff-resource-list";
import { usePosition } from "~/hooks/use-position";

import { useAbility } from "~/providers/ability-provider";
import { queryClient } from "~/providers/query-provider";
import { useTranslation } from "~/providers/translate-provider";

export const loader = async () => {
  const data = await queryClient.fetchQuery(getUserGetAllQueryOptions());
  return data.data.payload;
};

export function Component() {
  const users = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const { t } = useTranslation({ id: "staff", locales });
  const ability = useAbility();
  const { selectPosition } = usePosition();

  const renderItem = useCallback(
    ({ _id, fullname, active, avatar, position, phone }: User) => ({
      url: `../user/${_id}`,
      desc: (
        <div>
          {selectPosition(position)}, {phone}
          <br />
        </div>
      ),
      media: <Avatar customer size="medium" name={fullname} source={avatar} />,
      title: (
        <Text variant="headingSm" as="h6">
          {fullname} <BadgeStatus active={active || true} />
        </Text>
      ),
    }),
    [selectPosition]
  );

  return (
    <Page
      fullWidth
      title={t("title")}
      primaryAction={
        ability.can("create", "user")
          ? {
              content: t("add"),
              url: "../user/new",
            }
          : null
      }
    >
      <AlphaCard padding="0">
        <StaffResourceList
          emptyState={<StaffEmpty />}
          items={users || []}
          renderItem={renderItem}
        />
      </AlphaCard>
    </Page>
  );
}

const locales = {
  da: {
    add: "Tilføj ny medarbejder",
    resource: {
      plural: "medarbejder",
      singular: "medarbejder",
    },
    title: "Medarbejder ",
  },
  en: {
    add: "Add staff member",
    resource: {
      plural: "customers",
      singular: "customer",
    },
    title: "Staff",
  },
};
