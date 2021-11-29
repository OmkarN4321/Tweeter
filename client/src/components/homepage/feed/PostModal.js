import React, { Component } from "react";
import PropTypes from "prop-types";
import { addPost } from "../../../actions/postActions";
import { connect } from "react-redux";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class PostModal extends Component {
  state = {
    head: "",
    body: "",
    file: null,
    comments: [],
    isOpen: false,
  };

  onToggle = () =>
    this.setState({
      isOpen: !this.state.isOpen,
    });

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onChangeFile = (e) => this.setState({ [e.target.name]: e.target.files[0] });

  onSubmit = (e) => {
    e.preventDefault();

    const newPost = new FormData();

    newPost.append("head", this.state.head);
    newPost.append("body", this.state.body);
    newPost.append("user", this.props.user.name);
    newPost.append("comments", this.state.comments);
    newPost.append("file", this.state.file);

    this.props.addPost(newPost);
  };

  render() {
    return (
      <div>

        {this.props.isAuthenticated ? (
          <Button variant="secondary" className=" mt-2 mb-4" onClick={this.onToggle}>
            Post
          </Button>
        ) : null}

        <Modal show={this.state.isOpen} onHide={this.onToggle}>
          <Modal.Header closeButton>
            <Modal.Title>Post something..</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form encType="multipart/form-data">
              <Form.Group className="mb-3" controlId="Post title">
              <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="head"
                  onChange={this.onChange}
                  placeholder="Title goes here"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="Post Body">
              <Form.Label>Post body</Form.Label>
                <Form.Control
                  type="text"
                  name="body"
                  onChange={this.onChange}
                  placeholder="Rant about something"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="File">
              <Form.Label>Attach Image</Form.Label>
                <Form.Control
                  type="file"
                  name="file"
                  onChange={this.onChangeFile}
                  placeholder="Upload image"
                />
              </Form.Group>
              <Button
                variant="success"
                className="mt-2"
                onClick={this.onSubmit}
              >
                Post 
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

      </div>
    );
  }
}

PostModal.propTypes = {
  posts: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  addPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  posts: state.posts,
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { addPost })(PostModal);
