import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './access/style/globalStyle.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store, persistor } from './redux/store'
import { InputProvider } from './context/InputContext';
import { ModelProvider } from './context/ModelContext'
import { GenresProvider } from './context/GenresContext'
import MainRoute from './features/MainRoute'
import { PersistGate } from 'redux-persist/integration/react'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
        <ModelProvider>
          <GenresProvider>
            <InputProvider>
              <BrowserRouter>
                <MainRoute />
              </BrowserRouter>
            </InputProvider>
          </GenresProvider>
        </ModelProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
