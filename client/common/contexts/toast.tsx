import { nanoid } from 'nanoid';
import React, { createContext, useState } from 'react';
import { Color } from 'react-bulma-components/src/components';

type Toast = {
  uuid: string;
  message: string;
  color: Color;
  dark?: boolean;
  seconds?: number;
};

interface ToastContext {
  addToast: (toast: Omit<Toast, 'uuid'>) => void;
  removeToast: (uuid: string) => void;
  readonly toasts: Toast[];
}

const ToastContext = createContext<ToastContext>({} as ToastContext);

const ToastContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toastParams: Omit<Toast, 'uuid'>) => {
    const toast: Toast = { uuid: nanoid(5), ...toastParams };
    setToasts([...toasts, toast]);
    setTimeout(() => {
      removeToast(toast.uuid);
    }, toast.seconds ?? 6000);
  };

  const removeToast = (uuid: string) => {
    setToasts((toasts) => {
      const updatedToasts: Toast[] = [...toasts];
      const toastToRemoveIndex = updatedToasts.findIndex((toast) => toast.uuid === uuid);
      if (toastToRemoveIndex !== -1) {
        updatedToasts.splice(toastToRemoveIndex, 1);
      }
      return updatedToasts;
    });
  };

  const context: ToastContext = { toasts, addToast, removeToast };

  return <ToastContext.Provider value={context}>{children}</ToastContext.Provider>;
};

export default ToastContext;
export { ToastContextProvider };
