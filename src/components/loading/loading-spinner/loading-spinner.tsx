import { Box, Spinner, VerticalStack } from "@shopify/polaris";
import { memo } from "react";

export const LoadingSpinner = memo(() => (
  <Box padding="4">
    <VerticalStack align="center" inlineAlign="center">
      <Spinner accessibilityLabel="Loading" hasFocusableParent={false} />
    </VerticalStack>
  </Box>
));
