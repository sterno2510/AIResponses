import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
`;

const FormGroupStyled = styled.div`
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  min-height: 100px; /* Adjust the height as needed */
`;

function FormGroup({
  nameLabel, inputType, field, formValue, changeFunction,
}) {
  return (
    <FormGroupStyled>
      <Label htmlFor={field}>
        {nameLabel}
        :
      </Label>
      {field === 'summary' || field.includes('description') ? (
        <Textarea
          id={field}
          name={field}
          value={formValue}
          onChange={changeFunction}
          required
        />
      ) : (
        <Input
          type={inputType}
          id={field}
          name={field}
          value={formValue}
          onChange={changeFunction}
          required
        />
      )}
    </FormGroupStyled>
  );
}

FormGroup.propTypes = {
  nameLabel: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  formValue: PropTypes.string.isRequired,
  changeFunction: PropTypes.func.isRequired,
  inputType: PropTypes.string.isRequired,
};

export default FormGroup;
