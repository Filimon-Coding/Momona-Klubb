import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import heroImage from '../components/images/gwenn-klabbers-2X69LtzVnQE-unsplash.jpg';

/* ---------- global animations ---------- */
const GlobalAnimations = createGlobalStyle`
  @keyframes float1 {
    0%   { transform: translate(0px, 0px); }
    25%  { transform: translate(10px, -20px); }
    50%  { transform: translate(-10px, 60px); }
    75%  { transform: translate(115px, 5px); }
    100% { transform: translate(0px, 0px); }
  }

  @keyframes float2 {
    0%   { transform: translate(0px, 0px); }
    20%  { transform: translate(-15px, -10px); }
    40%  { transform: translate(10px, 65px); }
    60%  { transform: translate(-10px, 5px); }
    80%  { transform: translate(115px, -15px); }
    100% { transform: translate(0px, 0px); }
  }

  @keyframes float3 {
    0%   { transform: translate(0px, 0px); }
    33%  { transform: translate(120px, 60px); }
    66%  { transform: translate(-15px, -10px); }
    100% { transform: translate(0px, 0px); }
  }
`;

/* ---------- layout ---------- */
const Spacer = styled.div`
  height: 60px;
`;

const HeroSection = styled.section<{ bg: string }>`
  background-image: url(${props => props.bg});
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

/* ---------- floating buttons ---------- */
const FloatingButton = styled.a<{
  top: string;
  left: string;
  shape?: 'circle' | 'square';
  animationName: string;
  animationDelay: string;
}>`
  position: absolute;
  top: ${p => p.top};
  left: ${p => p.left};
  width: ${p => (p.shape === 'square' ? '120px' : '100px')};
  height: ${p => (p.shape === 'square' ? '120px' : '100px')};
  border-radius: ${p => (p.shape === 'square' ? '10px' : '50%')};
  background: rgba(26, 25, 25, 0.2);
  border: 4.5px solid white;
  color: rgb(241, 246, 248);
  font-size: 1.8rem;
  text-align: center;
  line-height: ${p => (p.shape === 'square' ? '120px' : '100px')};
  text-decoration: none;
  font-weight: bold;
  backdrop-filter: blur(7px);
  transition: 0.3s ease;

  animation: ${p => p.animationName} 10s ease-in-out infinite;
  animation-delay: ${p => p.animationDelay};

  &:hover {
    background: white;
    color: black;
    transform: scale(1.08);
  }

  @media (max-width: 768px) {
    position: static;
    width: 90%;
    height: 60px;
    line-height: 60px;
    border-radius: 12px;
    margin: 10px auto;
    display: block;
    font-size: 1.2rem;
    animation: none;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

/* ---------- component ---------- */
const MainPage = () => {
  return (
    <>
      <GlobalAnimations />
      <Header />
      <Spacer />
      <HeroSection bg={heroImage}>
        <HeroTitle>Welcome to Momona Klubb</HeroTitle>
        <ButtonWrapper>
          <FloatingButton href="/menu"    top="25%" left="10%" animationName="float1" animationDelay="0s">Menu</FloatingButton>
          <FloatingButton href="/games"   top="50%" left="5%"  animationName="float2" animationDelay="1.2s">Games</FloatingButton>
          <FloatingButton href="/events"  top="65%" left="40%" animationName="float3" animationDelay="0.6s" shape="square">Events</FloatingButton>
          <FloatingButton href="/about"   top="30%" left="75%" animationName="float2" animationDelay="0.3s">About</FloatingButton>
          <FloatingButton href="/contact" top="70%" left="80%" animationName="float1" animationDelay="1s" shape="square">Contact</FloatingButton>
        </ButtonWrapper>
      </HeroSection>
      <Footer />
    </>
  );
};

export default MainPage;
