import { AnyAction } from 'redux';

import Note from '../shared/model/note';

export const LOAD_NOTES = 'LOAD_NOTES';
export const SAVE_NOTE = 'SAVE_NOTE';
export const RECEIVED_NOTES = 'RECEIVED_NOTES';
export const CHANGED_NOTE = 'CHANGED_NOTE';
export const CREATED_NOTE = 'CREATED_NOTE';

export function loadNotes(): AnyAction {
  return { type: LOAD_NOTES };
}

export function saveNote(note: Note): AnyAction {
  return { type: SAVE_NOTE, note };
}

export function receivedNotes(notes: Note[]): AnyAction {
  return { type: RECEIVED_NOTES, notes };
}

export function changedNote(note: Note): AnyAction {
  return { type: CHANGED_NOTE, note };
}

export function createdNote(note: Note): AnyAction {
  return { type: CREATED_NOTE, note };
}
