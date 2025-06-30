import React, { useState } from 'react';
import styled from 'styled-components';

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
  background: rgba(20, 20, 20, 0.95);
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

const SectionContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: rgba(0, 0, 0, 0.55);
  padding: 40px;
  border-radius: 10px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #fff1d6;
`;

const Text = styled.p`
  font-size: 1.1rem;
  line-height: 1.7;
  color: #f0e6d6;
  margin-bottom: 20px;
`;

const AboutPage = () => {
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
        <SectionContent>
          <Title>About Momona Klubb</Title>
          <Text>
            Momona Klubb is a vibrant social space designed for our community to gather, relax, and enjoy.
          </Text>
          <Text>
            We take pride in our cozy atmosphere, culturally inspired meals, and warm hospitality.
          </Text>
          <Text>
            Stay tuned for upcoming events and feel free to reach out for bookings or collaboration!
          </Text>
        </SectionContent>
      </HeroSection>
    </>
  );
};

export default AboutPage;
