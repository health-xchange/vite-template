import React, { lazy } from 'react';
import { Container, Row } from 'reactstrap';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../../assets/css/argon-dashboard-react.min.scss';
import { Styles } from './styles.js';
import AuthFooter from './AuthFooter.jsx';
import IntroContent from './content/IntroContent.json';
import { FaqContent } from './content/FqaContent.js';
import Home from './Home.jsx';

const ContentBlock = lazy(() => import('./ContentBlock/index.jsx'));
const MiddleBlock = lazy(() => import('./MiddleBlock/index.jsx'));

const HomeLayout = () => {
  const mainContent = React.useRef(null);

  return (
    <>
      <div id="home-layout-content" className="main-content" ref={mainContent}>
        <Styles />
        <Container>
          <ContentBlock
            style={{ paddingTop: '1rem' }}
            type="right"
            note={IntroContent.note}
            title={IntroContent.title}
            content={IntroContent.text}
            button={IntroContent.button}
            icon="/assets/img/intro.svg"
            id="intro"
          />
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
              <Home />
            </Row>
          </Container>
          <div className="separator separator-bottom zindex-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon className="fill-white" points="2560 0 2560 100 0 100" />
            </svg>
          </div>
        </div>
        <Container>
          <MiddleBlock
            title={FaqContent.title}
            content={FaqContent.text}
            accordion={FaqContent.accordion}
          />
        </Container>
      </div>
      <AuthFooter />
    </>
  );
};

export default HomeLayout;
