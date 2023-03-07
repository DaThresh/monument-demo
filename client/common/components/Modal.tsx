import React, { useContext } from 'react';
import { Box, Modal as BulmaModal } from 'react-bulma-components';
import ModalContext from '../contexts/modal';

const Modal: React.FC = () => {
  const { active, component, closeModal } = useContext(ModalContext);

  return (
    <BulmaModal show={active} onClose={closeModal} closeOnBlur>
      <BulmaModal.Content>
        <Box>{component}</Box>
      </BulmaModal.Content>
    </BulmaModal>
  );
};

export default Modal;
