/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  DangerousHtmlStyled, ButtonStyled, NavButtonContainer, LeftButton, RightButton,
} from './FormStyledComponents';

const ResumeHistory = ({ userObject }) => {
  const [resumeHistories, setResumeHistories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const retrieveResumes = () => {
    axios.get(`/retrieve-resumes?userId=${userObject._id}`)
      .then((res) => {
        setResumeHistories(res.data.resumes);
        setCurrentIndex(0); // Reset index to 0 when new data is loaded
      })
      .catch((err) => {
        console.log('error retrieving resumes', err);
      });
  };

  const showNextResume = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % resumeHistories.length);
  };

  const showPreviousResume = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1
       + resumeHistories.length) % resumeHistories.length);
  };

  return (
    <>

      <div>Want to see your history of resumes?</div>
      <ButtonStyled onClick={retrieveResumes} type="button">Retrieve Resume History</ButtonStyled>
      {resumeHistories.length > 0 && (
        <>
          <h1>Your Resume History</h1>
          <NavButtonContainer>
            {currentIndex > 0 && (
            <LeftButton onClick={showPreviousResume} type="button">&lt; Previous</LeftButton>
            )}
            {currentIndex < resumeHistories.length - 1 && (
            <RightButton onClick={showNextResume} type="button">Next &gt;</RightButton>
            )}
          </NavButtonContainer>
        </>
      )}
      {resumeHistories.length > 0 && (
        <DangerousHtmlStyled
          dangerouslySetInnerHTML={{ __html: resumeHistories[currentIndex].newResume }}
        />
      )}
    </>
  );
};

ResumeHistory.propTypes = {
  userObject: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default ResumeHistory;
