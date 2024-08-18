import React, { useState } from 'react';
import axios from 'axios';
import SubmitButton from './SubmitButton';
import {
  ContainerStyled, TitleStyled, InputStyled, ImageStyled, FormStyled, ImageContainer,
} from './ImageCreatingStyledComponents';

const ImageCreation = () => {
  const [query, setQuery] = useState('');
  const [imageData, setImageData] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitting(true);
    console.info('Image is being generated, please wait.');
    axios.post('/api/openai/image-creation', { data: query })
      .then((response) => {
        console.info('response', response);
        setImageData(response.data.data[0]);
        setSubmitting(false);
      })
      .catch((err) => {
        console.info(err);
      });
  };

  return (
    <ContainerStyled>
      <TitleStyled>Create an AI-Generated Image</TitleStyled>
      <div style={{ width: '75%', paddingBottom: '20px' }}>
        Please note that with the release of DALL·E 3, the model now takes in the
        default prompt provided and automatically re-write it for safety reasons, and
        to add more detail (more detailed prompts generally result in higher quality images).
      </div>
      <FormStyled onSubmit={handleSubmit}>
        <InputStyled
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter a description for your image"
        />
        <SubmitButton onClick={handleSubmit} type="button" loading={submitting}>Submit</SubmitButton>
      </FormStyled>
      {imageData
      && (
      <ImageContainer>
        <div>
          Updated prompt created by OpenAI:
          {imageData.revised_prompt}
        </div>
        <ImageStyled src={imageData.url} alt="Generated AI Image" />
      </ImageContainer>
      )}
    </ContainerStyled>
  );
};

export default ImageCreation;
