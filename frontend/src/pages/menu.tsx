import React, { useState } from 'react';
import styled from 'styled-components';
import Header from './header'; // ✅ shared header

const PageWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #fdf6f0;
`;

const Sidebar = styled.div`
  width: 220px;
  background: #fff4dc;
  padding: 20px;
  font-weight: bold;
  color: #5e412f;
`;

const Content = styled.div`
  flex: 1;
  padding: 30px;
`;

const Category = styled.h2`
  margin-bottom: 15px;
  color: #a0522d;
`;

const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
`;

const Card = styled.div`
  background: #fffdf9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(160, 82, 45, 0.1);
  overflow: hidden;
`;

const CardImage = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
`;

const CardBody = styled.div`
  padding: 15px;
`;

const Name = styled.h3`
  margin: 0 0 8px;
  color: #a0522d;
`;

const Description = styled.p`
  font-size: 0.9rem;
  color: #555;
`;

const Price = styled.div`
  background: #f6c28b;
  color: #4b2e2e;
  font-weight: bold;
  padding: 5px 10px;
  margin-top: 10px;
  display: inline-block;
  border-radius: 5px;
`;

type MenuItem = {
  name: string;
  description: string;
  image: string;
  price: string;
};

type MenuData = {
  [key: string]: MenuItem[];
};

const menuData: MenuData = {
  Main: [
    {
      name: 'Injera Special',
      description: 'Ethiopian injera with spicy lentils and vegetables.',
      image: 'https://images.unsplash.com/photo-1606112219348-204d7d8b94ee',
      price: '129 kr',
    },
    {
      name: 'Spaghetti Bolognese',
      description: 'Italian pasta with meat sauce.',
      image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b',
      price: '149 kr',
    },
  ],
  Drinks: [
    {
      name: 'Mango Juice',
      description: 'Fresh mango juice, served cold.',
      image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b',
      price: '49 kr',
    },
    {
      name: 'Coca Cola',
      description: 'Chilled bottle of Coca Cola.',
      image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b',
      price: '35 kr',
    },
  ],
};

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<keyof MenuData>('Main');

  return (
    <>
      <Header />
      <PageWrapper>
        <Sidebar>
          <div onClick={() => setSelectedCategory('Main')}>Main</div>
          <div onClick={() => setSelectedCategory('Drinks')}>Drinks</div>
        </Sidebar>
        <Content>
          <Category>{selectedCategory}</Category>
          <MenuGrid>
            {menuData[selectedCategory].map((item: MenuItem, idx: number) => (
              <Card key={idx}>
                <CardImage src={item.image} alt={item.name} />
                <CardBody>
                  <Name>{item.name}</Name>
                  <Description>{item.description}</Description>
                  <Price>{item.price}</Price>
                </CardBody>
              </Card>
            ))}
          </MenuGrid>
        </Content>
      </PageWrapper>
    </>
  );
}
