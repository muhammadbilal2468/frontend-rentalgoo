import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_BASE_URL from "../config/config";

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const LoginUser = createAsyncThunk(
  "user/LoginUser",
  async (user, thunkAPI) => {
    try {
      const resp = await axios.post(`${API_BASE_URL}/login`, {
        email: user.email,
        password: user.password,
      });
      return resp.data;
    } catch (error) {
      if (error.response) {
        const message = error.response.data.msg;
        console.log(error.response.data.msg);
        console.log(API_BASE_URL);
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

export const RegisterUser = createAsyncThunk(
  "user/RegisterUser",
  async (req, thunkAPI) => {
    try {
      const resp = await axios.post(`${API_BASE_URL}/register`, {
        name: req.name,
        email: req.email,
        password: req.password,
        confPassword: req.confPassword,
      });
      return resp.data;
    } catch (error) {
      if (error.response) {
        const message = error.response.data.msg;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

export const MeUser = createAsyncThunk("user/MeUser", async (_, thunkAPI) => {
  try {
    const resp = await axios.get(`${API_BASE_URL}/me`);
    return resp.data;
  } catch (error) {
    if (error.response) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
});

export const LogoutUser = createAsyncThunk("user/LogoutUser", async () => {
  await axios.delete(`${API_BASE_URL}/logout`);
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    // ----- LOGIN -----
    builder.addCase(LoginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(LoginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(LoginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // ----- ME -----
    builder.addCase(MeUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(MeUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(MeUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // ----- REGISTER -----
    builder.addCase(RegisterUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(RegisterUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(RegisterUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
