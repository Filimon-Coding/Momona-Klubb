import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/header/header';
import cocaColaImg from '../components//images/andrey-ilkevich-Qvnohn4GyJA-unsplash.jpg';
import orangeJuiceImg from '../components/images/abhishek-hajare-kkrXVKK-jhg-unsplash.jpg';
import Footer from '../components/footer/footer';



const HeroSection = styled.section`
  background-image: url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1950&q=80');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  padding: 80px 0 60px 0;
  position: relative;
  color: white;
`;
const SectionContent = styled.div`
  display: flex;
  align-items: flex-start;
  background: rgba(0, 0, 0, 0.55);
  border-radius: 10px;
  padding: 40px;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 20px;
  }
`;

const Sidebar = styled.div`
  width: 180px;
  font-weight: bold;

  div {
    margin-bottom: 12px;
    cursor: pointer;
    padding: 6px 12px;
    color: #ffe9b0;
    border-radius: 6px;
    transition: 0.2s;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    &.active {
      background-color: #ffe9b0;
      color: #2f1a0e;
    }
  }
`;

const Content = styled.div`
  flex: 1;
  padding-left: 30px;

  @media (max-width: 768px) {
    padding-left: 0;
    margin-top: 20px;
  }
`;

const Category = styled.h2`
  margin-bottom: 20px;
  color: #fff1d6;
`;

const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 per rad */
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr); /* 2 per rad på nettbrett */
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr; /* 1 per rad på mobil */
  }
`;



const Card = styled.div`
  background:rgb(248, 247, 245);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(160, 82, 45, 0.2);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
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
  color: #4b2e2e;
`;

const Price = styled.div`
  background: #f6c28b;
  color: #3a1f0f;
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
    {
      name: 'Grilled Chicken',
      description: 'Juicy grilled chicken with herbs and seasonal vegetables.',
      image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092',
      price: '169 kr',
    },
    {
      name: 'Veggie Burger',
      description: 'Plant-based burger with lettuce, tomato, and avocado.',
      image: 'https://images.unsplash.com/photo-1550547660-d9450f859349',
      price: '139 kr',
    },
    {
      name: 'Pasta Alfredo',
      description: 'Creamy alfredo pasta with mushrooms and parmesan.',
      image: 'https://images.unsplash.com/photo-1606112219348-204d7d8b94ee',
      price: '159 kr',
    },
    {
      name: 'Tibs (Ethiopian Stir Fry)',
      description: 'Tender beef cubes sautéed with onion, garlic, and pepper.',
      image: 'https://images.unsplash.com/photo-1606112219348-204d7d8b94ee',
      price: '179 kr',
    },
    {
      name: 'Grilled Chicken',
      description: 'Juicy grilled chicken with herbs and seasonal vegetables.',
      image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092',
      price: '169 kr',
    },
    {
      name: 'Veggie Burger',
      description: 'Plant-based burger with lettuce, tomato, and avocado.',
      image: 'https://images.unsplash.com/photo-1550547660-d9450f859349',
      price: '139 kr',
    },
    {
      name: 'Pasta Alfredo',
      description: 'Creamy alfredo pasta with mushrooms and parmesan.',
      image: 'https://images.unsplash.com/photo-1606112219348-204d7d8b94ee',
      price: '159 kr',
    },
    {
      name: 'Tibs (Ethiopian Stir Fry)',
      description: 'Tender beef cubes sautéed with onion, garlic, and pepper.',
      image: 'https://images.unsplash.com/photo-1606112219348-204d7d8b94ee',
      price: '179 kr',
    }
  ],
  Drinks: [
    {
      name: 'Mango Juice',
      description: 'Fresh mango juice, served cold.',
      image: orangeJuiceImg,
      price: '49 kr',
    },
    {
      name: 'Coca Cola',
      description: 'Chilled bottle of Coca Cola.',
      image: cocaColaImg,
      price: '35 kr',
    },
    {
      name: 'Orange Fanta',
      description: 'Refreshing sparkling orange soda.',
      image: orangeJuiceImg,
      price: '35 kr',
    },
    {
      name: 'Water Bottle',
      description: 'Still mineral water, 0.5L.',
      image: orangeJuiceImg,
      price: '25 kr',
    },
    {
      name: 'Cappuccino',
      description: 'Hot cappuccino with milk foam and cinnamon.',
      image: orangeJuiceImg,
      price: '42 kr',
    }
  ],
  Desserts: [
    {
      name: 'Tiramisu',
      description: 'Classic Italian dessert with coffee and mascarpone.',
      image: 'https://images.unsplash.com/photo-1606112219348-204d7d8b94ee',
      price: '69 kr',
    },
    {
      name: 'Baklava',
      description: 'Layered pastry with nuts and honey.',
      image: 'https://images.unsplash.com/photo-1606112219348-204d7d8b94ee',
      price: '55 kr',
    },
    {
      name: 'Fruit Salad',
      description: 'Seasonal fresh fruits served chilled.',
      image: 'https://images.unsplash.com/photo-1606112219348-204d7d8b94ee',
      price: '45 kr',
    },
    {
      name: 'Chocolate Cake',
      description: 'Rich chocolate cake with ganache topping.',
      image: 'https://images.unsplash.com/photo-1606112219348-204d7d8b94ee',
      price: '59 kr',
    }
  ]
};


export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<keyof MenuData>('Main');

  return (
    <>
      <Header />
      <HeroSection>
        <SectionContent>
          <Sidebar>
            {Object.keys(menuData).map((category) => (
              <div
                key={category}
                className={selectedCategory === category ? 'active' : ''}
                onClick={() => setSelectedCategory(category as keyof MenuData)}
              >
                {category}
              </div>
            ))}
          </Sidebar>

          <Content>
            <Category>{selectedCategory}</Category>
            <MenuGrid>
              {menuData[selectedCategory].map((item, idx) => (
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
        </SectionContent>
      </HeroSection>
      <Footer />
    </>
  );
}
