import React from 'react';
import { Link } from 'react-router-dom';

const SideBar = () => (
  <div className="sidebar" data-testid="sidebar">
    <h1 data-testid="title">AI Companion</h1>
    <hr />
    <nav>
      <ul>
        <li>
          <Link to="/resume" data-testid="link-resume">Update Resume</Link>
        </li>
        <li>
          <Link to="/cover-letter" data-testid="link-cover-letter">Create Cover Letter</Link>
        </li>
        <li>
          <Link to="/transcribe" data-testid="link-transcribe">Extract Audio from Video</Link>
        </li>
        <li>
          <Link to="/image-creation" data-testid="link-image-creation">Create AI Images</Link>
        </li>
        <li>
          <Link to="/sql-generator" data-testid="link-sql-generator">Create SQL Queries</Link>
        </li>
      </ul>
    </nav>
  </div>
);

export default SideBar;
