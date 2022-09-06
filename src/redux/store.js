import { configureStore, combineReducers } from "@reduxjs/toolkit";

import propertyTypesReducer from "./propertyTypes/propertyTypes.slice";
import heatingTypesReducer from "./heatingTypes/heatingTypes.slice";
import gendersReducer from "./genders/genders.slice";
import listingTypesReducer from "./listingTypes/listingTypes.slice";
import occupationTypesReducer from "./occupationTypes/occupationTypes.slice";
import listingFeaturesReducer from "./listingFeatures/listingFeatures.slice";
import specificationsReducer from "./specifications/specifications.slice";
import roomCharacteristicsReducer from "./roomCharacteristics/roomCharacteristics.slice";

import adminReducer from './admin/admin.slice'

const rootReducer = combineReducers({
  admin: adminReducer,
  propertyTypes: propertyTypesReducer,
  heatingTypes: heatingTypesReducer,
  listingTypes: listingTypesReducer,
  occupationTypes: occupationTypesReducer,
  listingFeatures: listingFeaturesReducer,
  specifications: specificationsReducer,
  roomCharacteristics: roomCharacteristicsReducer,
  genders: gendersReducer,
});

export default configureStore({ reducer: rootReducer });
