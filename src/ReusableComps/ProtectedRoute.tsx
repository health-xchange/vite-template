import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useLogin } from '@/state/hooks';

interface ProtectedRouteProps {
  path: string;
  element: React.ReactNode | null;
  isProtected?: boolean; // Optional protected prop
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  path,
  element,
  isProtected = true, // Set a default value for protected prop
}) => {
  const { isLoggedIn } = useLogin();

  return (
    <Route
      path={path}
      element={
        isProtected && !isLoggedIn ? (
          <Navigate to="/signin" replace />
        ) : (
          element
        )
      }
    />
  );
};

export default ProtectedRoute;
