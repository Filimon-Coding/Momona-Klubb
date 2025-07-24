/* --------------  src/pages/sports.tsx  --------------------------- */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header  from "../components/header/header";
import Footer  from "../components/footer/footer";
import heroImg from "../components/images/jalo-hotel-0fV_upUSaTs-unsplash.jpg";
import { badgeMap, localBadge } from "../components/data/Badges";

/* ---------- typer & konstanter ---------- */
interface Match {
  id:        number;
  leagueCode:"PL" | "PD";
  homeTeam:  string;
  awayTeam:  string;
  utcDate:   string;
}
interface TeamRes { teams: { strTeamBadge: string }[] }

const API     = "http://localhost:5272/api/sports";
const LEAGUES = ["PL","PD"];
const BADGE_API =
  "https://www.thesportsdb.com/api/v1/json/123/searchteams.php?t=";

/* ---------- lokal badge-kart ----------------------------------- */
/* ---------- flyttet  ----------------------------------- */



/* ---------- styled ---------- */
const Hero = styled.section<{bg:string}>`
  background:url(${p=>p.bg}) center/cover;
  min-height:100vh;padding-top:60px;color:#fff;display:flex;justify-content:center;
`;
const Overlay = styled.div`position:absolute;inset:0;background:rgba(0,0,0,.55);`;
const Wrap = styled.div`z-index:2;width:92%;max-width:1100px;padding:48px 24px;`;
const Title = styled.h1`text-align:center;color:#ffe9b0;margin-bottom:40px;`;

const Card = styled.div`
  background:#222;border-radius:14px;padding:40px 32px;margin-bottom:40px;
  @media(max-width:600px){padding:32px 20px;}
`;
const Top = styled.div`
  color:#bbb;font-size:.95rem;margin-bottom:26px;text-align:center;
  span{color:#fff;font-weight:600;}
`;
const Row  = styled.div`
  display:flex;align-items:center;justify-content:space-between;gap:64px;
  @media(max-width:600px){gap:32px;flex-direction:column;}
`;
const Col  = styled.div`
  display:flex;flex-direction:column;align-items:center;flex:1;
`;
const Logo = styled.img`
  width:112px;height:112px;object-fit:contain;border-radius:14px;
  background:#444;padding:8px;
`;
const Club = styled.span`margin-top:14px;font-size:1.15rem;`;
const Vs   = styled.div`
  flex:0 0 48px;text-align:center;color:#ccc;font-size:1.2rem;
  @media(max-width:600px){order:-1;margin-bottom:8px;}
`;

/* ---------- komponent ---------- */
export default function SportsPage() {
  const [matches,setMatches]    = useState<Match[]>([]);
  const [remoteBadges,setRemote]= useState<Record<string,string>>({});
  const [loading,setLoading]    = useState(true);

  /* Hent kamper -------------------------------------------------- */
  useEffect(()=>{
    (async()=>{
      try{
        const all:Match[]=[];
        for(const lg of LEAGUES){
          const r = await fetch(`${API}?league=${lg}`);
          if(r.ok) all.push(...await r.json());
        }
        all.sort((a,b)=>Date.parse(a.utcDate)-Date.parse(b.utcDate));
        setMatches(all.slice(0,5));
      }finally{ setLoading(false); }
    })();
  },[]);

  /* Ekstern badge (fallback) ------------------------------------- */
  const fetchRemoteBadge = (team:string)=>{
    if(remoteBadges[team]) return;
    fetch(BADGE_API + encodeURIComponent(team))
      .then(r=>r.ok?r.json():null)
      .then((j:TeamRes|null)=>{
        const url=j?.teams?.[0]?.strTeamBadge;
        if(url) setRemote(prev=>({...prev,[team]:url}));
      })
      .catch(()=>console.warn("Badge fetch failed for",team));
  };

  /* Render ------------------------------------------------------- */
  return(
    <>
      <Header/>
      <Hero bg={heroImg}>
        <Overlay/>
        <Wrap>
          <Title>Neste 5 kamper</Title>

          {loading && <p>Laster …</p>}
          {!loading && !matches.length && <p>Ingen planlagte kamper funnet.</p>}

          {matches.map(m=>{
            const homeSrc = localBadge(m.homeTeam);
            const awaySrc = localBadge(m.awayTeam);

            return(
              <Card key={`${m.leagueCode}-${m.id}`}>
                <Top>
                  <span>{m.leagueCode==="PL" ? "Premier League" : "La&nbsp;Liga"}</span>
                  {" · "}
                  {new Date(m.utcDate).toLocaleDateString("no-NO",
                    {day:"2-digit",month:"short"})}
                  . kl.&nbsp;
                  {new Date(m.utcDate).toLocaleTimeString("no-NO",
                    {hour:"2-digit",minute:"2-digit"})}
                </Top>

                <Row>
                  {/* HJEMME */}
                  <Col>
                    <Logo
                      src={homeSrc}
                      alt={m.homeTeam}
                      onError={e=>{
                        if(remoteBadges[m.homeTeam]){
                          (e.currentTarget as HTMLImageElement).src =
                            remoteBadges[m.homeTeam];
                        }else{ fetchRemoteBadge(m.homeTeam); }
                      }}/>
                    <Club>{m.homeTeam}</Club>
                  </Col>

                  <Vs>vs</Vs>

                  {/* BORTE */}
                  <Col>
                    <Logo
                      src={awaySrc}
                      alt={m.awayTeam}
                      onError={e=>{
                        if(remoteBadges[m.awayTeam]){
                          (e.currentTarget as HTMLImageElement).src =
                            remoteBadges[m.awayTeam];
                        }else{ fetchRemoteBadge(m.awayTeam); }
                      }}/>
                    <Club>{m.awayTeam}</Club>
                  </Col>
                </Row>
              </Card>
            );
          })}
        </Wrap>
      </Hero>
      <Footer/>
    </>
  );
}
