import { AlphaCard, Button, Range, Text } from "@shopify/polaris";
import { useField } from "@shopify/react-form";
import { Meta } from "@storybook/react";
import { addDays, addMonths, eachDayOfInterval, format } from "date-fns";
import { useCallback, useMemo, useState } from "react";
import { AvailabilityShift } from "~/api/model";
import { InputDate } from "./input-date";

const meta = {
  title: "Components/Inputs/InputDate",
  component: InputDate,
} satisfies Meta<typeof InputDate>;

export default meta;

export const Basic = () => {
  const [date, setDate] = useState<Range | undefined>(undefined);
  const field = useField(undefined);

  return (
    <AlphaCard>
      <InputDate field={field} input={{ onMonthChange: setDate }} />
      <Text variant="bodyMd" as="p">
        {field.value ? format(field.value, "PPP") : ""}
      </Text>
      <div>
        <pre>onMonthChange: {JSON.stringify(date || {}, null, 2)}</pre>
      </div>
    </AlphaCard>
  );
};

export const Selected = () => {
  const date = useMemo(() => addMonths(new Date(), 1), []);
  const field = useField(date);

  return (
    <AlphaCard>
      <InputDate field={field} />
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
      <InputDate data={data} field={field} disableDates />
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
    <AlphaCard>
      <InputDate data={data} field={field} />
      <Button onClick={changeData}>Change Data</Button>
      <Text variant="bodyMd" as="p">
        {field.value ? format(field.value, "PPP") : ""}
      </Text>
    </AlphaCard>
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
