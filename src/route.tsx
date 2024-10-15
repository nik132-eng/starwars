import { createBrowserRouter } from 'react-router-dom';
import App from './App'; 
import Landing from './pages/landing/Landing'; 
import { LoginPage } from './pages/LoginPage'; 
import ResourceListPage from './pages/ResourceListPage'; 
import ResourceDetailPage from './pages/ResourceDetailPage'; 
import ProtectedRoute from './ProtectedRoute'; 

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
        path: '/resources',
        element: (
          <ProtectedRoute>
            <ResourceListPage /> 
          </ProtectedRoute>
        ),
      },
      {
        path: '/resources/:id',
        element: (
          <ProtectedRoute>
            <ResourceDetailPage /> 
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
