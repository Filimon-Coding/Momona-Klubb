import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyle from './GlobalStyle'; // <-- import it here
import MainPage from './pages/home';
import MenuPage from './pages/menu';
import AboutPage from './pages/about';
import ContactPage from './pages/contact';
import GamesPage from './pages/games'
import EventsPage from './pages/events'

import UserPage from './pages/user';
import RequireAuth from './utils/RequireAuth';
import AdminPage from './pages/admin/menuItems';
import Login from './pages/admin/login';
import AdminRegister from './pages/admin/adminRegister';
import EventsAdmin from './pages/admin/EventsAdmin';

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
        <Route path="/games" element={<GamesPage />} />
        <Route path="/events" element={<EventsPage />} />

        
        <Route path="/admin" element={
          <RequireAuth>
          <AdminPage />
          </RequireAuth>
        } />



        <Route path="/login" element={<Login />} />
        <Route path="/admin-register" element={<AdminRegister />} />
        <Route
            path="/admin/events"
            element={
              <RequireAuth>
                <EventsAdmin/>
              </RequireAuth>
            }
          />


      </Routes>
    </Router>
  );
}

export default App;
