import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import ClaimsListPage from './pages/ClaimsListPage';
import Authentication from './pages/Authentication';
import NotFoundPage from './pages/NotFound/NotFoundPage';
import { AuthTypes } from './interfaces/common';
import Protected from './ReusableComps/Protected';
import ContactUsPage from './pages/ContactUsPage';
import NewClaimPage from './pages/NewClaimPage';
import PaymentConfirmation from './components/Stripe/PaymentConfirmation';
import CriticalInfoPage from './pages/CriticalInfoPage';
import ProfilePage from './pages/ProfilePage';
import { ForgotPassword } from './components/ForgotPassword/ForgotPassword';
import { SignInForm } from './components/SignInForm/SignInForm';
import ResetPasswordForm from './components/ForgotPassword/ResetPasswordForm';

const Router = () => (
    <Routes>
      <Route path={paths.home} element={<HomePage />} />
      <Route path={paths.profile} element={<ProfilePage />} />
      <Route path={paths.claimsList} element={<Protected element={<ClaimsListPage />} />} />
      <Route path={paths.claimsDetails} element={<Protected element={<NewClaimPage />} />} />
      <Route path={paths.claimPayment} element={<Protected element={<PaymentConfirmation />} />} />
      <Route path={paths.criticalInfo} element={<Protected element={<CriticalInfoPage />} />} />
      <Route
        path={paths.claimPaymentConfirmation}
        element={<Protected element={<PaymentConfirmation />} />}
      />
      <Route path={paths.signIn} element={<SignInForm />} />
      <Route path={paths.confirm} element={<Authentication authType={paths.confirm} />} />
      <Route path={paths.register} element={<Authentication authType={paths.register} />} />
      <Route path={paths.forgot_pwd} element={<ForgotPassword />} />
      <Route path={paths.reset_pwd} element={<ResetPasswordForm />} />
      <Route path={paths.contactUs} element={<ContactUsPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );

export const paths = {
  home: '/',
  profile: '/profile',
  claimsList: '/claims',
  claimsDetails: '/claims/:claimId',
  claimPayment: '/claims/:claimId/payment',
  claimPaymentConfirmation: '/claims/:claimId/:transactionId',
  criticalInfo: '/claims/:claimId/additional',
  signIn: '/login' as AuthTypes,
  register: '/register' as AuthTypes,
  forgot_pwd: '/forgot-password',
  reset_pwd: '/reset-password',
  confirm: '/verify/:email/:token' as AuthTypes,
  contactUs: '/contact-us',
  api_newToken: '/auth/token',
};

export default Router;
