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
import { useAuthLogin } from "~/api/bookingShopifyApi";
import { AuthenticationWrapper } from "~/components/authentication/authentication-wrapper";
import { useTranslation } from "~/providers/translate-provider";

export default () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { mutateAsync: login, isError } = useAuthLogin();
  const { t } = useTranslation({ id: "login", locales });

  const {
    fields: { identification, password },
    submit,
  } = useForm({
    fields: {
      identification: useField("4531317428"),
      password: useField(""),
    },
    onSubmit: async (fieldValues) => {
      try {
        const response = await login({ data: fieldValues });
        console.log(response);
        return { status: "success" };
      } catch (error) {
        return {
          errors: [{ field: ["identification"], message: t("error") }],
          status: "fail",
        };
      }
    },
  });

  return (
    <AuthenticationWrapper title={t("title")}>
      <AlphaCard>
        {location.state?.message && (
          <>
            <Banner onDismiss={() => void undefined}>
              <p>{t("received_msg")}</p>
            </Banner>
            <br />
          </>
        )}

        <Form onSubmit={submit}>
          <FormLayout>
            <TextField
              label={t("login.label")}
              autoComplete="email"
              {...identification}
            />

            <TextField
              label={t("password.label")}
              type="password"
              autoComplete="false"
              {...password}
            />

            <Inline gap="1" blockAlign="center">
              <Button submit>{t("login_submit")}</Button>
              <Text variant="bodyMd" as="span">
                {t("or")}
              </Text>
              <Link onClick={() => navigate("/phone")}>
                {t("receive_action")}
              </Link>
            </Inline>
          </FormLayout>
        </Form>
      </AlphaCard>
    </AuthenticationWrapper>
  );
};

const locales = {
  da: {
    error: "Forkert email/mobilnummer eller adgangskode!",
    login: {
      label: "E-mail eller mobilnummer",
    },
    login_submit: "Log ind",
    or: "eller",
    password: {
      label: "Adgangskode",
    },
    receive_action: "Modtag kode på mobil",
    received_msg: "Indtast det adgangskode du har modtaget på din mobil",
    title: "Log ind på BySisters",
  },
  en: {
    error: "Wrong email/phone or password!",
    login: {
      label: "Email or Phone",
    },
    login_submit: "Login",
    or: "or",
    password: {
      label: "Password",
    },
    receive_action: "Receive code on phone",
    received_msg: "Please type the password you received on your mobile.",
    title: "Login on BySisters",
  },
};
