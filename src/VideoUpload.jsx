import { React, useState } from 'react';
import axios from 'axios';

function VideoUpload() {
  const [videoFile, setVideoFile] = useState(null);
  const [transcribedText, setTranscribedText] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setVideoFile(file);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('video', videoFile);

    try {
      // Upload the video file to the server
      const response = await axios.post('http://localhost:3001/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Get the transcribed text from the server response
      const { transcribedTextResponse } = response.data;
      console.log('am I in here?');
      setTranscribedText(transcribedTextResponse);
    } catch (error) {
      console.error('Error uploading video:', error);
    }
  };

  return (
    <div>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button type="submit" onClick={handleUpload}>Upload</button>
      {transcribedText && <div>{transcribedText}</div>}
    </div>
  );
}

export default VideoUpload;
