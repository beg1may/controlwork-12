import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {PersistGate} from "redux-persist/integration/react";
import { Provider } from 'react-redux';
import {persistor, store} from "./app/store.ts";
import {BrowserRouter} from "react-router-dom";

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </PersistGate>
    </Provider>
)
