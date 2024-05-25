import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function TranscriptionText({ text }) {
  const [processedText, setProcessedText] = useState('');

  useEffect(() => {
    const prompt = {
      prompt: `Analyze the following text and add appropriate paragraph breaks with <br/> and punctuation: ${text}.`,
    };
    axios.post('/api/openai', prompt)
      .then((success) => {
        console.log('success', success.data);
        setProcessedText(success.data.message.content);
      })
      .catch((error) => {
        console.log(`Error making network call to openAI ${error}`);
      });
  }, [text]);

  return (
    <div dangerouslySetInnerHTML={{ __html: processedText }} />
  );
}

TranscriptionText.propTypes = {
  text: PropTypes.string.isRequired,
};

export default TranscriptionText;
