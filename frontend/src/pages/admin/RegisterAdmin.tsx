// src/pages/admin/AdminRegister.tsx
import React, { useState } from 'react';
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
  max-width: 450px;
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

const Message = styled.p`
  margin-top: 15px;
  color: #ffe9b0;
`;

export default function AdminRegister() {
  const [form, setForm] = useState({
    email: '',
    passwordHash: '',
    firstName: '',
    lastName: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    const response = await fetch('http://localhost:5272/api/admin/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    if (response.ok) {
      setMessage('Admin registered successfully!');
      setForm({ email: '', passwordHash: '', firstName: '', lastName: '' });
    } else {
      setMessage('Registration failed. Try again.');
    }
  };

  return (
    <>
      <Header />
      <Spacer />
      <HeroSection bg={bgImage}>
        <Overlay />
        <SectionContent>
          <Title>Register Admin</Title>
          <StyledForm onSubmit={handleSubmit}>
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <Input
              name="passwordHash"
              type="password"
              placeholder="Password"
              value={form.passwordHash}
              onChange={handleChange}
              required
            />
            <Input
              name="firstName"
              type="text"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
              required
            />
            <Input
              name="lastName"
              type="text"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
              required
            />
            <Button type="submit">Register</Button>
          </StyledForm>
          {message && <Message>{message}</Message>}
        </SectionContent>
      </HeroSection>
      <Footer />
    </>
  );
}
