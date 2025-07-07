import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import bgImage from '../../components/images/alex-padurariu-mqyMjCTWJyQ-unsplash.jpg';

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
`;

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.55);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const SectionContent = styled.div`
  position: relative;
  z-index: 2;
  background: rgba(0, 0, 0, 0.65);
  padding: 40px;
  border-radius: 10px;
  color: white;
  text-align: center;
  width: 90%;
  max-width: 400px;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #ffe9b0;
  margin-bottom: 20px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 12px;
  font-size: 1rem;
  border-radius: 6px;
  border: none;
`;

const Button = styled.button`
  padding: 12px;
  font-size: 1rem;
  background-color: #ffbb33;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: #e6a821;
  }
`;




export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [passwordHash, setPassword] = useState('');
  const nav = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5272/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, passwordHash })
    });
    if (res.ok){
      const data = await res.json();
      localStorage.setItem('token',data.token);
      localStorage.setItem('adminName',data.firstName);
      nav('/admin');              // Til dashbordet
    }
 else {
      alert('Feil brukernavn/passord');
    }
  };

  return (
    <>
      <Header />
      <Spacer />
      <HeroSection bg={bgImage}>
        <Overlay />
        <SectionContent>
          <Title>Admin Login</Title>
          <StyledForm onSubmit={handleSubmit}>
            <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <Input
              placeholder="Passord"
              type="password"
              value={passwordHash}
              onChange={e => setPassword(e.target.value)}
            />
            <Button type="submit">Logg inn</Button>
          </StyledForm>
        </SectionContent>
      </HeroSection>
      <Footer />
    </>
  );
}
