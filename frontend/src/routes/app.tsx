import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from '../components/sidebar/sidebar';
import { ProjectList } from '../components/project-list/project-list';

export const App = () => {
  const location = useLocation();

  const isHomeRoute = location.pathname === '/';

  return <>{isHomeRoute && <ProjectList />}</>;
};
