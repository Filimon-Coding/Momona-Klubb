import React from 'react';
import styled from 'styled-components';
import Header from '../components/header/header';

const Spacer = styled.div`
  height: 60px;
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
  max-width: 700px;
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

const Info = styled.div`
  margin-bottom: 30px;
  text-align: left;
`;

const Label = styled.h3`
  margin: 10px 0 5px;
  color: #ffe9b0;
`;

const ContactPage = () => {
  return (
    <>
      <Header />
      <Spacer />

      <HeroSection>
        <SectionContent>
          <Title>Contact Us</Title>
          <Info>
            <Label>Address</Label>
            <p>Osterhaus' gate 7B, 0183 Oslo</p>
            <Label>Email</Label>
            <p>contact@momona.no</p>
            <Label>Phone</Label>
            <p>+47 123 45 678</p>
          </Info>
          <p>
            We’d love to hear from you! Whether it’s feedback, questions, or collaboration ideas —
            don’t hesitate to reach out.
          </p>
        </SectionContent>
      </HeroSection>
    </>
  );
};

export default ContactPage;
