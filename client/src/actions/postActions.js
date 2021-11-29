import { GET_POSTS, ADD_POST, DELETE_POST, ITEMS_LOADING,} from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";
import axios from "axios";

export const getPosts = () => (dispatch) => {
  dispatch(itemsLoading());
  axios
    .get("/api/posts")
    .then((res) =>
      dispatch({
        type: GET_POSTS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deletePost = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/posts/${id}`, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: DELETE_POST,
        payload: id,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addPost = (post) => (dispatch, getState) => {
  axios
    .post("/api/posts", post, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: ADD_POST,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addComment = (id, comment) => (dispatch, getState) => {
  axios
    .put(`/api/posts/${id}`, comment, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const itemsLoading = () => ({
  type: ITEMS_LOADING,
});
