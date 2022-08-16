import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import reducers from "./reducers";

export const listingFeaturesSlice = createSlice({
  name: "listingFeatures",
  initialState: {
    isLoading: false,
    listingFeatures: [],
    source: [],
  },
  reducers,
});

export const { startRequest, endRequest, set, del, err, add, update, filter } =
  listingFeaturesSlice.actions;

export const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmUyN2E1MGExZDE3NjU4ZmFhMjhhZDEiLCJlbWFpbCI6ImFzYWRAZ21haWwuY29tIiwiaWF0IjoxNjU5NTA1MzkwLCJleHAiOjE2NjIwMjUzOTB9.8LuW4DXFja1odoUeKdV8tY-aC8dW2iHZFIKARTbDc-I";

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmUyN2E1MGExZDE3NjU4ZmFhMjhhZDEiLCJlbWFpbCI6ImFzYWRAZ21haWwuY29tIiwiaWF0IjoxNjU5NTA1MzkwLCJleHAiOjE2NjIwMjUzOTB9.8LuW4DXFja1odoUeKdV8tY-aC8dW2iHZFIKARTbDc-I`,
  },
};

export const getAsync = () => async (dispatch) => {
  try {
    dispatch(startRequest());
    const response = await axios.get("listing-features/getAll", config);

    if (!response) dispatch(err("Something went wrong"));

    const { data } = response;

    if (data.success) {
      dispatch(set(data.listingFeatures));
      dispatch(endRequest(true));
    } else {
      dispatch(err(data.message));
    }
  } catch (error) {
    dispatch(err("Something went wrong"));
  }
};

export const addAsync = (name) => async (dispatch) => {
  try {
    dispatch(startRequest());

    const reqData = { name };

    const response = await axios.put("listing-features/add", reqData, config);

    if (!response) dispatch(err("Something went wrong"));

    const { data } = response;

    if (data.success) {
      dispatch(add(data.listingFeature));
      dispatch(endRequest(true));
    } else {
      dispatch(err(data.message));
    }
  } catch (error) {
    dispatch(err("Something went wrong"));
  }
};

export const updateAsync = (name, id) => async (dispatch) => {
  try {
    dispatch(startRequest());

    const reqData = { id, name };

    const response = await axios.patch(
      "listing-features/update",
      reqData,
      config
    );

    if (!response) dispatch(err("Something went wrong"));

    const { data } = response;

    if (data.success) {
      dispatch(update(data.listingFeature));
      dispatch(endRequest(true));
    } else {
      dispatch(err(data.message));
    }
  } catch (error) {
    dispatch(err("Something went wrong"));
  }
};

export const delAsync = (id) => async (dispatch) => {
  try {
    dispatch(startRequest());

    const response = await axios.delete(`listing-features/delete/${id}`);

    if (!response) dispatch(err("Something went wrong"));

    const { data } = response;

    if (data.success) {
      dispatch(del(id));
      dispatch(endRequest(true));
    } else {
      dispatch(err(data.message));
    }
  } catch (error) {
    dispatch(err("Something went wrong"));
  }
};

export default listingFeaturesSlice.reducer;
