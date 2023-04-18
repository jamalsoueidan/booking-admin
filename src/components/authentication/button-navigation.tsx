import { Button } from "@shopify/polaris";
import { useNavigation } from "react-router-dom";

export type ButtonNavigationProps = {
  children: string | string[];
};

export const ButtonNavigation = ({ children }: ButtonNavigationProps) => {
  const navigation = useNavigation();
  return (
    <Button submit disabled={navigation.state === "submitting"}>
      {children || ""}
    </Button>
  );
};
