import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // ✅ FIXED
import styled from 'styled-components';
import logo from '../images/logo.png';



const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(92, 88, 88, 0.4);
  color: white;
  backdrop-filter: blur(6px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  font-size: 1.4rem;
  font-weight: bold;
  z-index: 1500; /* Lower than dropdown but above page */
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  img {
    height: 60px;
    width: auto;
  }
`;

const Spacer = styled.div`
  height: 60px;
`;

const Icons = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const MenuToggle = styled.div`
  cursor: pointer;
  font-size: 24px;
`;

const DropdownMenu = styled.div`
  position: fixed; 
  top: 60px;
  right: 30px;
  background: rgba(51, 48, 48, 0.95);
  color: white;
  border-radius: 10px;
  padding: 10px 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  min-width: 180px;
  z-index: 2000; /* must be higher than HeroSection or floating buttons */

  a {
    padding: 10px 20px;
    color: white;
    text-decoration: none;
    transition: background 0.2s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  }
`;

const RightArea = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  background: #ff9d00;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
`;

const Name = styled.span`
  color: white;
  font-size: 1rem;
`;


const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showAdminDropdown, setShowAdminDropdown] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const adminName = localStorage.getItem('adminName');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('adminName');
    navigate('/login');
  };

  return (
    <>
      <HeaderWrapper>
        <Link to="/home" style={{ textDecoration: 'none', color: 'white' }}>
        <Brand>
            <img src={logo} alt="Momona Klubb Logo" />
            Momona Klubb
        </Brand>
        </Link>


        <Icons>
  {/* Ikoner i midten */}
  <span>📍</span>
  <span>🍽️</span>
  <span>📞</span>

  {/* Login eller Admin */}
  {token ? (
    <div style={{ position: 'relative' }}>
      <div
        onClick={() => {
          setShowMenu(false);
          setShowAdminDropdown(prev => !prev);
        }}
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
      >
        <span>🧑</span>
        <span>{adminName}</span>
      </div>

      {showAdminDropdown && (
        <div style={{
          position: 'absolute',
          top: '35px',
          right: 0,
          background: '#333',
          padding: '10px',
          borderRadius: '8px',
          zIndex: 3000
        }}>
          <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
            🚪 Logout
          </button>
        </div>
      )}
    </div>
  ) : (
    <span
      style={{ cursor: 'pointer' }}
      onClick={() => {
        setShowAdminDropdown(false);
        setShowMenu(false);
        window.location.href = '/login';
      }}
      
    >
      🔐
    </span>
  )}

  {/* Hamburger */}
  <MenuToggle
    onClick={() => {
      setShowAdminDropdown(false);
      setShowMenu(prev => !prev);
    }}
  >
    &#9776;
  </MenuToggle>
</Icons>



      </HeaderWrapper>

      {showMenu && (
        <DropdownMenu>
          
          <Link to="/home">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/user">Register</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </DropdownMenu>
      )}

      <Spacer />
    </>
  );
};

export default Header;
