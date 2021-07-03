import { configureStore } from "@reduxjs/toolkit";

import peopleSlice from "./peopleSlice";

const store = configureStore({
  reducer: { people: peopleSlice.reducer },
});

export default store;
type RootState = ReturnType<typeof store.getState>;
export const selectPeople = (state: RootState) => state.people.people;
