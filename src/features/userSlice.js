import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null
};


export const userSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    login: (state, action) => { //the name of the element here in the rerducer object is the action that the reducer act on
      state.user = action.payload;// this will be an object o user information
    },
    logout: (state) => {
      state.user = null;
    },

  }
})
 

export const { login, logout} = userSlice.actions; // these are the actionsb that we dispatch


export default userSlice.reducer;
