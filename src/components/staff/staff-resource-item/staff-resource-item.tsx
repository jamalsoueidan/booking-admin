import {
  AlphaStack,
  Avatar,
  AvatarProps,
  Box,
  Inline,
  Text,
  ThumbnailProps,
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
    <AlphaStack>
      <Box
        paddingInlineStart="4"
        paddingInlineEnd="4"
        paddingBlockStart="3"
        paddingBlockEnd="3"
        borderBlockStart="divider"
      >
        <Inline align="space-between">
          <Inline gap="2">
            {media || <Avatar customer size="medium" name="avatar" />}
            <AlphaStack>
              {title}
              <Text as="span" variant="bodyMd">
                {desc}
              </Text>
            </AlphaStack>
          </Inline>
          {action && <Inline align="end">{action}</Inline>}
        </Inline>
      </Box>
    </AlphaStack>
  </LinkComponent>
);