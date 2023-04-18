import { AlphaStack, Text } from "@shopify/polaris";
import type { Meta, StoryObj } from "@storybook/react";
import { useDate } from "./use-date";

/*
// Send to backend
  const copenhagen = new Date() // europe/copenhagen time
  const local = zonedTimeToUtc(copenhagen, "Europe/Copenhagen") // convert to JSON
  console.log("convert to json", local.toJSON()) // convert to JSON

  console.log("show copenhagen time", formatInTimezone(copenhagen, "yyyy-MM-dd HH:mm:ss")) //show time
  console.log("show istanbul time", formatInTimezone(local, "Europe/Istanbul", "yyyy-MM-dd HH:mm:ss")) //Show time
  console.log("show copenhagen time", formatInTimezone(local, "Europe/Copenhagen", "yyyy-MM-dd HH:mm:ss")) //Show time


  // Read from backend
  const localTime = new Date(local.toJSON()) // local/timezone current time
  console.log("show istanbul time", formatInTimezone(localTime, "Europe/Istanbul", "yyyy-MM-dd HH:mm:ss")) //Show time
  console.log("show copenhagen time from localTime", formatInTimezone(localTime, "Europe/Copenhagen", "yyyy-MM-dd HH:mm:ss")) //Show time
  console.log(localTime.toJSON())

  const toCopenhagen = utcToZonedTime(localTime, 'Europe/Copenhagen');
  console.log("show copenhagen time from utc", formatInTimezone(toCopenhagen, "yyyy-MM-dd HH:mm:ss")) //Show time
  console.log(toCopenhagen.toJSON())
*/

export const ToBackend = () => {
  const { timeZone, toUtc, formatInTimezone } = useDate();

  const copenhagen = new Date();
  const local = toUtc(copenhagen);

  return (
    <>
      <AlphaStack gap="2">
        Selected from dropdown timezone:{" "}
        <Text variant="bodyMd" as="p" fontWeight="bold">
          {timeZone}:
        </Text>
        The time in that area:{" "}
        <Text variant="bodyMd" as="span">
          {formatInTimezone(local, "PPPppp")}
        </Text>
        Show local timezone (your laptop):{" "}
        <Text variant="bodyMd" as="p" fontWeight="bold">
          ({Intl.DateTimeFormat().resolvedOptions().timeZone})
        </Text>
        Local time:{" "}
        <Text variant="bodyMd" as="span">
          {formatInTimezone(
            local,
            "PPPppp",
            Intl.DateTimeFormat().resolvedOptions().timeZone
          )}
        </Text>
        Backend get this utc value:{" "}
        <Text variant="bodyMd" as="span" fontWeight="bold">
          ({local.toJSON()})
        </Text>
      </AlphaStack>
    </>
  );
};

const meta = {
  title: "Hooks/useDate",
  component: ToBackend,
  argTypes: {},
} satisfies Meta<typeof ToBackend>;

export default meta;
type Story = StoryObj<typeof meta>;
