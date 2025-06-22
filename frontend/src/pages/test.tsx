import React, { useState } from 'react';
import styled from 'styled-components';

// Sample dish data
const allDishes = [
  {
    name: 'Injera Special',
    description: 'Ethiopian injera with spicy lentils and vegetables.',
    price: '129 kr',
    image: 'https://images.unsplash.com/photo-1606112219348-204d7d8b94ee',
    category: 'Habesha',
  },
  {
    name: 'Shiro Wat',
    description: 'Chickpea stew served on injera.',
    price: '119 kr',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b',
    category: 'Habesha',
  },
  {
    name: 'Spaghetti Bolognese',
    description: 'Classic Italian pasta with meat sauce.',
    price: '149 kr',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b',
    category: 'Italian',
  },
  {
    name: 'Margherita Pizza',
    description: 'Fresh tomato, basil, mozzarella.',
    price: '139 kr',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b',
    category: 'Italian',
  },
  {
    name: 'Mango Juice',
    description: 'Fresh mango juice, served cold.',
    price: '49 kr',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b',
    category: 'Drinks',
  },
  {
    name: 'Coca Cola',
    description: 'Chilled bottle of Coca Cola.',
    price: '35 kr',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b',
    category: 'Drinks',
  },
];

// Styled components
const PageWrapper = styled.div`
  padding: 30px;
  background: #fff8f0;
  min-height: 100vh;
  font-family: 'Times New Roman', serif;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const Title = styled.h1`
  margin: 0;
`;

const Dropdown = styled.select`
  padding: 8px 12px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 25px;
`;

const Card = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: 0.3s;
  &:hover {
    transform: translateY(-5px);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const CardBody = styled.div`
  padding: 15px;
`;

const DishName = styled.h3`
  margin: 0 0 8px;
`;

const Description = styled.p`
  font-size: 0.95rem;
  color: #555;
`;

const Price = styled.p`
  color: #d2691e;
  font-weight: bold;
  margin-top: 10px;
`;

const TestPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredDishes = selectedCategory === 'All'
    ? allDishes
    : allDishes.filter(dish => dish.category === selectedCategory);

  return (
    <PageWrapper>
      <Header>
        <Title>Momona Klubb Menu</Title>
        <Dropdown
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Habesha">Habesha</option>
          <option value="Italian">Italian</option>
          <option value="Drinks">Drinks</option>
        </Dropdown>
      </Header>

      <MenuGrid>
        {filteredDishes.map((dish, index) => (
          <Card key={index}>
            <CardImage src={dish.image} alt={dish.name} />
            <CardBody>
              <DishName>{dish.name}</DishName>
              <Description>{dish.description}</Description>
              <Price>{dish.price}</Price>
            </CardBody>
          </Card>
        ))}
      </MenuGrid>
    </PageWrapper>
  );
};

export default TestPage;
