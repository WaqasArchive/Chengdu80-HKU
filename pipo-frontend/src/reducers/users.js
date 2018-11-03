import {LOGIN_ERROR, LOGIN_PROCESSING, LOGIN_SUCCESS, LOGOUT} from "../actions/login";

export const initialState = {
  loading: true,
  error: null,
  user: "",
  tfa: false,
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_ERROR: {
      return {
        ...state,
        error: action.data,
        user: "",
        tfa: false,
      };
    }
    case LOGIN_PROCESSING: {
      return {
        ...state,
        error: null,
        processing: true,
        user: "",
        tfa: false,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        error: null,
        processing: false,
        user: action.data,
        tfa: true,
      };
    }
    case LOGOUT: {
      return initialState;
    }
    default:
      return state;
  }
}
