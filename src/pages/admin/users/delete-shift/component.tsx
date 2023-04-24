import { Suspense, lazy } from "react";
import { LoadingModal } from "~/components/loading/loading-modal";

const Lazy = lazy(() => import("./lazy.component"));

export function Component() {
  return (
    <Suspense fallback={<LoadingModal />}>
      <Lazy />
    </Suspense>
  );
}
