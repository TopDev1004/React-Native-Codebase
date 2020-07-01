import { wrap as imm } from 'object-path-immutable';

import {
  LOGIN,
  SIGNUP,
  LOGOUT,
  SET_AUTH_REDIRECT,
} from '@actions'

const initialState = {
  status: '',
  credentials: {},
  errorMessage: null,
  redirect: null,
};

const Auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN.REQUEST:
      return imm(state)
        .set('status', action.type)
        .set('credentials', {})
        .set('errorMessage', '')
        .value();
    case LOGIN.SUCCESS:
      return imm(state)
        .set('status', action.type)
        .set('credentials', action.payload)
        .set('errorMessage', '')
        .value();
    case LOGIN.FAILURE:
      return imm(state)
        .set('status', action.type)
        .set('credentials', {})
        .set('errorMessage', action.payload)
        .value();
    case SIGNUP.REQUEST:
      return imm(state)
        .set('status', action.type)
        .set('credentials', {})
        .set('errorMessage', '')
        .value();
    case SIGNUP.SUCCESS:
      return imm(state)
        .set('status', action.type)
        .set('credentials', action.payload)
        .set('errorMessage', '')
        .value();
    case SIGNUP.FAILURE:
      return imm(state)
        .set('status', action.type)
        .set('credentials', {})
        .set('errorMessage', action.payload)
        .value();
    case LOGOUT.REQUEST:
      return imm(state)
        .set('status', action.type)
        .set('errorMessage', '')
        .value();
    case LOGOUT.SUCCESS:
      return imm(state)
        .set('status', action.type)
        .set('credentials', {})
        .set('errorMessage', '')
        .value();
    case LOGOUT.FAILURE:
      return imm(state)
        .set('status', action.type)
        .set('errorMessage', action.payload)
        .value();
    case SET_AUTH_REDIRECT:
      return imm(state)
        .set('redirect', action.payload)
        .value();
    default:
        return state;
  }
};

export default Auth;