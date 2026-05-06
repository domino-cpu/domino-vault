/* ══════════════════════════════════════════════════════
   DOMINO Workout Tracker — app.js
   ══════════════════════════════════════════════════════ */

const LS = {
  SESSIONS:  'domino_workout_sessions',
  ACTIVE:    'domino_workout_active_session_id',
  EXERCISES: 'domino_workout_exercises',
  CARDIO:    'domino_workout_cardio_machines',
  THEME:     'domino_workout_theme',
};

const WORKOUT_TYPES = [
  { key: 'chest',        label: 'Chest',       emoji: '🫸' },
  { key: 'back',         label: 'Back',         emoji: '🔙' },
  { key: 'arms',         label: 'Arms',         emoji: '💪' },
  { key: 'shoulders',    label: 'Shoulders',    emoji: '🏋️' },
  { key: 'legs',         label: 'Legs',         emoji: '🦵' },
  { key: 'abs',          label: 'Abs',          emoji: '🔥' },
  { key: 'fullbody',     label: 'Full Body',    emoji: '⚡' },
  { key: 'conditioning', label: 'Conditioning', emoji: '🏃' },
  { key: 'recovery',     label: 'Recovery',     emoji: '♨️' },
  { key: 'custom',       label: 'Custom',       emoji: '✏️' },
];

const WORKOUT_TEMPLATES = {
  chest:        [{ type:'strength', name:'Bench Press' },{ type:'strength', name:'Incline Press' },{ type:'strength', name:'Pectoral Fly' },{ type:'strength', name:'Cable Fly' },{ type:'strength', name:'Tricep Pushdown' }],
  back:         [{ type:'strength', name:'Lat Pull-Down' },{ type:'strength', name:'Cable Row' },{ type:'strength', name:'Seated Row' },{ type:'strength', name:'Deadlift' },{ type:'strength', name:'Bicep Curl' }],
  arms:         [{ type:'strength', name:'Bicep Curl' },{ type:'strength', name:'Hammer Curl' },{ type:'strength', name:'Incline Dumbbell Curl' },{ type:'strength', name:'Tricep Pushdown' },{ type:'strength', name:'Skull Crushers' },{ type:'strength', name:'Overhead Tricep Extension' }],
  shoulders:    [{ type:'strength', name:'Shoulder Press' },{ type:'strength', name:'Lateral Raise' },{ type:'strength', name:'Front Raise' },{ type:'strength', name:'Face Pull' },{ type:'strength', name:'ISO Lateral Shoulder Press' }],
  legs:         [{ type:'strength', name:'Squat' },{ type:'strength', name:'Leg Press' },{ type:'strength', name:'Romanian Deadlift' },{ type:'strength', name:'Leg Curl' },{ type:'strength', name:'Leg Extension' },{ type:'strength', name:'Calf Raise' }],
  abs:          [{ type:'strength', name:'Cable Crunch' },{ type:'strength', name:'Hanging Leg Raise' },{ type:'strength', name:'Ab Rollout' },{ type:'strength', name:'Russian Twist' },{ type:'strength', name:'Plank' },{ type:'strength', name:'Side Plank' }],
  fullbody:     [{ type:'strength', name:'Squat' },{ type:'strength', name:'Deadlift' },{ type:'strength', name:'Bench Press' },{ type:'strength', name:'Lat Pull-Down' },{ type:'strength', name:'Shoulder Press' },{ type:'strength', name:'Bicep Curl' }],
  conditioning: [{ type:'cardio', name:'Treadmill' },{ type:'cardio', name:'Stairmaster' }],
  recovery:     [{ type:'recovery', name:'Sauna' },{ type:'recovery', name:'Stretching' }],
  custom:       [],
};

const DEFAULT_EXERCISES = [
  { group:'Chest',     name:'Bench Press' },{ group:'Chest',     name:'Incline Press' },
  { group:'Chest',     name:'Decline Press' },{ group:'Chest',    name:'Pectoral Fly' },
  { group:'Chest',     name:'Cable Fly' },{ group:'Chest',        name:'Push-Up' },
  { group:'Shoulders', name:'Shoulder Press' },{ group:'Shoulders', name:'ISO Lateral Shoulder Press' },
  { group:'Shoulders', name:'Lateral Raise' },{ group:'Shoulders',  name:'Front Raise' },
  { group:'Shoulders', name:'Face Pull' },
  { group:'Triceps',   name:'Tricep Pushdown' },{ group:'Triceps', name:'Skull Crushers' },
  { group:'Triceps',   name:'Overhead Tricep Extension' },{ group:'Triceps', name:'Dips' },
  { group:'Back',      name:'Lat Pull-Down' },{ group:'Back',  name:'ISO Lateral Front Pull-Down' },
  { group:'Back',      name:'Cable Row' },{ group:'Back',      name:'Seated Row' },
  { group:'Back',      name:'T-Bar Row' },{ group:'Back',      name:'Pull-Up' },
  { group:'Back',      name:'Deadlift' },
  { group:'Biceps',    name:'Bicep Curl' },{ group:'Biceps',   name:'Hammer Curl' },
  { group:'Biceps',    name:'Incline Dumbbell Curl' },{ group:'Biceps', name:'Preacher Curl' },
  { group:'Legs',      name:'Squat' },{ group:'Legs',      name:'Leg Press' },
  { group:'Legs',      name:'Romanian Deadlift' },{ group:'Legs', name:'Leg Curl' },
  { group:'Legs',      name:'Leg Extension' },{ group:'Legs',   name:'Calf Raise' },
  { group:'Legs',      name:'Lunges' },{ group:'Legs',      name:'Hip Thrust' },
  { group:'Legs',      name:'Sumo Squat' },
  { group:'Abs',       name:'Plank' },{ group:'Abs',       name:'Crunches' },
  { group:'Abs',       name:'Cable Crunch' },{ group:'Abs',   name:'Hanging Leg Raise' },
  { group:'Abs',       name:'Russian Twist' },{ group:'Abs',  name:'Dead Bug' },
  { group:'Abs',       name:'Side Plank' },{ group:'Abs',    name:'Ab Rollout' },
];

const DEFAULT_CARDIO = ['Treadmill', 'Stairmaster', 'Elliptical', 'Stationary Bike', 'Rowing Machine'];

// ─── Storage ──────────────────────────────────────────────
function getSessions()      { try { return JSON.parse(localStorage.getItem(LS.SESSIONS)) || []; } catch { return []; } }
function saveSessions(s)    { localStorage.setItem(LS.SESSIONS, JSON.stringify(s)); }
function getExercises()     { try { const r = localStorage.getItem(LS.EXERCISES); return r ? JSON.parse(r) : null; } catch { return null; } }
function saveExercises(l)   { localStorage.setItem(LS.EXERCISES, JSON.stringify(l)); }
function getCardioMachines(){ try { const r = localStorage.getItem(LS.CARDIO); return r ? JSON.parse(r) : DEFAULT_CARDIO; } catch { return DEFAULT_CARDIO; } }
function getActiveSessionId(){ return localStorage.getItem(LS.ACTIVE) || null; }
function setActiveSessionId(id){ if (id) localStorage.setItem(LS.ACTIVE, id); else localStorage.removeItem(LS.ACTIVE); }
function getAllExerciseNames(){ const s = getExercises(); return s || DEFAULT_EXERCISES.map(e => e.name); }

