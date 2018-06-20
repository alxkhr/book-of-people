import * as React from 'react';
import { connect, Dispatch } from 'react-redux';

import { loadNotes } from '../actions';
import Note from '../types/note';
import AppState from '../types/state/app-state';

interface AppPropTypes {
  isFetching: boolean;
  notes: Note[];
  reload: () => void;
}

function App(props: AppPropTypes): JSX.Element {
  if (props.isFetching) {
    return <div>fetching...</div>;
  }
  return (
    <div>
      {props.notes.map((note: Note) => (
        <div key={note.id}>
          {note.firstName} {note.lastName}
        </div>
      ))}
      <button onClick={props.reload}>reload</button>
    </div>
  );
}

export default connect(
  (state: AppState) => ({ isFetching: state.notes.isFetching, notes: state.notes.items }),
  (dispatch: Dispatch) => ({ reload: () => dispatch(loadNotes()) }),
)(App);
