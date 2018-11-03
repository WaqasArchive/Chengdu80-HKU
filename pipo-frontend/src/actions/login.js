import users from "../data/users";
import {push} from "connected-react-router";

export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGIN_PROCESSING = "LOGIN_PROCESSING";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";

export function login(email, password) {
  return dispatch => new Promise(resolve => {
    dispatch({
      type: LOGIN_PROCESSING,
    });
    let match = false;
    users.forEach(user => {
      if (user.email === email && user.password === password) {
        resolve(
          dispatch({
            type: LOGIN_SUCCESS,
            data: user,
          }),
        );
        match = true;
      }
    });

    if (!match) {
      resolve(
        dispatch({
          type: LOGIN_ERROR,
          data: "Wrong Credentials",
        }),
      );
    }
  });
}

export function logout() {
  return dispatch => new Promise(resolve => resolve(
    dispatch({
      type: LOGOUT,
    }),
  ));
}
