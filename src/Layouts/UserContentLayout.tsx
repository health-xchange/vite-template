import { ReactNode } from 'react';

interface UserPageLayoutProps {
  children: ReactNode;
}

const UserPageLayout: React.FC<UserPageLayoutProps> = ({ children }) => (
  <div style={{ paddingTop: 140 }}>
    {children}
  </div>
);

export default UserPageLayout;
