import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ClaimsListPage from './pages/ClaimsListPage';
import NewClaimPage from './pages/NewClaimPage';
import Authentication from './pages/Authentication';
import NotFoundPage from './pages/NotFoundPage';
import { AuthTypes } from './interfaces/common';

const Router = () => (
  <Routes>
    <Route path={paths.home} element={<HomePage />} />
    <Route path={paths.claimsList} element={<ClaimsListPage />} />
    <Route path={paths.newClaim} element={<NewClaimPage />} />
    <Route path={paths.signIn} element={<Authentication authType={paths.signIn} />} />
    <Route
      path={paths.register}
      element={<Authentication authType={paths.register} />}
    />

    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export const paths = {
  home: '/',
  claimsList: '/claims',
  newClaim: '/claims/new',
  signIn: '/login' as AuthTypes,
  register: '/register' as AuthTypes,
};

export default Router;
