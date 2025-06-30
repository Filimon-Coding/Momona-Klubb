import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/header/header';

const Wrapper = styled.div`
  padding: 60px 20px;
  max-width: 500px;
  margin: 0 auto;
  background: #fdf6f0;
  color: #4e342e;
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
      <Wrapper>
        <h2>Brukerregistrering</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="firstName" placeholder="Fornavn" onChange={handleChange} required /><br />
          <input type="text" name="lastName" placeholder="Etternavn" onChange={handleChange} required /><br />
          <input type="email" name="email" placeholder="E-post" onChange={handleChange} required /><br />
          <input type="tel" name="phone" placeholder="Telefonnummer" onChange={handleChange} required /><br />
          <button type="submit">Send inn</button>
        </form>
      </Wrapper>
    </>
  );
}
