import React from 'react';
import PropTypes from 'prop-types';
import {
  ButtonStyled,
  SpinnerStyled,
  ButtonContentStyled,
} from './ResumeStyledComponents';

const SubmitButton = ({
  loading, children, type, onClick = () => {},
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
  // eslint-disable-next-line react/require-default-props
  onClick: PropTypes.func,
};

export default SubmitButton;
