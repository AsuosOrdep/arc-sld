import React, { useState } from 'react';
import { C, fmtDate, today } from '../theme';
import { ClubCrest, SH } from './UI';

export default function AthletePortal({ session, data, onLogout }) {
  const { athletes, messages, calEvents, games, trainings } = data;
  const athlete = athletes.find(a => a.id === session.athleteId);
  const [tab, setTab] = useState('home');

  const myMessages = messages.filter(m => m.escalao === 'Todos' || m.escalao === athlete?.escalao);
  const myGames    = games.filter(g => g.squad.includes(session.athleteId));
  const myTrainings = trainings.filter(t => t.attendees.includes(session.athleteId));
  const myCalEvents = calEvents.filter(e => e.escalao === 'Todos' || e.escalao === athlete?.escalao);

  const tabs = [
    { id: 'home',      label: '🏠 Início' },
    { id: 'stats',     label: '📊 Os meus stats' },
    { id: 'games',     label: '🏆 Convocatórias' },
    { id: 'trainings', label: '🏃 Treinos' },
    { id: 'messages',  label: '📢 Avisos' },
    { id: 'calendar',  label: '📅 Agenda' },
  ];

  if (!athlete) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: C.cream, fontFamily: "'Source Sans 3', sans-serif" }}>
      <div style={{ textAlign: 'center', color: C.gray }}>
        <div style={{ fontSize: 44 }}>⚽</div>
        <div style={{ marginTop: 8 }}>Atleta não encontrado.</div>
        <button onClick={onLogout} style={{ marginTop: 12, padding: '8px 16px', background: C.green, color: C.white, border: 'none', borderRadius: 8, cursor: 'pointer' }}>Voltar</button>
      </div>
    </div>
  );

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
              <div style={{ fontSize: 10, color: C.goldLight, letterSpacing: '1.5px', textTransform: 'uppercase' }}>Zona do Atleta</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: `linear-gradient(135deg,${C.greenDark},${C.greenMid})`, border: `2px solid ${C.gold}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.gold, fontWeight: '700', fontSize: 13 }}>
              {athlete.number || '?'}
            </div>
            <span style={{ color: C.goldLight, fontSize: 13 }}>{athlete.name}</span>
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
            <div style={{ background: `linear-gradient(135deg,${C.greenDark},${C.green})`, borderRadius: 16, padding: 24, color: C.white, marginBottom: 20, border: `2px solid ${C.gold}`, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', opacity: 0.06 }}><ClubCrest size={130} /></div>
              <div style={{ fontSize: 10, letterSpacing: '2px', textTransform: 'uppercase', color: C.goldLight, marginBottom: 4 }}>Bem-vindo</div>
              <div style={{ fontSize: 26, fontWeight: '700', fontFamily: "'Playfair Display', serif" }}>{athlete.name}</div>
              <div style={{ fontSize: 13, color: C.grayMid, marginTop: 4 }}>
                <span style={{ background: `linear-gradient(135deg,${C.greenDark},${C.greenMid})`, border: `1.5px solid ${C.gold}`, borderRadius: '50%', width: 24, height: 24, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: '700', color: C.gold, marginRight: 6 }}>{athlete.number}</span>
                {athlete.position} · {athlete.escalao} · {athlete.age} anos
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 20 }}>
              {[['⚽', 'Golos', athlete.goals, C.green], ['🅰️', 'Assist.', athlete.assists, C.greenMid], ['🏃', 'Treinos', myTrainings.length, C.gold]].map(([icon, l, v, bg]) => (
                <div key={l} style={{ background: bg, borderRadius: 12, padding: 14, color: bg === C.gold ? C.greenDark : C.white, textAlign: 'center' }}>
                  <div style={{ fontSize: 20 }}>{icon}</div>
                  <div style={{ fontSize: 24, fontWeight: '700', lineHeight: 1 }}>{v}</div>
                  <div style={{ fontSize: 10, letterSpacing: '1px', textTransform: 'uppercase', marginTop: 2, opacity: 0.85 }}>{l}</div>
                </div>
              ))}
            </div>

            {/* Next game */}
            {(() => {
              const t = today();
              const next = myGames.filter(g => g.date >= t && !g.result).sort((a, b) => a.date.localeCompare(b.date))[0];
              return next ? (
                <div style={{ background: C.goldPale, borderRadius: 12, padding: '14px 16px', border: `1.5px solid ${C.gold}`, marginBottom: 16 }}>
                  <div style={{ fontSize: 10, color: C.gold, fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 4 }}>🏆 Próxima Convocatória</div>
                  <div style={{ fontWeight: '700', fontSize: 15 }}>{next.local ? '🏠' : '✈️'} vs {next.opponent}</div>
                  <div style={{ fontSize: 12, color: C.gray, marginTop: 2 }}>{fmtDate(next.date)} {next.time} · {next.competition}</div>
                  {next.notes && <div style={{ fontSize: 12, marginTop: 4, fontStyle: 'italic' }}>📝 {next.notes}</div>}
                </div>
              ) : null;
            })()}

            <SH title="Últimos Avisos" />
            {myMessages.slice(-3).reverse().map(m => (
              <div key={m.id} style={{ background: C.white, borderRadius: 10, padding: '10px 14px', marginBottom: 8, fontSize: 13, borderLeft: `3px solid ${C.green}`, boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
                <div style={{ lineHeight: 1.5 }}>{m.text.slice(0, 90)}{m.text.length > 90 ? '…' : ''}</div>
                <div style={{ fontSize: 10, color: C.gray, marginTop: 3 }}>{fmtDate(m.date)}</div>
              </div>
            ))}
          </div>
        )}

        {/* STATS */}
        {tab === 'stats' && (
          <div>
            <div style={{ background: C.white, borderRadius: 16, padding: 24, boxShadow: '0 1px 8px rgba(0,0,0,0.07)', marginBottom: 16 }}>
              <div style={{ fontWeight: '700', fontSize: 18, fontFamily: "'Playfair Display', serif", color: C.greenDark, marginBottom: 20 }}>📊 Estatísticas — {athlete.name}</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12 }}>
                {[
                  ['⚽', 'Golos', athlete.goals, C.green],
                  ['🅰️', 'Assistências', athlete.assists, C.greenMid],
                  ['🟨', 'Cartões Amarelos', athlete.yellowCards, C.orange],
                  ['🟥', 'Cartões Vermelhos', athlete.redCards, C.red],
                  ['🏃', 'Presenças no Treino', myTrainings.length, C.blue],
                  ['🏆', 'Convocatórias', myGames.length, C.gold],
                ].map(([icon, l, v, c]) => (
                  <div key={l} style={{ background: C.greenPale, borderRadius: 12, padding: 16, display: 'flex', alignItems: 'center', gap: 12, border: `1px solid ${C.greenFade}` }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: c, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{icon}</div>
                    <div>
                      <div style={{ fontSize: 26, fontWeight: '700', color: C.greenDark, lineHeight: 1 }}>{v}</div>
                      <div style={{ fontSize: 11, color: C.gray, marginTop: 2 }}>{l}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CONVOCATÓRIAS */}
        {tab === 'games' && (
          <div>
            <SH title="As Minhas Convocatórias" />
            {myGames.length === 0 && <div style={{ textAlign: 'center', padding: 40, color: C.gray }}>🏆 Sem convocatórias registadas.</div>}
            {[...myGames].sort((a, b) => b.date.localeCompare(a.date)).map(g => (
              <div key={g.id} style={{ background: C.white, borderRadius: 14, padding: '14px 16px', marginBottom: 10, boxShadow: '0 1px 8px rgba(0,0,0,0.07)', borderLeft: `4px solid ${g.local ? C.green : C.blue}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 6 }}>
                  <div>
                    <div style={{ fontWeight: '700', fontSize: 15 }}>{g.local ? '🏠' : '✈️'} vs {g.opponent}</div>
                    <div style={{ fontSize: 12, color: C.gray, marginTop: 2 }}>{fmtDate(g.date)} {g.time} · {g.escalao} · {g.competition}</div>
                    {g.notes && <div style={{ fontSize: 12, color: C.dark, marginTop: 4, fontStyle: 'italic' }}>📝 {g.notes}</div>}
                  </div>
                  {g.result
                    ? <span style={{ background: C.green, color: C.gold, borderRadius: 8, padding: '4px 14px', fontWeight: '700', fontSize: 15 }}>{g.result}</span>
                    : <span style={{ background: C.goldPale, color: C.gold, borderRadius: 8, padding: '4px 12px', fontSize: 12, border: `1px solid ${C.gold}` }}>Convocado ✓</span>
                  }
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TREINOS */}
        {tab === 'trainings' && (
          <div>
            <SH title={`Presenças nos Treinos (${myTrainings.length})`} />
            {myTrainings.length === 0 && <div style={{ textAlign: 'center', padding: 40, color: C.gray }}>🏃 Sem presenças registadas.</div>}
            {[...myTrainings].sort((a, b) => b.date.localeCompare(a.date)).map(t => (
              <div key={t.id} style={{ background: C.white, borderRadius: 12, padding: '12px 16px', marginBottom: 8, display: 'flex', gap: 12, alignItems: 'flex-start', boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
                <div style={{ background: C.greenPale, borderRadius: 10, width: 50, textAlign: 'center', padding: '6px 4px', flexShrink: 0 }}>
                  <div style={{ fontSize: 10, color: C.green, fontWeight: '700' }}>{fmtDate(t.date).slice(3, 5)}</div>
                  <div style={{ fontSize: 18, fontWeight: '700', color: C.greenDark, lineHeight: 1 }}>{fmtDate(t.date).slice(0, 2)}</div>
                </div>
                <div>
                  <div style={{ fontWeight: '700', fontSize: 14 }}>{t.title}</div>
                  <div style={{ fontSize: 11, color: C.gray, marginTop: 2 }}>{t.duration} min · {t.escalao}</div>
                  {t.objectives && <div style={{ fontSize: 12, color: C.blue, marginTop: 4, fontStyle: 'italic' }}>🎯 {t.objectives}</div>}
                </div>
                <span style={{ marginLeft: 'auto', background: C.greenPale, color: C.green, borderRadius: 8, padding: '3px 8px', fontSize: 11, fontWeight: '700', flexShrink: 0 }}>✓ Presente</span>
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
                <div style={{ fontSize: 11, color: C.gray, marginTop: 6 }}>{fmtDate(m.date)} · {m.escalao}</div>
              </div>
            ))}
          </div>
        )}

        {/* AGENDA */}
        {tab === 'calendar' && (
          <div>
            <SH title="Agenda" />
            {myCalEvents.length === 0 && <div style={{ textAlign: 'center', padding: 40, color: C.gray }}>📅 Sem eventos.</div>}
            {[...myCalEvents].sort((a, b) => a.date.localeCompare(b.date)).map(e => (
              <div key={e.id} style={{ background: C.white, borderRadius: 12, padding: '12px 16px', marginBottom: 8, display: 'flex', gap: 12, alignItems: 'flex-start', boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
                <div style={{ background: C.greenPale, borderRadius: 10, width: 50, textAlign: 'center', padding: '6px 4px', flexShrink: 0 }}>
                  <div style={{ fontSize: 10, color: C.green, fontWeight: '700' }}>{fmtDate(e.date).slice(3, 5)}</div>
                  <div style={{ fontSize: 18, fontWeight: '700', color: C.greenDark, lineHeight: 1 }}>{fmtDate(e.date).slice(0, 2)}</div>
                </div>
                <div>
                  <div style={{ fontWeight: '700', fontSize: 14 }}>{e.title}</div>
                  <div style={{ fontSize: 11, color: C.gray, marginTop: 2 }}>{e.escalao}{e.location ? ` · 📍 ${e.location}` : ''}</div>
                </div>
              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
}
