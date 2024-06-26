/* eslint-disable react/function-component-definition */
import React from 'react';
import PropTypes from 'prop-types';
import {
  LabelStyled,
  FormGroupStyled,
  InputStyled,
  TextAreaStyled,
} from './FormGroupStyledComponents';

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
