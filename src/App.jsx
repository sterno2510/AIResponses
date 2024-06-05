import './App.css';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Header from './Header';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="main-content">
        <div className="sidebar">
          <h1>AI Companion</h1>
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
            </ul>
          </nav>
        </div>
        <div className="content">
          <Outlet />
          <div className="placeholder">Placeholder for another component yet to come</div>
        </div>
      </div>
    </div>
  );
}

export default App;
