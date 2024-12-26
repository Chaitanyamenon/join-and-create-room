import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Room from './pages/Room'; // Component for joining/creating a room

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/:roomId" element={<Dashboard />} />
        <Route path="/room" element={<Room />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;


