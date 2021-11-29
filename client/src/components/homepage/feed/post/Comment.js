import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardSubtitle,
} from "reactstrap";
import PropTypes from "prop-types";


export class Comment extends Component {
  render() {
    const { comments} = this.props;

    return (
      <div>
        {comments.length !== 0
          ? comments.map((comment) => (
              <Card key={comment.body} color="dark" inverse>
                <CardBody>
                  <CardSubtitle>
                    {comment.user}: {comment.body}
                  </CardSubtitle>
                </CardBody>
              </Card>
            ))
          : null}
      </div>
    );
  }
}

Comment.propTypes = {
  comments: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default Comment;
