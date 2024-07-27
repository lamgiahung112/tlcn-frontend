import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SessionSlice {
  sessionId: string;
}

const initialState: SessionSlice = {
  sessionId: "",
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    auth: (state, action: PayloadAction<string>) => {
      state.sessionId = action.payload;
      localStorage.setItem("__session__", state.sessionId);
    },
    removeAuth: (state) => {
      state.sessionId = "";
      localStorage.removeItem("__session__");
    },
  },
});

export default sessionSlice;
export const { auth, removeAuth } = sessionSlice.actions;
