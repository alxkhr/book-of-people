import { AnyAction, combineReducers } from 'redux';

import Note from '../shared/model/note';
import SyncStatus from '../sync/model/sync-status';
import { CHANGED_NOTE, CREATED_NOTE, LOAD_NOTES, RECEIVED_NOTES, SAVE_NOTE } from './actions';
import AppState from './model/app-state';
import NoteState from './model/note-state';

const defaultNoteState: NoteState = { syncStatus: SyncStatus.Unknown, items: [] as Note[] };

function notes(state: NoteState = defaultNoteState, action: AnyAction): NoteState {
  switch (action.type) {
    case LOAD_NOTES:
      return loadNotes(state);
    case SAVE_NOTE:
      return saveNote(state, action.note);
    case RECEIVED_NOTES:
      return receivedNotes(state, action.notes);
    case CHANGED_NOTE:
      return changedNote(state, action.note);
    case CREATED_NOTE:
      return createdNote(state, action.note);
    default:
      return state;
  }
}

// pure function
function loadNotes(state: NoteState): NoteState {
  return { ...state, syncStatus: SyncStatus.Fetching };
}

// pure function
function saveNote(state: NoteState, newNote: Note): NoteState {
  return state; // TODO alter notes (unshift or edit one)
}

// pure function
function receivedNotes(state: NoteState, newNotes: Note[]): NoteState {
  return updateVisualNotes(
    {
      ...state,
      syncStatus: SyncStatus.Synchronized,
    },
    newNotes,
  );
}

// pure function
function changedNote(state: NoteState, newNote: Note): NoteState {
  const newNotes: Note[] = state.items.map((note) => (note.id === newNote.id ? newNote : note));
  return updateVisualNotes(
    {
      ...state,
      syncStatus: SyncStatus.Outdated,
    },
    newNotes,
  );
}
// pure function
function createdNote(state: NoteState, newNote: Note): NoteState {
  const newNotes: Note[] = [...state.items];
  newNotes.unshift(newNote);
  return updateVisualNotes(
    {
      ...state,
      syncStatus: SyncStatus.Outdated,
    },
    newNotes,
  );
}

// pure function
function updateVisualNotes(state: NoteState, newNotes: Note[]): NoteState {
  return {
    ...state,
    items: newNotes,
  };
}

export default combineReducers<AppState>({ notes });
