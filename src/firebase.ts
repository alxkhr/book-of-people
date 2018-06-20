import Note from './types/note';

// import firebase from 'firebase';
// var app = firebase.initializeApp({ ... });

export function fetchNotes(): Promise<Note[]> {
  return new Promise<Note[]>((resolve) => {
    setTimeout(() => {
      resolve([{ id: 'foo', firstName: 'Foo', lastName: 'Barz' }]);
    }, 1000);
  });
}
