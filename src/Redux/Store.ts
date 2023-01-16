import { combineReducers, configureStore } from "@reduxjs/toolkit";

// Reducers
// import UserReducer from "./reducers/UserReducer";
import TodoReducer from "./reducers/TodoReducer";

// Persist
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import thunk from "redux-thunk";

const reducers = { todos: TodoReducer };
const combinedReducer = combineReducers(reducers);

type b = ReturnType<typeof combinedReducer>;

const persistConfig: PersistConfig<b> = {
  key: "root",
  storage: AsyncStorage,
  blacklist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, combinedReducer);

const Store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

const persistor = persistStore(Store);

export { Store, persistor };

export type RootState = ReturnType<typeof Store["getState"]>;
