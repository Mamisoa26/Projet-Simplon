import { SET_CURRENT_COOKER, COOKER_LOADING } from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  cooker: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_COOKER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        cooker: action.payload
      };
    case COOKER_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
