import { createAsyncThunk } from '@reduxjs/toolkit';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

export const submitForm = createAsyncThunk(
  'submitForm',
  (_, { dispatch, getState }) => {

  },
);
