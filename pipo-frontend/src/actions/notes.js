import api from "../services/backend";

export const NOTES_ERROR = "NOTES_ERROR";
export const NOTES_REPLACE = "NOTES_REPLACE";

/**
 * Set an Error Message
 */
export function setError(message) {
  return dispatch => new Promise(resolve => resolve(
    dispatch({
      type: NOTES_ERROR,
      data: message,
    }),
  ));
}

/**
 * Get Notes
 */
export function getNotes() {
  return dispatch => new Promise(resolve => api.getNotes().then(response => resolve(
    dispatch({
      type: NOTES_REPLACE,
      data: response,
    }),
  ))).catch(e => console.log(e));
}