function getExerciseGroups() {
  const stored = getExercises();
  if (stored) return stored.map(name => DEFAULT_EXERCISES.find(e => e.name.toLowerCase() === name.toLowerCase()) || { group:'Custom', name });
  return DEFAULT_EXERCISES;
}

function seedDefaults() {
  if (!getExercises()) saveExercises(DEFAULT_EXERCISES.map(e => e.name));
  if (!localStorage.getItem(LS.CARDIO)) localStorage.setItem(LS.CARDIO, JSON.stringify(DEFAULT_CARDIO));
}

// ─── Theme ────────────────────────────────────────────────
function loadTheme() {
  const saved = localStorage.getItem(LS.THEME) || 'light';
  applyTheme(saved, false);
}

function applyTheme(theme, save = true) {
  document.documentElement.dataset.theme = theme;
  if (save) localStorage.setItem(LS.THEME, theme);
  const icon  = document.getElementById('theme-icon');
  const label = document.getElementById('theme-label');
  if (theme === 'dark') { icon.textContent = '☀️'; label.textContent = 'Light'; }
  else                  { icon.textContent = '🌙'; label.textContent = 'Dark'; }
  // re-render chart with new colors if visible
  if (progressChart && selectedExercise) {
    const sessions = getSessions().filter(s => s.completedAt);
    renderExerciseChart(selectedExercise, sessions);
  }
}

