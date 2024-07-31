import React from 'react';
import './App.css';
import SideBar from './SideBar';
import LandingPageContent from './LandingPageContent';

const LandingPage = () => (
  <div className="App" data-testid="landing-page">
    <div className="main-content" data-testid="main-content">
      <SideBar />
      <LandingPageContent />
    </div>
  </div>
);

export default LandingPage;
