import React,{useEffect,useState} from "react";
import styled from "styled-components";
import Header  from "../../components/header/header";
import Footer  from "../../components/footer/footer";
import bgImg   from "../../components/images/alex-padurariu-mqyMjCTWJyQ-unsplash.jpg";

/* ------------- types + helpers ------------- */
interface Match {
  id:number;
  leagueCode:"PL"|"PD";
  homeTeam:string;
  awayTeam:string;
  utcDate:string;
  venue?:string;
  imageUrl?:string;
  isHidden:boolean;
}
const API   = "http://localhost:5272/api/sports";
const token = localStorage.getItem("token");
const AUTH: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {};

/* ------------- styled (reuse colours) ------ */
const Hero = styled.section<{bg:string}>`
  background-image:url(${p=>p.bg});background-size:cover;background-position:center;
  min-height:100vh;padding-top:90px;display:flex;justify-content:center;align-items:start;position:relative;
`;
const Overlay = styled.div`position:absolute;inset:0;background:rgba(0,0,0,.55);`;
const Panel = styled.div`
  position:relative;z-index:2;width:92%;max-width:800px;background:rgba(0,0,0,.65);
  padding:40px;border-radius:12px;color:#fff;
`;
const H2 = styled.h2`color:#ffe9b0;margin-bottom:22px;`;
const Card = styled.div`
  background:#fff9f1;color:#3a1f0f;border-radius:10px;padding:18px;margin-bottom:16px;
`;
const Btn  = styled.button`
  padding:8px 12px;border:none;border-radius:6px;margin-right:6px;font-weight:bold;
  cursor:pointer;color:#fff;background:#ff9d00;&:hover{background:#e68a00;}
`;
const Danger = styled(Btn)`background:#d9534f;&:hover{background:#c9302c;}`;
const Input = styled.input`width:100%;padding:10px;border-radius:6px;border:none;margin-bottom:8px;`;
const Select= styled.select`width:100%;padding:10px;border-radius:6px;border:none;margin-bottom:8px;`;
const TA    = styled.textarea`width:100%;padding:10px;border-radius:6px;border:none;margin-bottom:8px;`;

/* ------------- component ------------------- */
export default function SportsAdmin(){
  const [list,setList] = useState<Match[]>([]);
  const [editId,setEdit] = useState<number|null>(null);
  const [draft,setDraft] = useState<Partial<Match>>({leagueCode:"PL"});

  const load = async()=> {
    const r = await fetch(`${API}?all=true&league=PL`, {headers:AUTH});
    const r2= await fetch(`${API}?all=true&league=PD`, {headers:AUTH});
    if(r.ok&&r2.ok){
      const data = [...await r.json(),...await r2.json()];
      data.sort((a:Match,b:Match)=>Date.parse(a.utcDate)-Date.parse(b.utcDate));
      setList(data);
    }
  };
  useEffect(()=>{load();},[]);

  /* ---- crud helpers ---- */
  const save = async()=>{
    if(!draft.homeTeam||!draft.awayTeam||!draft.utcDate) return alert("Mangler felter");
    const res = await fetch(editId?`${API}/${editId}`:API,{
      method:editId?"PUT":"POST",
      headers:{...AUTH,"Content-Type":"application/json"},
      body:JSON.stringify(draft)
    });
    if(res.ok){ setEdit(null); setDraft({leagueCode:"PL"}); load(); }
  };
  const del = async(id:number)=>{
    if(!confirm("Delete match?")) return;
    await fetch(`${API}/${id}`,{method:"DELETE",headers:AUTH}); load();
  };
  const toggle = async(m:Match)=>{
    await fetch(`${API}/${m.id}`,{
      method:"PUT",headers:{...AUTH,"Content-Type":"application/json"},
      body:JSON.stringify({...m,isHidden:!m.isHidden})
    }); load();
  };

  return(
    <>
      <Header/>
      <Hero bg={bgImg}>
        <Overlay/>
        <Panel>
          <H2>Manage Matches</H2>

          {list.map(m=>(
            <Card key={m.id}>
              <div style={{marginBottom:6}}>
                <strong>[{m.leagueCode}] {m.homeTeam} – {m.awayTeam}</strong>{" "}
                <em>{new Date(m.utcDate).toLocaleString()}</em>
                {m.isHidden && <span style={{color:"#888"}}> (hidden)</span>}
              </div>
              <Btn onClick={()=>{setEdit(m.id);setDraft(m);}}>Edit</Btn>
              <Btn onClick={()=>toggle(m)}>{m.isHidden?"Show":"Hide"}</Btn>
              <Danger onClick={()=>del(m.id)}>Delete</Danger>
            </Card>
          ))}

          <hr style={{margin:"30px 0",borderColor:"#444"}}/>

          <H2>{editId?"Edit match":"Add new match"}</H2>
          <Select
            value={draft.leagueCode}
            onChange={e=>setDraft({...draft,leagueCode:e.target.value as "PL"|"PD"})}>
            <option value="PL">Premier League</option>
            <option value="PD">La&nbsp;Liga</option>
          </Select>

          <Input placeholder="Home team"
                 value={draft.homeTeam||""}
                 onChange={e=>setDraft({...draft,homeTeam:e.target.value})}/>
          <Input placeholder="Away team"
                 value={draft.awayTeam||""}
                 onChange={e=>setDraft({...draft,awayTeam:e.target.value})}/>
          <Input type="datetime-local"
                 value={draft.utcDate?.slice(0,16)||""}
                 onChange={e=>setDraft({...draft,utcDate:new Date(e.target.value).toISOString()})}/>
          <Input placeholder="Venue"
                 value={draft.venue||""}
                 onChange={e=>setDraft({...draft,venue:e.target.value})}/>
          <TA placeholder="Image URL (optional)"
              value={draft.imageUrl||""}
              onChange={e=>setDraft({...draft,imageUrl:e.target.value})}/>
          <div>
            <Btn onClick={save}>{editId?"Update":"Create"}</Btn>
            {editId && <Btn onClick={()=>{setEdit(null);setDraft({leagueCode:"PL"});}}>Cancel</Btn>}
          </div>
        </Panel>
      </Hero>
      <Footer/>
    </>
  );
}
