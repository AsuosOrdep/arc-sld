import React, { useState } from 'react';
import { C, IS, BG, BS, BSm, POSITIONS, ESCALOES, BLOOD_TYPES, fmtDate, today, nextId } from '../theme';
import { ClubCrest, Modal, FR, Pill, SH, SMsgCard, Empty } from './UI';

// ─── Icons ────────────────────────────────────────────────────────────────────
const Ic = {
  home:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:18,height:18}}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  users:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:18,height:18}}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  training: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:18,height:18}}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  stats:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:18,height:18}}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  trophy:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:18,height:18}}><polyline points="8 21 12 21 16 21"/><line x1="12" y1="17" x2="12" y2="21"/><path d="M7 4H17l-1 7a5 5 0 0 1-8 0L7 4z"/><path d="M5 4H3v3a4 4 0 0 0 4 4"/><path d="M19 4h2v3a4 4 0 0 1-4 4"/></svg>,
  calendar: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:18,height:18}}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  medical:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:18,height:18}}><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
  parents:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:18,height:18}}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  msg:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:18,height:18}}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  settings: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:18,height:18}}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
};

export default function CoachDashboard({ data, upd, onLogout }) {
  const { athletes, medical, trainings, games, calEvents, messages, parentMsgs, faqs } = data;
  const [tab, setTab] = useState('home');
  const unread = parentMsgs.filter(m => !m.read).length;

  const tabs = [
    {id:'home',      icon:Ic.home,     label:'Início'},
    {id:'athletes',  icon:Ic.users,    label:'Plantel'},
    {id:'trainings', icon:Ic.training, label:'Treinos'},
    {id:'stats',     icon:Ic.stats,    label:'Stats'},
    {id:'games',     icon:Ic.trophy,   label:'Jogos'},
    {id:'calendar',  icon:Ic.calendar, label:'Agenda'},
    {id:'medical',   icon:Ic.medical,  label:'Saúde'},
    {id:'parents',   icon:Ic.parents,  label:'Pais', badge:unread},
    {id:'messages',  icon:Ic.msg,      label:'Avisos'},
    {id:'settings',  icon:Ic.settings, label:'Config'},
  ];

  return (
    <div style={{minHeight:'100vh',background:C.cream,fontFamily:"'Source Sans 3', sans-serif",color:C.dark}}>
      {/* Header */}
      <header style={{background:`linear-gradient(160deg,${C.greenDark} 0%,${C.green} 60%,${C.greenMid} 100%)`,borderBottom:`3px solid ${C.gold}`,position:'sticky',top:0,zIndex:100,boxShadow:'0 4px 20px rgba(0,0,0,0.4)'}}>
        <div style={{height:3,background:`linear-gradient(90deg,${C.gold},${C.goldLight},${C.gold})`}}/>
        <div style={{maxWidth:1100,margin:'0 auto',padding:'0 16px',display:'flex',alignItems:'center',justifyContent:'space-between',height:62}}>
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <div style={{filter:'drop-shadow(0 2px 6px rgba(0,0,0,0.4))'}}><ClubCrest size={44}/></div>
            <div>
              <div style={{fontWeight:'700',fontSize:15,color:C.white,fontFamily:"'Playfair Display', serif"}}>A.R.C.S. Lourenço do Douro</div>
              <div style={{fontSize:9,color:C.goldLight,letterSpacing:'2px',textTransform:'uppercase'}}>Dossier do Treinador · 2025/26</div>
            </div>
          </div>
          <nav style={{display:'flex',gap:1,flexWrap:'wrap',justifyContent:'flex-end'}}>
            {tabs.map(({id,icon,label,badge}) => (
              <button key={id} onClick={()=>setTab(id)} style={{
                background:tab===id?C.gold:'transparent', color:tab===id?C.greenDark:C.white,
                border:'none', borderRadius:8, padding:'5px 9px', cursor:'pointer',
                display:'flex', flexDirection:'column', alignItems:'center', gap:2,
                fontSize:9, letterSpacing:'0.5px', textTransform:'uppercase',
                fontFamily:"'Source Sans 3', sans-serif", position:'relative',
                fontWeight:tab===id?'700':'400',
              }}>
                {icon}<span>{label}</span>
                {badge>0&&<span style={{position:'absolute',top:2,right:2,background:C.red,color:'#fff',borderRadius:'50%',width:14,height:14,fontSize:8,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:'bold'}}>{badge}</span>}
              </button>
            ))}
            <button onClick={onLogout} style={{background:'rgba(255,255,255,0.1)',color:C.white,border:'1px solid rgba(255,255,255,0.2)',borderRadius:8,padding:'5px 10px',cursor:'pointer',fontSize:10,fontFamily:"'Source Sans 3', sans-serif",marginLeft:6}}>Sair</button>
          </nav>
        </div>
        <div style={{height:2,background:`linear-gradient(90deg,transparent,${C.gold},transparent)`}}/>
      </header>

      <main style={{maxWidth:1100,margin:'0 auto',padding:'22px 16px'}}>
        {tab==='home'      && <HomeTab      data={data} setTab={setTab}/>}
        {tab==='athletes'  && <AthletesTab  athletes={athletes} upd={v=>upd('athletes',v)}/>}
        {tab==='trainings' && <TrainingsTab trainings={trainings} athletes={athletes} upd={v=>upd('trainings',v)}/>}
        {tab==='stats'     && <StatsTab     athletes={athletes} trainings={trainings}/>}
        {tab==='games'     && <GamesTab     games={games} athletes={athletes} upd={v=>upd('games',v)}/>}
        {tab==='calendar'  && <CalendarTab  calEvents={calEvents} upd={v=>upd('calEvents',v)}/>}
        {tab==='medical'   && <MedicalTab   athletes={athletes} medical={medical} upd={v=>upd('medical',v)}/>}
        {tab==='parents'   && <ParentsTab   data={data} upd={upd}/>}
        {tab==='messages'  && <MessagesTab  messages={messages} upd={v=>upd('messages',v)}/>}
        {tab==='settings'  && <SettingsTab  athletes={athletes} upd={v=>upd('athletes',v)}/>}
      </main>
    </div>
  );
}

