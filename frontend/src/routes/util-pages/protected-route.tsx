import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { TokenManager } from '../../utils/token-manager';
import { Sidebar } from '../../components/sidebar/sidebar';

type Props = {
  children: ReactNode;
};

export const ProtectedRoute: React.FC<Props> = ({ children }) => {
  if (!TokenManager.getAccessToken()) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Sidebar />
      <div id="detail">{children}</div>
    </>
  );
};
