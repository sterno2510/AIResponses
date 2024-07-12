import React from 'react';
import './App.css';
import { Link, Outlet, useLocation } from 'react-router-dom';

const LandingPage = () => {
  const location = useLocation();

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
          {location.pathname !== '/resume' && (
          <div className="placeholder">Placeholder for another component yet to come</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
