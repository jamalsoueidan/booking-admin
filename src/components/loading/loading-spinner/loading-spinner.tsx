import { Spinner } from "@shopify/polaris";
import { memo } from "react";

export const LoadingSpinner = memo(() => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
    }}
  >
    <Spinner accessibilityLabel="Loading" hasFocusableParent={false} />
  </div>
));
