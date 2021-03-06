import {GET_COMMENTS} from '../actions/types'

const initialState = {
  comments: [],
  aux: false
};

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_COMMENTS:
      return {
        ...state,
        comments: [...action.payload],
      };
    default: 
      return state;
  }
}