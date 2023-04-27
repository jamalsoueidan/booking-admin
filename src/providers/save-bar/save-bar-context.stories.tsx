import { Button } from "@shopify/polaris";
import { Meta, StoryObj } from "@storybook/react";
import { useCallback } from "react";
import { SaveBarProvider } from "./save-bar-context-provider";
import { useSaveBar } from "./save-bar-context.hook";

const MockComponent = () => {
  const { show, hide } = useSaveBar({
    message: "unsaved changes",
    saveAction: {
      content: "Save",
      onAction: () => show(),
    },
    discardAction: {
      content: "Discard",
      onAction: () => hide(),
    },
  });

  const onClick = useCallback(() => {
    show();
  }, [show]);

  return <Button onClick={onClick}>Show</Button>;
};

const meta = {
  title: "Providers/SaveBarProvider",
  component: SaveBarProvider,
  args: {
    children: <MockComponent />,
  },
} satisfies Meta<typeof SaveBarProvider>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Basic: Story = {};
