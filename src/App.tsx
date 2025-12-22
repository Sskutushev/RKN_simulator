import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserDataProvider } from './context/UserDataContext';
import Home from './pages/Home';
import Wheel from './pages/Wheel';
import './globals.css';

function App() {
  return (
    <UserDataProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/wheel" element={<Wheel />} />
          </Routes>
        </div>
      </Router>
    </UserDataProvider>
  );
}

export default App;