import { AlphaCard, Avatar, Page, Text } from "@shopify/polaris";

import { useCallback } from "react";
import { useLoaderData } from "react-router-dom";
import { User } from "~/api/model";
import { BadgeStatus } from "~/components/badge-status";
import { UserEmpty } from "~/components/user/user-empty";
import { UserResourceList } from "~/components/user/user-resource-list";

import { usePosition } from "~/hooks/use-position";

import { useAbility } from "~/providers/ability-provider";
import { useTranslation } from "~/providers/translate-provider";
import { loader } from "./loader";

export function Component() {
  const users = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const { t } = useTranslation({ id: "staff", locales });
  const ability = useAbility();
  const { selectPosition } = usePosition();

  const renderItem = useCallback(
    ({ _id, fullname, active, avatar, position, phone }: User) => ({
      url: `../user/${_id}/shifts`,
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
        <UserResourceList
          emptyState={<UserEmpty />}
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