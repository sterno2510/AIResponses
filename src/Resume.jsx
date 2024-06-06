/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

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

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

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

  const handleWorkExperienceChange = (index, e) => {
    const { name, value } = e.target;
    const newWorkExperience = [...formData.workExperience];
    newWorkExperience[index][name] = value;
    setFormData({ ...formData, workExperience: newWorkExperience });
  };

  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;
    const newEducation = [...formData.education];
    newEducation[index][name] = value;
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
        <FormGroup>
          <Label htmlFor="fullName">Full Name:</Label>
          <Input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email">Email:</Label>
          <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="location">Location:</Label>
          <Input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="linkedin">LinkedIn URL:</Label>
          <Input type="url" id="linkedin" name="linkedin" value={formData.linkedin} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="summary">Summary:</Label>
          <Textarea id="summary" name="summary" value={formData.summary} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="skills">Skills:</Label>
          <Textarea id="skills" name="skills" value={formData.skills} onChange={handleChange} required />
        </FormGroup>

        {formData.workExperience.map((experience, index) => (
          <Section key={index}>
            <SectionTitle>
              Work Experience
              {index + 1}
            </SectionTitle>
            <FormGroup>
              <Label htmlFor={`company-${index}`}>Company:</Label>
              <Input type="text" id={`company-${index}`} name="company" value={experience.company} onChange={(e) => handleWorkExperienceChange(index, e)} required />
            </FormGroup>
            <FormGroup>
              <Label htmlFor={`role-${index}`}>Role:</Label>
              <Input type="text" id={`role-${index}`} name="role" value={experience.role} onChange={(e) => handleWorkExperienceChange(index, e)} required />
            </FormGroup>
            <FormGroup>
              <Label htmlFor={`startDate-${index}`}>Start Date:</Label>
              <Input type="text" id={`startDate-${index}`} name="startDate" value={experience.startDate} onChange={(e) => handleWorkExperienceChange(index, e)} required />
            </FormGroup>
            <FormGroup>
              <Label htmlFor={`endDate-${index}`}>End Date:</Label>
              <Input type="text" id={`endDate-${index}`} name="endDate" value={experience.endDate} onChange={(e) => handleWorkExperienceChange(index, e)} required />
            </FormGroup>
            <FormGroup>
              <Label htmlFor={`description-${index}`}>Description:</Label>
              <Textarea id={`description-${index}`} name="description" value={experience.description} onChange={(e) => handleWorkExperienceChange(index, e)} required />
            </FormGroup>
          </Section>
        ))}
        <Button type="button" onClick={addWorkExperience}>Add Another Job</Button>

        {formData.education.map((edu, index) => (
          <Section key={index}>
            <SectionTitle>
              Education
              {index + 1}
            </SectionTitle>
            <FormGroup>
              <Label htmlFor={`school-${index}`}>School:</Label>
              <Input type="text" id={`school-${index}`} name="school" value={edu.school} onChange={(e) => handleEducationChange(index, e)} required />
            </FormGroup>
            <FormGroup>
              <Label htmlFor={`degree-${index}`}>Degree:</Label>
              <Input type="text" id={`degree-${index}`} name="degree" value={edu.degree} onChange={(e) => handleEducationChange(index, e)} required />
            </FormGroup>
            <FormGroup>
              <Label htmlFor={`fieldOfStudy-${index}`}>Field of Study:</Label>
              <Input type="text" id={`fieldOfStudy-${index}`} name="fieldOfStudy" value={edu.fieldOfStudy} onChange={(e) => handleEducationChange(index, e)} required />
            </FormGroup>
            <FormGroup>
              <Label htmlFor={`eduStartDate-${index}`}>Start Date:</Label>
              <Input type="text" id={`eduStartDate-${index}`} name="startDate" value={edu.duration} onChange={(e) => handleEducationChange(index, e)} required />
            </FormGroup>
            <FormGroup>
              <Label htmlFor={`eduEndDate-${index}`}>End Date:</Label>
              <Input type="text" id={`eduEndDate-${index}`} name="endDate" value={edu.duration} onChange={(e) => handleEducationChange(index, e)} required />
            </FormGroup>
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
