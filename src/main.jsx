import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CreateTrip from './create-trip/index.jsx';
import Header from './components/custom/Header.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Viewtrip from './view-trip/[tripId]/index.jsx';
import Mytrips from './my-trips';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/create-trip',
    element: <CreateTrip />,
  },
  {
    path: '/view-trip/:tripId',
    element: <Viewtrip />,
  },{
    path: '/my-trips/',
    element: <Mytrips />,
  }
]);

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <GoogleOAuthProvider clientId="884506945289-k5c8vk0t4edfnpk2vlu8n1175g47kdhg.apps.googleusercontent.com">
      <Header />
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>,
);
