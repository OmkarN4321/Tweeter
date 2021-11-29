import {
  USER_LOADING,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGOUT_SUCCESS,
  AUTH_ERROR,
} from "../actions/types";
import axios from "axios";
import { returnErrors } from "./errorActions";

//Check token and load user
export const loadUser = () => (dispatch, getState) => {
  //set User loading
  dispatch({ type: USER_LOADING });

  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then((user) =>
      dispatch({
        type: USER_LOADED,
        payload: user.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

export const registerUser =
  ({ name, email, password }) =>
  (dispatch) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const body = JSON.stringify({ name, email, password });

    axios
      .post("/api/users", body, config)
      .then((user) =>
        dispatch({
          type: REGISTER_SUCCESS,
          payload: user.data,
        })
      )
      .catch((err) => {
        dispatch(
          returnErrors(
            err.response.data,
            err.response.status,
            "REGISTER_FAILED"
          )
        );
        dispatch({
          type: REGISTER_FAILED,
        });
      });
  };

export const login =
  ({ email, password }) =>
  (dispatch) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const body = JSON.stringify({ email, password });

    axios
      .post("/api/auth", body, config)
      .then((user) =>
        dispatch({
          type: LOGIN_SUCCESS,
          payload: user.data,
        })
      )
      .catch((err) => {
        dispatch(
          returnErrors(err.response.data, err.response.status, "LOGIN_FAILED")
        );
        dispatch({
          type: LOGIN_FAILED,
        });
      });
  };

export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

export const tokenConfig = (getState) => {
  //Get token from localstorage
  const token = getState().auth.token;

  //Setup config
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  //If token add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
};
