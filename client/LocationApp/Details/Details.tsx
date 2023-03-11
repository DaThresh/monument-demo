import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LocationById } from '@shared/interfaces/locations';
import { LocationData } from '@shared/types/location';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Columns, Heading, Icon, Menu, Section } from 'react-bulma-components';
import { Outlet, useMatch, useNavigate, useParams } from 'react-router-dom';
import ToastContext from '../../common/contexts/toast';

const LocationDetails = () => {
  const navigate = useNavigate();
  const { locationId } = useParams();
  const match = useMatch('/locations/:locationId/:page');
  const page = match?.params.page ?? 'dashboard';
  const detailsUrl = `/locations/${locationId}`;

  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { addToast } = useContext(ToastContext);

  useEffect(() => {
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
              <Menu.List.Item
                active={page === 'dashboard'}
                onClick={() => navigate(`${detailsUrl}`)}
              >
                Dashboard
              </Menu.List.Item>
              <Menu.List.Item
                active={page === 'contacts'}
                onClick={() => navigate(`${detailsUrl}/contacts`)}
              >
                Contacts
              </Menu.List.Item>
            </Menu.List>
            <Menu.List title='Management'>
              <Menu.List.Item
                active={page === 'units'}
                onClick={() => navigate(`${detailsUrl}/units`)}
              >
                Units
              </Menu.List.Item>
            </Menu.List>
            <Menu.List title='Finance'>
              <Menu.List.Item
                active={page === 'debt'}
                onClick={() => navigate(`${detailsUrl}/debt`)}
              >
                Debt
              </Menu.List.Item>
              <Menu.List.Item
                active={page === 'cashflow'}
                onClick={() => navigate(`${detailsUrl}/cashflow`)}
              >
                Cashflow
              </Menu.List.Item>
              <Menu.List.Item
                active={page === 'projections'}
                onClick={() => navigate(`${detailsUrl}/projections`)}
              >
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
