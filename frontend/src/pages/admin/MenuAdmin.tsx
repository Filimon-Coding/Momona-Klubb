import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import bgImage from '../../components/images/alex-padurariu-mqyMjCTWJyQ-unsplash.jpg';

const HeroSection = styled.section<{ bg: string }>`
  background-image: url(${props => props.bg});
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  padding-top: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
`;

const Container = styled.div`
  position: relative;
  z-index: 2;
  max-width: 700px;
  width: 90%;
  background: rgba(0, 0, 0, 0.65);
  padding: 40px;
  border-radius: 12px;
  color: #fff;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.4);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 6px;
  border: none;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  padding: 12px;
  border-radius: 6px;
  border: none;
  resize: vertical;
  font-size: 1rem;
`;

const Select = styled.select`
  padding: 12px;
  border-radius: 6px;
  border: none;
  font-size: 1rem;
`;

const Button = styled.button`
  background-color: #ff9d00;
  border: none;
  padding: 14px;
  border-radius: 6px;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background-color: #e68a00;
  }
`;

const PreviewImage = styled.img`
  max-width: 100%;
  border-radius: 8px;
  margin-top: 10px;
`;

export default function MenuAdminAdd() {
  const token = localStorage.getItem('token');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    category: '',
    price: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formDataImage = new FormData();
    formDataImage.append('file', file);

    try {
      const res = await fetch('http://localhost:5272/api/upload/image', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formDataImage
      });

      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      setFormData(prev => ({ ...prev, image: data.imageUrl }));
    } catch (err) {
      alert('Failed to upload image');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      price: parseInt(formData.price),
      isHidden: false
    };

    try {
      const response = await fetch('http://localhost:5272/api/menuitems', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert('Menu item added!');
        setFormData({ name: '', description: '', image: '', category: '', price: '' });
      } else {
        const errText = await response.text();
        alert('Failed to add item.\n' + errText);
      }
    } catch (error) {
      alert('Error: ' + error);
    }
  };

  return (
    <>
      <Header />
      <HeroSection bg={bgImage}>
        <Overlay />
        <Container>
          <h2 style={{ marginBottom: '20px', color: '#ffe9b0' }}>Add Menu Item</h2>
          <Form onSubmit={handleSubmit}>
            <Input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
            <TextArea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
            <Input name="price" placeholder="Price (number)" type="number" value={formData.price} onChange={handleChange} required />

            <Select name="category" value={formData.category} onChange={handleChange} required>
              <option value="">-- Select Category --</option>
              <option value="Main">Main</option>
              <option value="Drinks">Drinks</option>
              <option value="Desserts">Desserts</option>
            </Select>

            <Input type="file" accept="image/*" onChange={handleImageUpload} />
            <Input name="image" placeholder="Or paste image URL" value={formData.image} onChange={handleChange} />

            {formData.image && <PreviewImage src={formData.image} alt="preview" />}
            <Button type="submit">Add</Button>
          </Form>
        </Container>
      </HeroSection>
      <Footer />
    </>
  );
}
