/* eslint-disable react/function-component-definition */
import { React, useState } from 'react';
import axios from 'axios';
import TranscriptionText from './TranscriptionText';

const VideoUpload = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [transcribedTextState, setTranscribedTextState] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setVideoFile(file);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('video', videoFile);

    try {
      const response = await axios.post('/api/openai', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const transcribedText = response.data.content;

      setTranscribedTextState(transcribedText);
    } catch (error) {
      console.error('Error uploading video:', error);
    }
  };

  return (
    <div>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button type="submit" onClick={handleUpload}>Upload</button>
      {transcribedTextState && <TranscriptionText text={transcribedTextState} />}
    </div>
  );
};

export default VideoUpload;
