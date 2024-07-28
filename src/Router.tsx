import { Routes, Route } from 'react-router-dom';
import HomeLayout from './components/HomePage/HomeLayout';
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
import PublicOnly from './ReusableComps/PublicOnly.js';
import { AdminLayout } from './AdminDashboard/AdminLayout';
import UserPageLayout from './Layouts/UserContentLayout';

const Router = () => (
  <Routes>
    <Route path={paths.profile} element={<UserPageLayout><ProfilePage /></UserPageLayout>} />
    <Route path={paths.claimsList} element={<UserPageLayout><Protected element={<ClaimsListPage />} /></UserPageLayout>} />
    <Route path={paths.claimsDetails} element={<UserPageLayout><Protected element={<NewClaimPage />} /></UserPageLayout>} />
    <Route path={paths.claimPayment} element={<UserPageLayout><Protected element={<PaymentConfirmation />} /></UserPageLayout>} />
    <Route path={paths.criticalInfo} element={<UserPageLayout><Protected element={<CriticalInfoPage />} /></UserPageLayout>} />
    <Route
      path={paths.claimPaymentConfirmation}
      element={<UserPageLayout><Protected element={<PaymentConfirmation />} /></UserPageLayout>}
    />
    <Route path={paths.signIn} element={<UserPageLayout><SignInForm type="signin" /></UserPageLayout>} />
    <Route path={paths.confirm} element={<UserPageLayout><SignInForm type="verify" /></UserPageLayout>} />
    <Route path={paths.register} element={<UserPageLayout><RegistrationForm /></UserPageLayout>} />
    <Route path={paths.forgot_pwd} element={<UserPageLayout><ForgotPassword /></UserPageLayout>} />
    <Route path={paths.reset_pwd} element={<UserPageLayout><ResetPasswordForm /></UserPageLayout>} />
    <Route path={paths.contactUs} element={<UserPageLayout><ContactUsPage /></UserPageLayout>} />
    <Route path={paths.legalNotice} element={<UserPageLayout><LegalNotice /></UserPageLayout>} />
    <Route path={paths.home} element={<UserPageLayout><PublicOnly element={<HomeLayout />} /></UserPageLayout>} />
    <Route path={paths.admin} element={<Protected element={<AdminLayout />} />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export const paths = {
  home: '/',
  admin: '/admin',
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
