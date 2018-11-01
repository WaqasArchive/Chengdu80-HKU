import axios from "axios";

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
    console.log("asd");
    axios.post("http://www.mocky.io/v2/5bdb3d69320000ba293ad504?mocky-delay=300ms", issuerDetails)
      .then(response => resolve(
        dispatch({
          type: ISSUER_SIGNUP_SUCCESS,
          data: response,
        }),
      ))
      .catch(function (error) {
        console.log(error);
      });
  });
}
