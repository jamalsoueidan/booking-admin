import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { LoadingPage } from "~/components/loading/loading-page";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const isLoggedIn = false;
  const isFetching = false;

  const token = localStorage.getItem("token");
  const location = useLocation();

  if (isFetching) {
    return <LoadingPage title="Checking authentication" />;
  }

  if (!token || !isLoggedIn) {
    localStorage.clear();
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return <>{children}</>;
};
