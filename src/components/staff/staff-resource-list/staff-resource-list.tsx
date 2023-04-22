import React, { useMemo } from "react";
import {
  StaffResourceItem,
  StaffResourceItemProps,
} from "../staff-resource-item";

export interface StaffResourceListProps<T> {
  emptyState?: React.ReactNode;
  items: Array<T>;
  renderItem: (item: T) => Omit<StaffResourceItemProps, "isLast" | "isFirst">;
}

export const StaffResourceList = <T,>({
  emptyState,
  items,
  renderItem,
}: StaffResourceListProps<T>) => {
  const itemsMarkup = useMemo(
    () =>
      items.map((item: T, index: number) => {
        const localProps = renderItem(item);
        return (
          <StaffResourceItem
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
