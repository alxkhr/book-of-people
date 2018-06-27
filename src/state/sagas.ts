import { AnyAction } from 'redux';
import { call, CallEffect, ForkEffect, put, PutEffect, takeEvery } from 'redux-saga/effects';

import Note from '../shared/model/note';
import * as firebase from '../sync/firebase';
import { LOAD_NOTES, RECEIVED_NOTES } from './actions';

function* fetchNotes(): Iterator<CallEffect | PutEffect<AnyAction>> {
  try {
    const notes: Note[] = yield call(firebase.fetchNotes);
    yield put({ type: RECEIVED_NOTES, notes });
  } catch (e) {
    // TODO yield put({ type: actions.ERROR_ON_RECEIVE_NOTES, message: e.message });
  }
}

function* root(): Iterator<ForkEffect> {
  yield takeEvery(LOAD_NOTES, fetchNotes);
}

export default root;
