import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  users: [{ name: "John" }, { name: "Jane"}],
  isLoading: true,
  error: null,
};

const url = 'https://randomuser.me/api/?results=5';
export const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, thunkAPI) => {
  try {
    console.log(thunkAPI)
    const response = await fetch(url);
    if(response.ok) {
      const users = await response.json();
      return users;
    }
  }
  catch (error) {
    return thunkAPI.rejectWithValue('Something went wrong. Please check your internet connection and try again.');
  }
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUsers.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.users = action.payload.results;
    },
    [fetchUsers.error]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
  },
});

export default usersSlice.reducer;