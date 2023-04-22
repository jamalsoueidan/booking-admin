import {
  AlphaCard,
  FormLayout,
  HorizontalStack,
  TextField,
} from "@shopify/polaris";
import { useField } from "@shopify/react-form";
import { AxiosError } from "axios";
import { ActionFunctionArgs, Form, redirect } from "react-router-dom";
import {
  InstallationSetupMutationBody,
  installationSetup,
} from "~/api/bookingShopifyApi";
import { AuthenticationWrapper } from "~/components/authentication/authentication-wrapper";
import { ButtonNavigation } from "~/components/authentication/button-navigation";
import { useRouterForm } from "~/hooks/react-forms";
import { useTranslation } from "~/providers/translate-provider";

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const formData = await request.formData();
    await installationSetup(Object.fromEntries(formData) as never);
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    return error;
  }
  return redirect("/receive-password");
};

export function Component() {
  const { t } = useTranslation({ id: "login", locales });

  const { fields, onSubmit } = useRouterForm({
    fields: {
      email: useField<InstallationSetupMutationBody["email"]>(""),
      fullname: useField<InstallationSetupMutationBody["fullname"]>(""),
      phone: useField<InstallationSetupMutationBody["phone"]>("31317428"),
      avatar: useField<InstallationSetupMutationBody["avatar"]>(
        "https://gravatar.com/avatar/75135ea001ed66433a6e9f0f55d20aae?s=400&d=robohash&r=x"
      ),
      position: useField<InstallationSetupMutationBody["position"]>("makeup"),
      address: useField<InstallationSetupMutationBody["address"]>("Address"),
      postal: useField<InstallationSetupMutationBody["postal"]>(8000),
    },
  });

  return (
    <AuthenticationWrapper title={t("title")}>
      <p>{t("description")}</p>
      <AlphaCard>
        <Form onSubmit={onSubmit}>
          <FormLayout>
            <TextField
              label={t("fullname.label")}
              autoComplete="false"
              {...fields.fullname}
            />

            <TextField
              label={t("email.label")}
              type="email"
              autoComplete="false"
              {...fields.email}
            />

            <TextField
              label={t("phone.label")}
              type="text"
              autoComplete="false"
              {...fields.phone}
            />

            <TextField
              label={t("avatar.label")}
              type="url"
              autoComplete="false"
              {...fields.avatar}
            />

            <TextField
              label={t("postal.label")}
              type="text"
              autoComplete="false"
              onChange={(e) => fields.postal.onChange(parseInt(e, 10))}
              value={fields.postal.value.toString()}
            />

            <TextField
              label={t("address.label")}
              type="text"
              autoComplete="false"
              {...fields.address}
            />

            <HorizontalStack gap="1" align="center">
              <ButtonNavigation>{t("submit")}</ButtonNavigation>
            </HorizontalStack>
          </FormLayout>
        </Form>
      </AlphaCard>
    </AuthenticationWrapper>
  );
}

const locales = {
  da: {
    description:
      "Da det er første gang du loader platformen, skal du oprette en ny bruger. Udfyld alle felter, efterfølgende kan du anmode om en adgangskode til din telefonnummer.",
    fullname: {
      label: "Fullnavn",
    },
    email: {
      label: "Email",
    },
    phone: {
      label: "Mobilnummer",
    },
    avatar: {
      label: "Avatar url",
    },
    postal: {
      label: "Post",
    },
    address: {
      label: "Adresse",
    },
    submit: "Opret ejerbruger",
    title: "Installation af platform!",
  },
  en: {
    description:
      "First step is to create owner account before using that platform",
    fullname: {
      label: "Fullnavn",
    },
    email: {
      label: "Email",
    },
    phone: {
      label: "Phone",
    },
    avatar: {
      label: "Avatar URL",
    },
    postal: {
      label: "City",
    },
    address: {
      label: "Address",
    },
    submit: "Opret ejerbruger",
    title: "Setup platform",
  },
};
