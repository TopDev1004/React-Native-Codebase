import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import Theme from './Theme';
import auth from './auth';
import appState from './appstate';
import createPost from './createPost';

export default combineReducers({
  Theme,
  auth,
  appState,
  createPost,
  form: formReducer,
});