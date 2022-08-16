const reducers = {
  startRequest: (state) => {
    state.isLoading = true;
  },
  endRequest: (state, { payload = true }) => {
    if (payload) state.error = "";
    state.isLoading = false;
  },
  set: (state, action) => {
    state.source = state.genders = action.payload;
  },
  add: (state, action) => {
    state.genders.push(action.payload);
    state.source = state.genders;
  },
  update: (state, action) => {
    console.log("Updating");
    state.genders = state.genders.map((type) =>
      type._id === action.payload._id
        ? { ...type, name: action.payload.name }
        : type
    );
    state.source = state.genders;
  },
  del: (state, action) => {
    state.genders = state.genders.filter(({ _id }) => _id !== action.payload);
    state.source = state.genders;
  },
  err: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  filter: (state, action) => {
    state.genders = state.source.filter(({ name }) => {
      return name.toLowerCase().includes(action.payload.toLowerCase());
    });
  },
};

export default reducers;
