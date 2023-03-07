import { Nullable } from '@shared/types/common';
import React, { createContext, ReactElement, useState } from 'react';

interface ModalContext {
  readonly active: boolean;
  readonly component: Nullable<ReactElement>;
  openModal: (component: ReactElement) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContext>({} as ModalContext);

const ModalContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [component, setComponent] = useState<Nullable<ReactElement>>(null);

  const openModal = (component: ReactElement) => setComponent(component);

  const closeModal = () => setComponent(null);

  const active = !!component;

  const context = { active, component, openModal, closeModal };

  return <ModalContext.Provider value={context}>{children}</ModalContext.Provider>;
};

export default ModalContext;
export { ModalContextProvider };
