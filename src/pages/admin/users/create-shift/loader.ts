import { LoaderFunctionArgs } from "react-router-dom";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const searchParams = new URLSearchParams(request.url.split("?")[1]);
  return urlSearchParamsToObject<MyObjectType>(searchParams);
};

function urlSearchParamsToObject<T extends Record<string, string>>(
  params: URLSearchParams
): T {
  const result = {} as T;

  for (const [key, value] of params.entries()) {
    result[key as keyof T] = value as T[keyof T];
  }

  return result;
}

interface MyObjectType {
  selectedDate: string;
  [k: string]: string;
}
