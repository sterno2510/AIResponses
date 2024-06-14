/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import HTMLtoDOCX from 'html-to-docx';
import { saveAs } from 'file-saver';
import axios from 'axios';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import FormGroup from './FormGroup';
import DownloadButton from './DownloadButton';

const ContainerStyled = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const TitleStyled = styled.h2`
  text-align: center;
`;

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
`;

const ButtonStyled = styled.button`
  width: fit-content;
  padding: 10px 20px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  background-color: #0068d1;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #404040;
  }
`;

const SectionStyled = styled.section`
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const SectionTitleStyled = styled.h3`
  margin-top: 0;
`;

const DangerousHtmlStyled = styled.div`
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SpinnerStyled = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #333;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
  margin-right: 10px;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const ButtonContentStyled = styled.div`
  display: flex;
  align-items: center;
`;

const SubmitButton = ({ loading, children, type }) => (
  <ButtonStyled type={type} disabled={loading}>
    <ButtonContentStyled>
      {loading && <SpinnerStyled />}
      {' '}
      {children}
    </ButtonContentStyled>
  </ButtonStyled>
);

SubmitButton.propTypes = {
  loading: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  type: PropTypes.string.isRequired,
};

const Resume = () => {
  const [resume, setResume] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    location: '',
    linkedin: '',
    summary: '',
    workExperience: [{
      id: Date.now(),
      company: '',
      role: '',
      startDate: '',
      endDate: '',
      description: '',
    }],
    education: [{
      id: Date.now(),
      school: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
    }],
    skills: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleWorkExperienceChange = (index, e) => {
    const { name, value } = e.target;
    const newWorkExperience = [...formData.workExperience];
    const fieldName = name.split('-')[0];
    newWorkExperience[index][fieldName] = value;
    setFormData({ ...formData, workExperience: newWorkExperience });
  };

  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;
    const newEducation = [...formData.education];
    const fieldName = name.split('-')[0];
    newEducation[index][fieldName] = value;
    setFormData({ ...formData, education: newEducation });
  };

  const addWorkExperience = () => {
    setFormData({
      ...formData,
      workExperience: [...formData.workExperience, {
        id: Date.now(),
        company: '',
        role: '',
        startDate: '',
        endDate: '',
        description: '',
      }],
    });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [...formData.education, {
        id: Date.now(),
        school: '',
        degree: '',
        fieldOfStudy: '',
        startDate: '',
        endDate: '',
      }],
    });
  };

  const createPDF = async () => {
    try {
      const res = await axios.post('/api/convertToPdf', { content: resume }, {
        responseType: 'blob',
      });
      const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(pdfBlob);
      const tempLink = document.createElement('a');
      tempLink.href = url;
      tempLink.setAttribute(
        'download',
        'resume.pdf',
      );

      document.body.appendChild(tempLink);
      tempLink.click();

      document.body.removeChild(tempLink);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await axios.post('/api/openai/resume', formData);
      setResume(res.data.content);
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  const downloadDocxFile = async () => {
    try {
      const html = '<h1>Hello, World!</h1>'; // Replace with your HTML content
      const docx = await HTMLtoDOCX(html);

      // Create a Blob from the DOCX data
      const blob = new Blob([docx], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });

      // Use file-saver library to save the Blob as a DOCX file
      saveAs(blob, 'example.docx');
    } catch (error) {
      console.error('Error creating DOCX file:', error);
    }
  };

  return (
    <>
      <ContainerStyled>
        <TitleStyled>Update Your Resume</TitleStyled>
        <FormStyled onSubmit={handleSubmit}>
          <FormGroup nameLabel="Full Name" inputType="text" field="fullName" formValue={formData.fullName} changeFunction={handleChange} />
          <FormGroup nameLabel="Email" inputType="email" field="email" formValue={formData.email} changeFunction={handleChange} />
          <FormGroup nameLabel="Location" inputType="text" field="location" formValue={formData.location} changeFunction={handleChange} />
          <FormGroup nameLabel="LinkedIn URL" inputType="url" field="linkedin" formValue={formData.linkedin} changeFunction={handleChange} />
          <FormGroup nameLabel="Summary" inputType="text" field="summary" formValue={formData.summary} changeFunction={handleChange} />
          <FormGroup nameLabel="Skills" inputType="text" field="skills" formValue={formData.skills} changeFunction={handleChange} />

          {formData.workExperience.map((experience, index) => (
            <SectionStyled key={experience.id}>
              <SectionTitleStyled>
                Work Experience
                {index + 1}
              </SectionTitleStyled>
              <FormGroup nameLabel="Company" inputType="text" field={`company-${index}`} formValue={experience.company} changeFunction={(e) => handleWorkExperienceChange(index, e)} />

              <FormGroup nameLabel="Role" inputType="text" field={`role-${index}`} formValue={experience.role} changeFunction={(e) => handleWorkExperienceChange(index, e)} />
              <FormGroup nameLabel="Start Date" inputType="text" field={`startDate-${index}`} formValue={experience.startDate} changeFunction={(e) => handleWorkExperienceChange(index, e)} />
              <FormGroup nameLabel="End Date" inputType="text" field={`endDate-${index}`} formValue={experience.endDate} changeFunction={(e) => handleWorkExperienceChange(index, e)} />
              <FormGroup nameLabel="Description" inputType="text" field={`description-${index}`} formValue={experience.description} changeFunction={(e) => handleWorkExperienceChange(index, e)} />
            </SectionStyled>
          ))}
          <ButtonStyled type="button" onClick={addWorkExperience}>Add Another Job</ButtonStyled>

          {formData.education.map((edu, index) => (
            <SectionStyled key={edu.id}>
              <SectionTitleStyled>
                Education
                {index + 1}
              </SectionTitleStyled>
              <FormGroup nameLabel="School" inputType="text" field={`school-${index}`} formValue={edu.school} changeFunction={(e) => handleEducationChange(index, e)} />
              <FormGroup nameLabel="Degree" inputType="text" field={`degree-${index}`} formValue={edu.degree} changeFunction={(e) => handleEducationChange(index, e)} />
              <FormGroup nameLabel="Field of Study" inputType="text" field={`fieldOfStudy-${index}`} formValue={edu.fieldOfStudy} changeFunction={(e) => handleEducationChange(index, e)} />
              <FormGroup nameLabel="Start Date" inputType="text" field={`startDate-${index}`} formValue={edu.startDate} changeFunction={(e) => handleEducationChange(index, e)} />
              <FormGroup nameLabel="End Date" inputType="text" field={`endDate-${index}`} formValue={edu.endDate} changeFunction={(e) => handleEducationChange(index, e)} />
            </SectionStyled>
          ))}
          <ButtonStyled type="button" onClick={addEducation}>Add Another Education</ButtonStyled>

          <SubmitButton loading={submitting}>Submit</SubmitButton>
        </FormStyled>

        <DangerousHtmlStyled dangerouslySetInnerHTML={{ __html: resume }} />
      </ContainerStyled>
      <ButtonStyled type="button" onClick={createPDF}>Download Resume as a PDF</ButtonStyled>
      <DownloadButton
        downloadDocxFile={downloadDocxFile}
      >
        Download Resume as a DOCX
      </DownloadButton>
    </>
  );
};

export default Resume;
