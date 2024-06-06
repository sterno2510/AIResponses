/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import FormGroup from './FormGroup';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h2`
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

// const Textarea = styled.textarea`
//   width: 100%;
//   padding: 10px;
//   margin-top: 5px;
//   border: 1px solid #ccc;
//   border-radius: 5px;
// `;

const Button = styled.button`
  width: fit-content;
  padding: 10px 20px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  background-color: #007BFF;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const Section = styled.section`
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  margin-top: 0;
`;

const DangerousHtml = styled.div`
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

function Resume() {
  const [resume, setResume] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    location: '',
    linkedin: '',
    summary: '',
    workExperience: [{
      company: '', role: '', startDate: '', endDate: '', description: '',
    }],
    education: [{
      school: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '',
    }],
    skills: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleWorkExperienceChange = (index, e) => {
  //   const { name, value } = e.target;
  //   const newWorkExperience = [...formData.workExperience];
  //   newWorkExperience[index][name] = value;
  //   setFormData({ ...formData, workExperience: newWorkExperience });
  // };
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
        company: '', role: '', duration: '', description: '',
      }],
    });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [...formData.education, {
        school: '', degree: '', fieldOfStudy: '', duration: '',
      }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/openai/resume', formData)
      .then((res) => {
        setResume(res.data.content);
      });
  };

  return (
    <Container>
      <Title>Update Your Resume</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup nameLabel="Full Name" inputType="text" field="fullName" formValue={formData.fullName} changeFunction={handleChange} />
        <FormGroup nameLabel="Email" inputType="email" field="email" formValue={formData.email} changeFunction={handleChange} />
        <FormGroup nameLabel="Location" inputType="text" field="location" formValue={formData.location} changeFunction={handleChange} />
        <FormGroup nameLabel="LinkedIn URL" inputType="url" field="linkedin" formValue={formData.linkedin} changeFunction={handleChange} />
        <FormGroup nameLabel="Summary" inputType="text" field="summary" formValue={formData.summary} changeFunction={handleChange} />
        <FormGroup nameLabel="Skills" inputType="text" field="skills" formValue={formData.skills} changeFunction={handleChange} />

        {formData.workExperience.map((experience, index) => (
          <Section key={index}>
            <SectionTitle>
              Work Experience
              {index + 1}
            </SectionTitle>
            <FormGroup nameLabel="Company" inputType="text" field={`company-${index}`} formValue={experience.company} changeFunction={(e) => handleWorkExperienceChange(index, e)} />

            <FormGroup nameLabel="Role" inputType="text" field={`role-${index}`} formValue={experience.role} changeFunction={(e) => handleWorkExperienceChange(index, e)} />
            <FormGroup nameLabel="Start Date" inputType="text" field={`startDate-${index}`} formValue={experience.startDate} changeFunction={(e) => handleWorkExperienceChange(index, e)} />
            <FormGroup nameLabel="End Date" inputType="text" field={`endDate-${index}`} formValue={experience.endDate} changeFunction={(e) => handleWorkExperienceChange(index, e)} />
            <FormGroup nameLabel="Description" inputType="text" field={`description-${index}`} formValue={experience.description} changeFunction={(e) => handleWorkExperienceChange(index, e)} />
            {/* <FormGroup1>
              <Label htmlFor={`description-${index}`}>Description:</Label>
              <Textarea id={`description-${index}`}
               name="description" value={experience.description}
                onChange={(e) => handleWorkExperienceChange(index, e)} required />
            </FormGroup1> */}
          </Section>
        ))}
        <Button type="button" onClick={addWorkExperience}>Add Another Job</Button>

        {formData.education.map((edu, index) => (
          <Section key={index}>
            <SectionTitle>
              Education
              {index + 1}
            </SectionTitle>
            <FormGroup nameLabel="School" inputType="text" field={`school-${index}`} formValue={edu.school} changeFunction={(e) => handleEducationChange(index, e)} />
            <FormGroup nameLabel="Degree" inputType="text" field={`degree-${index}`} formValue={edu.degree} changeFunction={(e) => handleEducationChange(index, e)} />
            <FormGroup nameLabel="Field of Study" inputType="text" field={`fieldOfStudy-${index}`} formValue={edu.fieldOfStudy} changeFunction={(e) => handleEducationChange(index, e)} />
            <FormGroup nameLabel="Start Date" inputType="text" field={`startDate-${index}`} formValue={edu.startDate} changeFunction={(e) => handleEducationChange(index, e)} />
            <FormGroup nameLabel="End Date" inputType="text" field={`endDate-${index}`} formValue={edu.endDate} changeFunction={(e) => handleEducationChange(index, e)} />
          </Section>
        ))}
        <Button type="button" onClick={addEducation}>Add Another Education</Button>

        <Button type="submit">Submit</Button>
      </Form>

      <DangerousHtml dangerouslySetInnerHTML={{ __html: resume }} />
    </Container>
  );
}

export default Resume;
