import { Meta } from "@storybook/react";
import { useState } from "react";
import { usePrevious } from "./use-previous";

export const Basic = () => {
  const [date, setDate] = useState<string | undefined>();
  const [prevDate, setPrevDate] = useState<string | undefined>();

  usePrevious(
    ([prevDate, setPrevDate]) => {
      if (typeof setPrevDate === "function") {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setPrevDate(prevDate as any);
      }
    },
    [date, setPrevDate]
  );

  return (
    <>
      <button onClick={() => setDate(new Date().toJSON())} type="button">
        Generate date
      </button>
      <p>prev: {prevDate || "undefined"}</p>
      <p>title: {date || "undefined"}</p>
    </>
  );
};

const meta = {
  title: "Components/Hooks/usePrevious",
  component: Basic,
} satisfies Meta<typeof Basic>;

export default meta;
