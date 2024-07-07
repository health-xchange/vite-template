import React, { lazy } from 'react';
import { Container, Row } from 'reactstrap';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../../assets/css/argon-dashboard-react.min.scss';
import { Styles } from './styles.js';
import AuthFooter from './AuthFooter.jsx';
import IntroContent from './content/IntroContent.json';
import { FaqWithImage } from '../FaqWithImage/FaqWithImage.jsx';
import { OurHistory } from '../OurHistory/OurHistory.jsx';
import { MissionContent } from './content/MissionContent.jsx';
import introImage from './common/img/intro.svg';
import missionImage from './common/img/mission.svg';

const ContentBlock = lazy(() => import('./ContentBlock/index.jsx'));

const HomeLayout = () => {
  const mainContent = React.useRef(null);

  return (
    <>
      <div
        id="home-layout-content"
        className="main-content"
        ref={mainContent}
        style={{
          marginTop: -80,
        }}
      >
        <Styles />
        <div className="header bg-gradient-info">
          <Container>
            <ContentBlock
              style={{ paddingTop: '3rem', paddingBottom: '3rem' }}
              type="right"
              titleColor="text-white"
              textColor="text-white"
              note={IntroContent.note}
              title={IntroContent.title}
              content={IntroContent.text}
              button={IntroContent.button}
              icon={introImage}
              id="intro"
            />
          </Container>
        </div>
        <Container>
          <div style={{ padding: '8rem 0' }}>
            <OurHistory />
          </div>
        </Container>
        <div className="header bg-gradient-info py-7 py-lg-8">
          <div className="separator separator-top zindex-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon points="2560 0 2560 600 400 0" className="fill-white"></polygon>
            </svg>
          </div>
          <Container className="mt--8 pb-5">
            <Row className="justify-content-center">
              <ContentBlock
                type="left"
                title={MissionContent.title}
                content={MissionContent.text}
                titleColor={MissionContent.titleColor}
                textColor={MissionContent.textColor}
                icon={missionImage}
                id="mission"
              />
            </Row>
          </Container>
          <div className="separator separator-bottom zindex-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 -1 2560 100"
              x="0"
              y="0"
            >
              <polygon className="fill-white" points="2560 0 2560 100 0 100" />
            </svg>
          </div>
        </div>
      </div>
      <Container>
        <FaqWithImage />
      </Container>
      <AuthFooter />
    </>
  );
};

export default HomeLayout;
