import { CreateUnit } from '@shared/interfaces/units';
import { UnitData, UnitSystem } from '@shared/types/unit';
import axios, { AxiosResponse } from 'axios';
import React, { useContext, useState } from 'react';
import { Button } from 'react-bulma-components';
import { SelectInput, TextInput } from '../../../../common/components/Forms';
import ModalContext from '../../../../common/contexts/modal';
import ToastContext from '../../../../common/contexts/toast';
import { unitSystemLabel } from '../utilities';

const AddUnitModal: React.FC<{ locationId: number; addUnit: (unit: UnitData) => void }> = ({
  locationId,
  addUnit,
}) => {
  const [unit, setUnit] = useState<string>('');
  const [size, setSize] = useState<string>('');
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('sqft');
  const [loading, setLoading] = useState<boolean>(false);
  const setFunctions = { setUnit, setSize };
  const { addToast } = useContext(ToastContext);
  const { closeModal } = useContext(ModalContext);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const setFunctionName = event.currentTarget.name as 'Unit' | 'Size';
    setFunctions[`set${setFunctionName}`]?.(event.currentTarget.value);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setUnitSystem(event.currentTarget.value as UnitSystem);
  };

  const createUnit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) {
      return;
    }
    setLoading(true);
    axios
      .post<CreateUnit.Response, AxiosResponse<CreateUnit.Response>, CreateUnit.Body>(
        `/api/units`,
        { size: Number(size), number: unit, unitSystem, locationId }
      )
      .then((response) => {
        addToast({ message: `Added Unit ${unit}`, color: 'success', dark: true });
        addUnit(response.data);
        closeModal();
      })
      .catch(() => {
        addToast({ message: 'Failed to create Unit', color: 'danger', dark: true });
        setLoading(false);
      });
  };

  return (
    <form onSubmit={createUnit}>
      <TextInput name='Unit' value={unit} onChange={handleInput} required columns />
      <TextInput name='Size' type='number' value={size} onChange={handleInput} required columns />
      <SelectInput
        name='UnitSystem'
        label='Measurement'
        onChange={handleSelect}
        options={Object.keys(unitSystemLabel).map((key) => ({
          label: unitSystemLabel[key as UnitSystem],
          value: key,
        }))}
        value={unitSystem}
        columns
      />
      <Button type='submit' color='primary'>
        Add
      </Button>
    </form>
  );
};

export default AddUnitModal;
