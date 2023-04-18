import { AlphaStack, Box, Divider, Text, TextField } from "@shopify/polaris";
import { useField } from "@shopify/react-form";
import type { Meta } from "@storybook/react";
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

export const FromBackend = () => {
  const { timeZone, formatInTimezone } = useDate();
  const field = useField<string>(new Date().toJSON());
  const local = new Date(field.value); // europe/copenhagen time

  return (
    <>
      <Box paddingBlockStart="8" paddingBlockEnd="8">
        <TextField label="Value" autoComplete="off" {...field} />
        <Text variant="headingLg" as="h1">
          From backend:
        </Text>
        <Divider />
        <AlphaStack gap="1">
          <Text variant="bodyMd" as="p" fontWeight="bold">
            Current timezone ({Intl.DateTimeFormat().resolvedOptions().timeZone}
            )
          </Text>
          <Text variant="bodyMd" as="span">
            {formatInTimezone(
              local,
              "PPPppp",
              Intl.DateTimeFormat().resolvedOptions().timeZone
            )}
          </Text>
        </AlphaStack>
        <AlphaStack gap="1">
          <Text variant="bodyMd" as="p" fontWeight="bold">
            {timeZone}:
          </Text>
          <Text variant="bodyMd" as="span">
            {formatInTimezone(local, "yyyy-MM-dd HH:mm:ss")}
          </Text>
        </AlphaStack>
      </Box>
    </>
  );
};

const meta = {
  title: "Hooks/useDate",
  component: FromBackend,
  argTypes: {},
} satisfies Meta<typeof FromBackend>;

export default meta;
