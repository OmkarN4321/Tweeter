import React, { Component } from "react";
import PropTypes from "prop-types";
import { addComment } from "../../../../actions/postActions";
import { connect } from "react-redux";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class CommentModal extends Component {
  state = {
    isOpen: false,
    comment: "",
  };

  onToggle = () =>
    this.setState({
      isOpen: !this.state.isOpen,
    });

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();

    const newComment = {
      user: this.props.user.name,
      comment: this.state.comment,
    };

    this.props.addComment(this.props.id, newComment);

    this.onToggle();
  };

  render() {
    return (
      <div>

        <Button variant="secondary" size="sm" onClick={this.onToggle}>
          Comment
        </Button>

        <Modal show={this.state.isOpen} onHide={this.onToggle}>
          <Modal.Header closeButton>
            <Modal.Title>Comment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="Comment">
                <Form.Control
                  type="text"
                  name="comment"
                  onChange={this.onChange}
                />
              </Form.Group>
              <Button
                variant="success"
                className="mt-2"
                size="sm"
                onClick={this.onSubmit}
              >
                Post comment
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
        
      </div>
    );
  }
}

CommentModal.propTypes = {
  addComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { addComment })(CommentModal);
