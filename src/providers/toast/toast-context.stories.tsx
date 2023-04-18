import type { Meta, StoryObj } from "@storybook/react";
import { useContext, useEffect } from "react";
import { ToastContext } from "./toast-context";
import { ToastProvider } from "./toast-context-provider";

const MockComponent = () => {
  const toast = useContext(ToastContext);
  useEffect(() => {
    toast?.show({ content: "hej med dig" });
    const timer = setTimeout(() => {
      toast?.show({ content: "hej there" });
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  return <></>;
};

const meta = {
  title: "Providers/ToastProvider",
  component: ToastProvider,
  argTypes: {
    children: <MockComponent />,
  },
} satisfies Meta<typeof ToastProvider>;

export default meta;
type Story = StoryObj<typeof meta>;
