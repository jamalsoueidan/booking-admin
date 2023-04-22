import { Frame, Loading, Spinner, VerticalStack } from "@shopify/polaris";
import { memo } from "react";

export type LoadingPageProps = {
  /**
   * a node to be rendered in the special component.
   */
  title: string;
};

export const LoadingPage = memo(({ title }: LoadingPageProps) => (
  <Frame>
    <Loading />
    <div
      style={{
        left: "50%",
        position: "fixed",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <VerticalStack align="center" gap="2">
        <Spinner accessibilityLabel="Loading" hasFocusableParent={false} />
        {title}
      </VerticalStack>
    </div>
  </Frame>
));
