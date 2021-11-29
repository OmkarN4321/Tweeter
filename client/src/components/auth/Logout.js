import React, { Component, Fragment } from "react";
import { NavLink } from "reactstrap";
import PropTypes from "prop-types";
import { logout } from "../../actions/authActions";
import { connect } from "react-redux";

class Logout extends Component {
  render() {
    return (
      <Fragment>
        <NavLink onClick={this.props.logout} >Logout</NavLink>
      </Fragment>
    );
  }

}

Logout.propTypes ={
  logout: PropTypes.func.isRequired
}

export default connect(null, { logout })(Logout);
