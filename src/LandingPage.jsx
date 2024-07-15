import React from 'react';
import './App.css';
import { Link, Outlet, useLocation } from 'react-router-dom';

const LandingPage = () => {
  const location = useLocation();

  const hideContentPaths = ['/resume', '/cover-letter', '/transcribe', '/image-creation'];

  const shouldHideContent = hideContentPaths.includes(location.pathname);

  return (
    <div className="App">
      <div className="main-content">
        <div className="sidebar">
          <h1>AI Companion</h1>
          <hr />
          <nav>
            <ul>
              <li>
                <Link to="/resume">Update Resume</Link>
              </li>
              <li>
                <Link to="/cover-letter">Create Cover Letter</Link>
              </li>
              <li>
                <Link to="/transcribe">Extract Audio from Video</Link>
              </li>
              <li>
                <Link to="/image-creation">Create AI Images</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="content">
          <Outlet />
          {!shouldHideContent && (
            <div className="center-container">
              <section className="intro">
                <h2>About AI Companion</h2>
                <p>
                  AI Companion is a comprehensive service designed to streamline your professional
                  tasks with the power of AI. Our current features include resume generation,
                  audio transcription, cover letter creation, and AI image creation. We are
                  continually expanding our toolset to better serve your needs.
                </p>
              </section>
              <section className="instructions">
                <h2>How to Use AI Companion</h2>
                <ul>
                  <li>
                    <strong>Update Resume:</strong>
                    {' '}
                    Navigate to the
                    <Link to="/resume">Update Resume</Link>
                    {' '}
                    page, fill in your professional details, and let our AI generate
                    a polished resume for you.
                  </li>
                  <li>
                    <strong>Create Cover Letter:</strong>
                    {' '}
                    Visit the
                    <Link to="/cover-letter">Create Cover Letter</Link>
                    {' '}
                    page, provide your resume and job description, and receive a tailored
                    cover letter in minutes.
                  </li>
                  <li>
                    <strong>Extract Audio from Video:</strong>
                    {' '}
                    Go to the
                    <Link to="/transcribe">Extract Audio from Video</Link>
                    {' '}
                    page, upload your video, and get an accurate transcription of the audio.
                  </li>
                  <li>
                    <strong>Create AI Images:</strong>
                    {' '}
                    Head over to the
                    <Link to="/image-creation">Create AI Images</Link>
                    {' '}
                    page, describe the image you want, and let our AI bring it to life.
                  </li>
                </ul>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
