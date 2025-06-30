import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/header/header'; 

const HeaderBar = styled.div`
  background: rgba(0, 0, 0, 0.4);
  color: white;
  backdrop-filter: blur(6px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  font-size: 1.4rem;
  font-weight: bold;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

const Spacer = styled.div`
  height: 60px;
`;

const Icons = styled.div`
  display: flex;
  gap: 15px;
`;

const MenuToggle = styled.div`
  cursor: pointer;
  font-size: 24px;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 60px;
  right: 30px;
  background: rgba(20, 20, 20, 0.95); /* Dark + slight transparency */
  color: white;
  border-radius: 10px;
  padding: 10px 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  min-width: 180px;
  z-index: 999;

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


const HeroSection = styled.section`
  background-image: url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1950&q=80');
  background-size: cover;
  background-position: center;
  height: 100vh;
  padding-top: 60px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 30px;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.7);
`;

const FloatingButton = styled.a<{ top: string; left: string; shape?: 'circle' | 'square' }>`
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
  width: ${props => props.shape === 'square' ? '120px' : '100px'};
  height: ${props => props.shape === 'square' ? '120px' : '100px'};
  border-radius: ${props => props.shape === 'square' ? '10px' : '50%'};
  background: rgba(139, 137, 137, 0.2);
  border: 4.5px solid white;
  color:rgb(209, 215, 218);
  font-size: 1.8rem; 
  text-align: center;
  line-height: ${props => props.shape === 'square' ? '120px' : '100px'};
  text-decoration: none;
  font-weight: bold;
  backdrop-filter: blur(4px);
  transition: 0.3s ease;

  &:hover {
    background: white;
    color: black;
  }
`;

const MainPage = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <HeaderBar>
        Momona Klubb
        <Icons>
          <span>📍</span>
          <span>🍽️</span>
          <span>📞</span>
          <MenuToggle onClick={() => setShowMenu(!showMenu)}>&#9776;</MenuToggle>
        </Icons>
      </HeaderBar>

      <Spacer />

      {showMenu && (
        <DropdownMenu>
          <a href="/menu">Menu</a>
          <a href="/availability">Check Availability</a>
          <a href="/events">Events</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </DropdownMenu>
      )}

      <HeroSection>
        <HeroTitle>Welcome to Momona Klubb</HeroTitle>
        <FloatingButton href="/menu" top="25%" left="10%">Menu</FloatingButton>
        <FloatingButton href="/availability" top="50%" left="5%">Games</FloatingButton>
        <FloatingButton href="/events" top="65%" left="40%" shape="square">Events</FloatingButton>
        <FloatingButton href="/about" top="30%" left="75%">About</FloatingButton>
        <FloatingButton href="/contact" top="70%" left="80%" shape="square">Contact</FloatingButton>
      </HeroSection>
    </>
  );
};



export default MainPage;
