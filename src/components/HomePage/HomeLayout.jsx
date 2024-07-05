import React, { lazy } from 'react';
import '../../../assets/plugins/nucleo/css/nucleo.css';
// reactstrap components
import { Container, Row } from 'reactstrap';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../../assets/css/argon-dashboard-react.min.css';

// import { useLocation } from 'react-router-dom';
import { Styles } from './styles.js';

// core components
// import AuthNavbar from './AuthNavbar.jsx';
import AuthFooter from './AuthFooter.jsx';

import IntroContent from './content/IntroContent.json';
// import WhitePaperContent from './content/WhitePaper.json';
import { FaqContent } from './content/FqaContent.js';
import Home from './Home.jsx';
// import AuthNavbar from './AuthNavbar.jsx';

const ContentBlock = lazy(() =>
  import('./ContentBlock/index.jsx')
);
const MiddleBlock = lazy(() =>
  import('./MiddleBlock/index.jsx')
);

const HomeLayout = (props) => {
  const mainContent = React.useRef(null);
  // const location = useLocation();

  // React.useEffect(() => {
  //   document.body.classList.add('bg-white');
  //   return () => {
  //     document.body.classList.remove('bg-white');
  //   };
  // }, []);

  // React.useEffect(() => {
  //   document.documentElement.scrollTop = 0;
  //   document.scrollingElement.scrollTop = 0;
  //   mainContent.current.scrollTop = 0;
  // }, [location]);

  return (
    <>
      <div className="main-content" ref={mainContent}>
        <Styles />
        {/* <AuthNavbar /> */}
        <Container>
          <ContentBlock
            style={{ paddingTop: '1rem' }}
            type="right"
            note={IntroContent.note}
            title={IntroContent.title}
            content={IntroContent.text}
            button={IntroContent.button}
            icon="/assets/intro.svg"
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
              <polygon
                points="2560 0 2560 600 400 0"
                className="fill-white"
              >
              </polygon>
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
          {/* <ContentBlock
            type="right"
            title={WhitePaperContent.title}
            content={WhitePaperContent.text}
            button={WhitePaperContent.button}
            icon="cdd368_a0b534c4b24a4b849d9bfa1a178150a6~mv2.webp"
            id="whitepaper"
          /> */}
          <MiddleBlock
            title={FaqContent.title}
            content={FaqContent.text}
            accordion={FaqContent.accordion}
          />
        </Container>
        {/* Page content */}
      </div>
      <AuthFooter />
    </>
  );
};

export default HomeLayout;
