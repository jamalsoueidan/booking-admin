import { AlphaCard, Button, Range, Text } from "@shopify/polaris";
import { useField } from "@shopify/react-form";
import { Meta } from "@storybook/react";
import { addDays, addMonths, eachDayOfInterval, format } from "date-fns";
import { useCallback, useMemo, useState } from "react";
import { AvailabilityShift } from "~/api/model";
import {
  InputDataDropData,
  InputDateDrop,
  InputDateDropField,
} from "./input-date-drop";

const meta = {
  title: "Components/Inputs/InputDateDrop",
  component: InputDateDrop,
} satisfies Meta<typeof InputDateDrop>;

export default meta;

export const Basic = () => {
  const [date, setDate] = useState<Range | undefined>(undefined);
  const field = useField(undefined);

  return (
    <AlphaCard>
      <InputDateDrop field={field} onMonthChange={setDate} />
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
      <InputDateDrop field={field} />
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
      <InputDateDrop data={mock} field={field} />
      <Text variant="bodyMd" as="p">
        {field.value ? format(field.value, "PPP") : ""}
      </Text>
    </AlphaCard>
  );
};

export const DisableDates = () => {
  const field = useField<InputDateDropField>(undefined);
  const [data, setData] = useState<InputDataDropData>([]);

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
      <InputDateDrop
        data={data}
        field={field}
        disableDates
        input={{ disabled: data?.length === 0 }}
      />
      <br />
      <Button onClick={changeData}>Change Data</Button>
      <Text variant="bodyMd" as="p">
        {field.value ? format(field.value, "PPP") : ""}
      </Text>
    </AlphaCard>
  );
};

export const WithDataChange = () => {
  const field = useField<InputDateDropField>(undefined);
  const [data, setData] = useState<InputDataDropData>([]);

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
      <InputDateDrop
        data={data}
        field={field}
        input={{ disabled: data?.length === 0 }}
      />
      <br />
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
