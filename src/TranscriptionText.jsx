import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TranscribedTextStyled = styled.div`
  width: 50%;
  padding: 20px;
  border: 2px solid lightblue;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: lightgrey;
  border-radius: 8px;
  margin: 20px auto; /* Centered and with margin to avoid overlap */
  text-align: center;
`;

function TranscriptionText({ text }) {
  return (
    <TranscribedTextStyled dangerouslySetInnerHTML={{ __html: text }} />
  );
}

TranscriptionText.propTypes = {
  text: PropTypes.string.isRequired,
};

export default TranscriptionText;
