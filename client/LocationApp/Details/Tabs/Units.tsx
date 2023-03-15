import { UnitData } from '@shared/types/unit';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Heading, Level } from 'react-bulma-components';
import { useParams } from 'react-router-dom';
import ModalContext from '../../../common/contexts/modal';
import ToastContext from '../../../common/contexts/toast';
import AddUnitModal from './modals/AddUnit';
import { unitSystemLabel } from './utilities';

const Units = () => {
  const { locationId } = useParams();
  const [units, setUnits] = useState<UnitData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { addToast } = useContext(ToastContext);
  const { openModal } = useContext(ModalContext);

  useEffect(() => {
    axios
      .get(`/api/locations/${locationId}/units`)
      .then((response) => setUnits(response.data))
      .catch(() => addToast({ message: 'Unable to fetch Units', color: 'danger', dark: true }))
      .finally(() => setLoading(false));
  }, []);

  const openAddUnitModal = (event: React.MouseEvent) => {
    event.preventDefault();
    const addUnit = (unit: UnitData) => {
      setUnits((units) => [...units, unit]);
    };

    openModal(<AddUnitModal locationId={Number(locationId)} addUnit={addUnit} />);
  };

  return !loading ? (
    <>
      <Level>
        <Level.Side>
          <Level.Item>
            <Heading>Total Units: {units.length}</Heading>
          </Level.Item>
        </Level.Side>
        <Level.Side>
          <Level.Item>
            <Button color='info' onClick={openAddUnitModal}>
              Add Unit
            </Button>
          </Level.Item>
        </Level.Side>
      </Level>
      {units.map((unit) => (
        <Box key={unit.id} style={{ cursor: 'pointer' }}>
          <Level>
            <Level.Side>
              <Level.Item>{unit.number}</Level.Item>
            </Level.Side>
            <Level.Side>
              <Level.Item>
                {Math.floor(unit.size)} {unitSystemLabel[unit.unitSystem]}
              </Level.Item>
            </Level.Side>
          </Level>
        </Box>
      ))}
    </>
  ) : null;
};

export default Units;
