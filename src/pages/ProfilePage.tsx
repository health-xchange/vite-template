import ProfileCard from '@/components/ProfileCard/ProfileCard';
import { useRecoilState } from 'recoil';
import { atomAuthState } from '@/state/atoms';
import { Container } from '@mantine/core';

export default function ProfilePage() {
  const [loginState] = useRecoilState(atomAuthState);
  const { userInfo } = loginState;
  return <Container size={'sm'}>
    {userInfo ?
      <ProfileCard user={userInfo} /> :
      <div>Loading...</div>
    }
  </Container>
}
