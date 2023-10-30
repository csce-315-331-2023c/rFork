import React from 'react';
import logo from './logo.svg';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Kiosk from './pages/Kiosk';
import MenuBoard from './pages/MenuBoard';
import NotFound from './pages/NotFound';
import ManagerDashboard from './pages/ManagerDashboard';
import CashRegister from './pages/CashRegister';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Login} />
        <Route path='/kiosk' Component={Kiosk} />
        <Route path='/menu-board' Component={MenuBoard} />
        <Route path='/manager-dashboard' Component={ManagerDashboard} />
        <Route path='/cash-register' Component={CashRegister} />
        <Route path='/*' Component={NotFound} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
