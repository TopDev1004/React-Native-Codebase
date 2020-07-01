import { wrap as imm } from 'object-path-immutable';

import {
  SET_POST_CREATION_STATUS,
  CANCEL_POST_CREATION,
} from '@actions'

const initialState = {
  creatingPost: false,
};

const AppState = (state = initialState, action) => {
  switch (action.type) {
    case SET_POST_CREATION_STATUS:
      return imm(state)
        .set('creatingPost', action.payload)
        .value();
    case CANCEL_POST_CREATION:
      return imm(state)
        .set('creatingPost', false)
        .value();
    default:
        return state;
  }
};

export default AppState;