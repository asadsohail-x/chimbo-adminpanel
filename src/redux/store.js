import { configureStore } from "@reduxjs/toolkit";

import propertyTypesReducer from "./propertyTypes/propertyTypes.slice";

export default configureStore({
  reducer: propertyTypesReducer,
});
