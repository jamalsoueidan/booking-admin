import { useCallback, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useSearchQuery } from "./use-search-query";

export const useShiftModal = () => {
  const navigate = useNavigate();
  const { query } = useSearchQuery();
  const [isOpen, setOpen] = useState<boolean>(true);

  const close = useCallback(() => {
    setOpen((prev) => !prev);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { selectedShiftId, selectedGroupId, ...newQuery } = query;
    const timer = setTimeout(() => {
      navigate({
        pathname: `./..`,
        search: createSearchParams(newQuery).toString(),
      });
    }, 250);
    return () => clearTimeout(timer);
  }, [navigate, query]);

  const redirect = useCallback(
    (pathname: string) => {
      setOpen((prev) => prev);
      navigate({
        pathname,
        search: createSearchParams(query).toString(),
      });
    },
    [navigate, query]
  );

  const back = useCallback(() => {
    setOpen((prev) => prev);
    navigate(-1);
  }, [navigate]);

  return { isOpen, close, redirect, back };
};
