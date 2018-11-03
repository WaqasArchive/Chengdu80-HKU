import api from "../services/backend";

export const IPO_SIGNUP_PROCESSING = "IPO_SIGNUP_PROCESSING";
export const IPO_SIGNUP_ERROR = "IPO_SIGNUP_ERROR";
export const IPO_SIGNUP_SUCCESS = "IPO_SIGNUP_SUCCESS";
export const GET_REFERENCE_PRICE_ERROR = "GET_REFERENCE_PRICE_ERROR";
export const GET_REFERENCE_PRICE_PROCESSING = "GET_REFERENCE_PRICE_PROCESSING";
export const GET_REFERENCE_PRICE_SUCCESS = "GET_REFERENCE_PRICE_SUCCESS";

export function getReferencePrice(issuerDetails) {
  return dispatch => new Promise((resolve) => {
    dispatch({
      type: GET_REFERENCE_PRICE_PROCESSING,
    });
    api.getReferencePrice(issuerDetails)
      .then(response =>
        resolve(
          dispatch({
            type: GET_REFERENCE_PRICE_SUCCESS,
            data: response.reference_price,
          }),
        ))
      .catch(function (error) {
        dispatch({
          type: GET_REFERENCE_PRICE_ERROR,
          data: error.message,
        });
      });
  });
}

export function signUpIPO(issuerDetails) {
  return dispatch => new Promise((resolve) => {
    dispatch({
      type: IPO_SIGNUP_PROCESSING,
    });
    api.addIPO(issuerDetails)
      .then(() => resolve(
        dispatch({
          type: IPO_SIGNUP_SUCCESS,
        }),
      ))
      .catch(function (error) {
        dispatch({
          type: IPO_SIGNUP_ERROR,
          data: error.message,
        });
      });
  });
}
