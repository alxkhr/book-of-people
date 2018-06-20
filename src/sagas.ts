import { AnyAction } from 'redux';
import { call, CallEffect, ForkEffect, put, PutEffect, takeEvery } from 'redux-saga/effects';

import { LOAD_NOTES, RECEIVE_NOTES } from './actions';
import * as firebase from './firebase';

function* fetchNotes(): Iterator<CallEffect | PutEffect<AnyAction>> {
  try {
    const notes = yield call(firebase.fetchNotes);
    yield put({ type: RECEIVE_NOTES, notes });
  } catch (e) {
    // TODO yield put({ type: actions.ERROR_ON_RECEIVE_NOTES, message: e.message });
  }
}

function* root(): Iterator<ForkEffect> {
  yield takeEvery(LOAD_NOTES, fetchNotes);
}

export default root;