function toggleTheme() {
  const current = document.documentElement.dataset.theme || 'light';
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

function isDark() { return document.documentElement.dataset.theme === 'dark'; }

// ─── Chart color helper ───────────────────────────────────
function chartColors() {
  return {
    accent:      isDark() ? '#e08a62' : '#D97757',
    accentFill:  isDark() ? 'rgba(224,138,98,0.12)' : 'rgba(217,119,87,0.1)',
    grid:        isDark() ? '#333331' : '#e2e1dc',
    tick:        isDark() ? '#686866' : '#9c9c9a',
    tooltip_bg:  isDark() ? '#f0efe9' : '#141413',
    tooltip_txt: isDark() ? '#141413' : '#f0efe9',
  };
}

// ─── Utils ────────────────────────────────────────────────
function uid()        { return 'sess_' + Date.now() + '_' + Math.random().toString(36).slice(2,7); }
function todayISO()   { return new Date().toISOString().split('T')[0]; }
function formatDate(iso) {
  if (!iso) return '';
  return new Date(iso + 'T12:00:00').toLocaleDateString('en-US', { weekday:'short', month:'long', day:'numeric', year:'numeric' });
}
function normalizeWeight(w, unit) { const n = parseFloat(w) || 0; return unit === 'each_side' ? n*2 : n; }
function parseNum(v)  { const n = parseFloat(v); return isNaN(n) ? null : n; }
function escHtml(s)   { return String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function escAttr(s)   { return String(s??'').replace(/"/g,'&quot;').replace(/'/g,'&#39;'); }

// ─── PR detection ─────────────────────────────────────────
function getHistoricalMax(exerciseName) {
  let max = 0;
  getSessions().filter(s => s.completedAt).forEach(sess => {
    (sess.exercises||[]).forEach(ex => {
      if (ex.type === 'strength' && ex.name.toLowerCase() === exerciseName.toLowerCase()) {
        (ex.sets||[]).forEach(set => { const w = normalizeWeight(set.weight, set.weightUnit); if (w > max) max = w; });
      }
    });
  });
  return max;
}

function checkPR(exerciseName, weight, unit) {
  const w = normalizeWeight(weight, unit);
  if (w <= 0) return false;
  return getHistoricalMax(exerciseName) > 0 && w > getHistoricalMax(exerciseName);
}

function getLastSessionSet(exerciseName, setIndex) {
  const sessions = getSessions().filter(s => s.completedAt).sort((a,b) => b.completedAt - a.completedAt);
  for (const sess of sessions) {
    const ex = (sess.exercises||[]).find(e => e.type==='strength' && e.name.toLowerCase()===exerciseName.toLowerCase());
    if (ex?.sets?.[setIndex]) return ex.sets[setIndex];
  }
  return null;
}

// ─── Toast ────────────────────────────────────────────────
let toastTimer;
function toast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg; el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
}

// ─── Sheets ───────────────────────────────────────────────
let activeSheet = null;
function openSheet(id) {
  if (activeSheet) closeSheet();
  const s = document.getElementById(id); if (!s) return;
  s.classList.add('open');
  document.getElementById('backdrop').classList.add('open');
  activeSheet = id;
}
function closeSheet() {
  if (!activeSheet) return;
  document.getElementById(activeSheet)?.classList.remove('open');
  document.getElementById('backdrop').classList.remove('open');
  activeSheet = null;
}

// ─── Navigation ───────────────────────────────────────────
let currentView = 'history';
function showView(name) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  document.getElementById('view-' + name)?.classList.add('active');
  document.querySelector(`.nav-tab[data-view="${name}"]`)?.classList.add('active');
  currentView = name;
  if (name === 'history')  renderHistory();
  if (name === 'progress') renderProgress();
  if (name === 'settings') renderSettings();
  if (name === 'log')      renderLogView();
}

// ─── Auto-save ────────────────────────────────────────────
let saveTimer;
function scheduleAutoSave() { clearTimeout(saveTimer); saveTimer = setTimeout(commitActiveSession, 400); }

// ─── Session state ────────────────────────────────────────
let activeSession = null;
let pendingWorkoutType = null;

function loadActiveSession() {
  const id = getActiveSessionId(); if (!id) return null;
  return getSessions().find(s => s.id === id && !s.completedAt) || null;
}
function commitActiveSession() {
  if (!activeSession) return;
  const sessions = getSessions();
  const idx = sessions.findIndex(s => s.id === activeSession.id);
  if (idx >= 0) sessions[idx] = activeSession; else sessions.push(activeSession);
  saveSessions(sessions);
}
function startNewSession(dayNumber, date, note, workoutType) {
  const session = { id: uid(), dayNumber: parseInt(dayNumber)||1, date: date||todayISO(), note: note||'', workoutType: workoutType||null, completedAt: null, exercises: [] };
  activeSession = session;
  setActiveSessionId(session.id);
  commitActiveSession();
  return session;
}
function finishSession() {
  if (!activeSession) return;
  activeSession.completedAt = Date.now();
  commitActiveSession(); setActiveSessionId(null); activeSession = null;
}
function discardActiveSession() {
  if (!activeSession) return;
  saveSessions(getSessions().filter(s => s.id !== activeSession.id));
  setActiveSessionId(null); activeSession = null;
}
function nextDayNumber() {
  const done = getSessions().filter(s => s.completedAt);
  return done.length ? Math.max(...done.map(s => s.dayNumber||0)) + 1 : 1;
}

// ─── Workout type picker ──────────────────────────────────
function renderWorkoutTypeGrid() {
  const grid = document.getElementById('workout-type-grid');
  grid.innerHTML = WORKOUT_TYPES.map(t =>
    `<button class="workout-type-card" data-type="${t.key}">
      <span class="type-emoji">${t.emoji}</span>
      <span class="type-label">${t.label}</span>
    </button>`).join('');
  grid.querySelectorAll('.workout-type-card').forEach(card => {
    card.addEventListener('click', () => onWorkoutTypePicked(card.dataset.type));
  });
}

function onWorkoutTypePicked(typeKey) {
  pendingWorkoutType = typeKey;
  const typeDef = WORKOUT_TYPES.find(t => t.key === typeKey);
  if (typeKey === 'custom') { closeSheet(); openSessionDetailsSheet(); return; }
  const template = WORKOUT_TEMPLATES[typeKey] || [];
  document.getElementById('routine-preview-title').textContent = `${typeDef?.emoji||''} ${typeDef?.label||typeKey} Day`;
  populateRoutinePreview(template);
  closeSheet(); openSheet('sheet-routine-preview');
}

function populateRoutinePreview(template) {
  const list = document.getElementById('routine-preview-list');
  if (!template.length) { list.innerHTML = `<p style="color:var(--text-muted);font-size:14px;padding:16px 0;">No preset — pick exercises after starting.</p>`; return; }
  list.innerHTML = template.map((ex, i) => {
    let lastInfo = '';
    if (ex.type === 'strength') {
      const ls = getLastSessionSet(ex.name, 0);
      if (ls?.weight != null) lastInfo = `${ls.weight} ${ls.weightUnit==='each_side'?'each side':'lbs'}`;
    }
    return `<label class="routine-preview-row">
      <input type="checkbox" checked data-idx="${i}">
      <span>${escHtml(ex.name)}</span>
      ${lastInfo ? `<span class="ex-last">${escHtml(lastInfo)}</span>` : ''}
    </label>`;
  }).join('');
}

function openSessionDetailsSheet() {
  document.getElementById('new-session-day').value = nextDayNumber();
  document.getElementById('new-session-date').value = todayISO();
  document.getElementById('new-session-note').value = '';
  openSheet('sheet-new-session');
  setTimeout(() => document.getElementById('new-session-day').focus(), 300);
}

function preloadTemplateExercises(template) {
  const checked = new Set();
  document.querySelectorAll('#routine-preview-list input[type="checkbox"]').forEach(cb => { if (cb.checked) checked.add(parseInt(cb.dataset.idx)); });
  template.filter((_,i) => checked.has(i)).forEach(ex => {
    if (ex.type === 'strength') {
      const ls = getLastSessionSet(ex.name, 0);
      activeSession.exercises.push({ type:'strength', name:ex.name, sets:[{ weight:null, weightUnit:ls?.weightUnit||'lbs', reps:null }] });
    } else if (ex.type === 'cardio') {
      activeSession.exercises.push({ type:'cardio', name:ex.name, incline:null, speed:null, duration:null, distance:null });
    } else if (ex.type === 'recovery') {
      activeSession.exercises.push({ type:'recovery', name:ex.name, duration:null });
    }
  });
  commitActiveSession();
}

// ─── History view ─────────────────────────────────────────
function renderHistory() {
  const list = document.getElementById('history-list');
  const sessions = getSessions().filter(s => s.completedAt).sort((a,b) => b.completedAt - a.completedAt);
  const inProgress = loadActiveSession();
  const banner = document.getElementById('resume-banner');
  if (inProgress) { banner.classList.add('visible'); activeSession = inProgress; }
  else banner.classList.remove('visible');

  if (!sessions.length) {
    list.innerHTML = `<div class="empty-state" style="margin-top:20px;">
      <div class="icon">📋</div><h3>No sessions yet</h3>
      <p>Tap "New Session" to log your first workout</p>
    </div>`;
    return;
  }
  list.innerHTML = '';
  sessions.forEach(sess => {
    const card = document.createElement('div');
    card.className = 'card session-card';
    card.innerHTML = buildSessionCardHTML(sess);
    card.addEventListener('click', () => openSessionDetail(sess));
    list.appendChild(card);
  });
}

function getWorkoutTypeLabel(key) {
  const t = WORKOUT_TYPES.find(t => t.key === key);
  return t ? `${t.emoji} ${t.label}` : null;
}

function buildSessionCardHTML(sess) {
  const strengthExs = sess.exercises.filter(e => e.type === 'strength');
  const chips = strengthExs.slice(0,4).map(e => `<span class="exercise-chip">${e.name}</span>`).join('');
  const more  = strengthExs.length > 4 ? `<span class="exercise-chip more">+${strengthExs.length-4}</span>` : '';
  const extras = [
    sess.exercises.some(e => e.type==='cardio')   ? `<span class="exercise-chip">🏃 Cardio</span>` : '',
    sess.exercises.some(e => e.type==='recovery') ? `<span class="exercise-chip">♨️ Recovery</span>` : '',
  ].join('');

  const typeLabel = sess.workoutType ? getWorkoutTypeLabel(sess.workoutType) : null;
  const typeBadge = typeLabel ? `<span class="session-type-badge">${escHtml(typeLabel)}</span>` : '';
  const noteHtml  = sess.note ? `<div class="session-note-preview">"${escHtml(sess.note)}"</div>` : '';
  const totalSets = strengthExs.reduce((n,e) => n + (e.sets?.length||0), 0);
  const setCount  = totalSets > 0 ? `<span style="font-size:12px;color:var(--text-muted);font-weight:700;white-space:nowrap;">${totalSets} sets</span>` : '';

  return `
    <div class="card-top">
      <div class="session-meta-left" style="flex:1;">
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:2px;">
          <div class="session-day">Day ${sess.dayNumber}</div>
          ${typeBadge}
        </div>
        <div class="session-date">${formatDate(sess.date)}</div>
        ${noteHtml}
      </div>
      ${setCount}
    </div>
    <div class="session-exercises-summary">${chips}${more}${extras}</div>`;
}

function openSessionDetail(sess) {
  document.getElementById('sheet-session-detail-content').innerHTML = buildSessionDetailHTML(sess);
  document.getElementById('btn-open-edit-session').addEventListener('click', () => {
    closeSheet('sheet-session-detail');
    openEditSession(sess.id);
  });
  openSheet('sheet-session-detail');
}

function buildSessionDetailHTML(sess) {
  const typeLabel = sess.workoutType ? getWorkoutTypeLabel(sess.workoutType) : null;
  let html = `
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
      <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
        <div class="session-day">Day ${sess.dayNumber}</div>
        ${typeLabel ? `<span class="session-type-badge">${escHtml(typeLabel)}</span>` : ''}
      </div>
      <button class="btn btn-ghost" id="btn-open-edit-session" style="font-size:13px;padding:6px 12px;min-height:32px;">Edit</button>
    </div>
    <div style="font-size:18px;font-weight:800;letter-spacing:-0.03em;margin-bottom:6px;">${formatDate(sess.date)}</div>`;
  if (sess.note) html += `<div style="font-size:14px;color:var(--text-secondary);margin-bottom:20px;line-height:1.6;font-style:italic;">"${escHtml(sess.note)}"</div>`;

  const strength = sess.exercises.filter(e => e.type==='strength');
  const cardio   = sess.exercises.filter(e => e.type==='cardio');
  const recovery = sess.exercises.filter(e => e.type==='recovery');

  if (strength.length) {
    html += `<div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.07em;color:var(--text-muted);margin-bottom:10px;">Strength</div>`;
    strength.forEach(ex => {
      html += `<div class="detail-exercise-block"><div class="detail-exercise-name">
        <span>${escHtml(ex.name)}</span>
        <span style="color:var(--text-muted);font-size:12px;font-weight:500;">${ex.sets.length} set${ex.sets.length!==1?'s':''}</span>
      </div>`;
      ex.sets.forEach((set,i) => {
        const unit = set.weightUnit==='each_side' ? 'each side' : 'lbs';
        html += `<div class="detail-set-row">
          <span style="color:var(--text-muted);">Set ${i+1}</span>
          <span><span class="detail-set-weight">${set.weight} ${unit}</span> × ${set.reps} reps</span>
        </div>`;
      });
      html += `</div>`;
    });
  }
  if (cardio.length) {
    html += `<div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.07em;color:var(--text-muted);margin:14px 0 10px;">Cardio</div>`;
    cardio.forEach(ex => {
      const parts = [];
      if (ex.incline!=null) parts.push(`Incline ${ex.incline}`);
      if (ex.speed!=null)   parts.push(`Speed ${ex.speed}`);
      if (ex.duration!=null)parts.push(`${ex.duration} min`);
      if (ex.distance!=null)parts.push(`${ex.distance} mi`);
      html += `<div class="detail-exercise-block"><div class="detail-exercise-name">${escHtml(ex.name)}</div>
        <div style="font-size:14px;color:var(--text-secondary);">${parts.join(' · ')}</div></div>`;
    });
  }
  if (recovery.length) {
    html += `<div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.07em;color:var(--text-muted);margin:14px 0 10px;">Recovery</div>`;
    recovery.forEach(ex => {
      html += `<div class="detail-exercise-block"><div class="detail-exercise-name">${escHtml(ex.name)}${ex.duration?` · ${ex.duration} min`:''}</div></div>`;
    });
  }
  return html;
}

// ─── Edit Session ─────────────────────────────────────────
let editingSessionId = null;

function openEditSession(sessionId) {
  const sessions = getSessions();
  const sess = sessions.find(s => s.id === sessionId);
  if (!sess) return;
  editingSessionId = sessionId;

  document.getElementById('edit-day-number').value = sess.dayNumber || '';
  document.getElementById('edit-date').value = sess.date || '';
  document.getElementById('edit-note').value = sess.note || '';

  renderEditExercises(sess);
  openSheet('sheet-edit-session');
}

function renderEditExercises(sess) {
  const container = document.getElementById('edit-exercises-list');
  if (!sess.exercises.length) { container.innerHTML = ''; return; }

  container.innerHTML = sess.exercises.map((ex, ei) => {
    let body = '';

    if (ex.type === 'strength') {
      const setsHtml = (ex.sets || []).map((set, si) => {
        const unit = set.weightUnit === 'each_side' ? 'each side' : 'lbs';
        return `<div class="edit-set-row" data-ei="${ei}" data-si="${si}">
          <span style="font-size:11px;font-weight:700;color:var(--text-muted);text-align:center;">${si+1}</span>
          <input class="input edit-set-weight" type="text" inputmode="decimal" value="${set.weight ?? ''}" placeholder="wt" style="padding:6px 8px;font-size:14px;text-align:center;" data-ei="${ei}" data-si="${si}" data-field="weight">
          <span style="font-size:12px;color:var(--text-muted);">×</span>
          <input class="input edit-set-reps" type="text" inputmode="numeric" value="${set.reps ?? ''}" placeholder="reps" style="padding:6px 8px;font-size:14px;text-align:center;" data-ei="${ei}" data-si="${si}" data-field="reps">
          <button class="btn btn-ghost edit-set-unit" data-ei="${ei}" data-si="${si}" style="font-size:11px;padding:4px 6px;min-height:28px;white-space:nowrap;">${unit}</button>
          <button class="btn-del-set" data-ei="${ei}" data-si="${si}" title="Remove set">✕</button>
        </div>`;
      }).join('');
      body = setsHtml;
    } else if (ex.type === 'cardio') {
      body = `<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
        <div><label class="field-label">Incline</label>
          <input class="input" type="text" inputmode="decimal" value="${ex.incline ?? ''}" placeholder="—" style="padding:6px 8px;font-size:14px;" data-ei="${ei}" data-field="incline"></div>
        <div><label class="field-label">Speed</label>
          <input class="input" type="text" inputmode="decimal" value="${ex.speed ?? ''}" placeholder="—" style="padding:6px 8px;font-size:14px;" data-ei="${ei}" data-field="speed"></div>
        <div><label class="field-label">Duration (min)</label>
          <input class="input" type="text" inputmode="decimal" value="${ex.duration ?? ''}" placeholder="—" style="padding:6px 8px;font-size:14px;" data-ei="${ei}" data-field="duration"></div>
        <div><label class="field-label">Distance (mi)</label>
          <input class="input" type="text" inputmode="decimal" value="${ex.distance ?? ''}" placeholder="—" style="padding:6px 8px;font-size:14px;" data-ei="${ei}" data-field="distance"></div>
      </div>`;
    } else if (ex.type === 'recovery') {
      body = `<div><label class="field-label">Duration (min)</label>
        <input class="input" type="text" inputmode="numeric" value="${ex.duration ?? ''}" placeholder="—" style="padding:6px 8px;font-size:14px;max-width:120px;" data-ei="${ei}" data-field="duration"></div>`;
    }

    return `<div class="edit-exercise-block" data-ei="${ei}">
      <div class="edit-exercise-header">
        <div class="edit-exercise-name-label">${escHtml(ex.name)}</div>
        <button class="btn-del-ex" data-ei="${ei}">Remove</button>
      </div>
      ${body}
    </div>`;
  }).join('');

  // Bind events on freshly rendered elements
  container.querySelectorAll('.btn-del-set').forEach(btn => {
    btn.addEventListener('click', () => {
      const ei = +btn.dataset.ei, si = +btn.dataset.si;
      const sessions = getSessions();
      const sess = sessions.find(s => s.id === editingSessionId);
      sess.exercises[ei].sets.splice(si, 1);
      saveSessions(sessions);
      renderEditExercises(sess);
    });
  });

  container.querySelectorAll('.btn-del-ex').forEach(btn => {
    btn.addEventListener('click', () => {
      const ei = +btn.dataset.ei;
      const sessions = getSessions();
      const sess = sessions.find(s => s.id === editingSessionId);
      sess.exercises.splice(ei, 1);
      saveSessions(sessions);
      renderEditExercises(sess);
    });
  });

  container.querySelectorAll('.edit-set-unit').forEach(btn => {
    btn.addEventListener('click', () => {
      const ei = +btn.dataset.ei, si = +btn.dataset.si;
      const sessions = getSessions();
      const sess = sessions.find(s => s.id === editingSessionId);
      const set = sess.exercises[ei].sets[si];
      set.weightUnit = set.weightUnit === 'each_side' ? 'lbs' : 'each_side';
      saveSessions(sessions);
      btn.textContent = set.weightUnit === 'each_side' ? 'each side' : 'lbs';
    });
  });

  container.querySelectorAll('input[data-field]').forEach(input => {
    input.addEventListener('change', () => {
      const ei = +input.dataset.ei;
      const field = input.dataset.field;
      const val = input.value.trim();
      const sessions = getSessions();
      const sess = sessions.find(s => s.id === editingSessionId);
      const ex = sess.exercises[ei];

      if (input.dataset.si !== undefined) {
        const si = +input.dataset.si;
        const num = val === '' ? null : parseFloat(val);
        ex.sets[si][field] = field === 'reps' ? (val === '' ? null : parseInt(val)) : num;
      } else {
        ex[field] = val === '' ? null : (field === 'reps' ? parseInt(val) : parseFloat(val));
      }
      saveSessions(sessions);
    });
  });
}

function bindEditSessionSheet() {
  document.getElementById('btn-edit-session-close').addEventListener('click', () => {
    closeSheet('sheet-edit-session');
  });

  document.getElementById('btn-edit-session-save').addEventListener('click', () => {
    const sessions = getSessions();
    const sess = sessions.find(s => s.id === editingSessionId);
    if (!sess) return;

    const dayVal = document.getElementById('edit-day-number').value.trim();
    const dateVal = document.getElementById('edit-date').value.trim();
    const noteVal = document.getElementById('edit-note').value.trim();

    if (dayVal) sess.dayNumber = parseInt(dayVal);
    if (dateVal) sess.date = dateVal;
    sess.note = noteVal;

    saveSessions(sessions);
    renderHistory();
    closeSheet('sheet-edit-session');
    toast('Session updated');
  });

  document.getElementById('btn-edit-session-delete').addEventListener('click', () => {
    if (!confirm('Delete this session permanently?')) return;
    const sessions = getSessions().filter(s => s.id !== editingSessionId);
    saveSessions(sessions);
    renderHistory();
    closeSheet('sheet-edit-session');
    toast('Session deleted');
  });
}

// ─── Log view ─────────────────────────────────────────────
function renderLogView() {
  const inProgress = loadActiveSession();
  if (inProgress) { activeSession = inProgress; showActiveSession(); }
  else if (activeSession) showActiveSession();
  else showNoSession();
}

function showNoSession() {
  document.getElementById('log-no-session').classList.add('visible');
  document.getElementById('log-active-session').classList.remove('visible');
}

function showActiveSession() {
  document.getElementById('log-no-session').classList.remove('visible');
  document.getElementById('log-active-session').classList.add('visible');
  document.getElementById('log-day-label').textContent = `Day ${activeSession.dayNumber}`;
  document.getElementById('log-date-label').textContent = formatDate(activeSession.date);
  document.getElementById('session-note').value = activeSession.note || '';
  const badge = document.getElementById('log-type-badge');
  const typeLabel = activeSession.workoutType ? getWorkoutTypeLabel(activeSession.workoutType) : null;
  if (typeLabel) { badge.textContent = typeLabel; badge.style.display = 'inline-block'; }
  else badge.style.display = 'none';
  renderExerciseBlocks();
}

function renderExerciseBlocks() {
  const container = document.getElementById('exercise-blocks');
  container.innerHTML = '';
  (activeSession.exercises||[]).forEach((ex,idx) => container.appendChild(buildExerciseBlock(ex,idx)));
}

function buildExerciseBlock(ex, idx) {
  const block = document.createElement('div');
  block.className = 'exercise-block'; block.dataset.idx = idx;

  if (ex.type === 'strength') {
    block.innerHTML = buildStrengthBlockHTML(ex, idx);
    block.querySelectorAll('.set-weight').forEach(input => input.addEventListener('input', () => { syncSetFromInputs(block,idx); scheduleAutoSave(); }));
    block.querySelectorAll('.set-reps').forEach(input =>   input.addEventListener('input', () => { syncSetFromInputs(block,idx); scheduleAutoSave(); }));
    block.querySelectorAll('.unit-toggle').forEach(btn =>  btn.addEventListener('click', () => toggleUnit(btn,block,idx)));
    block.querySelector('.add-set-btn-el')?.addEventListener('click', () => addSet(idx));
    block.querySelector('.remove-set-btn')?.addEventListener('click', () => {
      if (ex.sets.length > 1) { ex.sets.pop(); renderExerciseBlocks(); scheduleAutoSave(); }
    });
  } else if (ex.type === 'cardio') {
    block.innerHTML = buildCardioBlockHTML(ex);
    block.querySelectorAll('input').forEach(input => input.addEventListener('input', () => { syncCardioFromInputs(block,idx); scheduleAutoSave(); }));
  } else if (ex.type === 'recovery') {
    block.innerHTML = buildRecoveryBlockHTML(ex);
    block.querySelector('.recovery-dur-input')?.addEventListener('input', e => { activeSession.exercises[idx].duration = parseNum(e.target.value); scheduleAutoSave(); });
  }

  block.querySelector('.remove-exercise-btn')?.addEventListener('click', () => {
    activeSession.exercises.splice(idx, 1); renderExerciseBlocks(); scheduleAutoSave();
  });
  return block;
}

function buildStrengthBlockHTML(ex, idx) {
  const setsHTML = ex.sets.map((set, si) => {
    const unitClass = set.weightUnit === 'each_side' ? 'each-side' : '';
    const unitLabel = set.weightUnit === 'each_side' ? 'each side' : 'lbs';
    const isDone    = set.weight != null && set.reps != null;
    const ls        = getLastSessionSet(ex.name, si);
    const weightPH  = ls?.weight != null ? String(ls.weight) : 'wt';
    const repsPH    = ls?.reps   != null ? String(ls.reps)   : 'reps';
    const isPR      = set.weight != null && checkPR(ex.name, set.weight, set.weightUnit);
    const prBadge   = isPR ? `<span class="pr-badge">PR</span>` : '';

    return `<div class="set-row${isDone?' done-state':''}" data-set="${si}">
      <div class="set-num">${si+1}${prBadge}</div>
      <input class="set-weight" type="text" inputmode="decimal"
             value="${set.weight!=null?set.weight:''}" placeholder="${escAttr(weightPH)}">
      <button class="unit-toggle ${unitClass}">${unitLabel}</button>
      <input class="set-reps" type="text" inputmode="numeric"
             value="${set.reps!=null?set.reps:''}" placeholder="${escAttr(repsPH)}">
      <span class="reps-x">reps</span>
    </div>`;
  }).join('');

  return `
    <div class="exercise-block-header">
      <span class="exercise-name">${escHtml(ex.name)}</span>
      <button class="btn-icon danger remove-exercise-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="18" height="18"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div class="set-rows">${setsHTML}</div>
    <div class="add-set-btn">
      <button class="btn btn-ghost add-set-btn-el" style="font-size:13px;padding:6px 10px;min-height:32px;">+ Add Set</button>
      ${ex.sets.length>1?`<button class="btn btn-danger remove-set-btn" style="font-size:13px;padding:6px 10px;min-height:32px;">− Remove</button>`:''}
    </div>`;
}

function buildCardioBlockHTML(ex) {
  return `
    <div class="exercise-block-header">
      <span class="exercise-name">${escHtml(ex.name)} <span class="exercise-type-badge">Cardio</span></span>
      <button class="btn-icon danger remove-exercise-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="18" height="18"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div class="inline-form"><div class="row-2">
      <div class="form-group"><label>Incline</label><input class="cardio-field" data-field="incline" type="text" inputmode="decimal" value="${ex.incline!=null?ex.incline:''}" placeholder="—"></div>
      <div class="form-group"><label>Speed</label><input class="cardio-field" data-field="speed" type="text" inputmode="decimal" value="${ex.speed!=null?ex.speed:''}" placeholder="—"></div>
      <div class="form-group"><label>Duration (min)</label><input class="cardio-field" data-field="duration" type="text" inputmode="decimal" value="${ex.duration!=null?ex.duration:''}" placeholder="—"></div>
      <div class="form-group"><label>Distance (mi)</label><input class="cardio-field" data-field="distance" type="text" inputmode="decimal" value="${ex.distance!=null?ex.distance:''}" placeholder="—"></div>
    </div></div>`;
}

function buildRecoveryBlockHTML(ex) {
  return `
    <div class="exercise-block-header">
      <span class="exercise-name">${escHtml(ex.name)} <span class="exercise-type-badge">Recovery</span></span>
      <button class="btn-icon danger remove-exercise-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="18" height="18"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div class="inline-form"><div class="form-group"><label>Duration (min)</label>
      <input class="recovery-dur-input" type="text" inputmode="numeric" value="${ex.duration!=null?ex.duration:''}" placeholder="—">
    </div></div>`;
}

function syncSetFromInputs(block, exIdx) {
  const ex = activeSession.exercises[exIdx];
  if (!ex || ex.type !== 'strength') return;
  block.querySelectorAll('.set-row').forEach((row, si) => {
    if (!ex.sets[si]) return;
    ex.sets[si].weight = parseNum(row.querySelector('.set-weight').value);
    ex.sets[si].reps   = parseNum(row.querySelector('.set-reps').value);

    const isDone = ex.sets[si].weight != null && ex.sets[si].reps != null;
    row.classList.toggle('done-state', isDone);

    const setNum = row.querySelector('.set-num');
    if (setNum) {
      const isPR = ex.sets[si].weight != null && checkPR(ex.name, ex.sets[si].weight, ex.sets[si].weightUnit);
      const existing = setNum.querySelector('.pr-badge');
      if (isPR && !existing)  setNum.insertAdjacentHTML('beforeend', '<span class="pr-badge">PR</span>');
      else if (!isPR && existing) existing.remove();
    }
  });
}

function syncCardioFromInputs(block, exIdx) {
  const ex = activeSession.exercises[exIdx];
  if (!ex || ex.type !== 'cardio') return;
  block.querySelectorAll('.cardio-field').forEach(input => { ex[input.dataset.field] = parseNum(input.value); });
}

function toggleUnit(btn, block, exIdx) {
  const row = btn.closest('.set-row');
  const si  = parseInt(row.dataset.set);
  const ex  = activeSession.exercises[exIdx];
  if (!ex?.sets[si]) return;
  const next = ex.sets[si].weightUnit === 'lbs' ? 'each_side' : 'lbs';
  ex.sets[si].weightUnit = next;
  btn.textContent = next === 'each_side' ? 'each side' : 'lbs';
  btn.classList.toggle('each-side', next === 'each_side');
  scheduleAutoSave();
}

function addSet(exIdx) {
  const ex = activeSession.exercises[exIdx];
  if (!ex || ex.type !== 'strength') return;
  const last = ex.sets[ex.sets.length-1] || { weight:null, weightUnit:'lbs', reps:null };
  ex.sets.push({ weight: last.weight, weightUnit: last.weightUnit, reps: null });
  renderExerciseBlocks();
  scheduleAutoSave();
  setTimeout(() => {
    const rows = document.querySelectorAll(`.exercise-block[data-idx="${exIdx}"] .set-row`);
    rows[rows.length-1]?.querySelector('.set-reps')?.focus();
  }, 50);
}

// ─── Exercise picker ──────────────────────────────────────
let pickerCallback = null;
function openExercisePicker(onSelect) {
  pickerCallback = onSelect;
  renderExercisePickList('');
  document.getElementById('exercise-search-input').value = '';
  openSheet('sheet-exercise-picker');
  setTimeout(() => document.getElementById('exercise-search-input').focus(), 300);
}

function renderExercisePickList(query) {
  const container = document.getElementById('exercise-pick-list');
  const q = query.toLowerCase().trim();
  const grouped = {};

  getExerciseGroups().forEach(ex => {
    if (q && !ex.name.toLowerCase().includes(q)) return;
    const g = ex.group || 'Custom';
    if (!grouped[g]) grouped[g] = [];
    grouped[g].push(ex.name);
  });

  const defaultNames = DEFAULT_EXERCISES.map(e => e.name.toLowerCase());
  getAllExerciseNames().forEach(name => {
    if (!defaultNames.includes(name.toLowerCase())) {
      if (!q || name.toLowerCase().includes(q)) {
        if (!grouped['Custom']) grouped['Custom'] = [];
        if (!grouped['Custom'].includes(name)) grouped['Custom'].push(name);
      }
    }
  });

  let html = '';
  ['Chest','Shoulders','Triceps','Back','Biceps','Legs','Abs','Custom'].forEach(g => {
    if (!grouped[g]?.length) return;
    html += `<div class="exercise-group-header">${g}</div>`;
    grouped[g].forEach(name => {
      html += `<div class="exercise-pick-row" data-name="${escAttr(name)}">
        ${escHtml(name)}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
      </div>`;
    });
  });

  if (!html) html = `<div class="exercise-pick-row" data-name="${escAttr(query)}">Add "${escHtml(query)}"
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
  </div>`;

  container.innerHTML = html;
  container.querySelectorAll('.exercise-pick-row').forEach(row => {
    row.addEventListener('click', () => {
      const name = row.dataset.name;
      if (name) { closeSheet(); if (pickerCallback) pickerCallback(name); }
    });
  });
}

// ─── Add exercises ────────────────────────────────────────
function addStrengthExercise(name) {
  if (!activeSession) return;
  const ls = getLastSessionSet(name, 0);
  activeSession.exercises.push({ type:'strength', name, sets:[{ weight:null, weightUnit:ls?.weightUnit||'lbs', reps:null }] });
  renderExerciseBlocks(); scheduleAutoSave();
  setTimeout(() => {
    const blocks = document.querySelectorAll('.exercise-block');
    blocks[blocks.length-1]?.scrollIntoView({ behavior:'smooth', block:'start' });
  }, 50);
}

function addCardioExercise(name, incline, speed, duration, distance) {
  if (!activeSession) return;
  activeSession.exercises.push({ type:'cardio', name, incline:parseNum(incline), speed:parseNum(speed), duration:parseNum(duration), distance:parseNum(distance) });
  renderExerciseBlocks(); scheduleAutoSave();
}

function addRecoveryExercise(name, duration) {
  if (!activeSession) return;
  activeSession.exercises.push({ type:'recovery', name, duration:parseNum(duration) });
  renderExerciseBlocks(); scheduleAutoSave();
}

// ─── Progress view ────────────────────────────────────────
let progressChart = null;
let selectedExercise = null;

function renderProgress() {
  const sessions    = getSessions().filter(s => s.completedAt);
  const exerciseNames = getExercisesWithData(sessions);
  const emptyFull   = document.getElementById('progress-empty-full');
  const content     = document.getElementById('progress-content');

  if (!exerciseNames.length) {
    emptyFull.style.display = 'block';
    content.style.display = 'none';
    if (progressChart) { progressChart.destroy(); progressChart = null; }
    return;
  }

  emptyFull.style.display = 'none';
  content.style.display = 'block';

  // Default to first exercise if nothing selected or selection no longer has data
  if (!selectedExercise || !exerciseNames.some(n => n.toLowerCase() === selectedExercise.toLowerCase())) {
    selectedExercise = exerciseNames[0];
  }

  document.getElementById('progress-selected-name').textContent = selectedExercise;
  renderExerciseChart(selectedExercise, sessions);
}

function getExercisesWithData(sessions) {
  // Case-insensitive dedup — keep the first casing encountered
  const seen = new Map();
  sessions.forEach(sess => sess.exercises.forEach(ex => {
    if (ex.type === 'strength' && ex.sets?.some(s => parseFloat(s.weight) > 0)) {
      const key = ex.name.toLowerCase();
      if (!seen.has(key)) seen.set(key, ex.name);
    }
  }));
  return Array.from(seen.values()).sort((a,b) => a.localeCompare(b));
}

function openProgressPicker() {
  const sessions = getSessions().filter(s => s.completedAt);
  const exerciseNames = getExercisesWithData(sessions);
  const ORDER = ['Chest','Shoulders','Triceps','Back','Biceps','Legs','Abs','Custom'];

  const grouped = {};
  ORDER.forEach(g => grouped[g] = []);

  exerciseNames.forEach(name => {
    const def = DEFAULT_EXERCISES.find(e => e.name.toLowerCase() === name.toLowerCase());
    const group = def?.group || 'Custom';
    if (!grouped[group]) grouped[group] = [];
    grouped[group].push(name);
  });

  let html = '';
  ORDER.forEach(g => {
    if (!grouped[g]?.length) return;
    html += `<div class="exercise-group-header">${g}</div>`;
    grouped[g].forEach(name => {
      const active = name.toLowerCase() === selectedExercise?.toLowerCase();
      html += `<div class="exercise-pick-row${active ? ' active-ex' : ''}" data-name="${escAttr(name)}">
        <span>${escHtml(name)}</span>
        ${active ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>` : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>`}
      </div>`;
    });
  });

  const list = document.getElementById('progress-pick-list');
  list.innerHTML = html;
  list.querySelectorAll('.exercise-pick-row').forEach(row => {
    row.addEventListener('click', () => {
      selectedExercise = row.dataset.name;
      closeSheet();
      renderProgress();
    });
  });

  openSheet('sheet-progress-pick');
}

function renderExerciseChart(exerciseName, sessions) {
  const points    = buildChartData(exerciseName, sessions);
  const chartEmpty= document.getElementById('chart-empty');
  const statsEl   = document.getElementById('chart-stats');
  const logWrap   = document.getElementById('progress-log-wrap');
  const logList   = document.getElementById('progress-session-list');
  const titleEl   = document.getElementById('chart-exercise-title');

  titleEl.textContent = exerciseName;

  if (!points.length) {
    chartEmpty.style.display = 'flex';
    if (progressChart) { progressChart.destroy(); progressChart = null; }
    statsEl.innerHTML = '';
    logWrap.style.display = 'none';
    return;
  }

  chartEmpty.style.display = 'none';
  const weights = points.map(p => p.y);
  const pr     = Math.max(...weights);
  const recent = weights[weights.length-1];
  const trend  = weights.length >= 2 ? ((recent - weights[weights.length-2]) >= 0 ? '↑' : '↓') : '—';
  const trendColor = trend === '↑' ? 'var(--green)' : trend === '↓' ? 'var(--danger)' : 'var(--text-muted)';

  statsEl.innerHTML = `
    <div class="stat-card">
      <div class="stat-value">${pr}</div>
      <div class="stat-label">PR (lbs)</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${recent}</div>
      <div class="stat-label">Last</div>
    </div>
    <div class="stat-card">
      <div class="stat-value" style="color:${trendColor}">${trend}</div>
      <div class="stat-label">${points.length} sessions</div>
    </div>`;

  const ctx = document.getElementById('progress-chart').getContext('2d');
  if (progressChart) { progressChart.destroy(); progressChart = null; }
  const c = chartColors();

  try {
    progressChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: points.map(p => p.label),
        datasets: [{
          data: points.map(p => p.y),
          borderColor: c.accent,
          backgroundColor: c.accentFill,
          pointBackgroundColor: points.map(p => p.y === pr ? c.accent : c.accent),
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: points.map(p => p.y === pr ? 7 : 4),
          pointHoverRadius: 8,
          tension: 0.35,
          fill: true,
          borderWidth: 2.5,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: c.tooltip_bg,
            titleColor: c.tooltip_txt,
            bodyColor: c.tooltip_txt,
            padding: 12,
            cornerRadius: 10,
            callbacks: {
              title: items => items[0].label,
              label: item => ` ${item.raw} lbs${item.raw === pr ? '  🏆 PR' : ''}`,
            },
          },
        },
        scales: {
          x: {
            ticks: { color: c.tick, font: { size: 11, family: 'Inter', weight: '600' }, maxRotation: 30, minRotation: 0 },
            grid: { color: c.grid },
            border: { display: false },
          },
          y: {
            ticks: { color: c.tick, font: { size: 11, family: 'Inter', weight: '600' }, callback: v => `${v}` },
            grid: { color: c.grid },
            border: { display: false },
            title: { display: true, text: 'lbs (total)', color: c.tick, font: { size: 11, family: 'Inter' } },
          },
        },
        animation: { duration: 300 },
      },
    });
  } catch {
    chartEmpty.style.display = 'flex';
    chartEmpty.innerHTML = `<span>Charts unavailable — connect once to load Chart.js.</span>`;
  }

  logWrap.style.display = 'block';
  logList.innerHTML = [...points].reverse().map(p => `
    <div class="progress-session-row">
      <span style="color:var(--text-muted);font-size:13px;">${p.label}</span>
      <span style="font-weight:700;">${p.y} lbs${p.y===pr?' 🏆':''}</span>
    </div>`).join('');
}

