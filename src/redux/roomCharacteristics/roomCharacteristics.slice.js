import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import reducers from "./reducers";

export const roomCharacteristicsSlice = createSlice({
  name: "roomCharacteristics",
  initialState: {
    isLoading: false,
    roomCharacteristics: [],
    source: [],
  },
  reducers,
});

export const { startRequest, endRequest, set, del, err, add, update, filter } =
  roomCharacteristicsSlice.actions;

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
    const response = await axios.get("room-characteristics/getAll", config);

    if (!response) dispatch(err("Something went wrong"));

    const { data } = response;

    if (data.success) {
      dispatch(set(data.roomCharacteristics));
      dispatch(endRequest(true));
    } else {
      dispatch(err(data.message));
    }
  } catch (error) {
    dispatch(err("Something went wrong"));
  }
};

export const addAsync = (name, type) => async (dispatch) => {
  try {
    dispatch(startRequest());

    const reqData = { name, type };

    const response = await axios.put(
      "room-characteristics/add",
      reqData,
      config
    );

    if (!response) dispatch(err("Something went wrong"));

    const { data } = response;

    if (data.success) {
      dispatch(add(data.roomCharacteristic));
      dispatch(endRequest(true));
    } else {
      dispatch(err(data.message));
    }
  } catch (error) {
    dispatch(err("Something went wrong"));
  }
};

export const updateAsync = (name, type, id) => async (dispatch) => {
  try {
    dispatch(startRequest());

    const reqData = { id, name, type };

    const response = await axios.patch(
      "room-characteristics/update",
      reqData,
      config
    );

    if (!response) dispatch(err("Something went wrong"));

    const { data } = response;

    if (data.success) {
      dispatch(update(data.roomCharacteristic));
      dispatch(endRequest(true));
    } else {
      dispatch(err(data.message));
    }
  } catch (error) {
    console.log(error);
    dispatch(err("Something went wrong"));
  }
};

export const delAsync = (id) => async (dispatch) => {
  try {
    dispatch(startRequest());

    const response = await axios.delete(`room-characteristics/delete/${id}`);

    if (!response) dispatch(err("Something went wrong"));

    const { data } = response;

    if (data.success) {
      dispatch(del(id));
      dispatch(endRequest(true));
    } else {
      dispatch(err(data.message));
    }
  } catch (error) {
    console.log(error);
    dispatch(err("Something went wrong"));
  }
};

export default roomCharacteristicsSlice.reducer;
