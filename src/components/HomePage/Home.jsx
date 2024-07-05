import React, { lazy } from 'react';
import MiddleBlockContent from './content/MiddleBlockContent.json';
import { MissionContent } from './content/MissionContent.jsx';
// import { verifyEmail } from '../actions/authActions';

const ContentBlock = lazy(() => import('./ContentBlock/index.jsx'));
const ScrollToTop = lazy(() => import('./common/ScrollToTop'));
const Container = lazy(() => import('./common/Container'));

const Home = () => (
  <Container>
    <ScrollToTop />
    <ContentBlock
      type="left"
      title={MiddleBlockContent.title}
      content={MiddleBlockContent.text}
      titleColor={MiddleBlockContent.titleColor}
      textColor={MiddleBlockContent.textColor}
      icon="./assets/img/about.svg"
      id="about"
    />
    <ContentBlock
      type="right"
      titleColor={MissionContent.titleColor}
      textColor={MissionContent.textColor}
      title={MissionContent.title}
      content={MissionContent.text}
      icon="./assets/img/mission.svg"
      id="mission"
    />
  </Container>
);

export default Home;
