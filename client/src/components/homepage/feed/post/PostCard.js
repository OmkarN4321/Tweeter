import React, { Component } from "react";
import { PropTypes } from "prop-types";
import Comment from "./Comment";
import CommentModal from "./CommentModal";
import moment from "moment";
import { connect } from "react-redux";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export class PostCard extends Component {
  render() {
    const { comments, id, head, body, user, date, uid, button, fileId } =
      this.props;

    return (
      <Card bg="dark" text="white" className="mb-3 shadow ">
        {button ? (
          <Button
            variant="dark"
            size="sm"
            className="remove-btn ms-auto "
            onClick={() => {
              this.props.onDelete(id);
            }}
          >
            &times;
          </Button>
        ) : null}

        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted">
            Posted by {user}&nbsp;
            {moment(date).fromNow()}
          </Card.Subtitle>
          <Card.Title>{head}</Card.Title>

          <Card.Text>{body}</Card.Text>
          {fileId ? (
            <a href={`http://localhost:5000/api/posts/images/${fileId}`}>
              <Card.Img
                src={`http://localhost:5000/api/posts/images/${fileId}`}
                width="100%"
                className="border border-1 rounded-3 my-4 border-secondary"
              />
            </a>
          ) : null}
          {this.props.isAuthenticated ? <CommentModal id={id} /> : null}
        </Card.Body>
        <Button
          variant="dark"
          size="sm"
          onClick={() => {
            this.props.onToggle(id);
          }}
          className="text-muted"
        >
          Comments
        </Button>
        {uid === id ? (
          <Comment comments={comments} onSubmit={this.props.onSubmit} id={id} />
        ) : null}
      </Card>
    );
  }
}

PostCard.propTypes = {
  user: PropTypes.string.isRequired,
  head: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  button: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, null)(PostCard);
