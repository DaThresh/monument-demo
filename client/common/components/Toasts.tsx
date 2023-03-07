import React, { useContext } from 'react';
import { Button, Notification } from 'react-bulma-components';
import ToastContext from '../contexts/toast';

const Toasts: React.FC = () => {
  const { toasts, removeToast } = useContext(ToastContext);

  const toastDivStyle: React.CSSProperties = {
    position: 'fixed',
    right: 10,
    bottom: 10,
  };

  return (
    <div style={toastDivStyle}>
      {toasts.map((toast) => (
        <Notification key={toast.uuid} color={toast.color} light={!toast.dark}>
          <Button remove onClick={() => removeToast(toast.uuid)} />
          {toast.message}
        </Notification>
      ))}
    </div>
  );
};

export default Toasts;
