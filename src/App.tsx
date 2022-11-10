import React from 'react';
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';
import './App.scss';
import Footer from './Common/Footer';
import NavBar from './Components/Nav/NavBar';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Outlet />
      <ToastContainer position="top-center" />
      <Footer version="1.0" />
    </div>
  );
}

export default App;
