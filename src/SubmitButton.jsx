import React from 'react';
import PropTypes from 'prop-types';
import {
  ButtonStyled,
  SpinnerStyled,
  ButtonContentStyled,
} from './ResumeStyledComponents';

const SubmitButton = ({ loading, children, type }) => (
  <ButtonStyled type={type} disabled={loading}>
    <ButtonContentStyled>
      {loading && <SpinnerStyled />}
      {' '}
      {children}
    </ButtonContentStyled>
  </ButtonStyled>
);

SubmitButton.propTypes = {
  loading: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  type: PropTypes.string.isRequired,
};

export default SubmitButton;
