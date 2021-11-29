import React, { Component, Fragment } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
} from "reactstrap";
import PropTypes from 'prop-types'
import RegisterModal from "../../auth/RegisterModal";
import Logout from "../../auth/Logout";
import LoginModal from "../../auth/LoginModal";
import { connect } from "react-redux";

class AppNavbar extends Component {
  state = {
    isOpen: false,
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    const { isAuthenticated, user } = this.props;

    const authLinks = (
      <Fragment>
        <NavItem >
          <NavLink onClick={this.props.toggleFeed}>
            <strong>{user ? `Welcome ${user.name}` : ""}</strong>
          </NavLink>
        </NavItem>
        <NavItem>
          <Logout />
        </NavItem>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <NavItem>
          <RegisterModal />
        </NavItem>
        <NavItem>
          <LoginModal />
        </NavItem>
      </Fragment>
    );

    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-4 shadow" >
          <Container>
            <NavbarBrand href="/" className="fs-3">Tweeter</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} onClick={this.toggle} navbar>
              <Nav className="ms-auto" navbar>
                {isAuthenticated ? authLinks : guestLinks}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

AppNavbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  toggleFeed: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, null)(AppNavbar);
