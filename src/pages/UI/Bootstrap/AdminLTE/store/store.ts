import {configureStore} from '@reduxjs/toolkit';

import {authSlice} from 'pages/UI/Bootstrap/AdminLTE/store/reducers/auth';
import {uiSlice} from 'pages/UI/Bootstrap/AdminLTE/store/reducers/ui';
//import {createLogger} from 'redux-logger';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    ui: uiSlice.reducer
  },
 /* middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware().concat(createLogger())
  ]*/
});

export default store;
