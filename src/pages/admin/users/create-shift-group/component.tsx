import { Suspense, lazy } from "react";
import { LoadingSpinner } from "~/components/loading/loading-spinner";

// https://github.com/remix-run/react-router/pull/10045
// https://codesandbox.io/s/route-lazy-suspense-ooru6p?file=/src/index.js
// missing defered lazy load in edit-shift
const Lazy = lazy(() => import("./lazy.component"));

export function Component() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Lazy />
    </Suspense>
  );
}
