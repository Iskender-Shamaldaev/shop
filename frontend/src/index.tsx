import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { persister, store } from './app/store';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { GoogleOAuthProvider } from '@react-oauth/google';
import theme from './theme';
import { PersistGate } from 'redux-persist/integration/react';
import { addInterceptors } from './axiosApi';
import { GOOGLE_CLIENT_ID } from './constants';
import './index.css';
import App from './App';

addInterceptors(store);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <Provider store={store}>
      <PersistGate persistor={persister}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </GoogleOAuthProvider>,
);
