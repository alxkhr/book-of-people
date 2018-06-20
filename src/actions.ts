import { AnyAction } from 'redux';

import Note from './types/note';

export const LOAD_NOTES = 'LOAD_NOTES';
export const RECEIVE_NOTES = 'RECEIVE_NOTES';

export function loadNotes(): AnyAction {
  return { type: LOAD_NOTES };
}

export function receiveNotes(notes: Note[]): AnyAction {
  return { type: RECEIVE_NOTES, notes };
}
