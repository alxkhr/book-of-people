import Note from '../../shared/model/note';

export default interface NoteState {
  isFetching: boolean;
  items: Note[];
}
