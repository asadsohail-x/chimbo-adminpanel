const reducers = {
  startRequest: (state) => {
    state.isLoading = true;
  },
  endRequest: (state, { payload = true }) => {
    if (payload) state.error = "";
    state.isLoading = false;
  },
  set: (state, action) => {
    state.data = action.payload;
    state.isLoggedIn = true;
  },
  setMessage: (state, { payload }) => {
    state.message = payload;
  },
  markAsLoggedIn: (state) => {
    state.isLoggedIn = true
  },
  clear: (state) => {
    state.data = {};
    state.isLoggedIn = false;
  },
  err: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
};

export default reducers;
