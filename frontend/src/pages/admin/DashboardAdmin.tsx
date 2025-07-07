/* src/pages/admin/AdminDashboard.tsx */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Header  from '../../components/header/header';
import Footer  from '../../components/footer/footer';
import heroImg from '../../components/images/eugene-nelmin-fIij-cL9XTA-unsplash.jpg';

/* ------------------------------------------------------------------ */
/*  styled                                                            */
/* ------------------------------------------------------------------ */

const Hero = styled.section<{bg: string}>`
  background:url(${p => p.bg}) center/cover no-repeat;
  min-height:100vh; padding-top:90px;
  display:flex; justify-content:center; align-items:flex-start;
  position:relative; color:#fff;
`;
const Overlay = styled.div`
  position:absolute; inset:0; background:rgba(0,0,0,.55);
`;
const Panel = styled.div`
  position:relative; z-index:2;
  background:rgba(0,0,0,.70); backdrop-filter:blur(4px);
  width:94%; max-width:900px; padding:40px 30px; border-radius:12px;
`;
const Title = styled.h1`
  margin:0 0 30px; font-size:2rem; color:#ffe9b0;
`;

/* ---- statistikk --------------------------------------------------- */
const StatsRow = styled.div`
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(170px,1fr));
  gap:22px; margin-bottom:40px;
`;
const Card = styled.div`
  background:#1f1f1f; border-radius:10px; padding:26px 20px;
  display:flex; flex-direction:column; align-items:center;
  box-shadow:0 4px 12px rgba(0,0,0,.35);
  h3{margin:0; font-size:.95rem; font-weight:500; color:#bbb}
  span{margin-top:6px; font-size:2rem; font-weight:700; color:#ffbb33}
`;

/* ---- hurtiglenker ------------------------------------------------- */
const LinkList = styled.ul`
  list-style:none; padding:0; margin:0; line-height:2;
  a{color:#ffbb33; text-decoration:none;}
  a:hover{text-decoration:underline;}
`;

/* ------------------------------------------------------------------ */

interface MenuItem { isHidden?: boolean }
interface EventItem { isHidden?: boolean }

export default function AdminDashboard() {
  const [menuCnt,   setMenuCnt]   = useState<'—'|number>('—');
  const [hiddenCnt, setHiddenCnt] = useState<'—'|number>('—');
  const [eventCnt,  setEventCnt]  = useState<'—'|number>('—');

  /* henter data én gang */
  useEffect(() => { fetchData(); }, []);

  async function fetchData() {
    try {
      const [mResp, eResp] = await Promise.all([
        fetch('http://localhost:5272/api/menuitems'),
        fetch('http://localhost:5272/api/events')
      ]);
      const menu  = (await mResp.json()) as MenuItem[];
      const events= (await eResp.json()) as EventItem[];

      setMenuCnt(menu.length);
      setHiddenCnt(menu.filter(x => x.isHidden).length);   // 0 hvis feltet mangler
      setEventCnt(events.filter(x => !x.isHidden).length); // antar isHidden evt. finnes
    } catch {
      /* lar «—» stå, så man ser at API-en feilet */
    }
  }

  return (
    <>
      <Header />

      <Hero bg={heroImg}>
        <Overlay />
        <Panel>
          <Title>Admin dashboard</Title>

          {/* ---------- statistikk ---------- */}
          <StatsRow>
            <Card>
              <h3>Meny-retter</h3>
              <span>{menuCnt}</span>
            </Card>
            <Card>
              <h3>Skjulte retter</h3>
              <span>{hiddenCnt}</span>
            </Card>
            <Card>
              <h3>Aktive events</h3>
              <span>{eventCnt}</span>
            </Card>
          </StatsRow>

          {/* ---------- hurtiglenker -------- */}
          <h2 style={{margin:'0 0 14px',fontSize:'1.25rem'}}>Hurtiglenker</h2>
          <LinkList>
            <li><Link to="/admin/menu">➕ Legg til / rediger meny-retter</Link></li>
            <li><Link to="/admin/events">📅 Administrer events</Link></li>
          </LinkList>
        </Panel>
      </Hero>

      <Footer />
    </>
  );
}
