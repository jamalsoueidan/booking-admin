import {
  AlphaCard,
  Button,
  Form,
  FormLayout,
  Inline,
  TextField,
} from "@shopify/polaris";
import { useField, useForm } from "@shopify/react-form";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import {
  InstallationSetupMutationBody,
  useInstallationSetup,
} from "~/api/bookingShopifyApi";
import { BadResponseResponse } from "~/api/model";
import { AuthenticationWrapper } from "~/components/authentication/authentication-wrapper";
import { useTranslation } from "~/providers/translate-provider";

export default () => {
  const navigate = useNavigate();
  const { mutateAsync: setup } = useInstallationSetup();
  const { t } = useTranslation({ id: "login", locales });

  const { fields, submit } = useForm({
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
    onSubmit: async (fieldValues) => {
      try {
        await setup({ data: fieldValues });
        return navigate("/receive-password", {
          state: { message: "setup" },
        }) as any;
      } catch (error) {
        if (error instanceof AxiosError) {
          const data: BadResponseResponse = error.response?.data;
          const errors =
            data.error?.map((d) => ({
              field: d.path,
              message: d.message,
            })) || [];
          return {
            errors,
            status: "fail",
          };
        }
        return {
          errors: [],
          status: "fail",
        };
      }
    },
  });

  return (
    <AuthenticationWrapper title={t("title")}>
      <p>{t("description")}</p>
      <AlphaCard>
        <Form onSubmit={submit}>
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

            <Inline gap="1" align="center">
              <Button submit>{t("submit")}</Button>
            </Inline>
          </FormLayout>
        </Form>
      </AlphaCard>
    </AuthenticationWrapper>
  );
};

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
