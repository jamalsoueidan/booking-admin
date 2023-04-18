import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useMyAccountGet } from "~/api/bookingShopifyApi";
import { LoadingPage } from "~/components/loading/loading-page";

export default ({ children }: { children: ReactNode }) => {
  const { data, isFetching } = useMyAccountGet();

  const token = localStorage.getItem("token");
  const location = useLocation();

  if (isFetching) {
    return <LoadingPage title="Checking authentication" />;
  }

  if (!token || !data?.data.success) {
    localStorage.clear();
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
};
