import * as React from 'react';
import { connect, Dispatch } from 'react-redux';

import Note, { generateDraftId } from '../shared/model/note';
import { changedNote, createdNote } from '../state/actions';
import SyncStatus from '../sync/model/sync-status';

interface NoteMaskPropTypes {
  changed: (note: Note) => void;
  created: (note: Note) => void;
  note?: Note;
}

interface NoteMaskState {
  firstName: string;
  lastName: string;
}

class NoteMask extends React.PureComponent<NoteMaskPropTypes, NoteMaskState> {
  constructor(props: NoteMaskPropTypes) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  public render(): JSX.Element {
    return (
      <form>
        <input onChange={this.getOnChangeFn('firstName')} value={this.state.firstName} />
        <input onChange={this.getOnChangeFn('lastName')} value={this.state.lastName} />
        <button onClick={this.onSubmit}>submit</button>
      </form>
    );
  }

  public onSubmit(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    if (this.props.note && this.props.note.id) {
      this.props.changed(
        Object.assign({}, this.props.note, this.state, {
          syncStatus: SyncStatus.Outdated,
          timestamp: new Date().getTime(),
        }),
      );
    } else {
      this.props.created({
        id: generateDraftId(),
        timestamp: new Date().getTime(),
        syncStatus: SyncStatus.Draft,
        properties: {}, // TODO implement input
        tags: [], // TODO implement input
        lists: {}, // TODO implement input
        ...this.state,
      });
    }
  }

  private getOnChangeFn(key: keyof NoteMaskState): any {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({ [key]: event.target.value } as Pick<NoteMaskState, keyof NoteMaskState>);
    };
  }
}

export default connect(
  null, // TODO save to delete?
  (dispatch: Dispatch) => ({
    changed: (note: Note) => {
      dispatch(changedNote(note));
    },
    created: (note: Note) => {
      dispatch(createdNote(note));
    },
  }),
)(NoteMask);
