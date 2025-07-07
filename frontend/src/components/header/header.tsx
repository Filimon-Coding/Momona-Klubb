import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../images/logo.png';

/* ------------------------------------------------------------------ */
/*  styled components                                                 */
/* ------------------------------------------------------------------ */

const Wrapper = styled.header`
  position: fixed;
  inset: 0 0 auto 0;               /* topp, høyre, bunn, venstre */
  height: 70px;
  padding: 0 30px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background: rgba(25, 25, 25, 0.45);
  backdrop-filter: blur(6px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);

  color: #fff;
  z-index: 1500;
`;

const Brand = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  color: inherit;
  text-decoration: none;

  img { height: 60px; }
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 26px;

  a {
    font-weight: 600;
    color: inherit;
    text-decoration: none;
    transition: opacity .2s;

    &:hover { opacity: .75; }
  }

  /* Skjul på små skjermer – vi viser hamburger i stedet */
  @media (max-width: 820px) { display: none; }
`;

const Icons = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const MenuToggle = styled.div`
  font-size: 30px;
  cursor: pointer;
  user-select: none;

  /* Vis kun på små skjermer */
  @media (min-width: 821px) { display: none; }
`;

const Dropdown = styled.div`
  position: fixed;
  top: 78px;
  right: 30px;

  display: flex;
  flex-direction: column;
  min-width: 200px;

  background: rgba(32, 32, 32, 0.96);
  border-radius: 10px;
  padding: 14px 0;
  box-shadow: 0 6px 14px rgba(0, 0, 0, .45);
  z-index: 2000;

  a {
    padding: 12px 24px;
    color: #fff;
    text-decoration: none;
    transition: background .2s;

    &:hover { background: rgba(255, 255, 255, .12); }
  }
`;

const AdminAvatar = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
`;

const SubMenu = styled.div`
  position: absolute;
  top: 40px;
  right: 0;

  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 170px;

  background: #282828;
  border-radius: 8px;
  padding: 12px 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, .45);
  z-index: 3000;

  a, button{
    background: none;
    border: none;
    color: #fff;
    padding: 9px 20px;
    text-align: left;
    text-decoration: none;
    font-size: .95rem;
    cursor: pointer;
    transition: background .2s;
  }
  a:hover, button:hover{ background: rgba(255,255,255,.10); }
`;

/* ------------------------------------------------------------------ */
/*  component                                                         */
/* ------------------------------------------------------------------ */

const Header: React.FC = () => {
  const [showMobile, setShowMobile] = useState(false);
  const [showAdmin,  setShowAdmin]  = useState(false);

  const navigate   = useNavigate();
  const token      = localStorage.getItem('token');
  const adminName  = localStorage.getItem('adminName') ?? 'Admin';

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('adminName');
    navigate('/login');
  };

  /* sikre at bare én meny er åpen om gangen */
  const toggleMobile = () => { setShowAdmin(false);  setShowMobile(p => !p); };
  const toggleAdmin  = () => { setShowMobile(false); setShowAdmin (p => !p); };

  return (
    <>
      <Wrapper>
        {/* --------- Logo --------- */}
        <Brand to="/home">
          <img src={logo} alt="Momona Klubb logo" />
          Momona&nbsp;Klubb
        </Brand>

        {/* --------- Desktop-nav --------- */}
        <NavLinks>
          <Link to="/home">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/games">Games</Link>
          <Link to="/events">Events</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </NavLinks>

        {/* --------- Ikoner / hamburger --------- */}
        <Icons>
          {token && (
            <div style={{ position: 'relative' }}>
              <AdminAvatar onClick={toggleAdmin}>
                <span role="img" aria-label="admin">👤</span>
                <span>{adminName}</span>
              </AdminAvatar>

              {showAdmin && (
                <SubMenu>
                  <Link to="/admin">Dashboard</Link>
                  <Link to="/admin/menu">Meny-admin</Link>
                  <Link to="/admin/events">Events-admin</Link>
                  <button onClick={logout}>🚪 Logout</button>
                </SubMenu>
              )}
            </div>
          )}
          <MenuToggle onClick={toggleMobile}>
            &#9776;
          </MenuToggle>
        </Icons>
      </Wrapper>

      {/* --------- Mobil-dropdown --------- */}
      {showMobile && (
        <Dropdown>
          <Link to="/home"    onClick={() => setShowMobile(false)}>Home</Link>
          <Link to="/menu"    onClick={() => setShowMobile(false)}>Menu</Link>
          <Link to="/games"   onClick={() => setShowMobile(false)}>Games</Link>
          <Link to="/events"  onClick={() => setShowMobile(false)}>Events</Link>
          <Link to="/about"   onClick={() => setShowMobile(false)}>About</Link>
          <Link to="/contact" onClick={() => setShowMobile(false)}>Contact</Link>
        </Dropdown>
      )}

      {/* Spacer: sørger for at innholdet starter under headeren */}
      <div style={{ height: 70 }} />
    </>
  );
};

export default Header;
