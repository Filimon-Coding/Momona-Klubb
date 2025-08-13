/*  src/pages/events.tsx  */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header  from '../components/header/header';
import Footer  from '../components/footer/footer';
import heroImg from '../components/images/Coffee_ceremony_of_Ethiopia_and_Eritrea_4.jpg';
import { API_URL, imgUrl } from '../config';   // <-- use helper

/* ---------- styled ---------- */
const Spacer = styled.div`height:60px;`;
const Section = styled.section<{bg:string}>`
  background-image:url(${p=>p.bg});
  background-size:cover;background-position:center;
  min-height:100vh;padding:80px 20px 60px;color:white;
`;
const Wrap  = styled.div`max-width:900px;margin:0 auto;background:rgba(0,0,0,.55);padding:40px;border-radius:10px;`;
const Title = styled.h1`font-size:2.5rem;color:#fff1d6;margin-bottom:25px;`;
const Grid  = styled.div`display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:20px;`;
const Card  = styled.div<{dimmed?:boolean}>`
  background:${p=>p.dimmed?'#eee':'#fff9f1'};
  color:#2f1a0e;position:relative;border-radius:10px;padding:20px;
`;
const Hidden = styled.div`position:absolute;top:6px;left:6px;background:#333;color:#fff;font-size:12px;padding:2px 6px;border-radius:4px;`;
const H3   = styled.h3`margin:0 0 8px;color:#ff9d00;`;
const When = styled.p`margin:0 0 10px;font-weight:bold;`;
const Btn  = styled.button`
  background:#ff9d00;color:#fff;border:none;border-radius:6px;
  padding:4px 10px;margin-right:6px;cursor:pointer;font-size:.9rem;
  &:hover{background:#e68a00;}
`;
const Warn = styled(Btn)`background:#d9534f;&:hover{background:#c9302c;}`;

/* ---------- types ---------- */
interface Event {
  id: number;
  title: string;
  startsAt: string;     // ISO
  description: string;
  imageUrl: string;     // relative like "/images/..."
  isHidden: boolean;
}

