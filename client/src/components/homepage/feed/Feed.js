import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { getPosts, addComment } from "../../../actions/postActions";
import { connect } from "react-redux";

import PostModal from "./PostModal";
import PostCard from "./post/PostCard";

import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";

class Feed extends Component {
  state = {
    uid: null,
  };

  componentDidMount() {
    this.props.getPosts();
  }

  onToggle = (id) => {
    if (this.state.uid === id) {
      this.setState({
        uid: "",
      });
    } else {
      this.setState({
        uid: id,
      });
    }
  };

  onDelete = (id) => {
    this.props.deletePost(id);
  };

  onSubmit = (id, comment) => {
    const newComment = {
      user: this.props.user.name,
      comment: comment,
    };

    this.props.addComment(id, newComment);
  };

  render() {
    const { posts } = this.props.posts;
    return (
      <Container>
        {!this.props.isAuthenticated ? (
          <p className="fs-5 text-white">
            Login in order to post posts and comment
          </p>
        ) : null}

        <PostModal />
        <ListGroup>
          {posts.map(({ _id, head, body, date, user, comments, fileId }) => (
            <PostCard
              user={user}
              head={head}
              body={body}
              comments={comments}
              id={_id}
              fileId={fileId}
              date={date}
              uid={this.state.uid}
              onToggle={this.onToggle}
              onDelete={this.onDelete}
              onSubmit={this.onSubmit}
              key={_id}
              button={false}
            />
          ))}
        </ListGroup>
      </Container>
    );
  }
}

Feed.propTypes = {
  getPosts: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  posts: state.posts,
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getPosts, addComment })(Feed);
