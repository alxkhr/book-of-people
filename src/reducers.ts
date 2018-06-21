import { AnyAction, combineReducers } from 'redux';

import { LOAD_NOTES, UPDATE_VISUAL_NOTES } from './actions';
import Note from './types/note';
import AppState from './types/state/app-state';
import NoteState from './types/state/note-state';

function notes(state = { isFetching: false, items: [] as Note[] }, action: AnyAction): NoteState {
  switch (action.type) {
    case LOAD_NOTES:
      return loadNotes(state);
    case UPDATE_VISUAL_NOTES:
      return updateVisualNotes(state, action.notes);
    default:
      return state;
  }
}

function loadNotes(state: NoteState): NoteState {
  return { ...state, isFetching: true };
}

function updateVisualNotes(state: NoteState, newNotes: Note[]): NoteState {
  return {
    ...state,
    isFetching: false,
    items: newNotes,
  };
}

export default combineReducers<AppState>({ notes });
