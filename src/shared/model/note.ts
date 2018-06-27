import SyncStatus from '../../sync/model/sync-status';
import Relation from './relation';
import Tag from './tag';

export default interface Note {
  id: string;
  syncStatus: SyncStatus;
  firstName: string;
  lastName: string;
  properties: {
    email?: string;
    phone?: string;
    birthday?: string;
  };
  tags: Tag[];
  lists: {
    memories?: Array<{
      date: string;
      text: string;
    }>;
    giftIdeas?: Array<{
      description: string;
      given?: boolean;
    }>;
    relations?: Array<{
      toId: string;
      type: Relation;
    }>;
  };
}

export function isNote(note: Note): boolean {
  return (
    note.id !== undefined &&
    note.firstName !== undefined &&
    note.lastName !== undefined &&
    note.syncStatus !== undefined &&
    note.properties !== undefined &&
    note.tags !== undefined &&
    note.lists !== undefined
  );
}

export function forceNote(object: any): Note {
  const { id, syncStatus, firstName, lastName, properties, tags, lists, ...rest } = object;
  return {
    id: id || generateMissingId(),
    syncStatus: syncStatus || SyncStatus.Unknown,
    firstName: firstName || '',
    lastName: lastName || '',
    properties: properties || [],
    tags: tags || [],
    lists: lists || [],
    ...rest,
  };
}

export function generateMissingId(): string {
  return `missing-id-${generateRandomKey()}`;
}

export function generateDraftId(): string {
  return `draft-id-${generateRandomKey()}`;
}

function generateRandomKey(): string {
  return Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, '')
    .substr(0, 5);
}
