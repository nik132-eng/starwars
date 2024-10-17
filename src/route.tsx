import { createBrowserRouter, Navigate } from 'react-router-dom';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import App from './App';
import Landing from './pages/landing/Landing';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard'; 
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'auth',
        element: (
          <SignedOut>
            <AuthPage />
          </SignedOut>
        ),
      },
      {
        path: 'dashboard',
        element: (
          <SignedIn>
            <Dashboard />
          </SignedIn>
        ),
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'rebel-alliance/*',
        element: (
          <SignedIn>
            <Navigate to="/dashboard" replace />
          </SignedIn>
        ),
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);