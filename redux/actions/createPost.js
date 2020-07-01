import * as firebase from 'firebase';
import * as _ from 'lodash';

import { gen, getErrorMessage, createPost as firebaseCreatePost, updatePost, log } from '@utils';

export const CREATE_POST = gen('CREATE_POST');
export const UPLOAD_VIDEO = gen('UPLOAD_VIDEO');
export const SET_TEMP_VIDEO = 'SET_TEMP_VIDEO';
export const SET_POST_DETAIL = 'SET_POST_DETAIL';
export const PUBLISH_POST = gen('PUBLISH_POST');
export const SET_UNSUBSCRIBE_HANDLE = 'SET_UNSUBSCRIBE_HANDLE';
export const CANCEL_POST_CREATION = 'CANCEL_POST_CREATION';

export const createPost = () => dispatch =>
  new Promise(async (resolve, reject) => {
    dispatch({ type: CREATE_POST.REQUEST });
    try {
      const userId = firebase.auth().currentUser.uid;
      const docRef = await firebaseCreatePost(userId);
      const unsubscribe = docRef.onSnapshot((doc) => {
        dispatch({ type: SET_POST_DETAIL, payload: { data: doc.data(), id: doc.id } })
      })
      dispatch({ type: CREATE_POST.SUCCESS, payload: { unsubscribe } });
      resolve();
    } catch(err) {
      dispatch({ type: CREATE_POST.FAILURE, payload: getErrorMessage(err) });
      reject(getErrorMessage(err));
    }
  })

export const resumeCreation = () => (dispatch, getState) => {
  const docId = _.get(getState(), 'creatPost.postDetails.id');
  const unsubscribe = firebase.firestore().collection('Posts').doc(docId)
    .onSnapshot((doc) => {
      dispatch({ type: SET_POST_DETAIL, payload: { data: doc.data(), id: doc.id } })
    })
  dispatch({ type: SET_UNSUBSCRIBE_HANDLE, payload: unsubscribe })
}

export const cancelPostCreation = () => (dispatch, getState) => {
  const unsubscribe = _.get(getState(), 'createPost.unsubscribe.unsubscribe', () => {});
  const docId = _.get(getState(), 'createPost.postDetails.id');
  unsubscribe();
  if (docId) {
    firebase.firestore().collection('Posts').doc(docId).delete();
  }
  dispatch({ type: CANCEL_POST_CREATION });
}

export const setTempVideo = (videoUri) => dispatch =>
  dispatch({ type: SET_TEMP_VIDEO, payload: videoUri });

export const setPostDetail = (data) => dispatch =>
  dispatch({ type: SET_POST_DETAIL, payload: data });

export const uploadVideo = (videoUri) => (dispatch, getState) => 
  new Promise(async (resolve, reject) => {
    try {
      const docId = _.get(getState(), 'createPost.postDetails.id');
      const ext = videoUri.substr(videoUri.lastIndexOf('.') + 1).toLowerCase();
      const fileRef = firebase.storage().ref().child(`/video/raw/${docId}.${ext}`);
      const file = await fetch(videoUri);
      const blob = await file.blob();
      await fileRef.put(blob);
      resolve();
    } catch(e) {
      console.log(e);
      reject();
    }
  });

export const submitPostData = (postData) => (dispatch, getState) =>
  new Promise(async (resolve, reject) => {
    dispatch(setPostDetail(postData));
    const postDetails = _.get(getState(), 'createPost.postDetails.data', {});
    const docId = _.get(getState(), 'createPost.postDetails.id', {})
    const { statusVideoEncoded, statusSafeSearch, statusPostCompleted, ...rest } = postDetails;
    if (docId) {
      try {
        await updatePost(docId, { ...rest, ...postData});
        dispatch({ type: CANCEL_POST_CREATION });
        resolve();
      } catch {
        reject();
      }
    } else {
      reject();
    }
  });

