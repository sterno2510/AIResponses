// eslint-disable-next-line no-unused-vars
import { React, useState } from 'react';
import axios from 'axios';
// create function to handle uploads and convert to text

// create function to send text data to backend

function Resume() {
  const [resume, setResume] = useState('');
  const hello = { body: 'hello' };

  const uploadResume = async () => {
    console.log('in upload');
    await axios.post('/api/openai/resume', hello)
      .then((res) => {
        setResume(res.data.content);
      });
  };
  return (
    <>
      <div>this is where you update your resume</div>
      <button onClick={uploadResume} type="button">Test</button>
      <div dangerouslySetInnerHTML={{ __html: resume }} />
    </>
  );
}

export default Resume;
