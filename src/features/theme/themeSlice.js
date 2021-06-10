import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    themeMode: "light",
    themeColor: {
      light: {
        bg: "white",
        color: "black",
        border: "#E2E8F0",
      },
      dark: {
        bg: "black",
        color: "#CBD5E0",
        border: "#2D3748",
      },
    },
  },
  reducers: {
    toggleThemeMode: (state, action) => {
      state.themeMode = action.payload;
    },
  },
});

export const { toggleThemeMode } = themeSlice.actions;

export default themeSlice.reducer;
