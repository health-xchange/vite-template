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
import PaymentConfirmation from './components/Stripe/PaymentConfirmation';
import AdditionalInfoPage from './pages/AdditionalInfoPage';

const Router = () => {
  return (
    <Routes>
      <Route path={paths.home} element={<HomePage />} />
      <Route path={paths.claimsList} element={<Protected element={<ClaimsListPage />} />} />
      <Route path={paths.claimsDetails} element={<Protected element={<NewClaimPage />} />} />
      <Route path={paths.additionalInfo} element={<Protected element={<AdditionalInfoPage />} />} />
      <Route
        path={paths.claimPaymentConfirmation}
        element={<Protected element={<PaymentConfirmation />} />}
      />
      <Route path={paths.signIn} element={<Authentication authType={paths.signIn} />} />
      <Route path={paths.confirm} element={<Authentication authType={paths.confirm} />} />
      <Route path={paths.register} element={<Authentication authType={paths.register} />} />
      <Route path={paths.contactUs} element={<ContactUsPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export const paths = {
  home: '/',
  claimsList: '/claims',
  claimsDetails: '/claims/:claimId',
  claimPaymentConfirmation: '/claims/:claimId/:transactionId',
  additionalInfo: '/claims/:claimId/additional',
  signIn: '/login' as AuthTypes,
  register: '/register' as AuthTypes,
  confirm: '/verify/:email/:token' as AuthTypes,
  contactUs: '/contact-us',
  api_newToken: '/auth/token',
};

export default Router;