// ─── HOME ─────────────────────────────────────────────────────────────────────
function HomeTab({ data, setTab }) {
  const { athletes, trainings, games, calEvents, messages, parentMsgs } = data;
  const t = today();
  const nextGame  = [...games].sort((a,b)=>a.date.localeCompare(b.date)).find(g=>g.date>=t&&!g.result);
  const nextEvent = [...calEvents].sort((a,b)=>a.date.localeCompare(b.date)).find(e=>e.date>=t);
  const unread    = parentMsgs.filter(m=>!m.read).length;

  const kpis = [
    {l:'Atletas',    v:athletes.length,                       bg:C.green},
    {l:'Treinos',    v:trainings.length,                      bg:C.greenMid},
    {l:'Golos',      v:athletes.reduce((s,a)=>s+a.goals,0),  bg:C.gold,   dark:true},
    {l:'Jogos',      v:games.length,                          bg:C.blue},
    {l:'Msgs Pais',  v:unread,                                bg:unread>0?C.red:C.gray},
    {l:'Eventos',    v:calEvents.filter(e=>e.date>=t).length, bg:C.greenLight},
  ];

  return (
    <div>
      <div style={{background:`linear-gradient(135deg,${C.greenDark},${C.green})`,borderRadius:20,padding:'28px',color:C.white,marginBottom:20,position:'relative',overflow:'hidden',border:`2px solid ${C.gold}`}}>
        <div style={{position:'absolute',right:16,top:'50%',transform:'translateY(-50%)',opacity:0.06}}><ClubCrest size={160}/></div>
        <div style={{fontSize:10,letterSpacing:'3px',textTransform:'uppercase',color:C.goldLight,marginBottom:6}}>Bem-vindo</div>
        <h2 style={{margin:'0 0 4px',fontFamily:"'Playfair Display', serif",fontSize:26}}>A.R.C.S. Lourenço do Douro</h2>
        <p style={{margin:'0 0 18px',color:C.grayMid,fontSize:12,letterSpacing:'1px'}}>FORMAÇÃO + AMBIÇÃO = FUTURO · Época 2025/26</p>
        <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
          {nextGame&&<div style={{background:'rgba(200,160,42,0.15)',border:`1px solid ${C.gold}`,borderRadius:10,padding:'9px 14px',fontSize:12}}>🏆 <strong>Próx. jogo:</strong> {nextGame.opponent} — {fmtDate(nextGame.date)} {nextGame.time}</div>}
          {nextEvent&&<div style={{background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.15)',borderRadius:10,padding:'9px 14px',fontSize:12}}>📅 <strong>{nextEvent.title}</strong> — {fmtDate(nextEvent.date)}</div>}
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10,marginBottom:22}}>
        {kpis.map(k=>(
          <div key={k.l} style={{background:k.bg,borderRadius:14,padding:'16px 12px',color:k.dark?C.greenDark:C.white,textAlign:'center',boxShadow:'0 2px 10px rgba(0,0,0,0.12)'}}>
            <div style={{fontSize:26,fontWeight:'700',lineHeight:1}}>{k.v}</div>
            <div style={{fontSize:10,letterSpacing:'1.5px',textTransform:'uppercase',marginTop:3,opacity:0.85}}>{k.l}</div>
          </div>
        ))}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
        <div><SH title="Avisos Recentes" action={()=>setTab('messages')} al="Ver todos"/>
          {[...messages].reverse().slice(0,3).map(m=><SMsgCard key={m.id} m={m}/>)}</div>
        <div><SH title="Mensagens dos Pais" action={()=>setTab('parents')} al={unread>0?`${unread} não lidas`:'Ver'}/>
          {parentMsgs.slice(-3).reverse().map(m=>(
            <div key={m.id} style={{background:m.read?C.white:C.goldPale,borderRadius:10,padding:'10px 13px',border:`1.5px solid ${m.read?C.grayLight:C.gold}`,fontSize:13,marginBottom:8}}>
              <strong>{m.parentName}</strong>{!m.read&&<span style={{background:C.gold,color:C.greenDark,borderRadius:4,padding:'1px 5px',fontSize:9,marginLeft:5,fontWeight:'bold'}}>NOVA</span>}
              <div style={{color:C.dark,opacity:0.8,marginTop:2}}>{m.text.slice(0,60)}…</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── ATHLETES ─────────────────────────────────────────────────────────────────
function AthletesTab({ athletes, upd }) {
  const [filter,setFilter]=useState('Todos');
  const [modal,setModal]=useState(null);
  const [form,setForm]=useState({});
  const [search,setSearch]=useState('');

  let list=filter==='Todos'?athletes:athletes.filter(a=>a.escalao===filter);
  if(search) list=list.filter(a=>a.name.toLowerCase().includes(search.toLowerCase()));

  const openAdd=()=>{setForm({name:'',position:'MC',age:'',escalao:'Sub-18',number:'',goals:0,assists:0,yellowCards:0,redCards:0,trainings:0,phone:'',parentPhone:'',parentName:'',parentEmail:'',pin:'1234',parentPin:'1234'});setModal('add');};
  const openEdit=a=>{setForm({...a});setModal('edit');};
  const doSave=()=>{
    if(!form.name)return;
    const a={...form,id:form.id||nextId(athletes),age:+form.age,goals:+form.goals,assists:+form.assists,yellowCards:+form.yellowCards,redCards:+form.redCards,trainings:+form.trainings,number:+form.number};
    modal==='add'?upd([...athletes,a]):upd(athletes.map(x=>x.id===a.id?a:x));
    setModal(null);
  };
  const doDel=id=>{if(window.confirm('Remover atleta?'))upd(athletes.filter(a=>a.id!==id));};

  return (
    <div>
      <div style={{display:'flex',gap:8,marginBottom:14,flexWrap:'wrap',alignItems:'center'}}>
        <input style={{...IS,flex:1,minWidth:150}} placeholder="🔍 Pesquisar..." value={search} onChange={e=>setSearch(e.target.value)}/>
        <div style={{display:'flex',gap:4,flexWrap:'wrap'}}>
          {['Todos',...ESCALOES.filter(e=>athletes.some(a=>a.escalao===e))].map(e=><Pill key={e} label={e} active={filter===e} onClick={()=>setFilter(e)}/>)}
        </div>
        <button onClick={openAdd} style={BG}>+ Adicionar</button>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(250px,1fr))',gap:12}}>
        {list.map(a=>(
          <div key={a.id} style={{background:C.white,borderRadius:14,padding:16,boxShadow:'0 1px 8px rgba(0,0,0,0.07)',border:`1px solid ${C.grayLight}`}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:10}}>
              <div>
                <div style={{display:'flex',alignItems:'center',gap:7}}>
                  {a.number?<div style={{width:26,height:26,borderRadius:'50%',background:`linear-gradient(135deg,${C.greenDark},${C.green})`,border:`1.5px solid ${C.gold}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:'bold',color:C.gold}}>{a.number}</div>:null}
                  <span style={{fontWeight:'700',fontSize:14}}>{a.name}</span>
                </div>
                <div style={{fontSize:11,color:C.gray,marginTop:2}}>{a.escalao} · {a.age} anos</div>
              </div>
              <span style={{background:`linear-gradient(135deg,${C.green},${C.greenMid})`,color:C.gold,borderRadius:8,padding:'2px 9px',fontSize:11,fontWeight:'bold'}}>{a.position}</span>
            </div>
            <div style={{display:'flex',gap:5,marginBottom:10,flexWrap:'wrap'}}>
              {[['⚽',a.goals],['🅰️',a.assists],['🟨',a.yellowCards],['🟥',a.redCards],['🏃',a.trainings]].map(([l,v])=>(
                <span key={l} style={{background:C.greenPale,borderRadius:6,padding:'2px 7px',fontSize:11,color:C.greenDark}}>{l} {v}</span>
              ))}
            </div>
            {a.parentName&&<div style={{fontSize:11,color:C.gray,marginBottom:1}}>👨‍👩‍👦 {a.parentName}</div>}
            {a.parentPhone&&<div style={{fontSize:11,color:C.gray}}>📱 {a.parentPhone}</div>}
            <div style={{display:'flex',gap:6,marginTop:12}}>
              <button onClick={()=>openEdit(a)} style={BSm(C.greenMid)}>✏️ Editar</button>
              <button onClick={()=>doDel(a.id)} style={BSm(C.red)}>🗑 Remover</button>
            </div>
          </div>
        ))}
      </div>
      {modal&&(
        <Modal title={modal==='add'?'Novo Atleta':'Editar Atleta'} onClose={()=>setModal(null)} onSave={doSave}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
            <div style={{gridColumn:'1/-1'}}><FR l="Nome Completo"><input style={IS} value={form.name||''} onChange={e=>setForm({...form,name:e.target.value})}/></FR></div>
            <FR l="Posição"><select style={IS} value={form.position||'MC'} onChange={e=>setForm({...form,position:e.target.value})}>{POSITIONS.map(p=><option key={p}>{p}</option>)}</select></FR>
            <FR l="Escalão"><select style={IS} value={form.escalao||'Sub-18'} onChange={e=>setForm({...form,escalao:e.target.value})}>{ESCALOES.map(e=><option key={e}>{e}</option>)}</select></FR>
            <FR l="Idade"><input style={IS} type="number" value={form.age||''} onChange={e=>setForm({...form,age:e.target.value})}/></FR>
            <FR l="Nº Camisola"><input style={IS} type="number" value={form.number||''} onChange={e=>setForm({...form,number:e.target.value})}/></FR>
            <FR l="Golos"><input style={IS} type="number" value={form.goals||0} onChange={e=>setForm({...form,goals:e.target.value})}/></FR>
            <FR l="Assistências"><input style={IS} type="number" value={form.assists||0} onChange={e=>setForm({...form,assists:e.target.value})}/></FR>
            <FR l="Amarelos"><input style={IS} type="number" value={form.yellowCards||0} onChange={e=>setForm({...form,yellowCards:e.target.value})}/></FR>
            <FR l="Vermelhos"><input style={IS} type="number" value={form.redCards||0} onChange={e=>setForm({...form,redCards:e.target.value})}/></FR>
            <FR l="Presenças"><input style={IS} type="number" value={form.trainings||0} onChange={e=>setForm({...form,trainings:e.target.value})}/></FR>
            <FR l="Tel. Atleta"><input style={IS} value={form.phone||''} onChange={e=>setForm({...form,phone:e.target.value})}/></FR>
            <FR l="PIN Atleta (4 dígitos)"><input style={IS} value={form.pin||''} onChange={e=>setForm({...form,pin:e.target.value})} maxLength={4}/></FR>
            <div style={{gridColumn:'1/-1',fontSize:11,color:C.gray,textTransform:'uppercase',letterSpacing:'1px',borderTop:`1px solid ${C.grayLight}`,paddingTop:8,marginTop:2,fontWeight:'bold'}}>Encarregado de Educação</div>
            <FR l="Nome EE"><input style={IS} value={form.parentName||''} onChange={e=>setForm({...form,parentName:e.target.value})}/></FR>
            <FR l="Tel. EE"><input style={IS} value={form.parentPhone||''} onChange={e=>setForm({...form,parentPhone:e.target.value})}/></FR>
            <div style={{gridColumn:'1/-1'}}><FR l="Email EE"><input style={IS} type="email" value={form.parentEmail||''} onChange={e=>setForm({...form,parentEmail:e.target.value})}/></FR></div>
            <FR l="PIN Encarregado (4 dígitos)"><input style={IS} value={form.parentPin||''} onChange={e=>setForm({...form,parentPin:e.target.value})} maxLength={4}/></FR>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── TRAININGS ────────────────────────────────────────────────────────────────
function TrainingsTab({ trainings, athletes, upd }) {
  const [modal,setModal]=useState(false);
  const [form,setForm]=useState({});
  const [filter,setFilter]=useState('Todos');

  let list=[...trainings].sort((a,b)=>b.date.localeCompare(a.date));
  if(filter!=='Todos') list=list.filter(t=>t.escalao===filter);

  const openAdd=()=>{setForm({date:today(),title:'',duration:90,escalao:'Sub-18',description:'',objectives:'',attendees:[]});setModal(true);};
  const toggle=id=>setForm(f=>({...f,attendees:f.attendees.includes(id)?f.attendees.filter(x=>x!==id):[...f.attendees,id]}));
  const doSave=()=>{if(!form.title)return;upd([...trainings,{...form,id:nextId(trainings)}]);setModal(false);};
  const doDel=id=>{if(window.confirm('Remover treino?'))upd(trainings.filter(t=>t.id!==id));};

  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14,flexWrap:'wrap',gap:8}}>
        <div style={{display:'flex',gap:4,flexWrap:'wrap'}}>
          {['Todos',...ESCALOES].map(e=><Pill key={e} label={e} active={filter===e} onClick={()=>setFilter(e)}/>)}
        </div>
        <button onClick={openAdd} style={BG}>+ Novo Treino</button>
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:12}}>
        {list.map(t=>{
          const att=athletes.filter(a=>t.attendees.includes(a.id));
          return (
            <div key={t.id} style={{background:C.white,borderRadius:14,overflow:'hidden',boxShadow:'0 1px 8px rgba(0,0,0,0.07)',border:`1px solid ${C.grayLight}`}}>
              <div style={{background:C.greenPale,padding:'12px 16px',display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:8}}>
                <div>
                  <div style={{fontWeight:'700',fontSize:15,color:C.greenDark}}>{t.title}</div>
                  <div style={{fontSize:12,color:C.gray,marginTop:2}}>{fmtDate(t.date)} · {t.duration} min · <strong style={{color:C.green}}>{t.escalao}</strong></div>
                </div>
                <div style={{display:'flex',gap:6,alignItems:'center'}}>
                  <span style={{background:C.green,color:C.gold,borderRadius:8,padding:'2px 10px',fontSize:11,fontWeight:'bold'}}>{att.length} presenças</span>
                  <button onClick={()=>doDel(t.id)} style={BSm(C.red)}>🗑</button>
                </div>
              </div>
              <div style={{padding:'12px 16px'}}>
                {t.description&&<div style={{fontSize:13,lineHeight:1.5,marginBottom:t.objectives?6:0}}>{t.description}</div>}
                {t.objectives&&<div style={{fontSize:12,color:C.blue,fontStyle:'italic'}}>🎯 {t.objectives}</div>}
                {att.length>0&&<div style={{marginTop:10,display:'flex',flexWrap:'wrap',gap:4}}>
                  {att.map(a=><span key={a.id} style={{background:C.greenPale,color:C.green,borderRadius:6,padding:'2px 8px',fontSize:11}}>{a.name}</span>)}
                </div>}
              </div>
            </div>
          );
        })}
      </div>
      {modal&&(
        <Modal title="Novo Treino" onClose={()=>setModal(false)} onSave={doSave}>
          <FR l="Título"><input style={IS} value={form.title||''} onChange={e=>setForm({...form,title:e.target.value})}/></FR>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8}}>
            <FR l="Data"><input style={IS} type="date" value={form.date||''} onChange={e=>setForm({...form,date:e.target.value})}/></FR>
            <FR l="Duração (min)"><input style={IS} type="number" value={form.duration||90} onChange={e=>setForm({...form,duration:+e.target.value})}/></FR>
            <FR l="Escalão"><select style={IS} value={form.escalao||'Sub-18'} onChange={e=>setForm({...form,escalao:e.target.value})}>{ESCALOES.map(e=><option key={e}>{e}</option>)}</select></FR>
          </div>
          <FR l="Descrição"><textarea style={{...IS,minHeight:60,resize:'vertical'}} value={form.description||''} onChange={e=>setForm({...form,description:e.target.value})}/></FR>
          <FR l="Objetivos"><input style={IS} value={form.objectives||''} onChange={e=>setForm({...form,objectives:e.target.value})}/></FR>
          <div>
            <label style={{fontSize:11,color:C.gray,textTransform:'uppercase',display:'block',marginBottom:6,fontWeight:'700'}}>Presenças</label>
            <div style={{display:'flex',flexWrap:'wrap',gap:5,maxHeight:120,overflowY:'auto'}}>
              {athletes.map(a=>{const on=form.attendees?.includes(a.id);return<button key={a.id} onClick={()=>toggle(a.id)} style={{border:`1.5px solid ${on?C.green:C.grayLight}`,background:on?C.green:'transparent',color:on?C.white:C.dark,borderRadius:8,padding:'4px 10px',fontSize:12,cursor:'pointer',fontFamily:'inherit'}}>{on?'✓ ':''}{a.name}</button>;})}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── STATS ────────────────────────────────────────────────────────────────────
function StatsTab({ athletes, trainings }) {
  const [sort,setSort]=useState('goals');
  const [esc,setEsc]=useState('Todos');
  let list=esc==='Todos'?athletes:athletes.filter(a=>a.escalao===esc);
  list=[...list].sort((a,b)=>b[sort]-a[sort]);
  const total=trainings.length;
  const cols=[{k:'goals',l:'⚽ Golos'},{k:'assists',l:'🅰️ Assist.'},{k:'yellowCards',l:'🟨 Cartões'},{k:'trainings',l:'🏃 Presenças'}];
  return (
    <div>
      <div style={{display:'flex',gap:8,marginBottom:14,flexWrap:'wrap',justifyContent:'space-between'}}>
        <div style={{display:'flex',gap:4,flexWrap:'wrap'}}>
          {['Todos',...ESCALOES.filter(e=>athletes.some(a=>a.escalao===e))].map(e=><Pill key={e} label={e} active={esc===e} onClick={()=>setEsc(e)}/>)}
        </div>
        <div style={{display:'flex',gap:4,flexWrap:'wrap'}}>
          {cols.map(c=><Pill key={c.k} label={c.l} active={sort===c.k} onClick={()=>setSort(c.k)}/>)}
        </div>
      </div>
      {list.length>=3&&(
        <div style={{background:C.white,borderRadius:16,padding:'20px 16px',marginBottom:20,boxShadow:'0 1px 8px rgba(0,0,0,0.08)'}}>
          <div style={{fontSize:10,letterSpacing:'2px',textTransform:'uppercase',color:C.gray,marginBottom:14,textAlign:'center'}}>TOP 3</div>
          <div style={{display:'flex',gap:8,alignItems:'flex-end',justifyContent:'center',maxWidth:360,margin:'0 auto'}}>
            {[1,0,2].map((rank,i)=>{const a=list[rank];if(!a)return null;const hs=[80,110,60];const bgs=[C.gray,C.gold,C.orange];const medals=['🥈','🥇','🥉'];return(
              <div key={a.id} style={{flex:1,textAlign:'center'}}>
                <div style={{fontSize:11,color:C.gray,marginBottom:4}}>{a.name}</div>
                <div style={{background:bgs[i],height:hs[i],borderRadius:'10px 10px 0 0',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',color:rank===0?C.greenDark:C.white}}>
                  <div style={{fontSize:20}}>{medals[i]}</div><div style={{fontSize:22,fontWeight:'bold'}}>{a[sort]}</div>
                </div>
              </div>
            );})}
          </div>
        </div>
      )}
      <div style={{background:C.white,borderRadius:14,overflow:'hidden',boxShadow:'0 1px 8px rgba(0,0,0,0.07)'}}>
        <table style={{width:'100%',borderCollapse:'collapse',fontSize:13}}>
          <thead><tr style={{background:`linear-gradient(90deg,${C.greenDark},${C.green})`,color:C.white}}>
            {['#','Atleta','Pos','Esc','⚽','🅰️','🟨','🟥','🏃',total>0?'%':''].map((h,i)=>h&&<th key={i} style={{padding:'10px 8px',textAlign:i<2?'left':'center',fontSize:11}}>{h}</th>)}
          </tr></thead>
          <tbody>{list.map((a,i)=>(
            <tr key={a.id} style={{background:i%2===0?C.white:C.greenPale}}>
              <td style={{padding:'9px 8px',textAlign:'center',fontWeight:'bold',color:i===0?C.gold:C.gray}}>{i+1}</td>
              <td style={{padding:'9px 8px',fontWeight:'bold'}}>{a.name}</td>
              <td style={{padding:'9px 8px',textAlign:'center'}}><span style={{background:C.green,color:C.gold,borderRadius:5,padding:'1px 6px',fontSize:10,fontWeight:'bold'}}>{a.position}</span></td>
              <td style={{padding:'9px 8px',fontSize:11,color:C.gray,textAlign:'center'}}>{a.escalao}</td>
              <td style={{padding:'9px 8px',textAlign:'center',fontWeight:sort==='goals'?'bold':'normal',color:sort==='goals'?C.green:C.dark}}>{a.goals}</td>
              <td style={{padding:'9px 8px',textAlign:'center'}}>{a.assists}</td>
              <td style={{padding:'9px 8px',textAlign:'center',color:a.yellowCards>=3?C.orange:C.dark}}>{a.yellowCards}</td>
              <td style={{padding:'9px 8px',textAlign:'center',color:a.redCards>0?C.red:C.dark}}>{a.redCards}</td>
              <td style={{padding:'9px 8px',textAlign:'center'}}>{a.trainings}</td>
              {total>0&&<td style={{padding:'9px 8px',textAlign:'center',fontSize:11,color:C.gray}}>{Math.round(a.trainings/total*100)}%</td>}
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}

// ─── GAMES ────────────────────────────────────────────────────────────────────
function GamesTab({ games, athletes, upd }) {
  const [modal,setModal]=useState(null);
  const [form,setForm]=useState({});
  const [expanded,setExpanded]=useState(null);
  const t=today();
  const upcoming=[...games].filter(g=>g.date>=t&&!g.result).sort((a,b)=>a.date.localeCompare(b.date));
  const past=[...games].filter(g=>g.date<t||g.result).sort((a,b)=>b.date.localeCompare(a.date));
  const toggle=id=>setForm(f=>({...f,squad:f.squad.includes(id)?f.squad.filter(x=>x!==id):[...f.squad,id]}));
  const doSave=()=>{if(!form.opponent)return;const g={...form,id:form.id||nextId(games)};modal==='add'?upd([...games,g]):upd(games.map(x=>x.id===g.id?g:x));setModal(null);};

  const GCard=({g})=>{
    const squad=athletes.filter(a=>g.squad.includes(a.id));
    const exp=expanded===g.id;
    return(
      <div style={{background:C.white,borderRadius:14,overflow:'hidden',boxShadow:'0 1px 8px rgba(0,0,0,0.08)',border:`1px solid ${C.grayLight}`}}>
        <div style={{background:g.local?C.greenPale:C.bluePale,padding:'12px 16px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:8}}>
          <div>
            <div style={{fontWeight:'700',fontSize:15}}>{g.local?'🏠':'✈️'} vs {g.opponent}</div>
            <div style={{fontSize:11,color:C.gray,marginTop:1}}>{fmtDate(g.date)} {g.time} · {g.escalao} · {g.competition}</div>
          </div>
          <div style={{display:'flex',gap:6,alignItems:'center'}}>
            {g.result&&<span style={{background:C.green,color:C.gold,borderRadius:8,padding:'3px 12px',fontWeight:'bold',fontSize:14}}>{g.result}</span>}
            <button onClick={()=>setExpanded(exp?null:g.id)} style={BSm(C.blue)}>👁 {exp?'Fechar':'Convocados'}</button>
            <button onClick={()=>{setForm({...g});setModal('edit');}} style={BSm(C.greenMid)}>✏️</button>
            <button onClick={()=>{if(window.confirm('Remover?'))upd(games.filter(x=>x.id!==g.id));}} style={BSm(C.red)}>🗑</button>
          </div>
        </div>
        {exp&&<div style={{padding:'14px 16px'}}>
          {g.notes&&<div style={{fontSize:12,marginBottom:10,fontStyle:'italic',padding:'8px 12px',background:C.goldPale,borderRadius:8}}>📝 {g.notes}</div>}
          <div style={{fontSize:10,letterSpacing:'1px',textTransform:'uppercase',color:C.gray,marginBottom:8,fontWeight:'bold'}}>Convocados ({squad.length})</div>
          <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
            {squad.map(a=><span key={a.id} style={{background:C.greenPale,color:C.greenDark,borderRadius:8,padding:'4px 10px',fontSize:12}}>{a.number?`#${a.number} `:''}{a.name}</span>)}
          </div>
        </div>}
      </div>
    );
  };

  return (
    <div>
      <div style={{display:'flex',justifyContent:'flex-end',marginBottom:14}}>
        <button onClick={()=>{setForm({date:today(),time:'15:00',opponent:'',local:true,escalao:'Sub-18',competition:'Distrital Porto',result:'',squad:[],notes:''});setModal('add');}} style={BG}>+ Novo Jogo</button>
      </div>
      {upcoming.length>0&&<><SH title="Próximos Jogos"/><div style={{display:'flex',flexDirection:'column',gap:10,marginBottom:20}}>{upcoming.map(g=><GCard key={g.id} g={g}/>)}</div></>}
      {past.length>0&&<><SH title="Jogos Realizados"/><div style={{display:'flex',flexDirection:'column',gap:10}}>{past.map(g=><GCard key={g.id} g={g}/>)}</div></>}
      {modal&&<Modal title={modal==='add'?'Novo Jogo':'Editar Jogo'} onClose={()=>setModal(null)} onSave={doSave}>
        <FR l="Adversário"><input style={IS} value={form.opponent||''} onChange={e=>setForm({...form,opponent:e.target.value})}/></FR>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
          <FR l="Data"><input style={IS} type="date" value={form.date||''} onChange={e=>setForm({...form,date:e.target.value})}/></FR>
          <FR l="Hora"><input style={IS} type="time" value={form.time||''} onChange={e=>setForm({...form,time:e.target.value})}/></FR>
          <FR l="Escalão"><select style={IS} value={form.escalao||'Sub-18'} onChange={e=>setForm({...form,escalao:e.target.value})}>{ESCALOES.map(e=><option key={e}>{e}</option>)}</select></FR>
          <FR l="Competição"><input style={IS} value={form.competition||''} onChange={e=>setForm({...form,competition:e.target.value})}/></FR>
          <FR l="Resultado"><input style={IS} value={form.result||''} onChange={e=>setForm({...form,result:e.target.value})} placeholder="Ex: 2-1"/></FR>
          <FR l="Local"><select style={IS} value={form.local?'casa':'fora'} onChange={e=>setForm({...form,local:e.target.value==='casa'})}><option value="casa">🏠 Casa</option><option value="fora">✈️ Fora</option></select></FR>
        </div>
        <FR l="Notas"><textarea style={{...IS,minHeight:50,resize:'vertical'}} value={form.notes||''} onChange={e=>setForm({...form,notes:e.target.value})}/></FR>
        <div>
          <label style={{fontSize:11,color:C.gray,textTransform:'uppercase',display:'block',marginBottom:6,fontWeight:'700'}}>Convocatória</label>
          <div style={{display:'flex',flexWrap:'wrap',gap:5,maxHeight:120,overflowY:'auto'}}>
            {athletes.map(a=>{const on=form.squad?.includes(a.id);return<button key={a.id} onClick={()=>toggle(a.id)} style={{border:`1.5px solid ${on?C.green:C.grayLight}`,background:on?C.green:'transparent',color:on?C.white:C.dark,borderRadius:8,padding:'4px 10px',fontSize:12,cursor:'pointer',fontFamily:'inherit'}}>{on?'✓ ':''}{a.name}</button>;})}
          </div>
        </div>
      </Modal>}
    </div>
  );
}

// ─── CALENDAR ─────────────────────────────────────────────────────────────────
function CalendarTab({ calEvents, upd }) {
  const [modal,setModal]=useState(false);
  const [form,setForm]=useState({});
  const t=today();
  const upcoming=[...calEvents].filter(e=>e.date>=t).sort((a,b)=>a.date.localeCompare(b.date));
  const past=[...calEvents].filter(e=>e.date<t).sort((a,b)=>b.date.localeCompare(a.date));
  const TI={jogo:'⚽',treino:'🏃',reuniao:'👥',evento:'🎉'};
  const TC={jogo:C.green,treino:C.blue,reuniao:C.orange,evento:C.gold};
  const ECard=({e})=>(
    <div style={{background:C.white,borderRadius:12,padding:'12px 16px',display:'flex',gap:12,alignItems:'flex-start',boxShadow:'0 1px 6px rgba(0,0,0,0.06)',border:`1px solid ${C.grayLight}`}}>
      <div style={{background:TC[e.type]||C.gray,borderRadius:12,width:44,height:44,display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,flexShrink:0}}>{TI[e.type]||'📌'}</div>
      <div style={{flex:1}}>
        <div style={{fontWeight:'700',fontSize:14}}>{e.title}</div>
        <div style={{fontSize:11,color:C.gray,marginTop:2}}>{fmtDate(e.date)} · {e.escalao}</div>
        {e.location&&<div style={{fontSize:11,color:C.gray,marginTop:1}}>📍 {e.location}</div>}
      </div>
      <button onClick={()=>{if(window.confirm('Remover?'))upd(calEvents.filter(x=>x.id!==e.id));}} style={BSm(C.red)}>🗑</button>
    </div>
  );
  return (
    <div>
      <div style={{display:'flex',justifyContent:'flex-end',marginBottom:14}}>
        <button onClick={()=>{setForm({date:today(),title:'',type:'evento',escalao:'Todos',location:''});setModal(true);}} style={BG}>+ Novo Evento</button>
      </div>
      {upcoming.length>0&&<><SH title="Próximos Eventos"/><div style={{display:'flex',flexDirection:'column',gap:8,marginBottom:20}}>{upcoming.map(e=><ECard key={e.id} e={e}/>)}</div></>}
      {past.length>0&&<><SH title="Passados"/><div style={{display:'flex',flexDirection:'column',gap:8}}>{past.map(e=><ECard key={e.id} e={e}/>)}</div></>}
      {modal&&<Modal title="Novo Evento" onClose={()=>setModal(false)} onSave={()=>{if(!form.title)return;upd([...calEvents,{...form,id:nextId(calEvents)}]);setModal(false);}}>
        <FR l="Título"><input style={IS} value={form.title||''} onChange={e=>setForm({...form,title:e.target.value})}/></FR>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
          <FR l="Data"><input style={IS} type="date" value={form.date||''} onChange={e=>setForm({...form,date:e.target.value})}/></FR>
          <FR l="Tipo"><select style={IS} value={form.type||'evento'} onChange={e=>setForm({...form,type:e.target.value})}><option value="jogo">⚽ Jogo</option><option value="treino">🏃 Treino</option><option value="reuniao">👥 Reunião</option><option value="evento">🎉 Evento</option></select></FR>
          <FR l="Escalão"><select style={IS} value={form.escalao||'Todos'} onChange={e=>setForm({...form,escalao:e.target.value})}><option>Todos</option>{ESCALOES.map(e=><option key={e}>{e}</option>)}</select></FR>
          <FR l="Local"><input style={IS} value={form.location||''} onChange={e=>setForm({...form,location:e.target.value})}/></FR>
        </div>
      </Modal>}
    </div>
  );
}

// ─── MEDICAL ──────────────────────────────────────────────────────────────────
function MedicalTab({ athletes, medical, upd }) {
  const [sel,setSel]=useState(null);
  const [editing,setEditing]=useState(false);
  const [form,setForm]=useState({});
  const rec=medical[sel]||{bloodType:'',allergies:'',conditions:'',insurance:'',insuranceNum:'',emergencyContact:'',emergencyPhone:'',notes:''};
  const a=athletes.find(x=>x.id===sel);
  return (
    <div style={{display:'grid',gridTemplateColumns:'200px 1fr',gap:16}}>
      <div>
        <div style={{fontSize:10,letterSpacing:'2px',textTransform:'uppercase',color:C.gray,marginBottom:8,fontWeight:'bold'}}>Atletas</div>
        {athletes.map(x=>(
          <button key={x.id} onClick={()=>{setSel(x.id);setEditing(false);}} style={{background:sel===x.id?`linear-gradient(135deg,${C.greenDark},${C.green})`:C.white,color:sel===x.id?C.white:C.dark,border:`1.5px solid ${sel===x.id?C.green:C.grayLight}`,borderRadius:10,padding:'9px 12px',cursor:'pointer',width:'100%',textAlign:'left',display:'flex',justifyContent:'space-between',marginBottom:4,fontFamily:'inherit',fontSize:13}}>
            <span style={{fontWeight:sel===x.id?'700':'400'}}>{x.name}</span><span style={{fontSize:10,opacity:0.7}}>{x.escalao}</span>
          </button>
        ))}
      </div>
      <div>
        {!sel?<div style={{background:C.white,borderRadius:16,padding:40,textAlign:'center',color:C.gray}}><div style={{fontSize:44,marginBottom:10}}>🏥</div><div>Seleciona um atleta</div></div>:(
          <div style={{background:C.white,borderRadius:16,padding:20,boxShadow:'0 1px 8px rgba(0,0,0,0.07)'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:18,paddingBottom:14,borderBottom:`2px solid ${C.greenPale}`}}>
              <div style={{fontWeight:'700',fontSize:17,fontFamily:"'Playfair Display', serif"}}>{a?.name}</div>
              {!editing&&<button onClick={()=>{setForm({...rec});setEditing(true);}} style={BG}>✏️ Editar</button>}
            </div>
            {editing?(
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
                <FR l="Grupo Sanguíneo"><select style={IS} value={form.bloodType||''} onChange={e=>setForm({...form,bloodType:e.target.value})}><option value="">--</option>{BLOOD_TYPES.map(b=><option key={b}>{b}</option>)}</select></FR>
                <FR l="Seguro"><input style={IS} value={form.insurance||''} onChange={e=>setForm({...form,insurance:e.target.value})}/></FR>
                <FR l="Nº Apólice"><input style={IS} value={form.insuranceNum||''} onChange={e=>setForm({...form,insuranceNum:e.target.value})}/></FR>
                <FR l="Contato Emergência"><input style={IS} value={form.emergencyContact||''} onChange={e=>setForm({...form,emergencyContact:e.target.value})}/></FR>
                <FR l="Tel. Emergência"><input style={IS} value={form.emergencyPhone||''} onChange={e=>setForm({...form,emergencyPhone:e.target.value})}/></FR>
                <div style={{gridColumn:'1/-1'}}><FR l="Alergias"><textarea style={{...IS,minHeight:50}} value={form.allergies||''} onChange={e=>setForm({...form,allergies:e.target.value})}/></FR></div>
                <div style={{gridColumn:'1/-1'}}><FR l="Condições Médicas"><textarea style={{...IS,minHeight:60}} value={form.conditions||''} onChange={e=>setForm({...form,conditions:e.target.value})}/></FR></div>
                <div style={{gridColumn:'1/-1'}}><FR l="Notas"><textarea style={{...IS,minHeight:50}} value={form.notes||''} onChange={e=>setForm({...form,notes:e.target.value})}/></FR></div>
                <div style={{gridColumn:'1/-1',display:'flex',gap:8,justifyContent:'flex-end'}}>
                  <button onClick={()=>setEditing(false)} style={BS}>Cancelar</button>
                  <button onClick={()=>{upd({...medical,[sel]:form});setEditing(false);}} style={BG}>✓ Guardar</button>
                </div>
              </div>
            ):(
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
                {[['🩸 Grupo Sanguíneo',rec.bloodType||'—'],['🛡️ Seguro',rec.insurance||'—'],['📋 Nº Apólice',rec.insuranceNum||'—'],['📞 Emergência',rec.emergencyContact||'—'],['📱 Tel. Emergência',rec.emergencyPhone||'—']].map(([l,v])=>(
                  <div key={l} style={{background:C.greenPale,borderRadius:10,padding:'10px 12px'}}>
                    <div style={{fontSize:9,color:C.gray,textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:3,fontWeight:'bold'}}>{l}</div>
                    <div style={{fontSize:14,fontWeight:'bold',color:C.greenDark}}>{v}</div>
                  </div>
                ))}
                {[['⚠️ Alergias',rec.allergies||'Nenhuma',C.orangePale],['🏥 Condições Médicas',rec.conditions||'Nenhuma',C.redPale],['📝 Notas',rec.notes||'—',C.bluePale]].map(([l,v,bg])=>(
                  <div key={l} style={{gridColumn:'1/-1',background:bg,borderRadius:10,padding:'10px 12px'}}>
                    <div style={{fontSize:9,color:C.gray,textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:3,fontWeight:'bold'}}>{l}</div>
                    <div style={{fontSize:13,lineHeight:1.5}}>{v}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── PARENTS TAB ──────────────────────────────────────────────────────────────
function ParentsTab({ data, upd }) {
  const { athletes, parentMsgs, messages, faqs } = data;
  const [view,setView]=useState('inbox');
  const [reply,setReply]=useState({});
  const [broadForm,setBroadForm]=useState({text:'',escalao:'Todos'});
  const [faqForm,setFaqForm]=useState({question:'',answer:''});

  const unread=parentMsgs.filter(m=>!m.read).length;
  const athlete=id=>athletes.find(a=>a.id===id);

  const sendReply=m=>{
    if(!reply[m.id]?.trim())return;
    upd('messages',[...messages,{id:nextId(messages),from:'Treinador',escalao:'Todos',text:`↩ Resposta a ${m.parentName}: ${reply[m.id]}`,date:today(),type:'resposta'}]);
    upd('parentMsgs',parentMsgs.map(x=>x.id===m.id?{...x,read:true}:x));
    setReply({...reply,[m.id]:''});
  };

  return (
    <div>
      <div style={{display:'flex',gap:6,marginBottom:18}}>
        {[{id:'inbox',l:`📥 Mensagens${unread>0?` (${unread})`:''}`},{id:'broadcast',l:'📢 Comunicar'},{id:'faq',l:'❓ FAQ'}].map(({id,l})=>(
          <button key={id} onClick={()=>setView(id)} style={{background:view===id?`linear-gradient(135deg,${C.greenDark},${C.green})`:C.white,color:view===id?C.white:C.dark,border:`2px solid ${view===id?C.green:C.grayLight}`,borderRadius:10,padding:'8px 16px',cursor:'pointer',fontSize:13,fontFamily:'inherit',fontWeight:view===id?'700':'400'}}>{l}</button>
        ))}
      </div>
      {view==='inbox'&&(
        <div>
          {unread>0&&<div style={{display:'flex',justifyContent:'flex-end',marginBottom:10}}><button onClick={()=>upd('parentMsgs',parentMsgs.map(m=>({...m,read:true})))} style={BS}>✓ Marcar todas lidas</button></div>}
          {parentMsgs.length===0&&<Empty icon="📭" text="Sem mensagens dos pais."/>}
          {[...parentMsgs].reverse().map(m=>{
            const a=athlete(m.athleteId);
            return(
              <div key={m.id} style={{background:m.read?C.white:C.goldPale,borderRadius:14,padding:16,boxShadow:'0 1px 8px rgba(0,0,0,0.07)',border:`2px solid ${m.read?C.grayLight:C.gold}`,marginBottom:12}}>
                <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:6,marginBottom:8}}>
                  <div>
                    <strong style={{fontSize:14}}>{m.parentName}</strong>
                    {a&&<span style={{fontSize:11,color:C.gray,marginLeft:6}}>EE de {a.name}</span>}
                    {!m.read&&<span style={{background:C.gold,color:C.greenDark,borderRadius:4,padding:'1px 5px',fontSize:9,marginLeft:6,fontWeight:'bold'}}>NOVA</span>}
                  </div>
                  <span style={{fontSize:11,color:C.gray}}>{fmtDate(m.date)}</span>
                </div>
                <div style={{fontSize:13,lineHeight:1.6,padding:'10px 14px',background:m.read?C.grayLight:C.white,borderRadius:8,marginBottom:10}}>{m.text}</div>
                <div style={{display:'flex',gap:6,flexWrap:'wrap',alignItems:'center'}}>
                  <input style={{...IS,flex:1,minWidth:140,fontSize:12}} value={reply[m.id]||''} onChange={e=>setReply({...reply,[m.id]:e.target.value})} placeholder="Resposta..."/>
                  <button onClick={()=>sendReply(m)} style={BG}>↩ Responder</button>
                  {!m.read&&<button onClick={()=>upd('parentMsgs',parentMsgs.map(x=>x.id===m.id?{...x,read:true}:x))} style={BSm(C.greenMid)}>✓ Lida</button>}
                  <button onClick={()=>upd('parentMsgs',parentMsgs.filter(x=>x.id!==m.id))} style={BSm(C.red)}>🗑</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {view==='broadcast'&&(
        <div>
          <div style={{background:C.white,borderRadius:16,padding:20,boxShadow:'0 1px 8px rgba(0,0,0,0.07)',marginBottom:20}}>
            <div style={{fontWeight:'700',color:C.greenDark,fontSize:15,marginBottom:14}}>📢 Enviar Comunicado</div>
            <FR l="Para">
              <div style={{display:'flex',gap:4,flexWrap:'wrap',marginTop:4}}>
                {['Todos',...ESCALOES].map(e=><Pill key={e} label={e} active={broadForm.escalao===e} onClick={()=>setBroadForm({...broadForm,escalao:e})}/>)}
              </div>
            </FR>
            <FR l="Mensagem"><textarea style={{...IS,minHeight:90,resize:'vertical',marginTop:4}} value={broadForm.text} onChange={e=>setBroadForm({...broadForm,text:e.target.value})}/></FR>
            <button onClick={()=>{if(!broadForm.text.trim())return;upd('messages',[...messages,{id:nextId(messages),from:'Treinador',escalao:broadForm.escalao,text:broadForm.text,date:today(),type:'aviso_pais'}]);setBroadForm({text:'',escalao:'Todos'});}} style={{...BG,marginTop:10}}>📤 Publicar</button>
          </div>
          <SH title="Comunicados Publicados"/>
          {[...messages].filter(m=>['aviso_pais','aviso','convocatoria'].includes(m.type)).reverse().map(m=><SMsgCard key={m.id} m={m}/>)}
        </div>
      )}
      {view==='faq'&&(
        <div>
          <div style={{background:C.white,borderRadius:16,padding:20,boxShadow:'0 1px 8px rgba(0,0,0,0.07)',marginBottom:20}}>
            <div style={{fontWeight:'700',color:C.greenDark,fontSize:15,marginBottom:14}}>➕ Adicionar FAQ</div>
            <FR l="Pergunta"><input style={IS} value={faqForm.question} onChange={e=>setFaqForm({...faqForm,question:e.target.value})}/></FR>
            <FR l="Resposta"><textarea style={{...IS,minHeight:60,resize:'vertical'}} value={faqForm.answer} onChange={e=>setFaqForm({...faqForm,answer:e.target.value})}/></FR>
            <button onClick={()=>{if(!faqForm.question||!faqForm.answer)return;upd('faqs',[...faqs,{id:nextId(faqs),...faqForm}]);setFaqForm({question:'',answer:''});}} style={{...BG,marginTop:10}}>+ Adicionar</button>
          </div>
          {faqs.map(f=>(
            <div key={f.id} style={{background:C.white,borderRadius:12,overflow:'hidden',boxShadow:'0 1px 6px rgba(0,0,0,0.06)',marginBottom:10}}>
              <div style={{background:C.greenPale,padding:'10px 16px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <strong style={{fontSize:13,color:C.greenDark}}>❓ {f.question}</strong>
                <button onClick={()=>upd('faqs',faqs.filter(x=>x.id!==f.id))} style={BSm(C.red)}>🗑</button>
              </div>
              <div style={{padding:'10px 16px',fontSize:13,lineHeight:1.6}}>{f.answer}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── MESSAGES ─────────────────────────────────────────────────────────────────
function MessagesTab({ messages, upd }) {
  const [form,setForm]=useState({text:'',escalao:'Todos',type:'aviso'});
  const TC={aviso:C.green,convocatoria:C.blue,resposta:C.orange,aviso_pais:C.gold};
  const TL={aviso:'📢 Aviso',convocatoria:'🏆 Convocatória',resposta:'↩ Resposta',aviso_pais:'👨‍👩‍👦 Pais'};
  return (
    <div>
      <div style={{background:C.white,borderRadius:16,padding:18,marginBottom:20,boxShadow:'0 1px 8px rgba(0,0,0,0.07)'}}>
        <div style={{fontWeight:'700',marginBottom:12,color:C.greenDark,fontSize:14,textTransform:'uppercase',letterSpacing:'0.5px'}}>Publicar Aviso</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:8}}>
          <FR l="Tipo"><select style={IS} value={form.type} onChange={e=>setForm({...form,type:e.target.value})}><option value="aviso">📢 Aviso Geral</option><option value="convocatoria">🏆 Convocatória</option><option value="aviso_pais">👨‍👩‍👦 Para Pais</option></select></FR>
          <FR l="Para"><div style={{display:'flex',gap:4,flexWrap:'wrap',marginTop:4}}>{['Todos',...ESCALOES].map(e=><Pill key={e} label={e} active={form.escalao===e} onClick={()=>setForm({...form,escalao:e})}/>)}</div></FR>
        </div>
        <textarea style={{...IS,minHeight:80,resize:'vertical',width:'100%',boxSizing:'border-box'}} value={form.text} onChange={e=>setForm({...form,text:e.target.value})}/>
        <button onClick={()=>{if(!form.text.trim())return;upd([...messages,{id:nextId(messages),from:'Treinador',escalao:form.escalao,text:form.text,date:today(),type:form.type}]);setForm({text:'',escalao:'Todos',type:'aviso'});}} style={{...BG,marginTop:10}}>📤 Publicar</button>
      </div>
      {[...messages].reverse().map(m=>(
        <div key={m.id} style={{background:C.white,borderRadius:12,padding:'12px 16px',marginBottom:8,boxShadow:'0 1px 4px rgba(0,0,0,0.06)',borderLeft:`4px solid ${TC[m.type]||C.green}`}}>
          <div style={{display:'flex',justifyContent:'space-between',gap:8}}>
            <div style={{flex:1}}>
              <div style={{fontSize:10,color:TC[m.type]||C.green,fontWeight:'bold',textTransform:'uppercase',marginBottom:4}}>{TL[m.type]||m.type} · {m.escalao}</div>
              <div style={{fontSize:13,lineHeight:1.5}}>{m.text}</div>
              <div style={{fontSize:10,color:C.gray,marginTop:4}}>{fmtDate(m.date)}</div>
            </div>
            <button onClick={()=>upd(messages.filter(x=>x.id!==m.id))} style={BSm(C.red)}>🗑</button>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── SETTINGS ─────────────────────────────────────────────────────────────────
function SettingsTab({ athletes, upd }) {
  const [newPass,setNewPass]=useState('');
  const [confirm,setConfirm]=useState('');
  const [msg,setMsg]=useState('');

  const changePass=()=>{
    if(newPass.length<6){setMsg('❌ Mínimo 6 caracteres.');return;}
    if(newPass!==confirm){setMsg('❌ As palavras-passe não coincidem.');return;}
    try{localStorage.setItem('arc-coach-pass',newPass);setMsg('✅ Palavra-passe alterada com sucesso!');setNewPass('');setConfirm('');}
    catch{setMsg('❌ Erro ao guardar.');}
  };

  return (
    <div style={{maxWidth:500}}>
      <div style={{background:C.white,borderRadius:16,padding:24,boxShadow:'0 1px 8px rgba(0,0,0,0.07)',marginBottom:20}}>
        <h3 style={{margin:'0 0 16px',fontFamily:"'Playfair Display', serif",color:C.greenDark}}>🔐 Alterar Palavra-passe</h3>
        <div style={{display:'flex',flexDirection:'column',gap:12}}>
          <FR l="Nova palavra-passe"><input style={IS} type="password" value={newPass} onChange={e=>setNewPass(e.target.value)}/></FR>
          <FR l="Confirmar palavra-passe"><input style={IS} type="password" value={confirm} onChange={e=>setConfirm(e.target.value)}/></FR>
          {msg&&<div style={{padding:'8px 12px',borderRadius:8,background:msg.startsWith('✅')?C.greenPale:C.redPale,fontSize:13}}>{msg}</div>}
          <button onClick={changePass} style={BG}>Guardar Nova Palavra-passe</button>
        </div>
      </div>
      <div style={{background:C.white,borderRadius:16,padding:24,boxShadow:'0 1px 8px rgba(0,0,0,0.07)'}}>
        <h3 style={{margin:'0 0 4px',fontFamily:"'Playfair Display', serif",color:C.greenDark}}>📱 PINs dos Atletas e Pais</h3>
        <p style={{margin:'0 0 16px',fontSize:13,color:C.gray}}>Para alterar um PIN, vai ao Plantel → Editar atleta.</p>
        <div style={{display:'flex',flexDirection:'column',gap:6}}>
          {athletes.map(a=>(
            <div key={a.id} style={{background:C.greenPale,borderRadius:10,padding:'10px 14px',display:'flex',justifyContent:'space-between',fontSize:13}}>
              <span style={{fontWeight:'700'}}>{a.name}</span>
              <span style={{color:C.gray}}>Atleta: <strong>{a.pin||'1234'}</strong> · EE: <strong>{a.parentPin||a.parentPhone?.slice(-4)||'0000'}</strong></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
