const reducers = {
  startRequest: (state) => {
    state.isLoading = true;
  },
  endRequest: (state, { payload = true }) => {
    if (payload) state.error = "";
    state.isLoading = false;
  },
  set: (state, action) => {
    state.source = state.heatingTypes = action.payload;
  },
  add: (state, action) => {
    state.heatingTypes.push(action.payload);
    state.source = state.heatingTypes;
  },
  update: (state, action) => {
    console.log("Updating");
    state.heatingTypes = state.heatingTypes.map((type) =>
      type._id === action.payload._id
        ? { ...type, name: action.payload.name }
        : type
    );
    state.source = state.heatingTypes;
  },
  del: (state, action) => {
    state.heatingTypes = state.heatingTypes.filter(({ _id }) => _id !== action.payload);
    state.source = state.heatingTypes;
  },
  err: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  filter: (state, action) => {
    state.heatingTypes = state.source.filter(({ name }) => {
      return name.toLowerCase().includes(action.payload.toLowerCase());
    });
  },
};

export default reducers;
