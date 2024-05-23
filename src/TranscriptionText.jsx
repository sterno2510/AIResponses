import React from 'react';
import PropTypes from 'prop-types';

function TranscriptionText({ text }) {
  console.log('in transcription component');
  return (
    <div>{text}</div>
  );
}

TranscriptionText.propTypes = {
  text: PropTypes.string.isRequired,
};

export default TranscriptionText;
