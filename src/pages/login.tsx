import {
  AlphaCard,
  Banner,
  FormLayout,
  HorizontalStack,
  Link,
  Text,
  TextField,
} from "@shopify/polaris";
import { useField } from "@shopify/react-form";
import { AxiosError } from "axios";
import {
  ActionFunctionArgs,
  Form,
  redirect,
  useLocation,
} from "react-router-dom";
import { authLogin } from "~/api/bookingShopifyApi";
import { AuthenticationWrapper } from "~/components/authentication/authentication-wrapper";
import { ButtonNavigation } from "~/components/authentication/button-navigation";
import { useRouterForm } from "~/hooks/react-forms";
import { useTranslation } from "~/providers/translate-provider";

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const formData = await request.formData();
    const response = await authLogin(Object.fromEntries(formData) as any);
    localStorage.setItem("token", response.data.payload.token);
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    return error;
  }
  return redirect("/admin");
};

export function Component() {
  const location = useLocation();
  const { t } = useTranslation({ id: "login", locales });

  const {
    fields: { identification, password },
    onSubmit,
  } = useRouterForm({
    fields: {
      identification: useField(location.state?.phone || "31317428"),
      password: useField(""),
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

        <Form method="post" onSubmit={onSubmit}>
          <FormLayout>
            <TextField
              label={t("login.label")}
              autoComplete="false"
              name="identification"
              {...identification}
            />

            <TextField
              label={t("password.label")}
              type="password"
              autoComplete="false"
              name="password"
              {...password}
            />

            <HorizontalStack gap="1" blockAlign="center">
              <ButtonNavigation>{t("login_submit")}</ButtonNavigation>
              <Text variant="bodyMd" as="span">
                {t("or")}
              </Text>
              <Link url="/receive-password">{t("receive_action")}</Link>
            </HorizontalStack>
          </FormLayout>
        </Form>
      </AlphaCard>
    </AuthenticationWrapper>
  );
}

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
