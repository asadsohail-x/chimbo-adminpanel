const reducers = {
  startRequest: (state) => {
    state.isLoading = true;
  },
  endRequest: (state, { payload = true }) => {
    if (payload) state.error = "";
    state.isLoading = false;
  },
  set: (state, action) => {
    state.source = state.propertyTypes = action.payload;
  },
  add: (state, action) => {
    state.propertyTypes.push(action.payload);
    state.source = state.propertyTypes;
  },
  update: (state, action) => {
    console.log("Updating");
    state.propertyTypes = state.propertyTypes.map((type) =>
      type._id === action.payload._id
        ? { ...type, name: action.payload.name }
        : type
    );
    state.source = state.propertyTypes;
  },
  del: (state, action) => {
    state.propertyTypes = state.propertyTypes.filter(({ _id }) => _id !== action.payload);
    state.source = state.propertyTypes;
  },
  err: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  filter: (state, action) => {
    state.propertyTypes = state.source.filter(({ name }) => {
      return name.toLowerCase().includes(action.payload.toLowerCase());
    });
  },
};

export default reducers;
