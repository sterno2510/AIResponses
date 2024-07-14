import React, { useState } from 'react';
import axios from 'axios';

const ImageCreation = () => {
  // eslint-disable-next-line no-unused-vars
  const [query, setQuery] = useState('');
  const handleSubmit = () => {
    axios.post('/api/openai/image-creation', { data: 'A flying pig' }, {

    })
      .then((response) => {
        console.log('response', response.data);
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
