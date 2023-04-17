import { Frame } from "@shopify/polaris";
import { ReactNode, useCallback, useState } from "react";
import logo from "../../assets/logo.avif";
import { DashboardNavigation } from "./dashboard-navigation";
import { DashboardTopbar } from "./dashboard-topbar";

type DashboardFrameProps = {
  children: ReactNode;
};

export const DashboardFrame = ({ children }: DashboardFrameProps) => {
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);

  const toggleMobileNavigationActive = useCallback(
    () =>
      setMobileNavigationActive(
        (mobileNavigationActive) => !mobileNavigationActive
      ),
    []
  );

  const logoOptions = {
    topBarSource: logo,
    width: 124,
    //contextualSaveBarSource: data?.avatar,
    //url: "http://jadedpixel.com",
    //accessibilityLabel: data?.fullname,
  };

  return (
    <Frame
      logo={logoOptions}
      topBar={<DashboardTopbar toggleNavigation={setMobileNavigationActive} />}
      navigation={<DashboardNavigation />}
      showMobileNavigation={mobileNavigationActive}
      onNavigationDismiss={toggleMobileNavigationActive}
    >
      {children}
    </Frame>
  );
};
