import authReducer from './AuthReducer';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
const rootReducer = combineReducers({
  auth: authReducer,
});

const persistConfig = {
  keyPrefix: 'DropsHero-Dashboard-',
  key: 'AuthReducer',
  storage,
};

export type AppState = ReturnType<typeof rootReducer>;
export default persistReducer(persistConfig, rootReducer);
