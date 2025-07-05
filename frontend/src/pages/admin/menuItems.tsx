import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

const Container = styled.div`
  padding: 80px 20px 60px;
  max-width: 700px;
  margin: 0 auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  background: #fff9f1;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const TextArea = styled.textarea`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  resize: vertical;
`;

const Button = styled.button`
  background-color: #ff9d00;
  border: none;
  padding: 12px;
  border-radius: 6px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: #e68a00;
  }
`;

export default function AdminPage() {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const token = localStorage.getItem('token');
  
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
          'Authorization': `Bearer ${token}`
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
      <Container>
        <h2>Add Menu Item</h2>
        <Form onSubmit={handleSubmit}>
          <Input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
          <TextArea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
          <Input name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} required />
            <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ccc' }}
            >
            <option value="">-- Select Category --</option>
            <option value="Main">Main</option>
            <option value="Drinks">Drinks</option>
            <option value="Desserts">Desserts</option>
            </select>
          <Input name="price" placeholder="Price (number)" type="number" value={formData.price} onChange={handleChange} required />
          <Button type="submit">Add</Button>
        </Form>
      </Container>
      <Footer />
    </>
  );
}
