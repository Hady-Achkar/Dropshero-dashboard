import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import { persistStore } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';

const middlewares = [thunk];
const middlewareEnhancer = applyMiddleware(...middlewares);
const enhancers = [middlewareEnhancer];
const composedEnhancers: any = compose(...enhancers);
export const store = createStore(
  rootReducer,
  composeWithDevTools(composedEnhancers)
);

export const persistor = persistStore(store);
