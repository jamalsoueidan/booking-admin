import { Badge } from "@shopify/polaris";

export type BadgeStatusProps = {
  active: boolean;
};

export const BadgeStatus = ({ active }: BadgeStatusProps) =>
  active ? (
    <Badge status="success">Active</Badge>
  ) : (
    <Badge status="warning">Deactivated</Badge>
  );
