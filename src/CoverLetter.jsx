/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import axios from 'axios';
import {
  ContainerStyled,
  TitleStyled,
  FormStyled,
  ButtonStyled,
  DangerousHtmlStyled,
} from './ResumeStyledComponents';
import {
  LabelStyled,
  // FormGroupStyled,
  // InputStyled,
  TextAreaStyled,
} from './FormGroupStyledComponents';
import SubmitButton from './SubmitButton';
import createPDF from './helpers/createPdf';

const CoverLetter = () => {
  // eslint-disable-next-line no-unused-vars
  const [coverLetter, setCoverLetter] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await axios.post('/api/openai/cover-letter', formData);
      setCoverLetter(res.data.content);
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <ContainerStyled>
        <TitleStyled>Create a Cover Letter</TitleStyled>
        <FormStyled onSubmit={handleSubmit}>
          <LabelStyled htmlFor="summary">Copy the job description into the text box below</LabelStyled>
          <TextAreaStyled id="jobDescription" name="jobDescription" value={formData.jobDescription} onChange={handleChange} required />
          <LabelStyled htmlFor="resume">Copy your resume into the text box below</LabelStyled>
          <TextAreaStyled id="resume" name="resume" value={formData.resume} onChange={handleChange} required />
          <SubmitButton type="submit" loading={submitting}>Submit</SubmitButton>
        </FormStyled>
        <DangerousHtmlStyled dangerouslySetInnerHTML={{ __html: coverLetter }} />
      </ContainerStyled>
      <ButtonStyled type="button" onClick={() => { createPDF(coverLetter); }}>Download your Cover Letter as a PDF</ButtonStyled>
    </>
  );
};

export default CoverLetter;
