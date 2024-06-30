import { useRecoilState } from 'recoil';
import { Container } from '@mantine/core';
import ProfileCard from '@/components/ProfileCard/ProfileCard';
import { atomAuthState } from '@/state/atoms';

export default function ProfilePage() {
  const [loginState] = useRecoilState(atomAuthState);
  const { userInfo } = loginState;
  return <Container size="sm">
    {userInfo ?
      <ProfileCard user={userInfo} /> :
      <div>Loading...</div>
    }
         </Container>;
}
