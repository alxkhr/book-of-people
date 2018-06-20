import Note from '../note';

export default interface NoteState {
  isFetching: boolean;
  items: Note[];
}
