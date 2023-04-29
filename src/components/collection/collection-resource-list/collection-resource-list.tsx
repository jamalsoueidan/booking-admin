import { VerticalStack } from "@shopify/polaris";
import { memo, useMemo } from "react";
import { CollectionGetAll } from "~/api/model";
import { HelperArray } from "~/helpers/helper-array";
import { CollectionResourceItem } from "../collection-resource-item";

export interface CollectionResourceListProps {
  collections: CollectionGetAll[];
}

export const CollectionResourceList = memo(
  ({ collections }: CollectionResourceListProps) => {
    const sortedCollections = useMemo(() => {
      if (!collections) return [];
      return [...collections].sort(HelperArray.sortByText((d) => d.title));
    }, [collections]);

    return (
      <VerticalStack gap="8">
        {sortedCollections.map((collection) => (
          <CollectionResourceItem
            key={collection._id}
            collection={collection}
          />
        ))}
      </VerticalStack>
    );
  }
);
