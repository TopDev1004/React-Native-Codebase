import * as firebase from 'firebase';

import { gen, getErrorMessage, log } from '@utils';

export const LOGIN = gen('LOGIN');
export const SIGNUP = gen('SIGNUP');
export const LOGOUT = gen('LOGOUT');
export const RESTORE_PASSWORD = gen('RESTORE_PASSWORD');
export const SET_AUTH_REDIRECT = 'SET_AUTH_REDIRECT';

export const login = (email, password) => (dispatch) =>
  new Promise(async (resolve, reject) => {
    dispatch({ type: LOGIN.REQUEST });
    try {
      const credentials = await firebase.auth().signInWithEmailAndPassword(email, password);
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      dispatch({ type: LOGIN.SUCCESS, payload: credentials });
      resolve();
    } catch(err) {
      dispatch({ type: LOGIN.FAILURE, payload: getErrorMessage(err) });
      reject(getErrorMessage(err));
    }
  })

export const signup = (email, password, username, birthday, country) => (dispatch) =>
  new Promise(async (resolve, reject) => {
    dispatch({ type: SIGNUP.REQUEST });
    try {
      const credentials = await firebase.auth().createUserWithEmailAndPassword(email, password);
      firebase.auth().currentUser.sendEmailVerification();
      firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set({
        username,
        birthday,
        country,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      dispatch({ type: SIGNUP.SUCCESS, payload: credentials });
      resolve();
    } catch(err) {
      const errMsg = getErrorMessage(err);
      dispatch({ type: SIGNUP.FAILURE, payload: errMsg });
      reject(errMsg);
    }
  })

export const logout = () => (dispatch) =>
  new Promise(async (resolve, reject) => {
    dispatch({ type: LOGOUT.REQUEST });
    try {
      await firebase.auth().signOut();
      dispatch({ type: LOGOUT.SUCCESS, payload: credentials });
      resolve();
    } catch(err) {
      const errMsg = getErrorMessage(err);
      dispatch({ type: LOGOUT.FAILURE, payload: errMsg });
      reject(errMsg);
    }
  })

export const restorePassword = (email) => (dispatch) =>
  new Promise(async (resolve, reject) => {
    dispatch({ type: RESTORE_PASSWORD.REQUEST });
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      dispatch({ type: RESTORE_PASSWORD.SUCCESS });
      resolve();
    }catch(err) {
      const errMsg = getErrorMessage(err);
      dispatch({ type: RESTORE_PASSWORD.FAILURE, payload: errMsg });
      reject(errMsg);
    }
  })

export const setAuthRedirect = (redirect) => dispatch =>
  dispatch({ type: SET_AUTH_REDIRECT, payload: redirect });
