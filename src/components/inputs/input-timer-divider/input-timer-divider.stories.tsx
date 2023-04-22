import { AlphaCard, Button, Form } from "@shopify/polaris";
import { SubmitResult, useField, useForm } from "@shopify/react-form";
import { addDays, addHours, eachHourOfInterval, setHours } from "date-fns";
import { useState } from "react";
import {
  InputTimerDivider,
  InputTimerDividerField,
} from "./input-timer-divider";

import { Meta } from "@storybook/react";
import { Validators } from "~/helpers/validators";

const meta = {
  title: "Components/Inputs/InputTimerDivider",
  component: InputTimerDivider,
} satisfies Meta<typeof InputTimerDivider>;

export default meta;

export const Basic = () => {
  const field = useField<InputTimerDividerField>(undefined);

  return (
    <>
      <AlphaCard>
        <InputTimerDivider data={mock} field={field} />
      </AlphaCard>
      <div>
        <pre>{JSON.stringify(field?.value || {}, null, 2)}</pre>
      </div>
    </>
  );
};

export const Error = () => {
  const field = useField<InputTimerDividerField>({
    validates: [
      Validators.notEmptyObject<InputTimerDividerField>("error not selected"),
    ],
    value: undefined,
  });

  const { fields, submit } = useForm({
    fields: { time: field },
    onSubmit: async (): Promise<SubmitResult> => ({ status: "success" }),
  });

  return (
    <>
      <AlphaCard>
        <Form onSubmit={submit}>
          <InputTimerDivider data={mock} field={fields.time} />
          <Button onClick={submit}>Send</Button>
        </Form>
      </AlphaCard>
      <div>
        <pre>{JSON.stringify(field?.value || {}, null, 2)}</pre>
      </div>
    </>
  );
};

export const Selected = () => {
  const field = useField<InputTimerDividerField>({
    end: new Date(mock[0].end),
    start: new Date(mock[0].start),
  });

  return (
    <>
      <AlphaCard>
        <InputTimerDivider data={mock} field={field} />
      </AlphaCard>
      <div>
        <pre>{JSON.stringify(field?.value || {}, null, 2)}</pre>
      </div>
    </>
  );
};

export const Disabled = () => {
  const field = useField<InputTimerDividerField>(undefined);

  return (
    <>
      <AlphaCard>
        <InputTimerDivider field={field} input={{ disabled: true }} />
      </AlphaCard>
      <div>
        <pre>{JSON.stringify(field?.value || {}, null, 2)}</pre>
      </div>
    </>
  );
};

export const Empty = () => {
  const field = useField<InputTimerDividerField>(undefined);

  return (
    <>
      <AlphaCard>
        <InputTimerDivider field={field} />
      </AlphaCard>
      <div>
        <pre>{JSON.stringify(field?.value || {}, null, 2)}</pre>
      </div>
    </>
  );
};

export const LazyLoad = () => {
  const field = useField<InputTimerDividerField>(undefined);
  const [data, setData] = useState(mock);

  return (
    <>
      <AlphaCard>
        <InputTimerDivider field={field} data={data} />
      </AlphaCard>
      <Button
        onClick={() => setData(createMock(addDays(new Date(), 2), 11, 18))}
      >
        Change time
      </Button>
      <div>
        <pre>{JSON.stringify(field?.value || {}, null, 2)}</pre>
      </div>
    </>
  );
};

const createMock = (date = new Date(), startHour = 9, endHour = 16) => {
  const result = eachHourOfInterval({
    end: setHours(date, endHour),
    start: setHours(date, startHour),
  });

  const modified = result.map((r) => ({
    end: addHours(r, 1),
    start: r,
  }));

  return modified;
};

const mock = createMock();
