import { faker } from "@faker-js/faker";
import { AlphaCard, Button, Icon } from "@shopify/polaris";
import { DynamicSourceMajor, FavoriteMajor } from "@shopify/polaris-icons";
import { useField } from "@shopify/react-form";
import { useEffect, useState } from "react";
import { AvailabilityUser, ShiftTag } from "~/api/model";
import {
  InputDropdown,
  InputDropdownField,
  InputDropdownOption,
} from "./input-dropdown";

import { Meta } from "@storybook/react";

const meta = {
  title: "Components/Input/InputDropdown",
  component: InputDropdown,
  args: {},
} satisfies Meta<typeof InputDropdown>;

export default meta;

const data: AvailabilityUser[] = [
  {
    fullname: "jamal swueidan",
    userId: "63bb71c898f50e4f24c883a8",
    tag: ShiftTag.all_day,
  },
  {
    fullname: "sara soueidan",
    userId: "63bb71e798f50e4f24c883b9",
    tag: ShiftTag.middle_of_week,
  },
] as any;

const options: Array<InputDropdownOption<string>> = data.map((d) => ({
  label: d.fullname,
  prefix: (
    <Icon
      source={faker.helpers.arrayElement([DynamicSourceMajor, FavoriteMajor])}
    />
  ),
  value: d.userId,
}));

export const Basic = () => {
  const field = useField<InputDropdownField>(undefined);

  return (
    <>
      <AlphaCard>
        <InputDropdown
          options={options}
          error={field.error}
          onChange={field.onChange}
          selected={options.find((o) => o.value === field.value)}
        />
      </AlphaCard>
      <div>
        <pre>userId: {field?.value}</pre>
      </div>
    </>
  );
};

export const Error = () => {
  const field = useField<InputDropdownField>(undefined);
  useEffect(() => {
    field.setError("error");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AlphaCard>
        <InputDropdown options={options} {...field} />
      </AlphaCard>
      <div>
        <pre>userId: {field.value}</pre>
      </div>
    </>
  );
};

export const DisabledWithError = () => {
  const field = useField<InputDropdownField>(undefined);
  const [staff, setStaff] = useState<Array<InputDropdownOption<string>>>([]);

  useEffect(() => {
    field.setError("fejl");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AlphaCard>
        <InputDropdown
          options={staff}
          input={{
            disabled: !staff || staff.length === 0,
            helpText: "klik på knap og vælge bruger",
          }}
          {...field}
        />
      </AlphaCard>
      <br />
      <Button onClick={() => setStaff(options)}>Load staff</Button>
      <div>
        <pre>userId: {field.value}</pre>
      </div>
    </>
  );
};

export const LazyLoad = () => {
  const field = useField<InputDropdownField>(undefined);
  const [staff, setStaff] = useState<Array<InputDropdownOption<string>>>([]);

  return (
    <>
      <AlphaCard>
        <InputDropdown
          options={staff}
          input={{
            disabled: !staff || staff.length === 0,
            helpText: "klik på knap og vælge bruger",
          }}
          {...field}
        />
      </AlphaCard>
      <br />
      <Button onClick={() => setStaff(options)}>Load staff</Button>
      <div>
        <pre>userId: {field.value}</pre>
      </div>
    </>
  );
};
