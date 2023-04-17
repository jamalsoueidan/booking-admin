import {
  AlphaCard,
  Banner,
  Button,
  Form,
  FormLayout,
  Inline,
  Link,
  Text,
  TextField,
} from "@shopify/polaris";
import { useField, useForm } from "@shopify/react-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthReceivePassword } from "~/api/bookingShopifyApi";
import { AuthenticationWrapper } from "~/components/authentication/authentication-wrapper";
import { useTranslation } from "~/providers/translate-provider";

export default () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { mutateAsync: receivePassword } = useAuthReceivePassword();
  const { t } = useTranslation({ id: "password", locales });

  const { fields, submit } = useForm({
    fields: {
      phone: useField("31317428"),
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
      {location.state?.message && (
        <>
          <Banner onDismiss={() => void undefined}>
            <p>{t("setup")}</p>
          </Banner>
          <br />
        </>
      )}
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

const locales = {
  da: {
    setup: "Indtast det telefonnummer du brugt til at oprette din bruger.",
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
    setup: "Enter the phone number you used to create the user",
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
