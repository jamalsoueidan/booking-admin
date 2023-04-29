import {
  AlphaCard,
  Box,
  Button,
  HorizontalGrid,
  HorizontalStack,
  Text,
} from "@shopify/polaris";
import { memo, useCallback } from "react";
import { CollectionGetAll } from "~/api/model";
import { ProductResourceList } from "~/components/product/product-resource-list";
import { useAbility } from "~/providers/ability-provider";
import { useTranslation } from "~/providers/translate-provider";

export interface CollectionResourceItemProps {
  collection: CollectionGetAll;
}

export const CollectionResourceItem = memo(
  ({ collection }: CollectionResourceItemProps) => {
    const ability = useAbility();
    const { t } = useTranslation({ id: "collection-item", locales });

    const removeCollection = useCallback(() => {
      console.log("remove modal");
    }, []);

    return (
      <AlphaCard padding="0">
        <Box paddingBlockStart="4" paddingInlineStart="4" paddingInlineEnd="4">
          <HorizontalGrid columns={2}>
            <HorizontalStack blockAlign="center">
              <Text as="h2" variant="bodyMd">
                {collection.title}
              </Text>
            </HorizontalStack>
            <HorizontalStack align="end">
              {ability.can("delete", "collection") && (
                <Button onClick={removeCollection} plain>
                  {t("remove_collection")}
                </Button>
              )}
            </HorizontalStack>
          </HorizontalGrid>
        </Box>
        <ProductResourceList items={collection.products} />
      </AlphaCard>
    );
  }
);

const locales = {
  da: {
    remove_collection: "Fjern",
  },
  en: {
    remove_collection: "Remove",
  },
};
