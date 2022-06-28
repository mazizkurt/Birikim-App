import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

import Auth from './pages/auth';
import Home from './pages/home';

import 'react-toastify/dist/ReactToastify.css';
import './styles/App.scss';
import Toastify from './components/toastify';
import { Provider } from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react'
import store, { persistor } from './redux/app/store';


export default function App() {
  return (
    <Provider store={store}>
    {/* Asynchronously persist redux stores and show `SplashScreen` while it's loading. */}
    <PersistGate persistor={persistor} loading={<div>Yükleniyor...</div>}>
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/home" element={<Home />} />
      </Routes>
      <Toastify />
    </Router>
    </PersistGate>
    </Provider>
  );
}
