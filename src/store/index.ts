import createSagaMiddleware from 'redux-saga';
import history from '../utils/history';

import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';

import rootReducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware({
  context: {
    history: history,
  },
});

const middlewares = process.env.NODE_ENV === 'production'
  ? [sagaMiddleware]
  : [sagaMiddleware, logger]

const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

export default store;