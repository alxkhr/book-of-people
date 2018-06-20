import 'firebase/firestore';

import { firestore, initializeApp } from 'firebase/app';

import Note from './types/note';

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
        const { lastName, firstName } = doc.data();
        notes.push({ id: doc.id, lastName, firstName });
      });
      return notes;
    });
}
