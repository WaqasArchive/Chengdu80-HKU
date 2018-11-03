import {
  GET_REFERENCE_PRICE_ERROR,
  GET_REFERENCE_PRICE_PROCESSING,
  GET_REFERENCE_PRICE_SUCCESS,
  IPO_SIGNUP_ERROR,
  IPO_SIGNUP_PROCESSING,
  IPO_SIGNUP_SUCCESS,
} from "../actions/IPO";

export const initialState = {
  error: null,
  processing: false,
  referencePrice: "",
  success: false,
};

export default function IPOReducer(state = initialState, action) {
  switch (action.type) {
    case GET_REFERENCE_PRICE_PROCESSING: {
      return {
        ...state,
        error: null,
        processing: true,
        referencePrice: "",
      };
    }
    case GET_REFERENCE_PRICE_ERROR: {
      return {
        ...state,
        error: action.data,
        processing: false,
        referencePrice: "",
      };
    }
    case GET_REFERENCE_PRICE_SUCCESS: {
      return {
        ...state,
        error: null,
        processing: false,
        referencePrice: action.data,
      };
    }
    case IPO_SIGNUP_PROCESSING: {
      return {
        ...state,
        error: null,
        processing: true,
        success: false,
      };
    }
    case IPO_SIGNUP_ERROR: {
      return {
        ...state,
        error: action.data,
        processing: false,
        success: false,
      };
    }
    case IPO_SIGNUP_SUCCESS: {
      return {
        ...state,
        error: null,
        processing: false,
        success: true,
      };
    }
    default:
      return state;
  }
}