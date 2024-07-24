import React, { useState } from 'react';
import axios from 'axios';
import {
  ContainerStyled,
  TitleStyled,
  CoverLetterFormStyled,
  ButtonStyled,
  DangerousHtmlStyled,
  CoverLetterFormGroupStyled,
  TextAreaStyled,
  LabelStyled,
} from './FormStyledComponents';
import SubmitButton from './SubmitButton';
import createPDF from './helpers/createPdf';

const CoverLetter = () => {
  const [coverLetter, setCoverLetter] = useState(null);
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
    <ContainerStyled>
      <TitleStyled>Create a Cover Letter</TitleStyled>
      <CoverLetterFormStyled onSubmit={handleSubmit}>
        <CoverLetterFormGroupStyled>
          <LabelStyled htmlFor="jobDescription">Copy the job description into the text box below</LabelStyled>
          <TextAreaStyled id="jobDescription" name="jobDescription" value={formData.jobDescription} onChange={handleChange} required />
        </CoverLetterFormGroupStyled>
        <CoverLetterFormGroupStyled>
          <LabelStyled htmlFor="resume">Copy your resume into the text box below</LabelStyled>
          <TextAreaStyled id="resume" name="resume" value={formData.resume} onChange={handleChange} required />
        </CoverLetterFormGroupStyled>
        <SubmitButton type="submit" loading={submitting}>Generate Cover Letter</SubmitButton>
      </CoverLetterFormStyled>
      {coverLetter
      && (
      <>
        <DangerousHtmlStyled dangerouslySetInnerHTML={{ __html: coverLetter }} />
        <ButtonStyled type="button" onClick={() => { createPDF(coverLetter); }}>Download your Cover Letter as a PDF</ButtonStyled>
      </>
      )}
    </ContainerStyled>
  );
};

export default CoverLetter;
