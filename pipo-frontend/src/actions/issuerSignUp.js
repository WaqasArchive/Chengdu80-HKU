import api from "../services/backend";

export const ISSUER_SIGNUP_PROCESSING = "ISSUER_SIGNUP_PROCESSING";
export const ISSUER_SIGNUP_ERROR = "ISSUER_SIGNUP_ERROR";
export const ISSUER_SIGNUP_SUCCESS = "ISSUER_SIGNUP_SUCCESS";

/**
 * Sign Up Issuer
 */
export function signUpIssuer(issuerDetails) {
  return dispatch => new Promise((resolve) => {
    dispatch({
      type: ISSUER_SIGNUP_PROCESSING,
    });
    api.signUpIssuer(issuerDetails)
      .then(response => resolve(
        dispatch({
          type: ISSUER_SIGNUP_SUCCESS,
          data: response.reference_price,
        }),
      ))
      .catch(function (error) {
        dispatch({
          type: ISSUER_SIGNUP_ERROR,
          data: error,
        });
      });
  });
}
