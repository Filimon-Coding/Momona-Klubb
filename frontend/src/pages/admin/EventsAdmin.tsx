import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import bgImage from '../../components/images/alex-padurariu-mqyMjCTWJyQ-unsplash.jpg';

/* --- API config --- */
const API = 'http://localhost:5272/api/events';
const TOKEN = localStorage.getItem('token') || '';
const AUTH: HeadersInit = TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {};

/* --- Types --- */
interface Event {
  id: number;
  title: string;
  startsAt: string;
  description: string;
  imageUrl: string;
  isHidden: boolean;
}

/* --- Styled Components --- */
const HeroSection = styled.section<{ bg: string }>`
  background-image: url(${props => props.bg});
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  padding-top: 90px;
  display: flex;
  justify-content: center;
  align-items: start;
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
  max-width: 750px;
  width: 90%;
  background: rgba(0, 0, 0, 0.65);
  padding: 40px;
  border-radius: 12px;
  color: #fff;
`;

const SectionTitle = styled.h2`
  color: #ffe9b0;
  margin-bottom: 25px;
`;

const EventCard = styled.div`
  background: #fff9f1;
  color: #3a1f0f;
  border-radius: 10px;
  padding: 18px;
  margin-bottom: 20px;
`;

const EventImage = styled.img`
  width: 100%;
  max-height: 160px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  background-color: #ff9d00;
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  margin-right: 8px;
  &:hover {
    background-color: #e68a00;
  }
`;

const DangerButton = styled(Button)`
  background-color: #d9534f;
  &:hover {
    background-color: #c9302c;
  }
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 6px;
  border: none;
  font-size: 1rem;
  margin-bottom: 10px;
  width: 100%;
`;

const TextArea = styled.textarea`
  padding: 12px;
  border-radius: 6px;
  border: none;
  resize: vertical;
  font-size: 1rem;
  width: 100%;
  margin-bottom: 10px;
`;

const ImagePreview = styled.img`
  max-width: 100%;
  border-radius: 8px;
  margin-top: 10px;
`;

/* --- Component --- */
const EventsAdmin: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [draft, setDraft] = useState<Partial<Event>>({});

  const fetchEvents = async () => {
    try {
      const res = await fetch(`${API}?all=true`, { headers: AUTH });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setEvents(data);
    } catch {
      alert('Error fetching events.');
    }
  };

  
  useEffect(() => { fetchEvents(); }, []);

  const save = async () => {
    if (!draft.title || !draft.startsAt) return;

    const method = editId ? 'PUT' : 'POST';
    const url = editId ? `${API}/${editId}` : API;

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', ...AUTH },
      body: JSON.stringify(draft)
    });

    if (res.ok) {
      setEditId(null);
      setDraft({});
      fetchEvents();
    } else {
      alert('Failed to save event');
    }
  };

  const del = async (id: number) => {
    if (!window.confirm('Delete this event?')) return;
    const res = await fetch(`${API}/${id}`, { method: 'DELETE', headers: AUTH });
    if (res.ok) fetchEvents();
  };

  const toggleHide = async (ev: Event) => {
    const res = await fetch(`${API}/${ev.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...AUTH },
      body: JSON.stringify({ ...ev, isHidden: !ev.isHidden })
    });
    if (res.ok) fetchEvents();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('http://localhost:5272/api/upload/image', {
        method: 'POST',
        headers: { Authorization: `Bearer ${TOKEN}` },
        body: formData
      });

      if (!res.ok) throw new Error();
      const data = await res.json();
      setDraft(prev => ({ ...prev, imageUrl: data.imageUrl }));
    } catch {
      alert('Failed to upload image');
    }
  };

  return (
    <>
      <Header />
      <HeroSection bg={bgImage}>
        <Overlay />
        <Container>
          <SectionTitle>Manage Events</SectionTitle>

          {events.map(ev => (
            <EventCard key={ev.id}>
              {ev.imageUrl && <EventImage src={ev.imageUrl} alt={ev.title} />}
              <div style={{ marginBottom: '10px' }}>
                <strong>{ev.title}</strong> — <em>{new Date(ev.startsAt).toLocaleString()}</em>
                {ev.isHidden && <span style={{ color: '#888', marginLeft: 6 }}>(hidden)</span>}
              </div>
              <Button onClick={() => { setEditId(ev.id); setDraft(ev); }}>Edit</Button>
              <Button onClick={() => toggleHide(ev)}>{ev.isHidden ? 'Show' : 'Hide'}</Button>
              <DangerButton onClick={() => del(ev.id)}>Delete</DangerButton>
            </EventCard>
          ))}

          <hr style={{ margin: '30px 0', borderColor: '#555' }} />

          <SectionTitle>{editId ? 'Edit Event' : 'Add New Event'}</SectionTitle>
          <Input
            placeholder="Title"
            value={draft.title || ''}
            onChange={e => setDraft({ ...draft, title: e.target.value })}
          />
          <Input
            type="date"
            value={draft.startsAt?.slice(0, 10) || ''}
            onChange={e => {
              const currentTime = draft.startsAt?.slice(11, 16) || '12:00';
              setDraft({ ...draft, startsAt: `${e.target.value}T${currentTime}` });
            }}
          />
          <Input
            type="time"
            value={draft.startsAt?.slice(11, 16) || ''}
            onChange={e => {
              const currentDate = draft.startsAt?.slice(0, 10) || new Date().toISOString().slice(0, 10);
              setDraft({ ...draft, startsAt: `${currentDate}T${e.target.value}` });
            }}
          />
          <TextArea
            placeholder="Description"
            value={draft.description || ''}
            onChange={e => setDraft({ ...draft, description: e.target.value })}
          />
          <Input type="file" accept="image/*" onChange={handleImageUpload} />
          {draft.imageUrl && <ImagePreview src={draft.imageUrl} alt="preview" />}
          <Input
            placeholder="Or paste image URL"
            value={draft.imageUrl || ''}
            onChange={e => setDraft({ ...draft, imageUrl: e.target.value })}
          />

          <div style={{ marginTop: '10px' }}>
            <Button onClick={save}>{editId ? 'Update' : 'Create'}</Button>
            {editId && <Button onClick={() => { setEditId(null); setDraft({}); }}>Cancel</Button>}
          </div>
        </Container>
      </HeroSection>
      <Footer />
    </>
  );
};

export default EventsAdmin;
