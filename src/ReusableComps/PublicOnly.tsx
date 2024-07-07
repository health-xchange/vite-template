import React from 'react';
import { Navigate } from 'react-router-dom';
import { useLogin } from '@/state/hooks';
import { paths } from '@/Router';

const PublicOnly: React.FC<{ element: React.ReactNode }> = ({ element }) => {
  const { isLoggedIn } = useLogin();

  return (
    <>
      {isLoggedIn ? (
        <Navigate to={paths.claimsList} replace />
      ) : (
        element
      )}
    </>
  );
};

export default PublicOnly;
