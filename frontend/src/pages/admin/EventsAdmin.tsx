/*  src/pages/admin/EventsAdmin.tsx  */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

/* ---------- constants ---------- */
const API   = 'http://localhost:5272/api/events';
const TOKEN = localStorage.getItem('token') || '';          // empty string when not logged in
const AUTH  : HeadersInit = TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {};

/* ---------- styled ---------- */
const Wrap = styled.div`
  max-width:900px;margin:80px auto 60px;padding:30px;
  background:#fff9f1;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,.15);
`;
const H1   = styled.h1`margin:0 0 25px;color:#ff9d00;`;
const Row  = styled.div`margin-bottom:20px;border-bottom:1px solid #eee;padding-bottom:18px;`;
const Btn  = styled.button`
  background:#ff9d00;color:#fff;border:none;border-radius:6px;
  padding:6px 12px;cursor:pointer;margin-right:10px;font-size:.9rem;
  &:hover{background:#e68a00;}
`;
const Warn = styled(Btn)`background:#d9534f;&:hover{background:#c9302c;}`;
const Input= styled.input`padding:6px 8px;margin:4px 8px 8px 0;width:240px;max-width:100%;`;
const Text = styled.textarea`padding:6px 8px;width:240px;max-width:100%;height:80px;display:block;`;

/* ---------- types ---------- */
export interface Event {
  id: number;
  title: string;
  startsAt: string;           // ISO
  description: string;
  imageUrl: string;
  isHidden: boolean;
}

/* ============================================================ */
const EventsAdmin: React.FC = () => {
  const [events,  setEvents]   = useState<Event[]>([]);
  const [loading, setLoading]  = useState(true);
  const [error,   setError]    = useState<string | null>(null);

  const [editId, setEditId]    = useState<number | null>(null);
  const [draft,  setDraft]     = useState<Partial<Event>>({});

  /* ---------- data ---------- */
  const fetchEvents = async () => {
    setLoading(true); setError(null);
    try {
      const res = await fetch(`${API}?all=true`, { headers: AUTH });
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      setEvents(await res.json());
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEvents(); }, []);        // initial load

  /* ---------- helpers ---------- */
  const save = async () => {
    if (!draft.title) return;

    const method = editId ? 'PUT' : 'POST';
    const url    = editId ? `${API}/${editId}` : API;

    const ok = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', ...AUTH },
      body: JSON.stringify(draft)
    }).then(r => r.ok);

    if (ok) { setEditId(null); setDraft({}); fetchEvents(); }
  };

  const del = async (id: number) => {
    if (!window.confirm('Delete this event?')) return;

    const ok = await fetch(`${API}/${id}`, {
      method: 'DELETE',
      headers: AUTH
    }).then(r => r.ok);

    if (ok) fetchEvents();
  };

  const toggleHide = async (ev: Event) => {
    const ok = await fetch(`${API}/${ev.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...AUTH },
      body: JSON.stringify({ ...ev, isHidden: !ev.isHidden })
    }).then(r => r.ok);

    if (ok) fetchEvents();
  };

  /* ---------- render ---------- */
  return (
    <>
      <Header />
      <Wrap>
        <H1>Manage Events</H1>

        {loading && <p>Loading…</p>}
        {error && <p style={{ color: 'crimson' }}>Error: {error}</p>}

        {events.map(ev => (
          <Row key={ev.id}>
            <strong>{ev.title}</strong>&nbsp;
            <em>{new Date(ev.startsAt).toLocaleString()}</em>
            {ev.isHidden && <span style={{ marginLeft: 6, color: '#888' }}>(hidden)</span>}
            <div style={{ marginTop: 6 }}>
              <Btn  onClick={() => { setEditId(ev.id); setDraft(ev); }}>Edit</Btn>
              <Btn  onClick={() => toggleHide(ev)}>{ev.isHidden ? 'Show' : 'Hide'}</Btn>
              <Warn onClick={() => del(ev.id)}>Delete</Warn>
            </div>
          </Row>
        ))}

        <hr />

        <h2>{editId ? 'Edit event' : 'Add new event'}</h2>

        <Input
          placeholder="Title"
          value={draft.title || ''}
          onChange={e => setDraft({ ...draft, title: e.target.value })}
        />
        <Input
          type="datetime-local"
          value={(draft.startsAt || '').slice(0, 16)}
          onChange={e => setDraft({ ...draft, startsAt: e.target.value })}
        />

        <Text
          placeholder="Description"
          value={draft.description || ''}
          onChange={e => setDraft({ ...draft, description: e.target.value })}
        />
          {/* Upload from computer */}
          <Input
            type="file"
            accept="image/*"
            onChange={async (e) => {
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
                if (!res.ok) throw new Error('Upload failed');

                const data = await res.json();
                setDraft(prev => ({ ...prev, imageUrl: data.imageUrl }));
              } catch (err) {
                alert('Failed to upload image');
              }
            }}
          />

          {/* Preview image if available */}
          {draft.imageUrl && (
            <img
              src={draft.imageUrl}
              alt="preview"
              style={{ maxWidth: '90%', marginTop: '10px', borderRadius: '8px' }}
            />
          )}

          {/* Optional: manual image URL (in case admin pastes a URL manually) */}
          <Input
            placeholder="Or paste image URL"
            value={draft.imageUrl || ''}
            onChange={e => setDraft({ ...draft, imageUrl: e.target.value })}
          />


        <div style={{ marginTop: 10 }}>
          <Btn onClick={save}>{editId ? 'Update' : 'Create'}</Btn>
          {editId && (
            <Btn onClick={() => { setEditId(null); setDraft({}); }}>
              Cancel
            </Btn>
          )}
        </div>
      </Wrap>
      <Footer />
    </>
  );
};

export default EventsAdmin;
