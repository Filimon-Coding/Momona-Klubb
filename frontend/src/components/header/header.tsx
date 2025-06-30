import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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


const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <HeaderWrapper>
        Momona Klubb
        <Icons>
          <span>📍</span>
          <span>🍽️</span>
          <span>📞</span>
          <MenuToggle onClick={() => setShowMenu(!showMenu)}>
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
