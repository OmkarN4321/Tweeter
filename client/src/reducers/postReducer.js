import {
  GET_POSTS,
  ADD_POST,
  DELETE_POST,
  ITEMS_LOADING,
} from "../actions/types";

const initialState = {
  posts: [],
  loading: false,
};

const main = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS: {
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    }
    case DELETE_POST: {
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    }
    case ADD_POST: {
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    }
    case ITEMS_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    default:
      return state;
  }
};

export default main;
