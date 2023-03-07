import { Locations } from '@shared/interfaces/locations';
import { LocationData } from '@shared/types/location';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Level, Section, Table } from 'react-bulma-components';
import ToastContext from '../common/contexts/toast';

const LocationApp: React.FC = () => {
  const [locations, setLocations] = useState<LocationData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const toastContext = useContext(ToastContext);

  const fetch = () => {
    axios
      .get<Locations.Response>('/api/locations')
      .then((response) => setLocations(response.data))
      .catch(() => toastContext.addToast({ message: `Cannot get Locations`, color: 'danger' }))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetch();
  }, []);

  const refresh = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch();
  };

  return (
    <Section>
      <Level>
        <Level.Side>
          <Level.Item>
            <Button>New Location</Button>
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
            <tr key={location.id}>
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

export default LocationApp;
