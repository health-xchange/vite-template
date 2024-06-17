import TransitionComp from '@/ReusableComps/TransitionComp';
import HeroSection from './HeroSection/HeroSection';
import { FaqWithImage } from '@/components/FaqWithImage/FaqWithImage';
import { Container } from '@mantine/core';
import classes from './HeroSection/HeroSection.module.css';
import { useEffect, useState } from 'react';
import introImage from './HeroSection/intro.svg';
import missionImage from './HeroSection/mission.svg';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {

  const navigate = useNavigate();

  const introHero = {
    title: <>Fight your unfair insurance denials for <span className={classes.highlight}>just $25</span></>,
    description: <>At BlueGuard AI, we’re dedicated to fighting for your medical insurance claims at a price you
      can afford. For just $25, our expert case managers, backed by powerful AI, steps into the ring to
      challenge unjust claim denials on your behalf!</>,
    image: introImage,
    actionButton: {
      label: 'Sign Up',
      onClick: () => navigate('/register')
    }
  };

  return <Container size={'xl'}>
    <TransitionComp transition='slide-left'>
      <HeroSection {...introHero} />
    </TransitionComp>
    <FaqWithImage />
  </Container>
};

export default HomePage;
