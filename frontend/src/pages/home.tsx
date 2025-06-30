import React from 'react';
import styled from 'styled-components';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';

const Spacer = styled.div`
  height: 60px;
`;

const HeroSection = styled.section`
  background-image: url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1950&q=80');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  padding-top: 60px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  text-align: center;

  @media (max-width: 768px) {
    padding: 100px 20px 40px 20px;
  }
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 30px;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.7);

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const FloatingButton = styled.a<{ top: string; left: string; shape?: 'circle' | 'square' }>`
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
  width: ${props => props.shape === 'square' ? '120px' : '100px'};
  height: ${props => props.shape === 'square' ? '120px' : '100px'};
  border-radius: ${props => props.shape === 'square' ? '10px' : '50%'};
  background: rgba(26, 25, 25, 0.2);
  border: 4.5px solid white;
  color: rgb(241, 246, 248);
  font-size: 1.8rem;
  text-align: center;
  line-height: ${props => props.shape === 'square' ? '120px' : '100px'};
  text-decoration: none;
  font-weight: bold;
  backdrop-filter: blur(7px);
  transition: 0.3s ease;

  &:hover {
    background: white;
    color: black;
  }

  /* 👇 Mobiltilpasning */
  @media (max-width: 768px) {
    position: static;
    width: 90%;
    height: 60px;
    line-height: 60px;
    border-radius: 12px;
    margin: 10px auto;
    display: block;
    font-size: 1.2rem;
  }
`;


const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;


const MainPage = () => {
  return (
    <>
      <Header />
      <Spacer />
      <HeroSection>
        <HeroTitle>Welcome to Momona Klubb</HeroTitle>
        <ButtonWrapper>
          <FloatingButton href="/menu" top="25%" left="10%">Menu</FloatingButton>
          <FloatingButton href="/availability" top="50%" left="5%">Games</FloatingButton>
          <FloatingButton href="/events" top="65%" left="40%" shape="square">Events</FloatingButton>
          <FloatingButton href="/about" top="30%" left="75%">About</FloatingButton>
          <FloatingButton href="/contact" top="70%" left="80%" shape="square">Contact</FloatingButton>
        </ButtonWrapper>
      </HeroSection>
      <Footer />
    </>
  );
};

export default MainPage;
