// https://stackoverflow.com/questions/74877170/react-router-v6-5-how-to-strongly-type-data-loaders
import {
  LoaderFunctionArgs,
  Await as RrdAwait,
  defer,
  useLoaderData as useLD,
} from "react-router-dom";

export function useLoaderData<
  TLoader extends ReturnType<typeof deferredLoader>
>() {
  return useLD() as ReturnType<TLoader>["data"];
}

export function deferredLoader<TData extends Record<string, unknown>>(
  dataFunc: (args: LoaderFunctionArgs) => TData
) {
  return (args: LoaderFunctionArgs) =>
    defer(dataFunc(args)) as Omit<ReturnType<typeof defer>, "data"> & {
      data: TData;
    };
}

export interface AwaitResolveRenderFunction<T> {
  (data: Awaited<T>): React.ReactElement;
}

export interface AwaitProps<T> {
  children: React.ReactNode | AwaitResolveRenderFunction<T>;
  errorElement?: React.ReactNode;
  resolve: Promise<T>;
}

export function Await<T>(props: AwaitProps<T>): JSX.Element {
  return RrdAwait(props);
}
