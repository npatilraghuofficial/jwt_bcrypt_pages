import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/register';
import Orders from './components/Orders';
import ViewOrders from './components/ViewOrders';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/view-order" element={<ViewOrders />} />



      </Routes>
    </Router>
  );
};

export default App;
