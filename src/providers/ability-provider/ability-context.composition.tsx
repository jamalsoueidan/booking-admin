import { Select } from "@shopify/polaris";
import { useField } from "@shopify/react-form";
import { useMemo } from "react";
import { AuthRole } from "~/types/auth-role";
import { AbilityCan } from "./ability-context";
import { AbilityProvider } from "./ability-context-provider";
import { defineAbilityFor } from "./ability-context.helper";

const staff = {
  _id: "1",
  active: true,
  address: "asdiojdsajioadsoji",
  avatar: "http://",
  email: "jamal@soue.dk",
  fullname: "full name",
  group: "test",
  language: "da",
  password: "12345678",
  phone: "+4531317411",
  position: "2",
  postal: 8000,
  role: AuthRole.user,
  shop: "dontmatter",
  timeZone: "Europe/Copenhagen",
};

const MockComponent = () => (
  <>
    <strong>Can I create Product?:</strong>
    <AbilityCan I="create" a="product" passThrough>
      {(can) => (can ? "yes" : "no")}
    </AbilityCan>
    <br />
    <strong>Can I update Product?:</strong>
    <AbilityCan I="update" a="product" passThrough>
      {(can) => (can ? "yes" : "no")}
    </AbilityCan>
    <br />
    <strong>Can I create Staff?:</strong>
    <AbilityCan I="create" a="staff" this={staff} passThrough>
      {(can) => (can ? "yes" : "no")}
    </AbilityCan>
    <br />
    <strong>Can I update Staff?:</strong>
    <AbilityCan I="update" a="staff" this={staff} passThrough>
      {(can) => (can ? "yes" : "no")}
    </AbilityCan>
  </>
);

export const BasicThemeUsage = () => {
  const role = useField<AuthRole>(AuthRole.admin);
  const ability = defineAbilityFor({
    isAdmin: role.value === AuthRole.admin,
    isOwner: role.value === AuthRole.owner,
    isUser: role.value === AuthRole.user,
    userId: "1",
  });

  const roleOptions = useMemo(
    () =>
      Object.entries(AuthRole)
        .filter(([, value]) => !Number.isNaN(Number(value)))
        .map(([label, value]) => ({
          label,
          value: value.toString(),
        })),
    []
  );

  return (
    <>
      I am logged in as {AuthRole[role.value]} <br />
      <AbilityProvider ability={ability}>
        <MockComponent />
      </AbilityProvider>
      <Select
        label="Role"
        options={roleOptions}
        value={role.value.toString()}
        onChange={(value) => role.onChange(parseInt(value, 10))}
      />
    </>
  );
};
