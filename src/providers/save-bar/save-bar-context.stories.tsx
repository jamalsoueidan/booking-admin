import { Button } from "@shopify/polaris";
import { Meta, StoryObj } from "@storybook/react";
import { useCallback, useContext, useEffect } from "react";
import { SaveBarContext } from "./save-bar-context";
import { SaveBarProvider } from "./save-bar-context-provider";

const MockComponent = () => {
  const { update, show } = useContext(SaveBarContext);

  const onClick = useCallback(() => {
    show();
  }, [show]);

  useEffect(() => {
    update({ message: "unsaved changes" });
    update({
      saveAction: {
        content: "Save",
        onAction: () => onClick(),
      },
    });

    update({
      discardAction: {
        content: "Discard",
        onAction: () => onClick(),
      },
    });
  }, [onClick, update]);

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
