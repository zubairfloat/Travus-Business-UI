import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { fork, all } from 'redux-saga/effects';
// REDUCER
import authReducer from './MyStore/reducer/auth';
import reviewReducer from './MyStore/reducer/review';
import businessReducer from './MyStore/reducer/business';
import venueReducer from './MyStore/reducer/venue';
import tripReducer from './MyStore/reducer/trip';
// SAGAS
import authWatcher from './Saga/auth';
import businessWatcher from './Saga/business';
import reviewWatcher from './Saga/review';
import venueWatcher from './Saga/venueSaga';
import tripWatcher from './Saga/tripSaga';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function* rootSaga() {
  yield all([
    fork(authWatcher), 
    fork(businessWatcher), 
    fork(reviewWatcher), 
    fork(venueWatcher),
    fork(tripWatcher)
  ]);
}
const sagaMiddleware = createSagaMiddleware();
const rootReducers = combineReducers({
  auth: authReducer,
  business: businessReducer,
  review: reviewReducer,
  venues: venueReducer,
  trip: tripReducer

});
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const persistConfig = {
  key: 'root',
  storage,
}

let enhancer;
if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(applyMiddleware(sagaMiddleware));
} else {
  enhancer = compose(applyMiddleware(sagaMiddleware));
}
const persistedReducer = persistReducer(persistConfig, rootReducers)

const store = createStore(persistedReducer, enhancer);
let persistor = persistStore(store);
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>, document.getElementById('root'));
serviceWorker.register();
