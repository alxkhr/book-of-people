import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/app';
import configureStore from './configureStore';

render(
  <Provider store={configureStore()}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
