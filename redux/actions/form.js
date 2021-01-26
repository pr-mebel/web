import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

export const SAVE_FORM = 'SAVE_FORM';
export const OPEN_FORM_SUBMIT_POPUP = 'OPEN_FORM_SUBMIT_POPUP';
export const CLOSE_FORM_SUBMIT_POPUP = 'CLOSE_FORM_SUBMIT_POPUP';
export const INIT_FILE_UPLOAD = 'INIT_FILE_UPLOAD';
export const UPDATE_FILE_UPLOAD_PROGRESS = 'UPDATE_FILE_UPLOAD_PROGRESS';
export const SET_ERROR_IN_FILE_UPLOAD = 'SET_ERROR_IN_FILE_UPLOAD';
export const EMAIL_SENT = 'EMAIL_SENT';

export const submitForm = () => async (dispatch, getState) => {
  const firestore = firebase.firestore();
  const storageRef = firebase.storage().ref();
  const refs = [];

  dispatch({
    type: OPEN_FORM_SUBMIT_POPUP,
  });

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
        dispatch({
          type: EMAIL_SENT,
        });
        setTimeout(() => {
          dispatch({
            type: CLOSE_FORM_SUBMIT_POPUP,
          });
        }, 5000);
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
      dispatch({
        type: EMAIL_SENT,
      });
      setTimeout(() => {
        dispatch({
          type: CLOSE_FORM_SUBMIT_POPUP,
        });
      }, 5000);
    });
  }
};

export const saveForm = (content) => ({
  type: SAVE_FORM,
  payload: content,
});

export const uploadFiles = (files) => (dispatch) => {
  const storageRef = firebase.storage().ref();
  const filesArray = [...files];

  filesArray.forEach((file) => {
    dispatch({
      type: INIT_FILE_UPLOAD,
      payload: file.name,
    });
  });

  filesArray.forEach(async (file, index) => {
    const imageRef = storageRef.child(file.name);
    const uploadTask = imageRef.put(file);

    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      dispatch({
        type: UPDATE_FILE_UPLOAD_PROGRESS,
        payload: {
          index,
          name: file.name,
          progress,
        },
      });
    }, (error) => {
      dispatch({
        type: SET_ERROR_IN_FILE_UPLOAD,
        payload: {
          index,
          name: file.name,
          error,
        },
      });
    });
  });
};

export const closeFormSubmitPopup = () => ({
  type: CLOSE_FORM_SUBMIT_POPUP,
});

export const openFormSubmitPopup = () => ({
  type: OPEN_FORM_SUBMIT_POPUP,
});
