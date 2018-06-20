import { AnyAction, combineReducers } from 'redux';

import { LOAD_NOTES, RECEIVE_NOTES } from './actions';
import Note from './types/note';
import AppState from './types/state/app-state';
import NoteState from './types/state/note-state';

function notes(state = { isFetching: false, items: [] as Note[] }, action: AnyAction): NoteState {
  switch (action.type) {
    case LOAD_NOTES:
      return { ...state, isFetching: true };
    case RECEIVE_NOTES:
      return {
        ...state,
        isFetching: false,
        items: action.notes,
      };
    default:
      return state;
  }
}

export default combineReducers<AppState>({ notes });
