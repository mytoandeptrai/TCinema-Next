import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUserState {
  currentUser: any | null;
}

const initialState: IUserState = {
  currentUser: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<any | null>) => {
      state.currentUser = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
    }
  }
});

export const { setCurrentUser, logout } = authSlice.actions;
export default authSlice.reducer;
