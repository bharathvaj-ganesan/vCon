import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './App';
import rootReducer from './reducers';
import './app.global.css';

const store = createStore(
  rootReducer,
  {},
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

render(
  <AppContainer>
    <Provider store={store}>
      <App className="container" />
    </Provider>
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextRoot = require('./App'); // eslint-disable-line global-require
    render(
      <AppContainer>
        <Provider store={store}>
          <NextRoot />
        </Provider>
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
