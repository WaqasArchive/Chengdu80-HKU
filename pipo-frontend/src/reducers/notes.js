import {NOTES_ERROR, NOTES_REPLACE} from "../actions/notes";

export const initialState = {
  loading: true,
  error: null,
  notes: [],
};

export default function notesReducer(state = initialState, action) {
  switch (action.type) {
    case NOTES_ERROR: {
      return {
        ...state,
        error: action.data,
      };
    }
    case NOTES_REPLACE: {
      let notes = [];

      // Pick out the props I need
      if (action.data && typeof action.data === "object") {
        notes = action.data;
      }

      return {
        ...state,
        error: null,
        loading: false,
        notes,
      };
    }
    default:
      return state;
  }
}
