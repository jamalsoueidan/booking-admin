import { AlphaCard, Select } from "@shopify/polaris";
import { useField } from "@shopify/react-form";
import { Meta } from "@storybook/react";
import { addHours, eachHourOfInterval, setHours } from "date-fns";
import { UseTimerField, UseTimerProps, useTimer } from "./use-timer";

const InputTimerDrop = ({ data, field }: UseTimerProps) => {
  const { options, onChange } = useTimer({
    data,
    field,
  });

  return (
    <Select
      labelHidden
      label="-"
      options={options}
      onChange={onChange}
      value={field.value?.start.toJSON()}
    />
  );
};

export const Basic = () => {
  const field = useField<UseTimerField>(undefined);

  return (
    <>
      <AlphaCard>
        <InputTimerDrop field={field} data={mock} />
      </AlphaCard>
      <div>
        <pre>{JSON.stringify(field?.value || {}, null, 2)}</pre>
      </div>
    </>
  );
};

const result = eachHourOfInterval({
  end: setHours(new Date(), 21),
  start: setHours(new Date(), 8),
});

const mock = result.map((r) => ({
  end: addHours(r, 1),
  start: r,
}));

const meta = {
  title: "Components/Hooks/useTimer",
  component: Basic,
} satisfies Meta<typeof Basic>;

export default meta;
