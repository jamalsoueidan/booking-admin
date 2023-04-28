import {
  AlphaCard,
  Avatar,
  HorizontalStack,
  Page,
  ResourceItem,
  ResourceList,
  Text,
  VerticalStack,
} from "@shopify/polaris";

import { useCallback } from "react";
import { useLoaderData } from "react-router-dom";
import { User } from "~/api/model";
import { BadgeStatus } from "~/components/badge-status";
import { UserEmpty } from "~/components/user/user-empty";

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
        <ResourceList
          emptyState={<UserEmpty />}
          resourceName={{ singular: "user", plural: "users" }}
          items={users || []}
          renderItem={({
            _id,
            active,
            avatar,
            fullname,
            phone,
          }: (typeof users)[number]) => (
            <ResourceItem
              id={_id}
              url={`../user/${_id}/shifts`}
              media={
                <Avatar source={avatar} customer size="medium" name="avatar" />
              }
              accessibilityLabel={`View details for ${fullname}`}
            >
              <HorizontalStack align="space-between">
                <HorizontalStack gap="2">
                  <VerticalStack>
                    <Text as="h4" variant="bodyMd" fontWeight="bold">
                      {fullname}
                    </Text>
                    <Text as="span" variant="bodyMd">
                      {phone}
                    </Text>
                  </VerticalStack>
                </HorizontalStack>
                <HorizontalStack align="end">{active}</HorizontalStack>
              </HorizontalStack>
            </ResourceItem>
          )}
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