function buildChartData(exerciseName, sessions) {
  return [...sessions].sort((a,b) => (a.completedAt||0) - (b.completedAt||0)).reduce((pts, sess) => {
    const match = sess.exercises.find(e => e.type==='strength' && e.name.toLowerCase()===exerciseName.toLowerCase());
    if (!match?.sets?.length) return pts;
    const weights = match.sets.map(s => normalizeWeight(s.weight, s.weightUnit)).filter(w => w > 0);
    if (!weights.length) return pts;
    const maxW = Math.max(...weights);
    const d = new Date(sess.date + 'T12:00:00');
    const dateStr = d.toLocaleDateString('en-US', { month:'short', day:'numeric' });
    const label = sess.dayNumber ? `Day ${sess.dayNumber} · ${dateStr}` : dateStr;
    pts.push({ label, y: maxW, dayNumber: sess.dayNumber });
    return pts;
  }, []);
}

// ─── Settings view ────────────────────────────────────────
function renderSettings() {
  const listEl = document.getElementById('settings-exercise-list');
  listEl.innerHTML = getAllExerciseNames().map((name,i) => `
    <div class="exercise-list-row">
      <span>${escHtml(name)}</span>
      <button class="btn-icon danger" data-idx="${i}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>`).join('');
  listEl.querySelectorAll('.btn-icon.danger').forEach(btn => {
    btn.addEventListener('click', () => {
      const list = getAllExerciseNames();
      list.splice(parseInt(btn.dataset.idx), 1);
      saveExercises(list); renderSettings(); toast('Exercise removed');
    });
  });
}

