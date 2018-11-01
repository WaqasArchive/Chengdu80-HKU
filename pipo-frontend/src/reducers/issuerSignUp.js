import {
  ISSUER_SIGNUP_ERROR,
  ISSUER_SIGNUP_PROCESSING,
  ISSUER_SIGNUP_SUCCESS,
} from "../actions/issuerSignUp";

export const initialState = {
  error: null,
  processing: false,
  createdIssuerId: "",
};

export default function issuerSignUpReducer(state = initialState, action) {
  switch (action.type) {
    case ISSUER_SIGNUP_PROCESSING: {
      return {
        ...state,
        error: null,
        processing: true,
        createdIssuerId: "",
      };
    }
    case ISSUER_SIGNUP_ERROR: {
      return {
        ...state,
        error: action.data,
        processing: false,
        createdIssuerId: "",
      };
    }
    case ISSUER_SIGNUP_SUCCESS: {
      return {
        ...state,
        error: null,
        processing: false,
        createdIssuerId: action.data,
      };
    }
    default:
      return state;
  }
}
