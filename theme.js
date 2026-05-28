import React, { useState } from 'react';
import { C, IS, lsGet } from '../theme';
import { ClubCrest } from './UI';

// ─── Credentials ──────────────────────────────────────────────────────────────
// Treinador: password stored in localStorage (default: "treinador2526")
// Pais: parentPin stored per athlete (default: last 4 digits of parentPhone)
// Atletas: pin stored per athlete (default: "1111","2222" etc in seed)

export default function Login({ onLogin }) {
  const [role, setRole]       = useState(null);   // 'treinador' | 'pai' | 'atleta'
  const [name, setName]       = useState('');      // athlete/parent name selection
  const [pin, setPin]         = useState('');
  const [error, setError]     = useState('');
  const [showPass, setShowPass] = useState(false);

  const athletes = lsGet('arc-athletes', []);

  function tryLogin() {
    setError('');
    if (role === 'treinador') {
      const stored = lsGet('arc-coach-pass', 'treinador2526');
      if (pin === stored) {
        onLogin({ role: 'treinador', name: 'Treinador' });
      } else {
        setError('Palavra-passe incorreta.');
      }
      return;
    }
    if (role === 'atleta') {
      const a = athletes.find(x => x.id === parseInt(name));
      if (!a) { setError('Seleciona um atleta.'); return; }
      if (pin === (a.pin || '1234')) {
        onLogin({ role: 'atleta', athleteId: a.id, name: a.name });
      } else {
        setError('PIN incorreto.');
      }
      return;
    }
    if (role === 'pai') {
      const a = athletes.find(x => x.id === parseInt(name));
      if (!a) { setError('Seleciona o teu educando.'); return; }
      const parentPin = a.parentPin || a.parentPhone?.slice(-4) || '0000';
      if (pin === parentPin) {
        onLogin({ role: 'pai', athleteId: a.id, name: a.parentName || 'Encarregado' });
      } else {
        setError('PIN incorreto.');
      }
      return;
    }
  }

  const roles = [
    { id:'treinador', label:'Treinador',   icon:'🎽', desc:'Acesso total à plataforma' },
    { id:'pai',       label:'Encarregado', icon:'👨‍👩‍👦', desc:'Zona de comunicação com o clube' },
    { id:'atleta',    label:'Atleta',      icon:'⚽', desc:'Os meus dados e convocatórias' },
  ];

  return (
    <div style={{
      minHeight:'100vh',
      background:`linear-gradient(160deg, ${C.greenDark} 0%, ${C.green} 60%, ${C.greenMid} 100%)`,
      display:'flex', alignItems:'center', justifyContent:'center', padding:16,
    }}>
      {/* Gold decorative lines */}
      <div style={{position:'fixed',top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${C.gold},${C.goldLight},${C.gold})`}}/>
      <div style={{position:'fixed',bottom:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${C.gold},${C.goldLight},${C.gold})`}}/>

      <div style={{width:'100%',maxWidth:420}}>
        {/* Header */}
        <div style={{textAlign:'center',marginBottom:32}}>
          <div style={{display:'flex',justifyContent:'center',marginBottom:14,filter:'drop-shadow(0 4px 12px rgba(0,0,0,0.4))'}}>
            <ClubCrest size={80}/>
          </div>
          <h1 style={{margin:0,fontFamily:"'Playfair Display', serif",fontSize:26,color:C.white,letterSpacing:'0.5px',lineHeight:1.2}}>
            A.R.C.S. Lourenço do Douro
          </h1>
          <p style={{margin:'6px 0 0',color:C.goldLight,fontSize:11,letterSpacing:'3px',textTransform:'uppercase',fontFamily:"'Source Sans 3', sans-serif"}}>
            Dossier do Treinador · 2025/26
          </p>
        </div>

        {/* Card */}
        <div style={{background:C.white,borderRadius:20,padding:28,boxShadow:'0 20px 60px rgba(0,0,0,0.4)',border:`1px solid ${C.gold}22`}}>

          {/* Step 1: choose role */}
          {!role && (
            <>
              <p style={{margin:'0 0 16px',fontSize:14,color:C.gray,textAlign:'center',fontFamily:"'Source Sans 3', sans-serif"}}>
                Quem és?
              </p>
              <div style={{display:'flex',flexDirection:'column',gap:10}}>
                {roles.map(r => (
                  <button key={r.id} onClick={() => { setRole(r.id); setPin(''); setError(''); }} style={{
                    background:C.greenPale, border:`2px solid ${C.grayLight}`,
                    borderRadius:12, padding:'14px 16px', cursor:'pointer',
                    display:'flex', alignItems:'center', gap:14, textAlign:'left',
                    transition:'all 0.15s', fontFamily:"'Source Sans 3', sans-serif",
                  }}
                  onMouseEnter={e=>{ e.currentTarget.style.borderColor=C.green; e.currentTarget.style.background=C.greenFade; }}
                  onMouseLeave={e=>{ e.currentTarget.style.borderColor=C.grayLight; e.currentTarget.style.background=C.greenPale; }}
                  >
                    <span style={{fontSize:28}}>{r.icon}</span>
                    <div>
                      <div style={{fontWeight:'700',fontSize:15,color:C.greenDark}}>{r.label}</div>
                      <div style={{fontSize:12,color:C.gray,marginTop:1}}>{r.desc}</div>
                    </div>
                    <span style={{marginLeft:'auto',color:C.grayMid,fontSize:18}}>›</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Step 2: login form */}
          {role && (
            <>
              <button onClick={() => { setRole(null); setPin(''); setName(''); setError(''); }} style={{background:'none',border:'none',cursor:'pointer',color:C.gray,fontSize:13,marginBottom:16,display:'flex',alignItems:'center',gap:4,fontFamily:"'Source Sans 3', sans-serif",padding:0}}>
                ← Voltar
              </button>

              <div style={{textAlign:'center',marginBottom:20}}>
                <div style={{fontSize:36,marginBottom:6}}>
                  {roles.find(r=>r.id===role)?.icon}
                </div>
                <div style={{fontWeight:'700',fontSize:18,color:C.greenDark,fontFamily:"'Playfair Display', serif"}}>
                  {roles.find(r=>r.id===role)?.label}
                </div>
              </div>

              <div style={{display:'flex',flexDirection:'column',gap:14}}>
                {/* Athlete / parent selector */}
                {(role === 'atleta' || role === 'pai') && (
                  <div>
                    <label style={{fontSize:11,color:C.gray,letterSpacing:'0.5px',textTransform:'uppercase',display:'block',marginBottom:4,fontWeight:'700',fontFamily:"'Source Sans 3', sans-serif"}}>
                      {role === 'atleta' ? 'Seleciona o teu nome' : 'Seleciona o teu educando'}
                    </label>
                    <select style={IS} value={name} onChange={e=>setName(e.target.value)}>
                      <option value="">-- Escolhe --</option>
                      {athletes.map(a => (
                        <option key={a.id} value={a.id}>{a.name} ({a.escalao})</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* PIN / password */}
                <div>
                  <label style={{fontSize:11,color:C.gray,letterSpacing:'0.5px',textTransform:'uppercase',display:'block',marginBottom:4,fontWeight:'700',fontFamily:"'Source Sans 3', sans-serif"}}>
                    {role === 'treinador' ? 'Palavra-passe' : 'PIN (4 dígitos)'}
                  </label>
                  <div style={{position:'relative'}}>
                    <input
                      style={{...IS, paddingRight:40}}
                      type={showPass ? 'text' : 'password'}
                      value={pin}
                      onChange={e=>setPin(e.target.value)}
                      onKeyDown={e=>e.key==='Enter'&&tryLogin()}
                      placeholder={role==='treinador' ? 'Palavra-passe...' : 'Ex: 1234'}
                      maxLength={role==='treinador' ? 30 : 4}
                    />
                    <button onClick={()=>setShowPass(!showPass)} style={{position:'absolute',right:10,top:'50%',transform:'translateY(-50%)',background:'none',border:'none',cursor:'pointer',color:C.gray,fontSize:16}}>
                      {showPass ? '🙈' : '👁'}
                    </button>
                  </div>
                </div>

                {error && (
                  <div style={{background:C.redPale,color:C.red,borderRadius:8,padding:'8px 12px',fontSize:13,fontFamily:"'Source Sans 3', sans-serif",border:`1px solid ${C.red}33`}}>
                    ⚠️ {error}
                  </div>
                )}

                <button onClick={tryLogin} style={{...BtnLogin, marginTop:4}}>
                  Entrar →
                </button>

                {/* Hint */}
                <p style={{margin:0,fontSize:11,color:C.gray,textAlign:'center',fontFamily:"'Source Sans 3', sans-serif",lineHeight:1.5}}>
                  {role==='treinador' && <>Palavra-passe padrão: <strong>treinador2526</strong><br/>Pode ser alterada nas definições.</>}
                  {role==='atleta'    && <>PIN padrão: últimos 4 dígitos do teu telemóvel.<br/>Pede ao treinador se não souberes.</>}
                  {role==='pai'       && <>PIN padrão: últimos 4 dígitos do teu telemóvel.<br/>Pede ao treinador se não souberes.</>}
                </p>
              </div>
            </>
          )}
        </div>

        <p style={{textAlign:'center',color:`${C.white}66`,fontSize:11,marginTop:16,fontFamily:"'Source Sans 3', sans-serif",letterSpacing:'1px'}}>
          © 2025 A.R.C.S. São Lourenço do Douro
        </p>
      </div>
    </div>
  );
}

const BtnLogin = {
  background:`linear-gradient(135deg,#0e3a1c,#1a5c2e)`,
  color:'#fff', border:`1px solid #c8a02a33`,
  borderRadius:10, padding:'12px', cursor:'pointer',
  fontSize:15, fontFamily:"'Source Sans 3', sans-serif",
  fontWeight:'700', letterSpacing:'0.5px', width:'100%',
  boxShadow:'0 4px 16px rgba(14,58,28,0.4)',
};
