import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from './reducers';
import { loadEvents } from './actions/events';
import { loadPeople } from './actions/people';
import App from './components/App';

const store = createStore(reducer, applyMiddleware(thunk, createLogger));

store.dispatch(loadEvents());
store.dispatch(loadPeople());

ReactDOM.render(
      <App />
  document.getElementById('__IOU__'),
);