// ─── Event bindings ───────────────────────────────────────
function bindEvents() {
  document.querySelectorAll('.nav-tab').forEach(tab => tab.addEventListener('click', () => showView(tab.dataset.view)));
  document.getElementById('backdrop').addEventListener('click', closeSheet);

  // Progress exercise picker
  document.getElementById('btn-progress-pick-exercise').addEventListener('click', openProgressPicker);

  // Theme toggle
  document.getElementById('btn-toggle-theme').addEventListener('click', toggleTheme);

  // New session
  const handleNewSession = () => { renderWorkoutTypeGrid(); openSheet('sheet-type-picker'); };
  document.getElementById('btn-new-session').addEventListener('click', handleNewSession);
  document.getElementById('btn-new-session-log').addEventListener('click', handleNewSession);

  document.getElementById('btn-routine-back').addEventListener('click', () => { closeSheet(); renderWorkoutTypeGrid(); openSheet('sheet-type-picker'); });
  document.getElementById('btn-routine-continue').addEventListener('click', () => { closeSheet(); openSessionDetailsSheet(); });

  document.getElementById('btn-start-session').addEventListener('click', () => {
    const day  = document.getElementById('new-session-day').value;
    const date = document.getElementById('new-session-date').value;
    const note = document.getElementById('new-session-note').value.trim();
    if (!day) { toast('Enter a day number'); return; }
    closeSheet();
    startNewSession(day, date, note, pendingWorkoutType);
    const template = pendingWorkoutType && pendingWorkoutType !== 'custom' ? (WORKOUT_TEMPLATES[pendingWorkoutType]||[]) : [];
    if (template.length) preloadTemplateExercises(template);
    pendingWorkoutType = null;
    showView('log');
  });

  document.getElementById('btn-cancel-session').addEventListener('click', () => {
    if (!confirm('Discard this session?')) return;
    discardActiveSession(); showNoSession(); toast('Session discarded');
  });
  document.getElementById('btn-finish-session').addEventListener('click', () => {
    if (!activeSession) return;
    if (!activeSession.exercises.length) { toast('Add at least one exercise'); return; }
    finishSession(); showNoSession(); showView('history'); toast('Session saved!');
  });

  document.getElementById('btn-resume-session').addEventListener('click', () => showView('log'));
  document.getElementById('btn-discard-session').addEventListener('click', () => {
    if (!confirm('Discard the in-progress session?')) return;
    discardActiveSession(); document.getElementById('resume-banner').classList.remove('visible');
    renderHistory(); toast('Session discarded');
  });

  document.getElementById('session-note').addEventListener('input', e => {
    if (activeSession) { activeSession.note = e.target.value; scheduleAutoSave(); }
  });

  document.getElementById('btn-add-strength').addEventListener('click', () => openExercisePicker(addStrengthExercise));
  document.getElementById('exercise-search-input').addEventListener('input', e => renderExercisePickList(e.target.value));

  document.getElementById('btn-add-cardio').addEventListener('click', () => {
    const sel = document.getElementById('cardio-machine');
    sel.innerHTML = '<option value="">Select machine…</option>';
    getCardioMachines().forEach(m => { const o = document.createElement('option'); o.value = o.textContent = m; sel.appendChild(o); });
    ['cardio-incline','cardio-speed','cardio-duration','cardio-distance'].forEach(id => document.getElementById(id).value = '');
    openSheet('sheet-cardio');
  });
  document.getElementById('btn-add-cardio-confirm').addEventListener('click', () => {
    const name = document.getElementById('cardio-machine').value;
    if (!name) { toast('Select a machine'); return; }
    addCardioExercise(name, document.getElementById('cardio-incline').value, document.getElementById('cardio-speed').value, document.getElementById('cardio-duration').value, document.getElementById('cardio-distance').value);
    closeSheet();
  });

  document.getElementById('btn-add-recovery').addEventListener('click', () => {
    document.getElementById('recovery-type').value = '';
    document.getElementById('recovery-duration').value = '';
    openSheet('sheet-recovery');
  });
  document.getElementById('btn-add-recovery-confirm').addEventListener('click', () => {
    const name = document.getElementById('recovery-type').value;
    if (!name) { toast('Select a recovery type'); return; }
    addRecoveryExercise(name, document.getElementById('recovery-duration').value);
    closeSheet();
  });

  document.getElementById('btn-export').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify({ exportedAt: new Date().toISOString(), sessions: getSessions() }, null, 2)], { type:'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `domino-workouts-${todayISO()}.json`;
    a.click(); URL.revokeObjectURL(a.href);
    toast('Exported!');
  });

  document.getElementById('btn-import').addEventListener('click', () => {
    document.getElementById('import-file-input').click();
  });

  document.getElementById('import-file-input').addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = evt => {
      try {
        const data = JSON.parse(evt.target.result);
        const incoming = Array.isArray(data) ? data : (data.sessions || []);
        if (!incoming.length) { toast('No sessions found in file'); return; }
        const existing = getSessions();
        const existingIds = new Set(existing.map(s => s.id));
        const merged = [...existing];
        let added = 0;
        for (const s of incoming) {
          if (!s.id || existingIds.has(s.id)) continue;
          merged.push(s); added++;
        }
        saveSessions(merged);
        renderHistory();
        toast(added > 0 ? `Imported ${added} session${added > 1 ? 's' : ''}` : 'All sessions already exist');
      } catch {
        toast('Invalid file — could not import');
      }
      e.target.value = '';
    };
    reader.readAsText(file);
  });

  document.getElementById('btn-clear-data').addEventListener('click', () => {
    if (!confirm('Delete ALL workout data? This cannot be undone.')) return;
    if (!confirm('Are you sure? All sessions will be permanently deleted.')) return;
    [LS.SESSIONS, LS.ACTIVE].forEach(k => localStorage.removeItem(k));
    activeSession = null; toast('All data cleared');
    renderSettings(); renderHistory();
  });

  document.getElementById('btn-add-custom-exercise').addEventListener('click', () => {
    const name = prompt('Exercise name:');
    if (!name?.trim()) return;
    const list = getAllExerciseNames();
    if (list.some(e => e.toLowerCase() === name.trim().toLowerCase())) { toast('Already in list'); return; }
    list.push(name.trim()); saveExercises(list); renderSettings(); toast('Exercise added');
  });
}

// ─── Service Worker ───────────────────────────────────────
function registerSW() {
  if ('serviceWorker' in navigator)
    window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(()=>{}));
}

// ─── Boot ─────────────────────────────────────────────────
function init() {
  loadTheme();
  seedDefaults();
  bindEvents();
  bindEditSessionSheet();
  registerSW();
  const inProgress = loadActiveSession();
  if (inProgress) activeSession = inProgress;
  showView('history');
}

document.addEventListener('DOMContentLoaded', init);
