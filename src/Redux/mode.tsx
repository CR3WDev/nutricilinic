import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = "search";

const modeReducer = createSlice({
  name: "modeReducer",
  initialState,
  reducers: {
    setMode: (_, { payload }: PayloadAction<string>) => {
      return payload;
    },
  },
});

export default modeReducer.reducer;
export const { setMode } = modeReducer.actions;
export const useMode = (state: any) => {
  return state.modeReducer as string;
};
