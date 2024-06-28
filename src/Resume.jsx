/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import axios from 'axios';
import FormGroup from './FormGroup';
import {
  ContainerStyled,
  TitleStyled,
  FormStyled,
  ButtonStyled,
  SectionStyled,
  SectionTitleStyled,
  DangerousHtmlStyled,
} from './ResumeStyledComponents';
import SubmitButton from './SubmitButton';
import createPDF from './helpers/createPdf';

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
              <SectionTitleStyled>Work Experience</SectionTitleStyled>
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
              <SectionTitleStyled>Education</SectionTitleStyled>
              <FormGroup nameLabel="School" inputType="text" field={`school-${index}`} formValue={edu.school} changeFunction={(e) => handleEducationChange(index, e)} />
              <FormGroup nameLabel="Degree" inputType="text" field={`degree-${index}`} formValue={edu.degree} changeFunction={(e) => handleEducationChange(index, e)} />
              <FormGroup nameLabel="Field of Study" inputType="text" field={`fieldOfStudy-${index}`} formValue={edu.fieldOfStudy} changeFunction={(e) => handleEducationChange(index, e)} />
              <FormGroup nameLabel="Start Date" inputType="text" field={`startDate-${index}`} formValue={edu.startDate} changeFunction={(e) => handleEducationChange(index, e)} />
              <FormGroup nameLabel="End Date" inputType="text" field={`endDate-${index}`} formValue={edu.endDate} changeFunction={(e) => handleEducationChange(index, e)} />
            </SectionStyled>
          ))}
          <ButtonStyled type="button" onClick={addEducation}>Add Another Education</ButtonStyled>

          <SubmitButton type="submit" loading={submitting}>Submit</SubmitButton>
        </FormStyled>

        <DangerousHtmlStyled dangerouslySetInnerHTML={{ __html: resume }} />
      </ContainerStyled>
      <ButtonStyled type="button" onClick={() => { createPDF(resume); }}>Download your Resume as a PDF</ButtonStyled>
    </>
  );
};

export default Resume;
