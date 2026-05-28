import React, { useState } from 'react';
import { C, IS, BG, BSm, fmtDate, today, nextId } from '../theme';
import { ClubCrest, SH } from './UI';

export default function ParentPortal({ session, data, upd, onLogout }) {
  const { athletes, messages, calEvents, games, parentMsgs, faqs } = data;
  const athlete = athletes.find(a => a.id === session.athleteId);
  const [tab, setTab] = useState('home');
  const [newMsg, setNewMsg] = useState('');

  const myMessages = messages.filter(m => m.escalao === 'Todos' || m.escalao === athlete?.escalao);
  const myGames = games.filter(g => g.squad.includes(session.athleteId));
  const myCalEvents = calEvents.filter(e => e.escalao === 'Todos' || e.escalao === athlete?.escalao);

  function sendMessage() {
    if (!newMsg.trim()) return;
    upd('parentMsgs', [...parentMsgs, {
      id: nextId(parentMsgs),
      parentName: session.name,
      athleteId: session.athleteId,
      text: newMsg,
      date: today(),
      read: false,
    }]);
    setNewMsg('');
    alert('Mensagem enviada ao treinador!');
  }

  const tabs = [
    { id: 'home',     label: '🏠 Início' },
    { id: 'messages', label: '📢 Avisos' },
    { id: 'games',    label: '🏆 Jogos' },
    { id: 'calendar', label: '📅 Agenda' },
    { id: 'contact',  label: '💬 Contactar' },
    { id: 'faq',      label: '❓ FAQ' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: C.cream, fontFamily: "'Source Sans 3', sans-serif" }}>
      {/* Header */}
      <header style={{ background: `linear-gradient(160deg,${C.greenDark},${C.green})`, borderBottom: `3px solid ${C.gold}`, position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 4px 20px rgba(0,0,0,0.4)' }}>
        <div style={{ height: 3, background: `linear-gradient(90deg,${C.gold},${C.goldLight},${C.gold})` }} />
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <ClubCrest size={40} />
            <div>
              <div style={{ fontWeight: '700', fontSize: 14, color: C.white, fontFamily: "'Playfair Display', serif" }}>A.R.C.S. Lourenço do Douro</div>
              <div style={{ fontSize: 10, color: C.goldLight, letterSpacing: '1.5px', textTransform: 'uppercase' }}>Zona dos Encarregados</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ color: C.goldLight, fontSize: 13 }}>👋 {session.name}</span>
            <button onClick={onLogout} style={{ background: 'rgba(255,255,255,0.1)', color: C.white, border: '1px solid rgba(255,255,255,0.2)', borderRadius: 8, padding: '5px 12px', cursor: 'pointer', fontSize: 12, fontFamily: 'inherit' }}>Sair</button>
          </div>
        </div>
        <nav style={{ maxWidth: 900, margin: '0 auto', padding: '0 16px 10px', display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {tabs.map(({ id, label }) => (
            <button key={id} onClick={() => setTab(id)} style={{ background: tab === id ? C.gold : 'rgba(255,255,255,0.1)', color: tab === id ? C.greenDark : C.white, border: 'none', borderRadius: 8, padding: '6px 12px', cursor: 'pointer', fontSize: 12, fontFamily: 'inherit', fontWeight: tab === id ? '700' : '400' }}>
              {label}
            </button>
          ))}
        </nav>
      </header>

      <main style={{ maxWidth: 900, margin: '0 auto', padding: '20px 16px' }}>

        {/* HOME */}
        {tab === 'home' && (
          <div>
            <div style={{ background: `linear-gradient(135deg,${C.greenDark},${C.green})`, borderRadius: 16, padding: 24, color: C.white, marginBottom: 20, border: `2px solid ${C.gold}` }}>
              <div style={{ fontSize: 10, letterSpacing: '2px', textTransform: 'uppercase', color: C.goldLight, marginBottom: 6 }}>Bem-vindo/a</div>
              <div style={{ fontSize: 22, fontWeight: '700', fontFamily: "'Playfair Display', serif", marginBottom: 4 }}>{session.name}</div>
              {athlete && <div style={{ fontSize: 13, color: C.grayMid }}>Encarregado de <strong style={{ color: C.white }}>{athlete.name}</strong> · {athlete.escalao} · Nº {athlete.number}</div>}
            </div>

            {athlete && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 20 }}>
                {[['⚽ Golos', athlete.goals, C.green], ['🅰️ Assist.', athlete.assists, C.greenMid], ['🏃 Treinos', athlete.trainings, C.gold]].map(([l, v, bg]) => (
                  <div key={l} style={{ background: bg, borderRadius: 12, padding: '14px', color: bg === C.gold ? C.greenDark : C.white, textAlign: 'center' }}>
                    <div style={{ fontSize: 22, fontWeight: '700' }}>{v}</div>
                    <div style={{ fontSize: 10, letterSpacing: '1px', textTransform: 'uppercase', marginTop: 2, opacity: 0.85 }}>{l}</div>
                  </div>
                ))}
              </div>
            )}

            <SH title="Últimos Avisos" action={() => setTab('messages')} al="Ver todos" />
            {myMessages.slice(-3).reverse().map(m => (
              <div key={m.id} style={{ background: C.white, borderRadius: 10, padding: '10px 14px', marginBottom: 8, fontSize: 13, borderLeft: `3px solid ${C.green}`, boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
                <div style={{ lineHeight: 1.5 }}>{m.text.slice(0, 90)}{m.text.length > 90 ? '…' : ''}</div>
                <div style={{ fontSize: 10, color: C.gray, marginTop: 3 }}>{fmtDate(m.date)}</div>
              </div>
            ))}
          </div>
        )}

        {/* AVISOS */}
        {tab === 'messages' && (
          <div>
            <SH title="Avisos do Clube" />
            {myMessages.length === 0 && <div style={{ textAlign: 'center', padding: 40, color: C.gray }}>📭 Sem avisos.</div>}
            {[...myMessages].reverse().map(m => (
              <div key={m.id} style={{ background: C.white, borderRadius: 12, padding: '14px 16px', marginBottom: 10, boxShadow: '0 1px 6px rgba(0,0,0,0.07)', borderLeft: `4px solid ${C.green}` }}>
                <div style={{ fontSize: 13, lineHeight: 1.6 }}>{m.text}</div>
                <div style={{ fontSize: 11, color: C.gray, marginTop: 6 }}>{fmtDate(m.date)} · Para: {m.escalao}</div>
              </div>
            ))}
          </div>
        )}

        {/* JOGOS */}
        {tab === 'games' && (
          <div>
            <SH title={`Jogos de ${athlete?.name || 'Atleta'}`} />
            {myGames.length === 0 && <div style={{ textAlign: 'center', padding: 40, color: C.gray }}>🏆 Sem jogos registados.</div>}
            {[...myGames].sort((a, b) => b.date.localeCompare(a.date)).map(g => (
              <div key={g.id} style={{ background: C.white, borderRadius: 14, padding: '14px 16px', marginBottom: 10, boxShadow: '0 1px 8px rgba(0,0,0,0.07)', borderLeft: `4px solid ${g.local ? C.green : C.blue}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 6 }}>
                  <div>
                    <div style={{ fontWeight: '700', fontSize: 15 }}>{g.local ? '🏠' : '✈️'} vs {g.opponent}</div>
                    <div style={{ fontSize: 12, color: C.gray, marginTop: 2 }}>{fmtDate(g.date)} {g.time} · {g.competition}</div>
                    {g.notes && <div style={{ fontSize: 12, color: C.dark, marginTop: 4, fontStyle: 'italic' }}>📝 {g.notes}</div>}
                  </div>
                  {g.result && <span style={{ background: C.green, color: C.gold, borderRadius: 8, padding: '4px 14px', fontWeight: '700', fontSize: 15 }}>{g.result}</span>}
                  {!g.result && <span style={{ background: C.goldPale, color: C.gold, borderRadius: 8, padding: '4px 14px', fontSize: 12, border: `1px solid ${C.gold}` }}>Por jogar</span>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* AGENDA */}
        {tab === 'calendar' && (
          <div>
            <SH title="Agenda do Clube" />
            {myCalEvents.length === 0 && <div style={{ textAlign: 'center', padding: 40, color: C.gray }}>📅 Sem eventos.</div>}
            {[...myCalEvents].sort((a, b) => a.date.localeCompare(b.date)).map(e => (
              <div key={e.id} style={{ background: C.white, borderRadius: 12, padding: '12px 16px', marginBottom: 8, display: 'flex', gap: 12, alignItems: 'flex-start', boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
                <div style={{ background: C.greenPale, borderRadius: 10, width: 50, textAlign: 'center', padding: '6px 4px', flexShrink: 0 }}>
                  <div style={{ fontSize: 11, color: C.green, fontWeight: '700' }}>{fmtDate(e.date).slice(3, 5)}</div>
                  <div style={{ fontSize: 18, fontWeight: '700', color: C.greenDark, lineHeight: 1 }}>{fmtDate(e.date).slice(0, 2)}</div>
                </div>
                <div>
                  <div style={{ fontWeight: '700', fontSize: 14 }}>{e.title}</div>
                  <div style={{ fontSize: 12, color: C.gray, marginTop: 2 }}>{e.escalao}{e.location ? ` · 📍 ${e.location}` : ''}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CONTACTAR */}
        {tab === 'contact' && (
          <div>
            <div style={{ background: C.white, borderRadius: 16, padding: 24, boxShadow: '0 1px 8px rgba(0,0,0,0.07)' }}>
              <div style={{ fontWeight: '700', fontSize: 17, color: C.greenDark, fontFamily: "'Playfair Display', serif", marginBottom: 6 }}>💬 Enviar Mensagem ao Treinador</div>
              <p style={{ fontSize: 13, color: C.gray, marginTop: 0, marginBottom: 16 }}>A tua mensagem será enviada diretamente para o treinador.</p>
              <textarea
                style={{ ...IS, minHeight: 100, resize: 'vertical', marginBottom: 12 }}
                value={newMsg}
                onChange={e => setNewMsg(e.target.value)}
                placeholder="Escreve a tua mensagem aqui..."
              />
              <button onClick={sendMessage} style={BG}>📤 Enviar Mensagem</button>
            </div>
          </div>
        )}

        {/* FAQ */}
        {tab === 'faq' && (
          <div>
            <SH title="Perguntas Frequentes" />
            {faqs.length === 0 && <div style={{ textAlign: 'center', padding: 40, color: C.gray }}>❓ Sem FAQs ainda.</div>}
            {faqs.map(f => (
              <div key={f.id} style={{ background: C.white, borderRadius: 12, overflow: 'hidden', marginBottom: 10, boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
                <div style={{ background: C.greenPale, padding: '12px 16px', fontWeight: '700', fontSize: 14, color: C.greenDark }}>❓ {f.question}</div>
                <div style={{ padding: '12px 16px', fontSize: 13, lineHeight: 1.6 }}>{f.answer}</div>
              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
}
