const reducers = {
  startRequest: (state) => {
    state.isLoading = true;
  },
  endRequest: (state, { payload = true }) => {
    if (payload) state.error = "";
    state.isLoading = false;
  },
  set: (state, action) => {
    state.source = state.occupationTypes = action.payload;
  },
  add: (state, action) => {
    state.occupationTypes.push(action.payload);
    state.source = state.occupationTypes;
  },
  update: (state, action) => {
    console.log("Updating");
    state.occupationTypes = state.occupationTypes.map((type) =>
      type._id === action.payload._id
        ? { ...type, name: action.payload.name }
        : type
    );
    state.source = state.occupationTypes;
  },
  del: (state, action) => {
    state.occupationTypes = state.occupationTypes.filter(
      ({ _id }) => _id !== action.payload
    );
    state.source = state.occupationTypes;
  },
  err: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  filter: (state, action) => {
    state.occupationTypes = state.source.filter(({ name }) => {
      return name.toLowerCase().includes(action.payload.toLowerCase());
    });
  },
};

export default reducers;
