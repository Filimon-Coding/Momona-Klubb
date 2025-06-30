import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';

const HeroSection = styled.section`
  background-image: url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1950&q=80');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  padding-top: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormCard = styled.div`
  background: rgba(0, 0, 0, 0.55);
  padding: 40px;
  border-radius: 10px;
  color: white;
  max-width: 500px;
  width: 100%;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #fff1d6;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;

  input {
    padding: 12px;
    margin-bottom: 15px;
    border-radius: 6px;
    border: none;
    font-size: 1rem;
  }

  button {
    padding: 12px;
    border: none;
    border-radius: 6px;
    background: #ffe9b0;
    color: #333;
    font-weight: bold;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      background: white;
    }
  }
`;

export default function User() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch("http://localhost:5272/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then(res => res.ok ? alert("Bruker registrert!") : alert("Noe gikk galt"))
      .catch(() => alert("Serverfeil"));
  };

  return (
    <>
      <Header />
      <HeroSection>
        <FormCard>
          <Title>Brukerregistrering</Title>
          <StyledForm onSubmit={handleSubmit}>
            <input type="text" name="firstName" placeholder="Fornavn" onChange={handleChange} required />
            <input type="text" name="lastName" placeholder="Etternavn" onChange={handleChange} required />
            <input type="email" name="email" placeholder="E-post" onChange={handleChange} required />
            <input type="tel" name="phone" placeholder="Telefonnummer" onChange={handleChange} required />
            <button type="submit">Send inn</button>
          </StyledForm>
        </FormCard>
      </HeroSection>
      <Footer />
    </>
  );
}
