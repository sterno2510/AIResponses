import React from 'react';
import PropTypes from 'prop-types';
import {
  ButtonStyled,
  SpinnerStyled,
  ButtonContentStyled,
} from './ResumeStyledComponents';

const SubmitButton = ({
  loading, children, type, onClick,
}) => (
  <ButtonStyled type={type} disabled={loading} onClick={onClick}>
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
  onClick: PropTypes.func,
};

SubmitButton.defaultProps = {
  onClick: () => {}, // Default to no-op function
};

export default SubmitButton;
