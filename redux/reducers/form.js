import { createReducer, createAsyncThunk, createAction } from '@reduxjs/toolkit';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

export const openFormSubmitPopup = createAction('open_form_submit_popup');
export const closeFormSubmitPopup = createAction('close_form_submit_popup');
export const emailSent = createAction('email_sent');
export const saveForm = createAction('save_form');
export const initFileUpload = createAction('init_file_upload', (file) => file.name);

export const updateFileUploadProgress = createAction(
  'update_file_upload_progress',
  (name, index, progress) => ({
    name,
    index,
    progress,
  }),
);

export const setErrorInFileUpload = createAction(
  'set_error_in_file_upload',
  (name, index, error) => ({
    name,
    index,
    error,
  }),
);

export const submitForm = createAsyncThunk(
  'submit_form',
  (_, { dispatch, getState }) => {
    const firestore = firebase.firestore();
    const storageRef = firebase.storage().ref();
    const refs = [];

    dispatch(openFormSubmitPopup());

    const {
      email,
      name,
      tel,
      description,
      files,
    } = getState().form;

    if (files) {
      [...files].forEach((file) => {
        const fileRef = storageRef.child(file.name);
        refs.push(fileRef.getDownloadURL());
      });

      Promise.all(refs).then((fileLinks) => {
        const attachments = fileLinks.map((fileLink, i) => ({
          filename: [...files][i].name,
          path: fileLink,
        }));

        firestore.collection('mail').add({
          to: 'zakaz@pr-mebel.com',
          replyTo: email || 'zakaz@pr-mebel.com',
          message: {
            subject: `Расчет | ${name} | ${tel}`,
            html: `
            <p><strong>Имя:</strong><br>${name}</p>
            <p><strong>Телефон:</strong><br>${tel}</p>
            ${email && `<p><strong>Почта:</strong><br>${email}</p>`}
            ${description && `<p><strong>Описание:</strong><br>${description}</p>`}
          `,
            attachments,
          },
        }).then(() => {
          dispatch(emailSent());
          setTimeout(() => {
            dispatch(closeFormSubmitPopup());
          }, 4000);
        });
      });
    } else {
      firestore.collection('mail').add({
        to: 'zakaz@pr-mebel.com',
        replyTo: email || 'zakaz@pr-mebel.com',
        message: {
          subject: `Расчет | ${name} | ${tel}`,
          html: `
          <p><strong>Имя:</strong><br>${name}</p>
          <p><strong>Телефон:</strong><br>${tel}</p>
          ${email && `<p><strong>Почта:</strong><br>${email}</p>`}
          ${description && `<p><strong>Описание:</strong><br>${description}</p>`}
          `,
        },
      }).then(() => {
        dispatch(emailSent());
        setTimeout(() => {
          dispatch(closeFormSubmitPopup());
        }, 4000);
      });
    }
  },
);

export const uploadFiles = createAsyncThunk(
  'upload_files',
  (files, { dispatch }) => {
    const storageRef = firebase.storage().ref();
    const filesArray = [...files];

    filesArray.forEach((file) => {
      dispatch(initFileUpload(file));
    });

    filesArray.forEach(async (file, index) => {
      const imageRef = storageRef.child(file.name);
      const uploadTask = imageRef.put(file);

      uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        dispatch(updateFileUploadProgress(
          file.name,
          index,
          progress,
        ));
      }, (error) => {
        dispatch(setErrorInFileUpload(
          file.name,
          index,
          error,
        ));
      });
    });
  },
);

const initialState = {
  isOpen: false,
  name: '',
  tel: '',
  email: '',
  description: '',
  files: [],
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(saveForm, (state, {
      payload: {
        name, tel, email, description,
      },
    }) => {
      state.name = name || '';
      state.email = email || '';
      state.tel = tel || '';
      state.description = description || '';
    })
    .addCase(initFileUpload, (state, { payload }) => {
      state.files = [...state.files, {
        name: payload,
        progress: 0,
      }];
    })
    .addCase(updateFileUploadProgress, (state, { payload: { index, progress, name } }) => {
      state.files = [
        ...state.files.slice(0, index),
        { name, progress },
        ...state.files.sclie(index + 1),
      ];
    })
    .addCase(setErrorInFileUpload, (state, { payload: { index, name, error } }) => {
      state.files = [
        ...state.files.slice(0, index),
        { name, error },
        ...state.files.sclie(index + 1),
      ];
    })
    .addCase(emailSent, (state) => { state.isOpen = true; })
    .addCase(openFormSubmitPopup, (state) => { state.isOpen = true; })
    .addCase(closeFormSubmitPopup, (state) => { state.isOpen = false; });
});
