import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Columns, Form, Icon } from 'react-bulma-components';

export const TextInput: React.FC<{
  name: string;
  label?: string;
  type?: React.HTMLInputTypeAttribute;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  iconLeft?: IconProp;
  columns?: boolean;
}> = ({
  name,
  label,
  type = 'text',
  value,
  onChange,
  required = false,
  iconLeft,
  columns = false,
}) => {
  const formLabel = <Form.Label>{label ?? name}</Form.Label>;
  const formControl = (
    <Form.Control>
      {iconLeft && (
        <Icon align='left' size='small'>
          <FontAwesomeIcon icon={iconLeft} />
        </Icon>
      )}
      <Form.Input type={type} name={name} value={value} onChange={onChange} required={required} />
    </Form.Control>
  );

  return (
    <Form.Field>
      {columns ? (
        <Columns vCentered>
          <Columns.Column size='one-fifth'>{formLabel}</Columns.Column>
          <Columns.Column>{formControl}</Columns.Column>
        </Columns>
      ) : (
        <>
          {formLabel}
          {formControl}
        </>
      )}
    </Form.Field>
  );
};

export const SelectInput: React.FC<{
  name: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Array<{ label: string; value: string }>;
  value: string;
  required?: boolean;
  label?: string;
  columns?: boolean;
}> = ({ name, value, options, onChange, label, columns = false, required = false }) => {
  const formLabel = <Form.Label>{label ?? name}</Form.Label>;
  const formControl = (
    <Form.Control>
      <Form.Select value={value} name={name} onChange={onChange} required={required}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Form.Select>
    </Form.Control>
  );

  return (
    <Form.Field>
      {columns ? (
        <Columns vCentered>
          <Columns.Column size='one-fifth'>{formLabel}</Columns.Column>
          <Columns.Column>{formControl}</Columns.Column>
        </Columns>
      ) : (
        <>
          {formLabel}
          {formControl}
        </>
      )}
    </Form.Field>
  );
};
