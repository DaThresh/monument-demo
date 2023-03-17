import { DeleteLocation } from '@shared/interfaces/locations';
import { LocationData } from '@shared/types/location';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Button, Columns, Container, Content, Heading } from 'react-bulma-components';
import ModalContext from '../../../common/contexts/modal';
import ToastContext from '../../../common/contexts/toast';

type DeleteLocationModalProps = {
  location: LocationData;
  refresh: () => void;
};

export const DeleteLocationModal = ({ location, refresh }: DeleteLocationModalProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { closeModal } = useContext(ModalContext);
  const { addToast } = useContext(ToastContext);

  const deleteLocation = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (loading) {
      return false;
    }
    setLoading(true);
    axios
      .delete<DeleteLocation.Response>(`/api/locations/${location.id}`)
      .then(() => {
        addToast({
          message: `Successfully deleted ${location.name}`,
          color: 'success',
          dark: true,
        });
        refresh();
        closeModal();
      })
      .catch(() => {
        addToast({ message: `Failed to delete ${location.name}`, color: 'danger', dark: true });
        setLoading(false);
      });
  };

  return (
    <Container>
      <Heading>Delete Location</Heading>
      <Heading subtitle>Are you sure you want to delete {location.name}</Heading>
      <Content alignContent='center'>{location.address}</Content>
      <Columns>
        <Columns.Column>
          <Button fullwidth onClick={closeModal}>
            Cancel
          </Button>
        </Columns.Column>
        <Columns.Column>
          <Button onClick={deleteLocation} fullwidth loading={loading} color='danger'>
            Delete
          </Button>
        </Columns.Column>
      </Columns>
    </Container>
  );
};
