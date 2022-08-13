import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const propertyTypesSlice = createSlice({
  name: "propertyTypes",
  initialState: {
    isLoading: false,
    propertyTypes: [],
  },
  reducers: {
    startRequest: (state) => {
      state.isLoading = true;
    },
    endRequest: (state) => {
      state.isLoading = false;
    },
    set: (state, action) => {
      state.propertyTypes = action.payload;
    },
    add: (state, action) => {
      state.propertyTypes.push(action.payload);
    },
    update: (state, action) => {
      console.log("Updating");
      state.propertyTypes = state.propertyTypes.map((type) =>
        type._id === action.payload._id
          ? { ...type, name: action.payload.name }
          : type
      );
    },
    del: (state, action) => {
      state.propertyTypes = state.propertyTypes.filter(
        ({ _id }) => _id !== action.payload
      );
    },
    err: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    filter: (state, action) => {
      state.propertyTypes = state.propertyTypes.filter(({ name }) => {
        return name.includes(action.payload);
      });
    },
  },
});

export const { startRequest, endRequest, set, del, err, add, update, filter } =
  propertyTypesSlice.actions;
export const propertyTypesSelector = (state) => state.propertyTypes;
export const isLoadingSelector = (state) => state.isLoading;

export const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmUyN2E1MGExZDE3NjU4ZmFhMjhhZDEiLCJlbWFpbCI6ImFzYWRAZ21haWwuY29tIiwiaWF0IjoxNjU5NTA1MzkwLCJleHAiOjE2NjIwMjUzOTB9.8LuW4DXFja1odoUeKdV8tY-aC8dW2iHZFIKARTbDc-I";

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmUyN2E1MGExZDE3NjU4ZmFhMjhhZDEiLCJlbWFpbCI6ImFzYWRAZ21haWwuY29tIiwiaWF0IjoxNjU5NTA1MzkwLCJleHAiOjE2NjIwMjUzOTB9.8LuW4DXFja1odoUeKdV8tY-aC8dW2iHZFIKARTbDc-I`,
  },
};

// Get All PropertyTypes
export const getAsync = () => async (dispatch) => {
  dispatch(startRequest());
  const response = await axios.get("property-types", config);

  if (!response) dispatch(err("Something went wrong"));

  const { data } = response;

  if (data.success) {
    dispatch(set(data.propertyTypes));
    dispatch(endRequest());
  } else {
    dispatch(err(data.message));
  }
};

// Add Property Type
export const addAsync = (name) => async (dispatch) => {
  dispatch(startRequest());

  const reqData = { name };
  console.log("Sending Data: ");

  const response = await axios.post("property-types/create", reqData, config);

  if (!response) dispatch(err("Something went wrong"));

  const { data } = response;

  if (data.success) {
    dispatch(add(data.propertyType));
    dispatch(endRequest());
  } else {
    dispatch(err(data.message));
  }
};

// Update Property Type
export const updateAsync = (name, id) => async (dispatch) => {
  dispatch(startRequest());

  const reqData = { id, name };

  const response = await axios.put("property-types/update", reqData, config);

  if (!response) dispatch(err("Something went wrong"));

  const { data } = response;

  if (data.success) {
    dispatch(update(data.propertyType));
    dispatch(endRequest());
  } else {
    dispatch(err(data.message));
  }
};

// Delete Property Type
export const delAsync = (id) => async (dispatch) => {
  dispatch(startRequest());

  const response = await axios.delete(`property-types/${id}`, config);

  if (!response) dispatch(err("Something went wrong"));

  const { data } = response;

  if (data.success) {
    dispatch(del(id));
    dispatch(endRequest());
  } else {
    dispatch(err(data.message));
  }
};

export default propertyTypesSlice.reducer;
