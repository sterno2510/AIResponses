/* eslint-disable react/function-component-definition */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const LabelStyled = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
`;

const FormGroupStyled = styled.div`
  margin-bottom: 20px;
`;

const InputStyled = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const TextAreaStyled = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  min-height: 100px; /* Adjust the height as needed */
`;

const FormGroup = ({
  nameLabel, inputType, field, formValue, changeFunction,
}) => (
  <FormGroupStyled>
    <LabelStyled htmlFor={field}>
      {nameLabel}
      :
    </LabelStyled>
    {field === 'summary' || field.includes('description') ? (
      <TextAreaStyled
        id={field}
        name={field}
        value={formValue}
        onChange={changeFunction}
        required
      />
    ) : (
      <InputStyled
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

FormGroup.propTypes = {
  nameLabel: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  formValue: PropTypes.string.isRequired,
  changeFunction: PropTypes.func.isRequired,
  inputType: PropTypes.string.isRequired,
};

export default FormGroup;
