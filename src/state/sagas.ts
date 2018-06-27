import { AnyAction } from 'redux';
import { call, CallEffect, ForkEffect, put, PutEffect, takeEvery } from 'redux-saga/effects';

import Note from '../shared/model/note';
import * as firebase from '../sync/firebase';
import { CREATED_NOTE, LOAD_NOTES, RECEIVED_NOTES } from './actions';

function* fetchNotes(): Iterator<CallEffect | PutEffect<AnyAction>> {
  try {
    const notes: Note[] = yield call(firebase.fetchNotes);
    yield put({ type: RECEIVED_NOTES, notes });
  } catch (e) {
    console.error('ERROR_ON_RECEIVE_NOTES', e);
    // TODO yield put({ type: actions.ERROR_ON_RECEIVE_NOTES, message: e.message });
  }
}

function* saveNote(action: AnyAction): Iterator<CallEffect | PutEffect<AnyAction>> {
  try {
    yield call(firebase.saveNote, action.note);
    yield put({ type: LOAD_NOTES });
  } catch (e) {
    console.error('ERROR_ON_SAVE_NOTE', e);
    // TODO yield put({ type: actions.ERROR_ON_SAVE_NOTE, message: e.message });
  }
}

function* root(): Iterator<ForkEffect> {
  yield takeEvery(LOAD_NOTES, fetchNotes);
  yield takeEvery(CREATED_NOTE, saveNote);
}

export default root;
