const reducers = {
  startRequest: (state) => {
    state.isLoading = true;
  },
  endRequest: (state, { payload = true }) => {
    if (payload) state.error = "";
    state.isLoading = false;
  },
  set: (state, action) => {
    state.source = state.roomCharacteristics = action.payload;
  },
  add: (state, action) => {
    state.roomCharacteristics.push(action.payload);
    state.source = state.roomCharacteristics;
  },
  update: (state, action) => {
    state.roomCharacteristics = state.roomCharacteristics.map((type) =>
      type._id === action.payload._id
        ? { ...type, name: action.payload.name, type: action.payload.type }
        : type
    );
    state.source = state.roomCharacteristics;
  },
  del: (state, action) => {
    state.roomCharacteristics = state.roomCharacteristics.filter(
      ({ _id }) => _id !== action.payload
    );
    state.source = state.roomCharacteristics;
  },
  err: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  filter: (state, action) => {
    state.roomCharacteristics = state.source.filter(({ name }) => {
      return name.toLowerCase().includes(action.payload.toLowerCase());
    });
  },
};

export default reducers;
