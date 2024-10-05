import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  distance: string;
  unit: string;
  query: string;
}

const initialState: SearchState = {
  distance: "",
  unit: "km",
  query: "",
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
      setDistanceRedux: (state, action: PayloadAction<string>) => {
        state.distance = action.payload;
      },
      setUnit: (state, action: PayloadAction<string>) => {
        state.unit = action.payload;
      },
      setQuery: (state, action: PayloadAction<string>) => {
        state.query = action.payload;
      },
    },
  });
  
  export const { setDistanceRedux, setUnit, setQuery } = searchSlice.actions;
  export default searchSlice.reducer;