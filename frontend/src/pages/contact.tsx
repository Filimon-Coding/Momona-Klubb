import React from 'react';
import styled from 'styled-components';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import heroImage from '../components/images/cedar-creation-0OgV2lVj0Ko-unsplash.jpg';

const Spacer = styled.div`
  height: 0px;
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
  max-width: 700px;
  margin: 0 auto;
  background: rgba(0, 0, 0, 0.55);
  padding: 40px;
  border-radius: 10px;
`;
const MapWrapper = styled.div`
  margin-top: 30px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);

  iframe {
    width: 100%;
    height: 300px;
    border: 0;
  }
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

      <HeroSection bg={heroImage}>
        <SectionContent>
          <Title>Contact Us</Title>
          <Info>
            <Label>Address</Label>
            <p>Osterhaus' gate 7B, 0183 Oslo</p>
            <Label>Email</Label>
            <p>alem.tewele7@gmail.com</p>
            <Label>Phone</Label>
            <p>+47 123 45 678</p>
          </Info>
          <p>
            We’d love to hear from you! Whether it’s feedback, questions, or collaboration ideas —
            don’t hesitate to reach out.
          </p>

          <MapWrapper>
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1025.2132631739934!2d10.752189075779792!3d59.917317971617454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46416e6fc48b9a97%3A0x3e5e0cd8ff68b265!2sOsterhaus&#39;%20gate%207B%2C%200183%20Oslo!5e0!3m2!1sen!2sno!4v1680254210553!5m2!1sen!2sno"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </MapWrapper>
        </SectionContent>
      </HeroSection>



      <Footer/>
    </>
  );
};

export default ContactPage;
