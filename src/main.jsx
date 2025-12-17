import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import UserProvider from './context/UserData';
import { io } from "socket.io-client";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
window.socket = io("rentop-pedia-backend.vercel.app", { withCredentials: true });
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <UserProvider>
    <App />
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={true} closeOnClick theme="colored" />
    </UserProvider>
  // </React.StrictMode>
);
