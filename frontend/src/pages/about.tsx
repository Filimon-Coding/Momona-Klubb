import React from 'react';
import styled from 'styled-components';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import heroImage from '../components/images/jalo-hotel-0fV_upUSaTs-unsplash.jpg';

const Spacer = styled.div`
  height: 60px;
`;

const HeroSection = styled.section<{ bg: string }>`
  background-image: url(${props => props.bg});
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
  return (
    <>
      <Header />
      <Spacer />

      <HeroSection bg={heroImage}>
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
      <Footer />
    </>
  );
};

export default AboutPage;
