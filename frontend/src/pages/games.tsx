/*  src/pages/games.tsx  */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header   from '../components/header/header';
import Footer   from '../components/footer/footer';
import bgImage  from '../components/images/andras-joo-oQ80Jli44kI-unsplash.jpg';

/* ---------- styling ---------- */
const Section = styled.section<{ bg: string }>`
  background-image: url(${p => p.bg});
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  padding: 80px 20px 60px;
  color: white;
`;
const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  background: rgba(0,0,0,.6);
  padding: 30px;
  border-radius: 12px;
`;
const GameCard = styled.div`
  background: #fff9f1;
  color: #2f1a0e;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 25px;
`;
const Title      = styled.h2`color:#ffbb33; margin-bottom:4px;`;
const SubNote    = styled.p`margin-top:4px;font-size:.9rem;color:#666;`;
const QueueList  = styled.ul`margin-top:10px;padding-left:20px;`;
const Button     = styled.button`
  background:#ff9d00;color:#fff;border:none;border-radius:8px;
  padding:8px 14px;margin-right:10px;margin-top:8px;cursor:pointer;
  &:hover{background:#e68a00;}
`;

/* ---------- component ---------- */
export default function GamesPage() {
  /* types */
  interface Game {
    id: number;
    gameType: string;
    availableCount: number;
    queue: string[];
    currentPlayer?: string;
    takenAt?: string;
  }
  type QueueEntry = { qName: string; qId: string };

  /* state */
  const [games, setGames]   = useState<Game[]>([]);
  const [names, setNames]   = useState<Record<number, string>>({});
  const token   = localStorage.getItem('token');
  const userId  = localStorage.getItem('adminName') ?? 'guest_' + Math.random().toString(36).slice(2);
  const isAdmin = !!token;

  /* fetch once */
  const fetchGames = () => {
    fetch('http://localhost:5272/api/gamestatus')
      .then(r => r.json())
      .then(setGames)
      .catch(console.error);
  };
  useEffect(() => { fetchGames(); }, []);

  /* helpers */
  const joinQueue = async (id: number) => {
    const name = names[id]; if (!name) return;
    const ok = await fetch(`http://localhost:5272/api/gamestatus/${id}/join`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, userId })
    }).then(r => r.ok);
    if (ok) { setNames(p => ({ ...p, [id]: '' })); fetchGames(); }
    else alert('Could not join the queue.');
  };

  const dequeue = async (id: number) => {
    const ok = await fetch(`http://localhost:5272/api/gamestatus/${id}/dequeue`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` }
    }).then(r => r.ok);
    ok ? fetchGames() : alert('Could not remove first person from queue.');
  };

  const removePerson = async (id: number, qId: string) => {
    const ok = await fetch(`http://localhost:5272/api/gamestatus/${id}/remove`, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain', Authorization: `Bearer ${token}` },
      body: qId
    }).then(r => r.ok);
    ok ? fetchGames() : alert('Could not remove this person.');
  };

  const activateNext = async (id: number) => {
    const ok = await fetch(`http://localhost:5272/api/gamestatus/${id}/activate`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` }
    }).then(r => r.ok);
    ok ? fetchGames() : alert('Could not start the next player.');
  };

  const updateAvailability = async (id: number, newCount: number) => {
    const game = games.find(g => g.id === id); if (!game) return;
    const ok = await fetch(`http://localhost:5272/api/gamestatus/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ ...game, availableCount: newCount })
    }).then(r => r.ok);
    ok ? fetchGames() : alert('Could not update availability.');
  };

  /* render */
  return (
    <>
      <Header />
      <Section bg={bgImage}>
        <Container>
          <h1>🎯 Games & Availability</h1>
          <SubNote>
            <strong> Join the queue to reserve a table. Admins can adjust capacity and manage the queue. </strong>
          </SubNote>

          {games.map(game => {
            const parsedQueue: QueueEntry[] = game.queue.map(e => {
              const [qName, qId] = e.split('::'); return { qName, qId };
            });
            const you = parsedQueue.find(q => q.qId === userId);
            const position = you ? parsedQueue.findIndex(q => q.qId === userId) + 1 : null;

            return (
              <GameCard key={game.id}>
                <Title>{game.gameType}</Title>
                <p>Tables available: <strong>{game.availableCount}</strong></p>

                {game.currentPlayer &&
                  <p>
                    🎱 Now playing: <strong>{game.currentPlayer.split('::')[0]}</strong> since&nbsp;
                    {game.takenAt ? new Date(game.takenAt).toLocaleTimeString() : 'unknown'}
                  </p>}

                {position ? (
                  <p>⏳ You are <strong>#{position}</strong> in the queue.</p>
                ) : (
                  <div>
                    <input
                      placeholder="Your name"
                      value={names[game.id] ?? ''}
                      onChange={e => setNames(p => ({ ...p, [game.id]: e.target.value }))}
                      style={{ padding: '6px', borderRadius: '6px', marginRight: '10px' }}
                    />
                    <Button onClick={() => joinQueue(game.id)}>➕ Join queue</Button>
                  </div>
                )}

                <QueueList>
                  {parsedQueue.length > 0 && <strong>Queue:</strong>}
                  {parsedQueue.map((q, i) => (
                    <li key={i}>
                      {i + 1}. {q.qName} {q.qId === userId && '(you)'}
                      {isAdmin &&
                        <Button
                          onClick={() => removePerson(game.id, q.qId)}
                          style={{ background: '#d9534f', marginLeft: '10px' }}
                        >
                          🗑 Remove
                        </Button>}
                    </li>
                  ))}
                </QueueList>

                {isAdmin && (
                  <div style={{ marginTop: '10px' }}>
                    <Button onClick={() => activateNext(game.id)}>🎮 Start next</Button>
                    <Button onClick={() => dequeue(game.id)}>👋 Remove first</Button>
                    <Button onClick={() => updateAvailability(game.id, game.availableCount + 1)}>➕ Increase capacity</Button>
                    <Button onClick={() => updateAvailability(game.id, Math.max(0, game.availableCount - 1))}>➖ Decrease capacity</Button>
                  </div>
                )}
              </GameCard>
            );
          })}
        </Container>
      </Section>
      <Footer />
    </>
  );
}
