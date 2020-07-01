import { wrap as imm } from 'object-path-immutable';

import {
  CREATE_POST,
  SET_POST_DETAIL,
  SET_UNSUBSCRIBE_HANDLE,
  CANCEL_POST_CREATION,
  SET_TEMP_VIDEO,
} from '@actions'

const initialState = {
  postDetails: {},
  tempVideoUri: null,
  unsubscribe: null,
};

const Auth = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_POST.REQUEST:
      return imm(state)
        .set('postDetails', null)
        .value();
    case CREATE_POST.SUCCESS: 
      return imm(state)
        .set('unsubscribe', action.payload)
        .value();
    case CREATE_POST.FAILURE:
      return imm(state)
        .set('postDetails', null)
        .set('unsubscribe', null)
        .value();
    case SET_POST_DETAIL:
      return imm(state)
        .merge('postDetails.data', action.payload)
        .value();
    case SET_UNSUBSCRIBE_HANDLE:
      return imm(state)
        .set('unsubscribe', action.payload)
        .value();
    case CANCEL_POST_CREATION:
      return imm(state)
        .set('postDetails', null)
        .set('unsubscribe', null)
        .value();
    case SET_TEMP_VIDEO:
      return imm(state)
        .set('tempVideoUri', action.payload)
        .value();
    default:
        return state;
  }
};

export default Auth;