import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ClaimsListPage from './pages/ClaimsListPage';
import Authentication from './pages/Authentication';
import NotFoundPage from './pages/NotFound/NotFoundPage';
import { AuthTypes } from './interfaces/common';
import Protected from './ReusableComps/Protected';
import ContactUsPage from './pages/ContactUsPage';
import NewClaimPage from './pages/NewClaimPage';

const Router = () => (
  <Routes>
    <Route path={paths.home} element={<HomePage />} />
    <Route path={paths.claimsList} element={<Protected element={<ClaimsListPage />} />} />
    <Route path={paths.newClaim} element={<Protected element={<NewClaimPage />} />} />
    <Route path={paths.signIn} element={<Authentication authType={paths.signIn} />} />
    <Route path={paths.confirm} element={<Authentication authType={paths.confirm} />} />
    <Route
      path={paths.register}
      element={<Authentication authType={paths.register} />}
    />
    <Route path={paths.contactUs} element={<ContactUsPage />} />

    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export const paths = {
  home: '/',
  claimsList: '/claims',
  newClaim: '/claims/new',
  signIn: '/login' as AuthTypes,
  register: '/register' as AuthTypes,
  confirm: '/confirm/:email/:token' as AuthTypes,
  contactUs: '/contact-us',
};

export default Router;
