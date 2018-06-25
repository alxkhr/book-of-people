import 'firebase/firestore';

import { firestore, initializeApp } from 'firebase/app';

import Note, { forceNote, isNote } from '../shared/model/note';
import SyncStatus from './model/sync-status';

initializeApp({
  apiKey: 'AIzaSyDm4g5n8eSwwi148tg8BQBKVmyZedx99D8',
  authDomain: 'book-of-people-firebase.firebaseapp.com',
  databaseURL: 'https://book-of-people-firebase.firebaseio.com',
  messagingSenderId: '678040240847',
  projectId: 'book-of-people-firebase',
  storageBucket: 'book-of-people-firebase.appspot.com',
});

const db = firestore();
db.settings({ timestampsInSnapshots: true });

export function fetchNotes(): Promise<Note[]> {
  return db
    .collection('people')
    .get()
    .then((querySnapshot) => {
      const notes: Note[] = [];
      querySnapshot.forEach((doc) => {
        notes.push(convertToNote(doc));
      });
      return notes;
    });
}

function convertToNote(document: firestore.QueryDocumentSnapshot): Note {
  const note = { id: document.id, syncStatus: SyncStatus.Unknown, ...document.data() } as Note;
  if (isNote(note)) {
    note.syncStatus = SyncStatus.Synchronized;
    return note;
  } else {
    note.syncStatus = SyncStatus.SyncError;
    forceNote(note);
    return note;
  }
}
