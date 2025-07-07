import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import heroImage from '../components/images/eugene-nelmin-fIij-cL9XTA-unsplash.jpg';

// ---------- Styled Components ----------

const HeroSection = styled.section<{ bg: string }>`
  background-image: url(${props => props.bg});
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
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div<{ dimmed?: boolean }>`
  background: ${props => (props.dimmed ? '#eee' : 'rgb(248, 247, 245)')};
  opacity: ${props => (props.dimmed ? 0.6 : 1)};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(160, 82, 45, 0.2);
  transition: transform 0.2s;
  position: relative;

  &:hover {
    transform: translateY(-5px);
  }
`;

const HiddenLabel = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
  background: #333;
  color: white;
  padding: 3px 6px;
  font-size: 12px;
  border-radius: 4px;
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

// ---------- Type Definitions ----------

type MenuItem = {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
  price: number;
  isHidden: boolean;
};

// ---------- Component ----------

export default function MenuPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Main');
  const [editId, setEditId] = useState<number | null>(null);
  const [editedItem, setEditedItem] = useState<Partial<MenuItem>>({});
  const [uploadingImageId, setUploadingImageId] = useState<number | null>(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const endpoint = token
      ? 'http://localhost:5272/api/menuitems/admin'
      : 'http://localhost:5272/api/menuitems';
  
    fetch(endpoint, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    })
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.error('Error fetching items', err));
  }, []);
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedItem({ ...editedItem, [e.target.name]: e.target.value });
  };

  const updateItem = async (updated: MenuItem) => {
    const res = await fetch(`http://localhost:5272/api/menuitems/${updated.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updated)
    });

    if (res.ok) {
      const data = await res.json();
      setItems(prev => prev.map(i => i.id === data.id ? data : i));
    } else {
      alert('Error updating item');
    }
  };

  const handleSave = (id: number) => {
    const original = items.find(i => i.id === id);
    if (!original) return;

    updateItem({ ...original, ...editedItem, id, isHidden: original.isHidden });
    setEditId(null);
    setEditedItem({});
  };

  const handleDelete = async (id: number) => {
    const res = await fetch(`http://localhost:5272/api/menuitems/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (res.ok) setItems(prev => prev.filter(item => item.id !== id));
    else alert('Error deleting item');
  };

  const handleHideToggle = (item: MenuItem) => {
    updateItem({ ...item, isHidden: !item.isHidden });
  };


  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, itemId: number) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const formDataImage = new FormData();
  formDataImage.append('file', file);

  try {
    setUploadingImageId(itemId);

    const res = await fetch('http://localhost:5272/api/upload/image', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formDataImage
    });

    if (!res.ok) throw new Error('Upload failed');
    const data = await res.json();
    setEditedItem(prev => ({ ...prev, image: data.imageUrl }));
  } catch (err) {
    alert('Image upload failed.');
  } finally {
    setUploadingImageId(null);
  }
};


  const categories = Array.from(new Set(items.map(i => i.category)));
  const filteredItems = items.filter(i => i.category === selectedCategory);

  return (
    <>
      <Header />
      <HeroSection bg={heroImage}>
        <SectionContent>
          <Sidebar>
            {categories.map(c => (
              <div
                key={c}
                className={selectedCategory === c ? 'active' : ''}
                onClick={() => setSelectedCategory(c)}
              >
                {c}
              </div>
            ))}
          </Sidebar>

          <Content>
            <Category>{selectedCategory}</Category>
            <MenuGrid>
              {filteredItems.map(item => (
                <Card key={item.id} dimmed={item.isHidden}>
                  {item.isHidden && <HiddenLabel>Hidden</HiddenLabel>}
                  <CardImage src={item.image} />
                  <CardBody>
                    {editId === item.id ? (
                      <>
                        <input name="name" value={editedItem.name ?? item.name} onChange={handleChange} />
                        <input name="description" value={editedItem.description ?? item.description} onChange={handleChange} />
                        <input name="price" value={editedItem.price ?? item.price} onChange={handleChange} />
                        <label>
                          Upload New Image:
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, item.id)}
                          />
                        </label>
                        {uploadingImageId === item.id && <div>Uploading image...</div>}
                        {editedItem.image && (
                          <img
                            src={editedItem.image}
                            alt="Preview"
                            style={{ maxWidth: '100%', marginTop: '10px', borderRadius: '6px' }}
                          />
                        )}

                        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                          <button onClick={() => handleSave(item.id)}>💾 Save</button>
                          <button onClick={() => setEditId(null)}>❌ Cancel</button>
                          <button onClick={() => handleDelete(item.id)}>🗑️ Delete</button>
                          <button onClick={() => handleHideToggle(item)}>👻 {item.isHidden ? 'Show' : 'Hide'}</button>
                        </div>
                      </>
                    ) : (
                      <>
                        <Name>{item.name}</Name>
                        <Description>{item.description}</Description>
                        <Price>{item.price} kr</Price>
                        {token && (
                          <>
                            <button
                              style={{
                                background: '#f28a8a',
                                color: 'white',
                                border: 'none',
                                borderRadius: '20px',
                                padding: '8px 12px',
                                marginTop: '10px'
                              }}
                              onClick={() => {
                                setEditId(item.id);
                                setEditedItem(item);
                              }}
                            >
                                Edit
                            </button>
                            <button
                              style={{
                                background: item.isHidden ? '#6bc36b' : '#ffc107',
                                color: '#000',
                                border: 'none',
                                borderRadius: '16px',
                                padding: '6px 10px',
                                marginLeft: '10px'
                              }}
                              onClick={() => handleHideToggle(item)}
                            >
                              {item.isHidden ? 'Show' : ' Hide'}
                            </button>
                          </>
                        )}
                      </>
                    )}
                  </CardBody>
                </Card>
              ))}

              {token && (
                <Card
                  onClick={() => window.location.href = '/admin/menu'}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    background: '#ffe9b0',
                    color: '#3a1f0f',
                    fontWeight: 'bold',
                    fontSize: '1.5rem'
                  }}
                >
                  <div style={{ textAlign: 'center' }}>
                    ➕<br />
                    Add Product
                  </div>
                </Card>
              )}
            </MenuGrid>
          </Content>
        </SectionContent>
      </HeroSection>
      <Footer />
    </>
  );
}
