import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyle from './GlobalStyle'; // <-- import it here
import MainPage from './pages/home';
import MenuPage from './pages/menu';
import AboutPage from './pages/about';
import ContactPage from './pages/contact';
import GamesPage from './pages/games'
import EventsPage from './pages/events'

import AdminDashboard from './pages/admin/DashboardAdmin'; 
import RequireAuth from './utils/RequireAuth';
import MenuAdmin      from './pages/admin/MenuAdmin';
import Login from './pages/admin/LoginAdmin';
import AdminRegister from './pages/admin/RegisterAdmin';
import EventsAdmin    from './pages/admin/EventsAdmin';

function App() {
  return (
    <Router>
      <GlobalStyle/>

      <Routes>
        {/* ----------------  OFFENTLIG  --------------- */}
        <Route path="/"        element={<MainPage/>}/>
        <Route path="/home"    element={<MainPage/>}/>
        <Route path="/menu"    element={<MenuPage/>}/>
        <Route path="/games"   element={<GamesPage/>}/>
        <Route path="/events"  element={<EventsPage/>}/>
        <Route path="/about"   element={<AboutPage/>}/>
        <Route path="/contact" element={<ContactPage/>}/>

        {/* ----------------  ADMIN  ------------------- */}
        <Route
          path="/admin"
          element={
            <RequireAuth>
              <AdminDashboard/>
            </RequireAuth>
          }
        />
        <Route
          path="/admin/menu"
          element={
            <RequireAuth>
              <MenuAdmin/>
            </RequireAuth>
          }
        />
        <Route
          path="/admin/events"
          element={
            <RequireAuth>
              <EventsAdmin/>
            </RequireAuth>
          }
        />

        {/* ----------------  AUTH  -------------------- */}
        <Route path="/login"           element={<Login/>}/>
        <Route path="/admin-register"  element={<AdminRegister/>}/>
      </Routes>
    </Router>
  );
}


export default App;
