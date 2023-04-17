import {
  AlphaCard,
  Button,
  Form,
  FormLayout,
  Inline,
  Link,
  Text,
  TextField,
} from "@shopify/polaris";
import { useField, useForm } from "@shopify/react-form";
import { useNavigate } from "react-router-dom";
import { useAuthReceivePassword } from "~/api/bookingShopifyApi";
import { AuthenticationWrapper } from "~/components/authentication/authentication-wrapper";
import { useTranslation } from "~/providers/translate-provider";

const locales = {
  da: {
    error: "Forkert email/mobilnummer eller adgangskode!",
    login: "Log ind",
    or: "eller",
    phone: {
      label: "Indtast mobilnummer",
    },
    send_submit: "Send mig adgangskode!",
    title: "Modtag adgangskode på mobil",
  },
  en: {
    error: "Wrong email/phone or password!",
    login: "Login",
    or: "or",
    phone: {
      label: "Enter your phonenumber",
    },
    send_submit: "Send me password!",
    title: "Receive password on phone",
  },
};

export default () => {
  const navigate = useNavigate();
  const { mutateAsync: receivePassword } = useAuthReceivePassword();
  const { t } = useTranslation({ id: "password", locales });

  const { fields, submit, dirty, submitting, submitErrors } = useForm({
    fields: {
      phone: useField("4531317428"),
    },
    onSubmit: async (fieldValues) => {
      try {
        await receivePassword({ data: fieldValues });
        return {
          status: "success",
        };
      } catch (error) {
        return {
          errors: [{ field: ["phone"], message: t("error") }],
          status: "fail",
        };
      }
    },
  });

  return (
    <AuthenticationWrapper title={t("title")}>
      <AlphaCard>
        <Form onSubmit={submit}>
          <FormLayout>
            <TextField
              label={t("phone.label")}
              autoComplete="phone"
              {...fields.phone}
            />
            <Inline gap="1" blockAlign="center">
              <Button submit>{t("send_submit")}</Button>
              <Text variant="bodyMd" as="span">
                {t("or")}
              </Text>
              <Link onClick={() => navigate("/login")}>{t("login")}</Link>
            </Inline>
          </FormLayout>
        </Form>
      </AlphaCard>
    </AuthenticationWrapper>
  );
};
