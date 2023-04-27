import { Button } from "@shopify/polaris";
import { Meta, StoryObj } from "@storybook/react";
import { useCallback, useContext, useEffect } from "react";
import { ModalContext } from "./modal-context";
import { ModalProvider } from "./modal-context-provider";

function MockComponent() {
  const { update, open } = useContext(ModalContext);

  useEffect(() => {
    openModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openModal = useCallback(() => {
    update({
      open: true,
      content: "Tilføj",
      primaryAction: {
        content: "asd",
        onAction: () => {
          update({ open: false });
          console.log("Add");
        },
      },
    });
  }, [update]);

  return <Button onClick={openModal}>{open ? "..." : "Open"}</Button>;
}

const meta = {
  title: "Providers/ModalProvider",
  component: ModalProvider,
  args: {
    children: <MockComponent />,
  },
} satisfies Meta<typeof ModalProvider>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Basic: Story = {};
