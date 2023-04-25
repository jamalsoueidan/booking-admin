import { Toast, ToastProps } from "@shopify/polaris";
import { ReactNode, useCallback, useMemo, useState } from "react";
import { ToastContext } from "./toast-context";

export type ToastProviderProps = {
  children: ReactNode;
};

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toast, setToast] = useState<Partial<ToastProps>>();
  const [active, setActive] = useState(false);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const show = useCallback((value: Partial<ToastProps>) => {
    setToast(value);
    setActive(true);
  }, []);

  const value = useMemo(() => ({ show }), [show]);

  return (
    <ToastContext.Provider value={value}>
      {active && (
        <Toast duration={2000} content="" onDismiss={toggleActive} {...toast} />
      )}
      {children}
    </ToastContext.Provider>
  );
};
