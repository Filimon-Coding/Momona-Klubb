import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyle from './GlobalStyle'; // <-- import it here
import MainPage from './pages/home';
import MenuPage from './pages/menu';
import AboutPage from './pages/about';
import ContactPage from './pages/contact';
import UserPage from './pages/user';

function App() {
  return (
    <Router>
      <GlobalStyle /> {/* <-- apply global styles */}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/home" element={<MainPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>
    </Router>
  );
}

export default App;
