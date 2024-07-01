import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import ClaimsListPage from './pages/ClaimsListPage';
import NotFoundPage from './pages/NotFound/NotFoundPage';
import Protected from './ReusableComps/Protected';
import ContactUsPage from './pages/ContactUsPage';
import NewClaimPage from './pages/NewClaimPage';
import PaymentConfirmation from './components/Stripe/PaymentConfirmation';
import CriticalInfoPage from './pages/CriticalInfoPage';
import ProfilePage from './pages/ProfilePage';
import { ForgotPassword } from './components/ForgotPassword/ForgotPassword';
import { SignInForm } from './components/SignInForm/SignInForm';
import ResetPasswordForm from './components/ForgotPassword/ResetPasswordForm';
import { RegistrationForm } from './components/AuthenticationForm/AuthenticationForm';
import LegalNotice from './pages/LegalNotice';

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
      {/* <Route path={paths.confirm} element={<Authentication authType={paths.confirm} />} /> */}
      <Route path={paths.register} element={<RegistrationForm />} />
      <Route path={paths.forgot_pwd} element={<ForgotPassword />} />
      <Route path={paths.reset_pwd} element={<ResetPasswordForm />} />
      <Route path={paths.contactUs} element={<ContactUsPage />} />
      <Route path={paths.legalNotice} element={<LegalNotice />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );

export const paths = {
  home: '/',
  profile: '/profile',
  legalNotice: '/legal-notice',
  claimsList: '/claims',
  claimsDetails: '/claims/:claimId',
  claimPayment: '/claims/:claimId/payment',
  claimPaymentConfirmation: '/claims/:claimId/:transactionId',
  criticalInfo: '/claims/:claimId/additional',
  signIn: '/login',
  register: '/register',
  forgot_pwd: '/forgot-password',
  reset_pwd: '/reset-password',
  confirm: '/verify/:email/:token',
  contactUs: '/contact-us',
  api_newToken: '/auth/token',
};

export default Router;
