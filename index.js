import React, { useState, useEffect } from 'react';
import { lsGet, lsSet, SEED_ATHLETES, SEED_MEDICAL, SEED_TRAININGS, SEED_GAMES, SEED_CALENDAR, SEED_MESSAGES, SEED_PARENT_MSGS, SEED_FAQS } from './theme';
import Login from './components/Login';
import CoachDashboard from './components/CoachDashboard';
import ParentPortal from './components/ParentPortal';
import AthletePortal from './components/AthletePortal';

export default function App() {
  const [session, setSession] = useState(null);

  // ─── Centralised data state ─────────────────────────────────────────────────
  const [data, setData] = useState({
    athletes:   [],
    medical:    {},
    trainings:  [],
    games:      [],
    calEvents:  [],
    messages:   [],
    parentMsgs: [],
    faqs:       [],
  });

  // Load from localStorage on mount
  useEffect(() => {
    setData({
      athletes:   lsGet('arc-athletes',   SEED_ATHLETES),
      medical:    lsGet('arc-medical',    SEED_MEDICAL),
      trainings:  lsGet('arc-trainings',  SEED_TRAININGS),
      games:      lsGet('arc-games',      SEED_GAMES),
      calEvents:  lsGet('arc-calendar',   SEED_CALENDAR),
      messages:   lsGet('arc-messages',   SEED_MESSAGES),
      parentMsgs: lsGet('arc-parentmsgs', SEED_PARENT_MSGS),
      faqs:       lsGet('arc-faqs',       SEED_FAQS),
    });
    // Restore session from sessionStorage
    const saved = sessionStorage.getItem('arc-session');
    if (saved) setSession(JSON.parse(saved));
  }, []);

  // Universal updater — saves to localStorage automatically
  function upd(key, value) {
    setData(prev => ({ ...prev, [key]: value }));
    lsSet(`arc-${key === 'calEvents' ? 'calendar' : key}`, value);
  }

  function handleLogin(sess) {
    setSession(sess);
    sessionStorage.setItem('arc-session', JSON.stringify(sess));
  }

  function handleLogout() {
    setSession(null);
    sessionStorage.removeItem('arc-session');
  }

  if (!session) return <Login onLogin={handleLogin} />;

  if (session.role === 'treinador') return (
    <CoachDashboard session={session} data={data} upd={upd} onLogout={handleLogout} />
  );

  if (session.role === 'pai') return (
    <ParentPortal session={session} data={data} upd={upd} onLogout={handleLogout} />
  );

  if (session.role === 'atleta') return (
    <AthletePortal session={session} data={data} upd={upd} onLogout={handleLogout} />
  );

  return null;
}
