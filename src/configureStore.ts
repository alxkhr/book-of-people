import { applyMiddleware, createStore, Store } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import reducer from './reducers';
import sagas from './sagas';
import AppState from './types/state/app-state';

const saga = createSagaMiddleware();
const logger = createLogger();

export default function configureStore(): Store<AppState> {
  const store = createStore(reducer, applyMiddleware(saga, logger));
  saga.run(sagas);
  return store;
}
