import TransitionComp from '@/ReusableComps/TransitionComp';
import HeroSection from './HeroSection/HeroSection';
import { FaqWithImage } from '@/components/FaqWithImage/FaqWithImage';
import { Container } from '@mantine/core';
import { useEffect, useState } from 'react';

const HomePage = () => {

  return <Container size={'xl'}>
    <TransitionComp transition='slide-left'>
      <HeroSection />
    </TransitionComp>
    <FaqWithImage />
  </Container>
};

export default HomePage;
