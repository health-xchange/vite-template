import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { FeaturesCards } from '@/components/FeaturesCards/FeaturesCards';
import { FooterLinks } from '@/components/FooterLinks/FooterLinks';

export default function HomePage() {
  return (
    <>
      <Welcome />
      <ColorSchemeToggle />
      <FeaturesCards />
      <FooterLinks />
    </>
  );
}
