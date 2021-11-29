import React, { Component } from "react";
import PropTypes from "prop-types";
import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import { connect } from "react-redux";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

class LoginModal extends Component {
  state = {
    isOpen: false,
    email: "",
    password: "",
    msg: null,
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;

    if (error !== prevProps.error) {
      if (error.id === "LOGIN_FAILED") {
        this.setState({
          msg: error.msg.msg,
        });
      } else {
        this.setState({
          msg: null,
        });
      }
    }

    if (this.state.isOpen) {
      if (isAuthenticated) {
        this.onToggle();
      }
    }
  }

  onToggle = () => {
    this.props.clearErrors();
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();

    const { email, password } = this.state;

    const user = {
      email,
      password,
    };

    this.props.login(user);
  };

  render() {
    return (
      <div>
        <Button variant="secondary" className="mx-2" size="sm" onClick={this.onToggle}>
          Login
        </Button>

        <Modal show={this.state.isOpen} onHide={this.onToggle}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.msg ? (
              <Alert variant="danger">
              {this.state.msg}
            </Alert>
            ) : null}
            <Form encType="multipart/form-data">
              <Form.Group className="mb-3" controlId="Email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  onChange={this.onChange}
                  placeholder="Email"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="Password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  onChange={this.onChange}
                  placeholder="Password"
                />
              </Form.Group>
              <Button
                variant="success"
                className="mt-2"
                onClick={this.onSubmit}
              >
                Login
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

LoginModal.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object,
  login: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { login, clearErrors })(LoginModal);
