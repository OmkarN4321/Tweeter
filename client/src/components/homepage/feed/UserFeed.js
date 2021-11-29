import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { deletePost, addComment } from "../../../actions/postActions";
import { connect } from "react-redux";

import PostModal from "./PostModal";
import PostCard from "./post/PostCard";

import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";

class UserFeed extends Component {
  state = {
    user: this.props.user,
    uid: null,
  };

  onDelete = (id) => {
    this.props.deletePost(id);
  };

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

  onSubmit = (id, comment) => {
    const newComment = {
      user: this.props.user.name,
      comment: comment,
    };

    this.props.addComment(id, newComment);
  };

  render() {
    console.log(this.props.posts.posts);
    const { posts } = this.props.posts;
    const userPosts = posts.filter(
      (post) => post.user === this.state.user.name
    );

    return (
      <Container>
        <p className="display-5 text-white">{this.state.user.name}'s posts</p>
        <PostModal />
        <ListGroup>
          {userPosts.map(
            ({ _id, head, body, date, user, comments, fileId }) => (
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
                button={true}
              />
            )
          )}
        </ListGroup>
      </Container>
    );
  }
}

UserFeed.propTypes = {
  posts: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  posts: state.posts,
  user: state.auth.user,
});

export default connect(mapStateToProps, { deletePost, addComment })(UserFeed);
