import { AlphaCard, Button, Range, Text } from "@shopify/polaris";
import { useField } from "@shopify/react-form";
import { Meta } from "@storybook/react";
import { addDays, addMonths, eachDayOfInterval, format } from "date-fns";
import { useCallback, useMemo, useState } from "react";
import { AvailabilityShift } from "~/api/model";
import { InputDateFlat } from "./input-date-flat";

const meta = {
  title: "Components/Inputs/InputDateFlat",
  component: InputDateFlat,
} satisfies Meta<typeof InputDateFlat>;

export default meta;

export const Basic = () => {
  const [date, setDate] = useState<Range | undefined>(undefined);
  const field = useField(undefined);

  return (
    <AlphaCard>
      <InputDateFlat field={field} onMonthChange={setDate} />
      <Text variant="bodyMd" as="p">
        {field.value ? format(field.value, "PPP") : ""}
      </Text>
      <div>
        <pre>onMonthChange: {JSON.stringify(date || {}, null, 2)}</pre>
      </div>
    </AlphaCard>
  );
};

export const SelectedTodayDate = () => {
  const date = useMemo(() => addMonths(new Date(), 1), []);
  const field = useField(date);

  return (
    <AlphaCard>
      <InputDateFlat field={field} />
      <Text variant="bodyMd" as="p">
        {field.value ? format(field.value, "PPP") : ""}
      </Text>
    </AlphaCard>
  );
};

export const LabelHidden = () => {
  const field = useField(undefined);

  return (
    <AlphaCard>
      <InputDateFlat field={field} />
      <Text variant="bodyMd" as="p">
        {field.value ? format(field.value, "PPP") : ""}
      </Text>
    </AlphaCard>
  );
};

export const WithData = () => {
  const field = useField(undefined);

  return (
    <AlphaCard>
      <InputDateFlat data={mock} field={field} />
      <Text variant="bodyMd" as="p">
        {field.value ? format(field.value, "PPP") : ""}
      </Text>
    </AlphaCard>
  );
};

export const DisableDates = () => {
  const field = useField(undefined);
  const [data, setData] = useState(mock);

  const changeData = useCallback(() => {
    const result = eachDayOfInterval({
      end: addDays(new Date(), 9),
      start: addDays(new Date(), 5),
    });
    setData(
      result.map((r) => ({
        date: r,
        start: r,
        end: r,
        bufferTime: 15,
        duration: 15,
        total: 12,
        hours: [],
      }))
    );
    field.onChange(undefined);
  }, [field]);

  return (
    <AlphaCard>
      <InputDateFlat data={data} field={field} disableDates />
      <br />
      <Button onClick={changeData}>Change Data</Button>
      <Text variant="bodyMd" as="p">
        {field.value ? format(field.value, "PPP") : ""}
      </Text>
    </AlphaCard>
  );
};

export const WithDataChange = () => {
  const field = useField(undefined);
  const [data, setData] = useState(mock);

  const changeData = useCallback(() => {
    const result = eachDayOfInterval({
      end: addDays(new Date(), 9),
      start: addDays(new Date(), 5),
    });
    setData(
      result.map((r) => ({
        date: r,
        start: r,
        end: r,
        bufferTime: 15,
        duration: 15,
        total: 12,
        hours: [],
      }))
    );
    field.onChange(undefined);
  }, [field]);

  return (
    <>
      <InputDateFlat data={data} field={field} />
      <br />
      <Button onClick={changeData}>Change Data</Button>
      <Text variant="bodyMd" as="p">
        {field.value ? format(field.value, "PPP") : ""}
      </Text>
    </>
  );
};

const result = eachDayOfInterval({
  end: addDays(new Date(), 4),
  start: addDays(new Date(), 2),
});

const mock: AvailabilityShift[] = result.map((r) => ({
  date: r,
  start: r,
  end: r,
  bufferTime: 15,
  duration: 15,
  total: 12,
  hours: [],
}));
