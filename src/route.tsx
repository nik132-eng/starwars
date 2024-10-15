import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Landing from './pages/landing/Landing';
import { LoginPage } from './pages/LoginPage';
import Dashboard from './pages/Dashboard'; 
import About from './pages/About';
import Contact from './pages/Contact';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Landing />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/dashboard',
        element: (
          <SignedIn> 
            <Dashboard />
          </SignedIn>
        ),
      },
      {
        path: '*',
        element: (
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
        ),
      },
    ],
  },
]);
