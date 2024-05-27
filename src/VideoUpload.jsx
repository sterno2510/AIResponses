/* eslint-disable react/function-component-definition */
import { React, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import TranscriptionText from './TranscriptionText';

const VideoUploadStyled = styled.div`
  width: 50%;
  padding: 20px;
  border: 2px solid lightblue;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: lightgrey;
  border-radius: 8px;
  text-align: center;
  margin: 20px auto; /* Centered and with margin to avoid overlap */
`;

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
    <>
      <VideoUploadStyled>
        <input type="file" accept="video/*" onChange={handleFileChange} />
        <button type="submit" onClick={handleUpload}>Upload</button>
      </VideoUploadStyled>
      <div>
        {transcribedTextState && <TranscriptionText text={transcribedTextState} />}
      </div>
    </>
  );
};

export default VideoUpload;
