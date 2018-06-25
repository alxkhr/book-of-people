import SyncStatus from '../../sync/model/sync-status';

export default interface Note {
  id: string;
  syncStatus: SyncStatus;
  firstName: string;
  lastName?: string;
}

export function isNote(note: Note): boolean {
  return note.id !== undefined && note.firstName !== undefined && note.syncStatus !== undefined;
}

export function forceNote(object: any): Note {
  const { id, syncStatus, firstName, ...rest } = object;
  return {
    id: id || 'missing-id',
    syncStatus: syncStatus || SyncStatus.Unknown,
    firstName: firstName || 'Missing Name',
    ...rest,
  };
}
