import { Button, Page, TextField } from "@shopify/polaris";

import { useField } from "@shopify/react-form";
import type { Meta, StoryObj } from "@storybook/react";
import { SaveBarProvider } from "~/providers/save-bar";
import { Form } from "./form";
import { useRouterSaveBar } from "./use-router-save-bar";

const MockComponent = () => {
  const { submit, fields, dirty } = useRouterSaveBar({
    method: "post",
    fields: {
      name: useField(""),
    },
  });
  return (
    <Page title="Example of saveBar form">
      <Form onSubmit={submit}>
        <TextField label="Name" autoComplete="off" {...fields.name} />
        <Button submit disabled={!dirty}>
          Submit
        </Button>
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
