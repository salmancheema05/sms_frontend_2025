import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userAuthReducer from "@/redux/userAuth";
import genderReducer from "@/redux/genderSlice";
import sessionReducer from "@/redux/sessionSlice";
import bloodGroupListReducer from "@/redux/bloodListSlice";
import MaritalStatusReducer from "@/redux/maritalStatus";
import { userAuthApi } from "../services/userAuth";
import { genderApi } from "../services/gender";
import { sessionApi } from "../services/session";
import { classesApi } from "@/services/classes";
import { classGroupApi } from "@/services/classGroup";
import { createClassApi } from "@/services/createclassapi";
import { bloodGroupListApi } from "@/services/bloodList";
import { maritalStatusApi } from "@/services/maritalStatus";
import { addTeacherApi } from "@/services/teacher";
import { subjectApi } from "@/services/subject";
const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  user_auth: userAuthReducer,
  genderList: genderReducer,
  sessionList: sessionReducer,
  bloodGroupList: bloodGroupListReducer,
  maritalStatusList: MaritalStatusReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    persisted: persistedReducer,

    [userAuthApi.reducerPath]: userAuthApi.reducer,
    [genderApi.reducerPath]: genderApi.reducer,
    [sessionApi.reducerPath]: sessionApi.reducer,
    [classesApi.reducerPath]: classesApi.reducer,
    [classGroupApi.reducerPath]: classGroupApi.reducer,
    [createClassApi.reducerPath]: createClassApi.reducer,
    [bloodGroupListApi.reducerPath]: bloodGroupListApi.reducer,
    [maritalStatusApi.reducerPath]: maritalStatusApi.reducer,
    [addTeacherApi.reducerPath]: addTeacherApi.reducer,
    [subjectApi.reducerPath]: subjectApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(userAuthApi.middleware)
      .concat(genderApi.middleware)
      .concat(sessionApi.middleware)
      .concat(classesApi.middleware)
      .concat(classGroupApi.middleware)
      .concat(createClassApi.middleware)
      .concat(bloodGroupListApi.middleware)
      .concat(maritalStatusApi.middleware)
      .concat(addTeacherApi.middleware)
      .concat(subjectApi.middleware),
});

export const persistor = persistStore(store);
