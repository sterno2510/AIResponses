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
  nameLabel, inputType, field, formValue = '', changeFunction, placeHolder = 'Enter Input...',
}) => (
  <FormGroupStyled>
    <LabelStyled htmlFor={field}>
      {nameLabel}
      :
    </LabelStyled>
    {field === 'summary' || field.includes('description') || field.includes('Schema') ? (
      <TextAreaStyled
        id={field}
        name={field}
        value={formValue}
        onChange={changeFunction}
        placeholder={placeHolder}
        required
      />
    ) : (
      <InputStyled
        type={inputType}
        id={field}
        name={field}
        value={formValue}
        onChange={changeFunction}
        placeholder={placeHolder}
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
  placeHolder: PropTypes.string.isRequired,
};

export default FormGroup;
