import React, { Component } from "react";
import PropTypes from "prop-types";
import Feed from "./Feed";
import UserFeed from "./UserFeed";

import Container from "react-bootstrap/Container";

export class HomePage extends Component {
  render() {
    return (
      <Container>
        {this.props.toggle ? <UserFeed /> : <Feed />}
      </Container>
    );
  }
}

HomePage.propTypes = {
  toggle: PropTypes.bool.isRequired,
};

export default HomePage;
