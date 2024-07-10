import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    email: "",
    balance: 0,
    user: false ,
    message:""
  },
  reducers: {
    handleLogin: (state, action) => {
      console.log(action.payload); // action.payload içeriğini kontrol edin
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.balance = action.payload.balance; // Balance eklendi
      state.user = true;
      state.message = action.payload.message;
    },
    handleLogout: (state) => {
      state.email = "";
      state.username = "";
      state.balance = 0; // Balance sıfırlandı
      state.user = false;
      localStorage.removeItem("access_token");
      state.message = "";
    }
  }
});

export const { handleLogin, handleLogout } = userSlice.actions;
export default userSlice.reducer;
