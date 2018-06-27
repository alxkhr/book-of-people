import Note from '../../shared/model/note';
import SyncStatus from '../../sync/model/sync-status';

export default interface NoteState {
  syncStatus: SyncStatus;
  items: Note[];
}
