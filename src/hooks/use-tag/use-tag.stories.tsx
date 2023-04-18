import { Meta } from "@storybook/react";
import { ShiftTag } from "~/api/model";
import { useTag } from "./use-tag";

export const MockComponent = () => {
  const { selectTag } = useTag();
  return <>{selectTag(ShiftTag.weekday)}</>;
};

const meta = {
  title: "Hooks/useTag",
  component: MockComponent,
  argTypes: {},
} satisfies Meta<typeof MockComponent>;

export default meta;
