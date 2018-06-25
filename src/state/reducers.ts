import { AnyAction, combineReducers } from 'redux';

import Note from '../shared/model/note';
import { LOAD_NOTES, UPDATE_VISUAL_NOTES } from './actions';
import AppState from './model/app-state';
import NoteState from './model/note-state';

const defaultNoteState = { isFetching: false, items: [] as Note[] };

function notes(state: NoteState = defaultNoteState, action: AnyAction): NoteState {
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
