import { Button } from "@shopify/polaris";
import { Meta, StoryObj } from "@storybook/react";
import { useCallback, useContext, useEffect } from "react";
import { SaveBarContext } from "./save-bar-context";
import { SaveBarProvider } from "./save-bar-context-provider";

const MockComponent = () => {
  const {
    updateMessage,
    updateDiscardAction,
    updateSaveAction,
    updateVisibility,
    visibility,
  } = useContext(SaveBarContext);

  const onClick = useCallback(() => {
    updateVisibility(!visibility);
  }, [updateVisibility, visibility]);

  useEffect(() => {
    updateMessage("unsaved changes");
    updateSaveAction({
      content: "Save",
      onAction: () => onClick(),
    });

    updateDiscardAction({
      content: "Discard",
      onAction: () => onClick(),
    });
  }, [onClick, updateDiscardAction, updateMessage, updateSaveAction]);

  return <Button onClick={onClick}>{visibility ? "hide" : "show"}</Button>;
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
