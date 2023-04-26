import { Frame } from "@shopify/polaris";
import { useCallback, useState } from "react";
import { Outlet, redirect } from "react-router-dom";
import {
  getMyAccountGetQueryOptions,
  myAccountGet,
} from "~/api/bookingShopifyApi";
import { AdminNavigation } from "~/components/admin/admin-navigation";
import { AdminTopbar } from "~/components/admin/admin-topbar";
import {
  AbilityProvider,
  getAbilityFromToken,
} from "~/providers/ability-provider";
import { queryClient } from "~/providers/query-provider";
import { SaveBarProvider } from "~/providers/save-bar";
import { ToastProvider } from "~/providers/toast";
import logo from "../../assets/logo.avif";

export const loader = async () => {
  try {
    const query = getMyAccountGetQueryOptions();
    const data =
      queryClient.getQueryData<Awaited<ReturnType<typeof myAccountGet>>>(
        query.queryKey
      ) ?? (await queryClient.fetchQuery(query));

    return data.data.payload;
  } catch (error) {
    return redirect("/");
  }
};

export function Component() {
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
      topBar={<AdminTopbar toggleNavigation={setMobileNavigationActive} />}
      navigation={<AdminNavigation toggle={toggleMobileNavigationActive} />}
      showMobileNavigation={mobileNavigationActive}
      onNavigationDismiss={toggleMobileNavigationActive}
    >
      <AbilityProvider ability={getAbilityFromToken()}>
        <ToastProvider>
          <SaveBarProvider>
            <Outlet />
          </SaveBarProvider>
        </ToastProvider>
      </AbilityProvider>
    </Frame>
  );
}
