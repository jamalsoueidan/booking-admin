import { Form, Page, TextField } from "@shopify/polaris";
import { useField } from "@shopify/react-form";
import type { Meta, StoryObj } from "@storybook/react";
import { SaveBarProvider } from "~/providers/save-bar";
import { useRouterSaveBar } from "./use-router-save-bar";

const MockComponent = () => {
  const { onSubmit, fields } = useRouterSaveBar({
    method: "post",
    fields: {
      name: useField(""),
    },
  });
  return (
    <Page title="Example of saveBar form">
      <Form onSubmit={onSubmit}>
        <TextField label="Name" autoComplete="off" {...fields.name} />
      </Form>
    </Page>
  );
};

const meta = {
  title: "Hooks/ReactForms/UseRouterSavebar",
  component: MockComponent,
  decorators: [
    (Story) => (
      <SaveBarProvider>
        <Story />
      </SaveBarProvider>
    ),
  ],
  argTypes: {},
} satisfies Meta<typeof MockComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PostSaveBarForm: Story = {};
