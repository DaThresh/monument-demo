import {
  faBuilding,
  faCity,
  faLocation,
  faLocationArrow,
  faMap,
} from '@fortawesome/free-solid-svg-icons';
import { CreateLocation } from '@shared/interfaces/locations';
import { LocationData } from '@shared/types/location';
import axios, { AxiosResponse } from 'axios';
import React, { useContext, useState } from 'react';
import { Button, Container, Heading } from 'react-bulma-components';
import { TextInput } from '../../common/components/Forms';
import ModalContext from '../../common/contexts/modal';
import ToastContext from '../../common/contexts/toast';

type NewLocationModalProps = {
  addLocation: (location: LocationData) => void;
};

const NewLocationModal = ({ addLocation }: NewLocationModalProps) => {
  const [locationName, setLocationName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [postalCode, setPostalCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const setFunctions = { setLocationName, setAddress, setCity, setState, setPostalCode };
  const { addToast } = useContext(ToastContext);
  const { closeModal } = useContext(ModalContext);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) {
      return;
    }
    setLoading(true);
    axios
      .post<CreateLocation.Response, AxiosResponse<CreateLocation.Response>, CreateLocation.Body>(
        '/api/locations',
        { name: locationName, address, city, state, postalCode }
      )
      .then((response) => {
        addLocation(response.data);
        closeModal();
      })
      .catch(() => {
        addToast({ message: 'Failed to create location', color: 'danger', dark: true });
        setLoading(false);
      });
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const setFunction = event.currentTarget.name as
      | 'LocationName'
      | 'Address'
      | 'City'
      | 'State'
      | 'PostalCode';
    setFunctions[`set${setFunction}`](event.currentTarget.value);
  };

  return (
    <Container>
      <Heading>Add new Location</Heading>

      <form onSubmit={submit}>
        <TextInput
          name='LocationName'
          label='Name'
          onChange={handleInput}
          value={locationName}
          iconLeft={faBuilding}
          columns
          required
        />
        <TextInput
          name='Address'
          onChange={handleInput}
          value={address}
          iconLeft={faLocation}
          columns
          required
        />
        <TextInput
          name='City'
          onChange={handleInput}
          value={city}
          iconLeft={faCity}
          columns
          required
        />
        <TextInput
          name='State'
          onChange={handleInput}
          value={state}
          iconLeft={faMap}
          columns
          required
        />
        <TextInput
          name='PostalCode'
          label='Zip'
          onChange={handleInput}
          value={postalCode}
          iconLeft={faLocationArrow}
          columns
          required
        />

        <Button alignContent='center' color='primary' type='submit'>
          Create
        </Button>
      </form>
    </Container>
  );
};

export default NewLocationModal;
