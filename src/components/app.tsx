import * as React from 'react';
import { connect, Dispatch } from 'react-redux';

import Note from '../shared/model/note';
import { loadNotes } from '../state/actions';
import AppState from '../state/model/app-state';
import SyncStatus from '../sync/model/sync-status';
import NoteMask from './note-mask';

interface AppPropTypes {
  syncStatus: SyncStatus;
  notes: Note[];
  reload: () => void;
}

function App(props: AppPropTypes): JSX.Element {
  if (props.syncStatus === SyncStatus.Fetching) {
    return <div>fetching...</div>;
  }
  return (
    <div>
      <button onClick={props.reload}>reload</button>
      {props.notes.map((note: Note) => (
        <div key={note.id}>
          {note.firstName} {note.lastName}
        </div>
      ))}
      <NoteMask />
    </div>
  );
}

export default connect(
  (state: AppState) => ({ syncStatus: state.notes.syncStatus, notes: state.notes.items }),
  (dispatch: Dispatch) => ({
    reload: () => {
      dispatch(loadNotes());
    },
  }),
)(App);
