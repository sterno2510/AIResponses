import React from 'react';
import PropTypes from 'prop-types';

function TranscriptionText({ text }) {
  return (
    <div dangerouslySetInnerHTML={{ __html: text }} />
  );
}

TranscriptionText.propTypes = {
  text: PropTypes.string.isRequired,
};

export default TranscriptionText;
