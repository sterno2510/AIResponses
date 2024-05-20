import './App.css';
import React from 'react';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <h1>AI Companion</h1>
      <div>Update Resume</div>
      <div>Create Cover Letter</div>
      <Link to="transcribe">Extract Audio from Video</Link>
    </div>
  );
}

export default App;
