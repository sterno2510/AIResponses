/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import axios from 'axios';

function Resume() {
  const [resume, setResume] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    location: '',
    linkedin: '',
    summary: '',
    workExperience: [{
      company: '', role: '', duration: '', description: '',
    }],
    education: [{
      school: '', degree: '', fieldOfStudy: '', duration: '',
    }],
    skills: '',
  });
  console.log('experience', formData);
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
    <>
      <div>this is where you update your resume</div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName">Full Name:</label>
          <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="linkedin">LinkedIn URL:</label>
          <input type="url" id="linkedin" name="linkedin" value={formData.linkedin} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="summary">Summary:</label>
          <textarea id="summary" name="summary" value={formData.summary} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="skills">Skills:</label>
          <textarea id="skills" name="skills" value={formData.skills} onChange={handleChange} required />
        </div>

        {formData.workExperience.map((experience, index) => (
          <div key={index}>
            <h3>
              Work Experience
              {index + 1}
            </h3>
            <div>
              <label htmlFor={`company-${index}`}>Company:</label>
              <input type="text" id={`company-${index}`} name="company" value={experience.company} onChange={(e) => handleWorkExperienceChange(index, e)} required />
            </div>
            <div>
              <label htmlFor={`role-${index}`}>Role:</label>
              <input type="text" id={`role-${index}`} name="role" value={experience.role} onChange={(e) => handleWorkExperienceChange(index, e)} required />
            </div>
            <div>
              <label htmlFor={`duration-${index}`}>Duration:</label>
              <input type="text" id={`duration-${index}`} name="duration" value={experience.duration} onChange={(e) => handleWorkExperienceChange(index, e)} required />
            </div>
            <div>
              <label htmlFor={`description-${index}`}>Description:</label>
              <textarea id={`description-${index}`} name="description" value={experience.description} onChange={(e) => handleWorkExperienceChange(index, e)} required />
            </div>
          </div>
        ))}
        <button type="button" onClick={addWorkExperience}>Add Another Job</button>

        {formData.education.map((edu, index) => (
          <div key={index}>
            <h3>
              Education
              {index + 1}
            </h3>
            <div>
              <label htmlFor={`school-${index}`}>School:</label>
              <input type="text" id={`school-${index}`} name="school" value={edu.school} onChange={(e) => handleEducationChange(index, e)} required />
            </div>
            <div>
              <label htmlFor={`degree-${index}`}>Degree:</label>
              <input type="text" id={`degree-${index}`} name="degree" value={edu.degree} onChange={(e) => handleEducationChange(index, e)} required />
            </div>
            <div>
              <label htmlFor={`fieldOfStudy-${index}`}>Field of Study:</label>
              <input type="text" id={`fieldOfStudy-${index}`} name="fieldOfStudy" value={edu.fieldOfStudy} onChange={(e) => handleEducationChange(index, e)} required />
            </div>
            <div>
              <label htmlFor={`eduDuration-${index}`}>Duration:</label>
              <input type="text" id={`eduDuration-${index}`} name="duration" value={edu.duration} onChange={(e) => handleEducationChange(index, e)} required />
            </div>
          </div>
        ))}
        <button type="button" onClick={addEducation}>Add Another Education</button>

        <button type="submit">Submit</button>
      </form>

      <div dangerouslySetInnerHTML={{ __html: resume }} />
    </>
  );
}

export default Resume;
