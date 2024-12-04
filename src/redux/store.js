import { configureStore } from "@reduxjs/toolkit";

// Placeholder reducer
const placeholderReducer = (state = {}, action) => state;

const store = configureStore({
  reducer: {
    placeholder: placeholderReducer, // Add the placeholder reducer
  },
});

export default store;
