import React from 'react';
import axios from 'axios';
// create function to handle uploads and convert to text

// create function to send text data to backend
const hello = { body: 'hello' };
const uploadResume = (text) => {
  axios.post('/api/openai/resume', hello);
};
function Resume() {
  return (
    <div>this is where you update your resume</div>
  );
}

export default Resume;
