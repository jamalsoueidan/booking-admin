import {
  Avatar,
  AvatarProps,
  Box,
  HorizontalStack,
  Text,
  ThumbnailProps,
  VerticalStack,
} from "@shopify/polaris";
import React, { ReactNode } from "react";
import { LinkComponent } from "~/components/application/link-component";

export type StaffResourceItemProps = {
  title: string | ReactNode;
  desc?: string | ReactNode;
  media?: React.ReactElement<AvatarProps | ThumbnailProps>;
  action?: ReactNode;
  url?: string;
  isLast?: boolean;
  isFirst?: boolean;
};

export const StaffResourceItem = ({
  title,
  desc,
  media,
  url,
  action,
}: StaffResourceItemProps) => (
  <LinkComponent url={url || ""}>
    <HorizontalStack>
      <Box
        paddingInlineStart="4"
        paddingInlineEnd="4"
        paddingBlockStart="3"
        paddingBlockEnd="3"
      >
        <HorizontalStack align="space-between">
          <HorizontalStack gap="2">
            {media || <Avatar customer size="medium" name="avatar" />}
            <VerticalStack>
              {title}
              <Text as="span" variant="bodyMd">
                {desc}
              </Text>
            </VerticalStack>
          </HorizontalStack>
          {action && <HorizontalStack align="end">{action}</HorizontalStack>}
        </HorizontalStack>
      </Box>
    </HorizontalStack>
  </LinkComponent>
);
