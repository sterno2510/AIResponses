/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import axios from 'axios';
import { DangerousHtmlStyled } from './FormStyledComponents';

const resumeHistory = ({ userObject }) => {
  console.log('in resume history');
  const [resumeHistories, setResumeHistories] = useState([]);

  const retrieveResumes = () => {
    // eslint-disable-next-line no-underscore-dangle
    axios.get(`/retrieve-resumes?userId=${userObject._id}`)
      .then((res) => {
        setResumeHistories(res.data.resumes);
        console.log('res', res);
      })
      .catch((err) => {
        console.log('error retrieving resumes', err);
      });
  };
  console.log('resume history', resumeHistories);
  return (
    <>
      {resumeHistories.map((resume) => (
        <DangerousHtmlStyled dangerouslySetInnerHTML={{ __html: resume.newResume }} />
      ))}
      <div>Want to see your history of resumes?</div>
      <button onClick={retrieveResumes} type="button">Resume History</button>
    </>
  );
};

export default resumeHistory;
