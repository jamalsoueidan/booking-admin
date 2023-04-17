import { AlphaCard } from "@shopify/polaris";
import { AuthenticationWrapper } from "~/components/authentication/authentication-wrapper";

export default () => (
  <AuthenticationWrapper title="Not found">
    <AlphaCard>Something went wrong</AlphaCard>
  </AuthenticationWrapper>
);
