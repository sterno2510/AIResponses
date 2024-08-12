import React from 'react';
import './App.css';
import PropTypes from 'prop-types';
import SideBar from './SideBar';
import LandingPageContent from './LandingPageContent';

// eslint-disable-next-line no-unused-vars
const LandingPage = ({ userObject }) => (
  <div className="App" data-testid="landing-page">
    <div className="main-content" data-testid="main-content">
      <SideBar />
      <LandingPageContent userObject={userObject} />
    </div>
  </div>
);

LandingPage.propTypes = {
  userObject: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    resumes: PropTypes.arrayOf(),
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    visitCount: PropTypes.number,
  }).isRequired,
};

export default LandingPage;
