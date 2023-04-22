import React, { useMemo } from "react";
import { UserResourceItem, UserResourceItemProps } from "../user-resource-item";

export interface UserResourceListProps<T> {
  emptyState?: React.ReactNode;
  items: Array<T>;
  renderItem: (item: T) => Omit<UserResourceItemProps, "isLast" | "isFirst">;
}

export const UserResourceList = <T,>({
  emptyState,
  items,
  renderItem,
}: UserResourceListProps<T>) => {
  const itemsMarkup = useMemo(
    () =>
      items.map((item: T, index: number) => {
        const localProps = renderItem(item);
        return (
          <UserResourceItem
            key={index}
            {...localProps}
            isFirst={index === 0}
            isLast={index === items.length - 1}
          />
        );
      }),
    [items, renderItem]
  );

  if (!items.length && emptyState) {
    return <>{emptyState}</>;
  }

  return <>{itemsMarkup}</>;
};
