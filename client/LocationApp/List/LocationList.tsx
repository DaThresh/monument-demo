import { Locations } from '@shared/interfaces/locations';
import { LocationData } from '@shared/types/location';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Level, Section, Table } from 'react-bulma-components';
import { useNavigate } from 'react-router-dom';
import ModalContext from '../../common/contexts/modal';
import ToastContext from '../../common/contexts/toast';
import NewLocationModal from '../modals/NewLocation';

const LocationList: React.FC = () => {
  const [locations, setLocations] = useState<LocationData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { addToast } = useContext(ToastContext);
  const { openModal } = useContext(ModalContext);

  const fetch = () => {
    axios
      .get<Locations.Response>('/api/locations')
      .then((response) => setLocations(response.data))
      .catch(() => addToast({ message: `Cannot get Locations`, color: 'danger' }))
      .finally(() => setLoading(false));
  };

  const refresh = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    setLocations([]);
    fetch();
  };

  const openLocation = (locationId: number) => {
    navigate(`/locations/${locationId}`);
  };

  const openNewLocation = () => {
    const addLocation = (location: LocationData) => {
      setLocations((locations) => [...locations, location]);
    };

    openModal(<NewLocationModal addLocation={addLocation} />);
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <Section>
      <Level>
        <Level.Side>
          <Level.Item>
            <Button color='info' onClick={openNewLocation}>
              New Location
            </Button>
          </Level.Item>
        </Level.Side>
        <Level.Side>
          <Level.Item>
            <Button onClick={refresh}>Refresh</Button>
          </Level.Item>
        </Level.Side>
      </Level>
      <Table size='fullwidth' hoverable striped>
        <thead>
          <tr>
            <th>Name</th>
            <th># of Units</th>
            <th>City, State</th>
            <th>Cashflow</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((location) => (
            <tr
              key={location.id}
              onClick={() => openLocation(location.id)}
              style={{ cursor: 'pointer' }}
            >
              <td>{location.name}</td>
              <td>{location.address}</td>
              <td>
                {location.city}, {location.state}
              </td>
              <td>{location.postalCode}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Section>
  );
};

export default LocationList;
