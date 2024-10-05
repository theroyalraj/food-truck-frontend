"use client"
import { Provider } from 'react-redux';
import { store } from '../app/store';
import './globals.css';
import Home from './pages/Home';

function MyApp() {
  return (
    <Provider store={store}>
      <Home/>
    </Provider>
  );
}

export default MyApp;