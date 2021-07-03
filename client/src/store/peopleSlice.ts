import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IPeople } from "../interfaces/people";

interface PeopleType {
  people: IPeople[];
}

const initialState: PeopleType = {
  people: [],
};

const peopleSlice = createSlice({
  name: "people",
  initialState,
  reducers: {
    setPeople: (state, action: PayloadAction<IPeople[]>) => {
      state.people = action.payload;
    },
  },
});

export const peopleActions = peopleSlice.actions;

export default peopleSlice;
