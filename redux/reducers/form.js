import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  name: '',
  tel: '',
  email: '',
  description: '',
  files: [],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    saveForm(state, {
      payload: {
        name, tel, email, description,
      },
    }) {
      state.name = name || '';
      state.tel = tel || '';
      state.email = email || '';
      state.description = description || '';
    },
  },
  extraReducers: {

  },
});
