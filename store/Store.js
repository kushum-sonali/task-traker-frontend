import { configureStore } from "@reduxjs/toolkit"; // No need to import getDefaultMiddleware separately
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { persistStore } from "redux-persist";
import { combineReducers } from "redux";
import userSlice from "./UserSlice";
import todoSlice from "./TodoSlice";

// Configuration for Redux Persist
const persistConfig = {
  key: "root",
  storage,
};

// Combine Reducers
const reducer = combineReducers({
  user: userSlice,
  todo: todoSlice,
});


// Persisted Reducer
const persistedReducer = persistReducer(persistConfig, reducer);

// Configure Store with Middleware
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check if required
      thunk: true,
    }),
});

// Persistor
const persistor = persistStore(store);

// Export Store and Persistor
export { store, persistor };

