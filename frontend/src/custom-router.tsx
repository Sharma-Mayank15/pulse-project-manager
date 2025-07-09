import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { ErrorPage, Project, Profile, App } from './routes';
import { LoginPage } from './routes/sign-in/login';
import { ProtectedRoute } from './routes/util-pages/protected-route';
import { LogoutPage } from './routes/sign-in/logout';
import { RegisterPage } from './routes/sign-in/register';

export const customRouter = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '/projects/:projectId',
    element: (
      <ProtectedRoute>
        <Project />
      </ProtectedRoute>
    ),
  },
  {
    path: '/users',
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/logout',
    element: <LogoutPage />,
  },
]);
