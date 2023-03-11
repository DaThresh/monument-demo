import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LocationById } from '@shared/interfaces/locations';
import { LocationData } from '@shared/types/location';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Columns, Heading, Icon, Menu, Section } from 'react-bulma-components';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import ToastContext from '../common/contexts/toast';

type LocationDetailsTab = 'dashboard' | 'contacts' | 'debt' | 'cashflow' | 'projections';

const LocationDetails = () => {
  const { locationId } = useParams();
  const navigate = useNavigate();
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [tab, setTab] = useState<LocationDetailsTab>('dashboard');
  const { addToast } = useContext(ToastContext);

  useEffect(() => {
    setLoading(true);
    axios
      .get<LocationById.Response>(`/api/locations/${locationId}`)
      .then((response) => {
        setLocation(response.data);
        setLoading(false);
      })
      .catch(() => {
        addToast({ message: 'Failed in loading location', color: 'danger', dark: true });
        navigate('/locations');
      });
  }, []);

  return !loading && location ? (
    <Section>
      <Icon onClick={() => navigate('/locations')} style={{ cursor: 'pointer' }}>
        <FontAwesomeIcon icon={faArrowLeft} size={'sm'} />
      </Icon>
      <Heading weight='bold'>{location.name}</Heading>
      <Heading subtitle>{location.address}</Heading>
      <Columns>
        <Columns.Column size='one-fifth'>
          <Menu>
            <Menu.List title='General'>
              <Menu.List.Item active={tab === 'dashboard'} onClick={() => setTab('dashboard')}>
                Dashboard
              </Menu.List.Item>
              <Menu.List.Item active={tab === 'contacts'} onClick={() => setTab('contacts')}>
                Contacts
              </Menu.List.Item>
            </Menu.List>
            <Menu.List title='Finance'>
              <Menu.List.Item active={tab === 'debt'} onClick={() => setTab('debt')}>
                Debt
              </Menu.List.Item>
              <Menu.List.Item active={tab === 'cashflow'} onClick={() => setTab('cashflow')}>
                Cashflow
              </Menu.List.Item>
              <Menu.List.Item active={tab === 'projections'} onClick={() => setTab('projections')}>
                Projections
              </Menu.List.Item>
            </Menu.List>
          </Menu>
        </Columns.Column>
        <Columns.Column>
          <Outlet />
        </Columns.Column>
      </Columns>
    </Section>
  ) : null;
};

export default LocationDetails;
