import { Button, Page, TextField } from "@shopify/polaris";

import { useField } from "@shopify/react-form";
import type { Meta, StoryObj } from "@storybook/react";
import { ModalProvider } from "~/providers/modal";
import { SaveBarProvider } from "~/providers/save-bar";
import { Form } from "./form";
import { useRouterSaveBar } from "./use-router-save-bar";
import { UseRouterSubmitMethods } from "./use-router-submit";

export type MockComponentProps = {
  method: UseRouterSubmitMethods;
};
const MockComponent = ({ method }: MockComponentProps) => {
  const { submit, fields, dirty } = useRouterSaveBar({
    method: method,
    fields: {
      name: useField(""),
    },
  });
  return (
    <Page title="Example of saveBar form">
      <Form onSubmit={submit} method={method}>
        <TextField label="Name" autoComplete="off" {...fields.name} />
        <Button submit disabled={!dirty}>
          Submit
        </Button>
      </Form>
    </Page>
  );
};

const meta = {
  title: "Libs/ReactForms/UseRouterSavebar",
  component: MockComponent,
  decorators: [
    (Story) => (
      <SaveBarProvider>
        <ModalProvider>
          <Story />
        </ModalProvider>
      </SaveBarProvider>
    ),
  ],
  argTypes: {},
} satisfies Meta<typeof MockComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PostSaveBarForm: Story = {
  args: {
    method: "post",
  },
};

export const PutSaveBarForm: Story = {
  args: {
    method: "put",
  },
};
