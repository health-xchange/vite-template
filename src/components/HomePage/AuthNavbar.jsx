import { Link } from 'react-router-dom';
// reactstrap components
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from 'reactstrap';
// eslint-disable-next-line import/no-cycle
import { paths } from '../../Router';

const AuthNavbar = () => (
  // const { auth = {}, dispatchSignOut } = useAuth();
  <>
    <Navbar className="navbar-top navbar-horizontal navbar-dark" expand="md">
      <Container className="px-4">
        <NavbarBrand to="/" tag={Link}>
          <img alt="..." src="./assets/healthxchange.webp" />
        </NavbarBrand>
        <button
          type="button"
          className="navbar-toggler"
          id="navbar-collapse-main"
          style={{ background: '#18216d' }}
        >
          <span className="navbar-toggler-icon" />
        </button>
        <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
          <div className="navbar-collapse-header d-md-none">
            <Row>
              <Col className="collapse-brand" xs="6">
                <Link to="/">
                  <img alt="..." src="./assets/healthxchange.webp" />
                </Link>
              </Col>
              <Col className="collapse-close" xs="6">
                <button type="button" className="navbar-toggler" id="navbar-collapse-main">
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink
                className="nav-link-icon"
                style={{ color: 'rgb(24, 33, 109)' }}
                to={paths.legalNotice}
                tag={Link}
              >
                <span className="nav-link-inner--text font-weight-bold">Security & Privacy </span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className="nav-link-icon"
                style={{ color: 'rgb(24, 33, 109)' }}
                to={paths.signIn}
                tag={Link}
              >
                <i className="ni ni-key-25" />
                <span className="nav-link-inner--text font-weight-bold">Login</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className="nav-link-icon"
                style={{ color: 'rgb(24, 33, 109)' }}
                to={paths.register}
                tag={Link}
              >
                <i className="ni ni-circle-08" />
                <span className="nav-link-inner--text font-weight-bold">Register</span>
              </NavLink>
            </NavItem>
          </Nav>
        </UncontrolledCollapse>
      </Container>
    </Navbar>
  </>
);
export default AuthNavbar;
