import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LocationState {
  lat: string;
  lon: string;
}

const initialState: LocationState = {
  lat: "",  // Initial empty string
  lon: "",  // Initial empty string
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLat: (state, action: PayloadAction<string>) => {
      state.lat = action.payload;
    },
    setLon: (state, action: PayloadAction<string>) => {
      state.lon = action.payload;
    },
    clearLocation: (state) => {
      state.lat = "";
      state.lon = "";
    },
  },
});

export const { setLat, setLon, clearLocation } = locationSlice.actions;
export default locationSlice.reducer;
