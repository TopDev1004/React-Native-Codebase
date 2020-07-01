import * as firebase from 'firebase';

import { gen, getErrorMessage, log } from '@utils';

export const FETCH_PRODUCTS = gen('FETCH_PRODUCTS');

export const fetchProducts = () => (dispatch) =>
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
