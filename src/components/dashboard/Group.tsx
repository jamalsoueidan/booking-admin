import { AlphaCard, Avatar, Box, ResourceList, Text } from "@shopify/polaris";
import { memo } from "react";
import { User } from "~/api/model";

interface DashboardGroupProps {
  data: User[];
}

export const DashboardGroup = memo(({ data }: DashboardGroupProps) => {
  const resourceName = {
    plural: "users",
    singular: "user",
  };

  return (
    <AlphaCard padding="0">
      <Box paddingBlockStart="4" paddingInlineEnd="4" paddingInlineStart="4">
        <Text as="h1" variant="bodyMd" fontWeight="semibold">
          Medarbejder
        </Text>
      </Box>
      <ResourceList
        resourceName={resourceName}
        showHeader
        items={data}
        renderItem={(item: User) => {
          const { _id, fullname, avatar, phone } = item;
          const media = (
            <Avatar customer size="medium" name={fullname} source={avatar} />
          );

          return (
            <ResourceList.Item
              id={_id}
              url={`/admin/user/${_id}/shifts`}
              media={media}
            >
              <Text variant="bodyMd" fontWeight="bold" as="h3">
                {fullname}
              </Text>
              <div>Phone: +{phone}</div>
            </ResourceList.Item>
          );
        }}
      />
    </AlphaCard>
  );
});
