import React from 'react';
import { Navigate } from 'react-router-dom';
import { useLogin } from '@/state/hooks';
import { paths } from '@/Router';

const Protected: React.FC<{ element: React.ReactNode }> = ({ element }) => {
  const { isLoggedIn } = useLogin();

  return (
    <>
      {isLoggedIn ? (
        element
      ) : (
        <Navigate to={paths.signIn} replace /> // Navigate to signin if not logged in
      )}
    </>
  );
};

export default Protected;
