import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import reducers from "./reducers";

export const adminSlice = createSlice({
    name: "admin",
    initialState: {
        isLoading: false,
        data: {},
        error: '',
        message: '',
        isLoggedIn: false,
    },
    reducers,
});

export const { startRequest, endRequest, set, err, clear, setMessage } =
    adminSlice.actions;

const config = {
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmUyN2E1MGExZDE3NjU4ZmFhMjhhZDEiLCJlbWFpbCI6ImFzYWRAZ21haWwuY29tIiwiaWF0IjoxNjU5NTA1MzkwLCJleHAiOjE2NjIwMjUzOTB9.8LuW4DXFja1odoUeKdV8tY-aC8dW2iHZFIKARTbDc-I`,
    },
};

export const loginAsync = (email, password) => async dispatch => {
    try {
        dispatch(startRequest())

        const response = await axios.post("admin/login", { email, password }, config);

        if (!response) {
            dispatch(err("Something went wrong"));
            dispatch(endRequest(false))
        }

        const { data } = response;

        if (data.success) {
            dispatch(set(data.admin))
            dispatch(endRequest())
        } else {
            dispatch(err(data.message))
            dispatch(endRequest(false))
        }

    } catch (error) {
        dispatch(err(error))
    }
}

export const updatePasswordAsync = (id, prevPassword, password) => async dispatch => {
    try {
        dispatch(startRequest())

        const response = await axios.patch("admin/update-password", { id, prevPassword, password }, config);

        if (!response) {
            dispatch(err("Something went wrong"));
            dispatch(endRequest(false))
        }

        const { data } = response;

        if (data.success) {
            dispatch(setMessage(data.message))
            dispatch(endRequest())
        } else {
            dispatch(err(data.message))
            dispatch(endRequest(false))
        }
    } catch (error) {
        dispatch(err(error))
    }
}

// export const getAsync = () => async (dispatch) => {
//     try {
//         dispatch(startRequest());
//         const response = await axios.get("admin/getAll", config);

//         if (!response) dispatch(err("Something went wrong"));

//         const { data } = response;

//         if (data.success) {
//             dispatch(set(data.genders));
//             dispatch(endRequest(true));
//         } else {
//             dispatch(err(data.message));
//         }
//     } catch (error) {
//         dispatch(err("Something went wrong"));
//     }
// };

// export const addAsync = (name) => async (dispatch) => {
//     try {
//         dispatch(startRequest());

//         const reqData = { name };

//         const response = await axios.put("genders/add", reqData, config);

//         if (!response) dispatch(err("Something went wrong"));

//         const { data } = response;

//         if (data.success) {
//             dispatch(add(data.gender));
//             dispatch(endRequest(true));
//         } else {
//             dispatch(err(data.message));
//         }
//     } catch (error) {
//         dispatch(err("Something went wrong"));
//     }
// };

// export const updateAsync = (name, id) => async (dispatch) => {
//     try {
//         dispatch(startRequest());

//         const reqData = { id, name };

//         const response = await axios.patch("genders/update", reqData, config);

//         if (!response) dispatch(err("Something went wrong"));

//         const { data } = response;

//         if (data.success) {
//             dispatch(update(data.gender));
//             dispatch(endRequest(true));
//         } else {
//             dispatch(err(data.message));
//         }
//     } catch (error) {
//         dispatch(err("Something went wrong"));
//     }
// };

// export const delAsync = (id) => async (dispatch) => {
//     try {
//         dispatch(startRequest());

//         const response = await axios.delete(`genders/delete/${id}`);

//         if (!response) dispatch(err("Something went wrong"));

//         const { data } = response;

//         if (data.success) {
//             dispatch(del(id));
//             dispatch(endRequest(true));
//         } else {
//             dispatch(err(data.message));
//         }
//     } catch (error) {
//         console.log(error);
//         dispatch(err("Something went wrong"));
//     }
// };

export default adminSlice.reducer;
