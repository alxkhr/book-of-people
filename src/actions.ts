import { AnyAction } from 'redux';

import Note from './types/note';

export const LOAD_NOTES = 'LOAD_NOTES';
export const UPDATE_VISUAL_NOTES = 'UPDATE_VISUAL_NOTES';

export function loadNotes(): AnyAction {
  return { type: LOAD_NOTES };
}

export function updateVisualNotes(notes: Note[]): AnyAction {
  return { type: UPDATE_VISUAL_NOTES, notes };
}
