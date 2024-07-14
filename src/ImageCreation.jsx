import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Styled-components for styling
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f0f4f8;
  min-height: 100vh;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  width: 300px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const ImageCreation = () => {
  const [query, setQuery] = useState('');
  const [imageData, setImageData] = useState({});

  const handleSubmit = () => {
    axios.post('/api/openai/image-creation', { data: query })
      .then((response) => {
        console.log('response', response);
        setImageData(response.data.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log('image data', imageData);

  return (
    <Container>
      <Title>Create an AI-Generated Image</Title>
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter a description..."
      />
      <Button type="submit" onClick={handleSubmit}>Submit</Button>
    </Container>
  );
};

export default ImageCreation;
