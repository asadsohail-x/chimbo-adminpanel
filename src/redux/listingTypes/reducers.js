const reducers = {
  startRequest: (state) => {
    state.isLoading = true;
  },
  endRequest: (state, { payload = true }) => {
    if (payload) state.error = "";
    state.isLoading = false;
  },
  set: (state, action) => {
    state.source = state.listingTypes = action.payload;
  },
  add: (state, action) => {
    state.listingTypes.push(action.payload);
    state.source = state.listingTypes;
  },
  update: (state, action) => {
    console.log("Updating");
    state.listingTypes = state.listingTypes.map((type) =>
      type._id === action.payload._id
        ? { ...type, name: action.payload.name }
        : type
    );
    state.source = state.listingTypes;
  },
  del: (state, action) => {
    state.listingTypes = state.listingTypes.filter(
      ({ _id }) => _id !== action.payload
    );
    state.source = state.listingTypes;
  },
  err: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  filter: (state, action) => {
    state.listingTypes = state.source.filter(({ name }) => {
      return name.toLowerCase().includes(action.payload.toLowerCase());
    });
  },
};

export default reducers;
