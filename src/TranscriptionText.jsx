import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import analyzeText from './APICalls/api';

function TranscriptionText({ text }) {
  const [processedText, setProcessedText] = useState('');

  useEffect(() => {
    const fetchProcessedText = async () => {
      try {
        const result = await analyzeText(text);
        // Replace new lines with <br/> and double new lines with <p></p> tags
        setProcessedText(result);
      } catch (error) {
        console.error('Failed to process text:', error);
      }
    };

    fetchProcessedText();
  }, [text]);

  return (
    <div dangerouslySetInnerHTML={{ __html: processedText }} />
  );
}

TranscriptionText.propTypes = {
  text: PropTypes.string.isRequired,
};

export default TranscriptionText;
