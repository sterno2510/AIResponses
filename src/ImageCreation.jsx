import React, { useState } from 'react';
import axios from 'axios';

const ImageCreation = () => {
  const [query, setQuery] = useState('');
  const handleSubmit = () => {
    const formData = new FormData();

    axios.post('/api/openai/image-creation', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // eslint-disable-next-line no-unused-vars
  const test = '';
  return (
    <>
      <div> create image</div>
      <button type="submit" onClick={handleSubmit}>Submit</button>
    </>
  );
};

export default ImageCreation;
