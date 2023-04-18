import { Modal } from "@shopify/polaris";
import { Meta, StoryObj } from "@storybook/react";
import { useContext, useEffect } from "react";
import { ModalContext } from "./modal-context";
import { ModalProvider } from "./modal-context-provider";

function MockComponent() {
  const { setPrimaryAction } = useContext(ModalContext);

  useEffect(() => {
    setPrimaryAction({
      content: "Tilføj",
      onAction: () => {
        // eslint-disable-next-line no-console
        console.log("Add");
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal.Section>MockComponent that read value from context</Modal.Section>
  );
}

const meta = {
  title: "Providers/ModalProvider",
  component: ModalProvider,
  argTypes: {
    children: <MockComponent />,
  },
} satisfies Meta<typeof ModalProvider>;

export default meta;
type Story = StoryObj<typeof meta>;
