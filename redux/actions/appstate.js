export const SET_POST_CREATION_STATUS = 'SET_POST_CREATION_STATUS';

export const setPostCreationStatus = (status) => dispatch =>
  dispatch({ type: SET_POST_CREATION_STATUS, payload: status });
