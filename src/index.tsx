import { ChakraProvider, ColorModeScript, theme } from '@chakra-ui/react';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { FirebaseAppProvider } from 'reactfire';

import { FirebaseComponents } from './components/FirebaseComponents';
import { App } from './containers/App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container);

const firebaseConfig = {
  apiKey: 'AIzaSyBG8TGssPs_39NVTsHPcXVlgeJHwn5x6GU',
  appId: '1:543790644750:web:f3a3803950ed454ec0865f',
  authDomain: 'termoconfort-5d960.firebaseapp.com',
  measurementId: 'G-CT5Q5D7T9E',
  messagingSenderId: '543790644750',
  projectId: 'termoconfort-5d960',
  storageBucket: 'termoconfort-5d960.appspot.com',
};

root.render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <FirebaseComponents>
      <ChakraProvider theme={theme}>
        <ColorModeScript />
        <React.StrictMode>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </React.StrictMode>
      </ChakraProvider>
    </FirebaseComponents>
  </FirebaseAppProvider>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
