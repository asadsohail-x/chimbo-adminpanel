const reducers = {
  startRequest: (state) => {
    state.isLoading = true;
  },
  endRequest: (state, { payload = true }) => {
    if (payload) state.error = "";
    state.isLoading = false;
  },
  set: (state, action) => {
    state.source = state.specifications = action.payload;
  },
  add: (state, action) => {
    state.specifications.push(action.payload);
    state.source = state.specifications;
  },
  update: (state, action) => {
    state.specifications = state.specifications.map((type) =>
      type._id === action.payload._id
        ? { ...type, name: action.payload.name, type: action.payload.type }
        : type
    );
    state.source = state.specifications;
  },
  del: (state, action) => {
    state.specifications = state.specifications.filter(
      ({ _id }) => _id !== action.payload
    );
    state.source = state.specifications;
  },
  err: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  filter: (state, action) => {
    state.specifications = state.source.filter(({ name }) => {
      return name.toLowerCase().includes(action.payload.toLowerCase());
    });
  },
};

export default reducers;