/* ---------- component ---------- */
export default function EventsPage() {
  const [events,setEvents]           = useState<Event[]>([]);
  const [editId,setEditId]           = useState<number|null>(null);
  const [draft,setDraft]             = useState<Partial<Event>>({});
  const [uploadingId,setUploadingId] = useState<number|null>(null);

  const token   = localStorage.getItem('token');
  const isAdmin = !!token;

  /* API base */
  const API = `${API_URL}/events`;   // <-- no localhost

  /* fetch ------------------------------------------------------- */
  const fetchEvents = () => {
    const url = isAdmin ? `${API}?all=true` : API;
    fetch(url)
      .then(r => r.json())
      .then(setEvents)
      .catch(console.error);
  };
  useEffect(fetchEvents, [isAdmin, token]); // include token

  /* helpers ----------------------------------------------------- */
  const updateEvent = async (ev:Event|Partial<Event>, id:number) =>{
    const ok = await fetch(`${API}/${id}`, {
      method:'PUT',
      headers:{'Content-Type':'application/json', Authorization:`Bearer ${token ?? ''}`},
      body:JSON.stringify(ev)
    }).then(r=>r.ok);
    if(ok){ setEditId(null); setDraft({}); fetchEvents(); }
  };

  const toggleHide = (e:Event) => updateEvent({ ...e, isHidden: !e.isHidden }, e.id);

  const delEvent = async (id:number) => {
    if (!window.confirm('Delete this Event permanently?')) return;
    const ok = await fetch(`${API}/${id}`, { method:'DELETE', headers:{ Authorization:`Bearer ${token ?? ''}` } }).then(r=>r.ok);
    if (ok) fetchEvents();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, eventId: number) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploadingId(eventId);
      const res = await fetch(`${API_URL}/upload/image`, {     // <-- no localhost
        method: 'POST',
        headers: { Authorization: `Bearer ${token ?? ''}` },
        body: formData
      });
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json(); // { imageUrl: "/images/..." }
      setDraft(prev => ({ ...prev, imageUrl: data.imageUrl }));
    } catch {
      alert('Failed to upload image');
    } finally {
      setUploadingId(null);
    }
  };

  /* render ------------------------------------------------------ */
  return (
    <>
      <Header/><Spacer/>
      <Section bg={heroImg}>
        <Wrap>
          <Title>Upcoming Events @ Momona Klubb</Title>

          <Grid>
            {events.map(ev => {
              const editing = editId === ev.id;
              return (
                <Card key={ev.id} dimmed={ev.isHidden}>
                  {ev.isHidden && <Hidden>Hidden</Hidden>}

                  {/* image (relative -> full URL) */}
                  {ev.imageUrl && (
                    <img
                      src={imgUrl(ev.imageUrl)}             // <-- use helper
                      alt={ev.title}
                      style={{ width:'100%', height:'160px', objectFit:'cover', borderRadius:'6px', marginBottom:'10px' }}
                    />
                  )}

                  {editing ? (
                    <>
                      <input
                        style={{width:'100%',marginBottom:'6px'}}
                        value={draft.title ?? ev.title}
                        onChange={e=>setDraft({...draft,title:e.target.value})}
                      />
                      <input
                        style={{width:'100%',marginBottom:'6px'}}
                        type="datetime-local"
                        value={(draft.startsAt ?? ev.startsAt).slice(0,16)}
                        onChange={e=>setDraft({...draft,startsAt:e.target.value})}
                      />
                      <textarea
                        style={{width:'100%',height:'60px'}}
                        value={draft.description ?? ev.description}
                        onChange={e=>setDraft({...draft,description:e.target.value})}
                      />

                      <input type="file" accept="image/*" onChange={e=>handleImageUpload(e, ev.id)} style={{ marginBottom:'10px' }}/>
                      {uploadingId === ev.id && <p style={{ fontSize: '.9rem' }}>Uploading image...</p>}

                      {(draft.imageUrl || ev.imageUrl) && (
                        <img
                          src={imgUrl(draft.imageUrl ?? ev.imageUrl)}   // <-- preview via helper
                          alt="Preview"
                          style={{ width:'100%', height:'160px', objectFit:'cover', borderRadius:'6px', marginBottom:'10px' }}
                        />
                      )}

                      <div style={{marginTop:'8px'}}>
                        <Btn onClick={()=>updateEvent({ ...ev, ...draft }, ev.id)}>Save</Btn>
                        <Btn onClick={()=>{ setEditId(null); setDraft({}); }}>Cancel</Btn>
                      </div>
                    </>
                  ) : (
                    <>
                      <H3>{ev.title}</H3>
                      <When>{new Date(ev.startsAt).toLocaleString()}</When>
                      <p>{ev.description}</p>

                      {isAdmin && (
                        <div style={{marginTop:'8px'}}>
                          <Btn onClick={()=>{ setEditId(ev.id); setDraft(ev); }}>Edit</Btn>
                          <Btn onClick={()=>toggleHide(ev)}>{ev.isHidden ? 'Show' : 'Hide'}</Btn>
                          <Warn onClick={()=>delEvent(ev.id)}>Delete</Warn>
                        </div>
                      )}
                    </>
                  )}
                </Card>
              );
            })}

            {isAdmin && (
              <Card
                style={{display:'flex',justifyContent:'center',alignItems:'center',
                        background:'#ffe9b0',cursor:'pointer',fontSize:'1.4rem',
                        fontWeight:'bold',color:'#3a1f0f'}}
                onClick={()=>window.location.href='/admin/events'}>
                ➕<br/>Add&nbsp;Event
              </Card>
            )}
          </Grid>
        </Wrap>
      </Section>
      <Footer/>
    </>
  );
}
