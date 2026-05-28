import React from 'react';
import { C, BG, BS } from '../theme';

// ─── Club Crest SVG ───────────────────────────────────────────────────────────
export const ClubCrest = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 4 L92 18 L92 62 C92 88 50 116 50 116 C50 116 8 88 8 62 L8 18 Z" fill="#1a5c2e" stroke="#c8a02a" strokeWidth="3"/>
    <path d="M50 11 L85 23 L85 62 C85 84 50 108 50 108 C50 108 15 84 15 62 L15 23 Z" fill="none" stroke="#c8a02a" strokeWidth="1.5"/>
    <rect x="46" y="16" width="8" height="34" rx="1" fill="#c8a02a"/>
    <rect x="32" y="26" width="36" height="8" rx="1" fill="#c8a02a"/>
    <circle cx="50" cy="72" r="16" fill="#ffffff" stroke="#c8a02a" strokeWidth="1.5"/>
    <circle cx="50" cy="72" r="10" fill="none" stroke="#1a5c2e" strokeWidth="1"/>
    <path d="M50 56 L50 88 M34 72 L66 72" stroke="#1a5c2e" strokeWidth="1.2"/>
    <path d="M38 60 L62 84 M62 60 L38 84" stroke="#1a5c2e" strokeWidth="0.8"/>
    {[-24,-12,0,12,24].map((x,i) => (
      <polygon key={i} points={`${50+x},46 ${51.2+x},49.6 ${55+x},49.6 ${52+x},51.8 ${53.2+x},55.4 ${50+x},53.2 ${46.8+x},55.4 ${48+x},51.8 ${45+x},49.6 ${48.8+x},49.6`} fill="#c8a02a"/>
    ))}
    <text x="50" y="100" textAnchor="middle" fontSize="7" fill="#c8a02a" fontFamily="serif" fontWeight="bold">1976</text>
  </svg>
);

// ─── Modal ────────────────────────────────────────────────────────────────────
export const Modal = ({ title, onClose, onSave, children }) => (
  <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.65)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
    <div style={{background:C.white,borderRadius:18,width:"100%",maxWidth:520,maxHeight:"90vh",overflowY:"auto",boxShadow:"0 20px 60px rgba(0,0,0,0.4)",border:`2px solid ${C.gold}22`}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 20px",borderBottom:`2px solid ${C.greenPale}`,position:"sticky",top:0,background:C.white,zIndex:1}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:4,height:20,background:C.gold,borderRadius:2}}/>
          <div style={{fontWeight:"700",fontSize:16,color:C.greenDark,fontFamily:"'Playfair Display', serif"}}>{title}</div>
        </div>
        <button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",color:C.gray,fontSize:20,lineHeight:1}}>×</button>
      </div>
      <div style={{padding:"16px 20px",display:"flex",flexDirection:"column",gap:10}}>{children}</div>
      {onSave && (
        <div style={{padding:"12px 20px",borderTop:`1px solid ${C.greenPale}`,display:"flex",gap:8,justifyContent:"flex-end",position:"sticky",bottom:0,background:C.white}}>
          <button onClick={onClose} style={BS}>Cancelar</button>
          <button onClick={onSave} style={BG}>✓ Guardar</button>
        </div>
      )}
    </div>
  </div>
);

// ─── Form Row ─────────────────────────────────────────────────────────────────
export const FR = ({ l, children }) => (
  <div>
    <label style={{fontSize:11,color:C.gray,letterSpacing:"0.5px",textTransform:"uppercase",display:"block",marginBottom:4,fontWeight:"700",fontFamily:"'Source Sans 3', sans-serif"}}>{l}</label>
    {children}
  </div>
);

// ─── Pill button ──────────────────────────────────────────────────────────────
export const Pill = ({ label, active, onClick }) => (
  <button onClick={onClick} style={{
    background: active ? `linear-gradient(135deg,${C.greenDark},${C.green})` : C.grayLight,
    color: active ? C.white : C.dark,
    border: `1px solid ${active ? C.green : C.grayLight}`,
    borderRadius: 20, padding:"4px 12px", cursor:"pointer",
    fontSize:12, fontFamily:"'Source Sans 3', sans-serif",
    fontWeight: active ? "700" : "400", transition:"all 0.12s",
  }}>{label}</button>
);

// ─── Section Header ───────────────────────────────────────────────────────────
export const SH = ({ title, action, al }) => (
  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
    <div style={{display:"flex",alignItems:"center",gap:6}}>
      <div style={{width:3,height:14,background:C.gold,borderRadius:2}}/>
      <div style={{fontSize:11,letterSpacing:"2px",textTransform:"uppercase",color:C.gray,fontWeight:"700",fontFamily:"'Source Sans 3', sans-serif"}}>{title}</div>
    </div>
    {action && <button onClick={action} style={{background:"none",border:"none",cursor:"pointer",color:C.green,fontSize:12,fontFamily:"'Source Sans 3', sans-serif",textDecoration:"underline"}}>{al}</button>}
  </div>
);

// ─── Small message card ───────────────────────────────────────────────────────
export const SMsgCard = ({ m }) => {
  const TC = {aviso:C.green,convocatoria:C.blue,resposta:C.orange,aviso_pais:C.gold};
  return (
    <div style={{background:C.white,borderRadius:10,padding:"10px 14px",fontSize:13,borderLeft:`3px solid ${TC[m.type]||C.green}`,boxShadow:"0 1px 4px rgba(0,0,0,0.05)",border:`1px solid ${C.grayLight}`,borderLeftWidth:3,borderLeftColor:TC[m.type]||C.green,fontFamily:"'Source Sans 3', sans-serif"}}>
      <div style={{lineHeight:1.5,color:C.dark}}>{m.text.slice(0,90)}{m.text.length>90?"…":""}</div>
      <div style={{fontSize:11,color:C.gray,marginTop:3}}>{m.date} · {m.escalao}</div>
    </div>
  );
};

// ─── Empty state ──────────────────────────────────────────────────────────────
export const Empty = ({ icon, text }) => (
  <div style={{textAlign:"center",padding:"48px 20px",color:C.gray,fontFamily:"'Source Sans 3', sans-serif"}}>
    <div style={{fontSize:44,marginBottom:10}}>{icon}</div>
    <div style={{fontSize:14}}>{text}</div>
  </div>
);
