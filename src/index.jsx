import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ErrorPage from './error-page';
import VideoUpload from './VideoUpload';
import Resume from './Resume';
import CoverLetter from './CoverLetter';
import ImageCreation from './ImageCreation';
import SqlGenerator from './SqlGenerator';

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
      {
        path: 'cover-letter',
        element: <CoverLetter />,
      },
      {
        path: 'transcribe',
        element: <VideoUpload />,
      },
      {
        path: 'image-creation',
        element: <ImageCreation />,
      },
      {
        path: 'sql-generator',
        element: <SqlGenerator />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain="dev-qz6qtpf8evrwt4w5.us.auth0.com"
    clientId="1INbrbiI2xJI7NBweEeEYJncfonRMSSB"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <RouterProvider router={router} />
  </Auth0Provider>,

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
