import {
  AlphaCard,
  Banner,
  FormLayout,
  HorizontalStack,
  Link,
  Text,
  TextField,
} from "@shopify/polaris";
import { lengthMoreThan, notEmpty, useField } from "@shopify/react-form";
import { AxiosError } from "axios";
import {
  ActionFunctionArgs,
  Form,
  redirect,
  useLocation,
} from "react-router-dom";
import { authReceivePassword } from "~/api/bookingShopifyApi";
import { AuthenticationWrapper } from "~/components/authentication/authentication-wrapper";
import { ButtonNavigation } from "~/components/authentication/button-navigation";
import { useRouterSubmit } from "~/lib/react-form";
import { useTranslation } from "~/providers/translate-provider";

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const formData = await request.formData();
    const phone = formData.get("phone") as string;
    const response = await authReceivePassword({ phone });
    return redirect(
      `/login?password=${
        (response.data.payload as Record<string, string>).password
      }`
    );
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    return error;
  }
};

export function Component() {
  const location = useLocation();
  const { t } = useTranslation({ id: "password", locales });

  const { fields, submit } = useRouterSubmit({
    fields: {
      phone: useField<string>({
        value: "31317428",
        validates: [
          notEmpty("Phone is required"),
          lengthMoreThan(3, "Phone must be more than 3 characters"),
        ],
      }),
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
        <Form method="post" onSubmit={submit}>
          <FormLayout>
            <TextField
              label={t("phone.label")}
              autoComplete="phone"
              name="phone"
              {...fields.phone}
            />
            <HorizontalStack gap="1" blockAlign="center">
              <ButtonNavigation>{t("send_submit")}</ButtonNavigation>
              <Text variant="bodyMd" as="span">
                {t("or")}
              </Text>
              <Link url="/login">{t("login")}</Link>
            </HorizontalStack>
          </FormLayout>
        </Form>
      </AlphaCard>
    </AuthenticationWrapper>
  );
}

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
