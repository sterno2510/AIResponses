import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ErrorPage from './error-page';
import VideoUpload from './VideoUpload';
import Resume from './Resume';
// import CoverLetter from './CoverLetter';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'resume',
        element: <Resume />,
      },
      // {
      //   path: 'cover-letter',
      //   element: <CoverLetter />,
      // },
      {
        path: 'transcribe',
        element: <VideoUpload />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
