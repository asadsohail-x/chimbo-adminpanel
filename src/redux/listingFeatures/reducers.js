const reducers = {
  startRequest: (state) => {
    state.isLoading = true;
  },
  endRequest: (state, { payload = true }) => {
    if (payload) state.error = "";
    state.isLoading = false;
  },
  set: (state, action) => {
    state.source = state.listingFeatures = action.payload;
  },
  add: (state, action) => {
    state.listingFeatures.push(action.payload);
    state.source = state.listingFeatures;
  },
  update: (state, action) => {
    console.log("Updating");
    state.listingFeatures = state.listingFeatures.map((type) =>
      type._id === action.payload._id
        ? { ...type, name: action.payload.name }
        : type
    );
    state.source = state.listingFeatures;
  },
  del: (state, action) => {
    state.listingFeatures = state.listingFeatures.filter(
      ({ _id }) => _id !== action.payload
    );
    state.source = state.listingFeatures;
  },
  err: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  filter: (state, action) => {
    state.listingFeatures = state.source.filter(({ name }) => {
      return name.toLowerCase().includes(action.payload.toLowerCase());
    });
  },
};

export default reducers;
