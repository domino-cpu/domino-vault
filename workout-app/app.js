/* ══════════════════════════════════════════════════════
   DOMINO Workout Tracker — app.js
   ══════════════════════════════════════════════════════ */

// ─── Constants ───────────────────────────────────────────
const LS = {
  SESSIONS: 'domino_workout_sessions',
  ACTIVE:   'domino_workout_active_session_id',
  EXERCISES:'domino_workout_exercises',
  CARDIO:   'domino_workout_cardio_machines',
  PREFS:    'domino_workout_prefs',
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
  chest: [
    { type: 'strength', name: 'Bench Press' },
    { type: 'strength', name: 'Incline Press' },
    { type: 'strength', name: 'Pectoral Fly' },
    { type: 'strength', name: 'Cable Fly' },
    { type: 'strength', name: 'Tricep Pushdown' },
  ],
  back: [
    { type: 'strength', name: 'Lat Pull-Down' },
    { type: 'strength', name: 'Cable Row' },
    { type: 'strength', name: 'Seated Row' },
    { type: 'strength', name: 'Deadlift' },
    { type: 'strength', name: 'Bicep Curl' },
  ],
  arms: [
    { type: 'strength', name: 'Bicep Curl' },
    { type: 'strength', name: 'Hammer Curl' },
    { type: 'strength', name: 'Incline Dumbbell Curl' },
    { type: 'strength', name: 'Tricep Pushdown' },
    { type: 'strength', name: 'Skull Crushers' },
    { type: 'strength', name: 'Overhead Tricep Extension' },
  ],
  shoulders: [
    { type: 'strength', name: 'Shoulder Press' },
    { type: 'strength', name: 'Lateral Raise' },
    { type: 'strength', name: 'Front Raise' },
    { type: 'strength', name: 'Face Pull' },
    { type: 'strength', name: 'ISO Lateral Shoulder Press' },
  ],
  legs: [
    { type: 'strength', name: 'Squat' },
    { type: 'strength', name: 'Leg Press' },
    { type: 'strength', name: 'Romanian Deadlift' },
    { type: 'strength', name: 'Leg Curl' },
    { type: 'strength', name: 'Leg Extension' },
    { type: 'strength', name: 'Calf Raise' },
  ],
  abs: [
    { type: 'strength', name: 'Cable Crunch' },
    { type: 'strength', name: 'Hanging Leg Raise' },
    { type: 'strength', name: 'Ab Rollout' },
    { type: 'strength', name: 'Russian Twist' },
    { type: 'strength', name: 'Plank' },
    { type: 'strength', name: 'Side Plank' },
  ],
  fullbody: [
    { type: 'strength', name: 'Squat' },
    { type: 'strength', name: 'Deadlift' },
    { type: 'strength', name: 'Bench Press' },
    { type: 'strength', name: 'Lat Pull-Down' },
    { type: 'strength', name: 'Shoulder Press' },
    { type: 'strength', name: 'Bicep Curl' },
  ],
  conditioning: [
    { type: 'cardio', name: 'Treadmill' },
    { type: 'cardio', name: 'Stairmaster' },
  ],
  recovery: [
    { type: 'recovery', name: 'Sauna' },
    { type: 'recovery', name: 'Stretching' },
  ],
  custom: [],
};

const DEFAULT_EXERCISES = [
  { group: 'Chest', name: 'Bench Press' },
  { group: 'Chest', name: 'Incline Press' },
  { group: 'Chest', name: 'Decline Press' },
  { group: 'Chest', name: 'Pectoral Fly' },
  { group: 'Chest', name: 'Cable Fly' },
  { group: 'Chest', name: 'Push-Up' },
  { group: 'Shoulders', name: 'Shoulder Press' },
  { group: 'Shoulders', name: 'ISO Lateral Shoulder Press' },
  { group: 'Shoulders', name: 'Lateral Raise' },
  { group: 'Shoulders', name: 'Front Raise' },
  { group: 'Shoulders', name: 'Face Pull' },
  { group: 'Triceps', name: 'Tricep Pushdown' },
  { group: 'Triceps', name: 'Skull Crushers' },
  { group: 'Triceps', name: 'Overhead Tricep Extension' },
  { group: 'Triceps', name: 'Dips' },
  { group: 'Back', name: 'Lat Pull-Down' },
  { group: 'Back', name: 'ISO Lateral Front Pull-Down' },
  { group: 'Back', name: 'Cable Row' },
  { group: 'Back', name: 'Seated Row' },
  { group: 'Back', name: 'T-Bar Row' },
  { group: 'Back', name: 'Pull-Up' },
  { group: 'Back', name: 'Deadlift' },
  { group: 'Biceps', name: 'Bicep Curl' },
  { group: 'Biceps', name: 'Hammer Curl' },
  { group: 'Biceps', name: 'Incline Dumbbell Curl' },
  { group: 'Biceps', name: 'Preacher Curl' },
  { group: 'Legs', name: 'Squat' },
  { group: 'Legs', name: 'Leg Press' },
  { group: 'Legs', name: 'Romanian Deadlift' },
  { group: 'Legs', name: 'Leg Curl' },
  { group: 'Legs', name: 'Leg Extension' },
  { group: 'Legs', name: 'Calf Raise' },
  { group: 'Legs', name: 'Lunges' },
  { group: 'Legs', name: 'Hip Thrust' },
  { group: 'Legs', name: 'Sumo Squat' },
  { group: 'Abs', name: 'Plank' },
  { group: 'Abs', name: 'Crunches' },
  { group: 'Abs', name: 'Cable Crunch' },
  { group: 'Abs', name: 'Hanging Leg Raise' },
  { group: 'Abs', name: 'Russian Twist' },
  { group: 'Abs', name: 'Dead Bug' },
  { group: 'Abs', name: 'Side Plank' },
  { group: 'Abs', name: 'Ab Rollout' },
];

const DEFAULT_CARDIO = ['Treadmill', 'Stairmaster', 'Elliptical', 'Stationary Bike', 'Rowing Machine'];

// ─── Storage helpers ──────────────────────────────────────
function getSessions() {
  try { return JSON.parse(localStorage.getItem(LS.SESSIONS)) || []; } catch { return []; }
}

function saveSessions(sessions) {
  localStorage.setItem(LS.SESSIONS, JSON.stringify(sessions));
}

function getExercises() {
  try {
    const raw = localStorage.getItem(LS.EXERCISES);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function saveExercises(list) {
  localStorage.setItem(LS.EXERCISES, JSON.stringify(list));
}

function getCardioMachines() {
  try {
    const raw = localStorage.getItem(LS.CARDIO);
    return raw ? JSON.parse(raw) : DEFAULT_CARDIO;
  } catch { return DEFAULT_CARDIO; }
}

function getActiveSessionId() {
  return localStorage.getItem(LS.ACTIVE) || null;
}

function setActiveSessionId(id) {
  if (id) localStorage.setItem(LS.ACTIVE, id);
  else localStorage.removeItem(LS.ACTIVE);
}

function getAllExerciseNames() {
  const stored = getExercises();
  if (stored) return stored;
  return DEFAULT_EXERCISES.map(e => e.name);
}

function getExerciseGroups() {
  const stored = getExercises();
  if (stored) {
    return stored.map(name => {
      const found = DEFAULT_EXERCISES.find(e => e.name.toLowerCase() === name.toLowerCase());
      return found || { group: 'Custom', name };
    });
  }
  return DEFAULT_EXERCISES;
}

// ─── Seed on first run ────────────────────────────────────
function seedDefaults() {
  if (!getExercises()) {
    saveExercises(DEFAULT_EXERCISES.map(e => e.name));
  }
  if (!localStorage.getItem(LS.CARDIO)) {
    localStorage.setItem(LS.CARDIO, JSON.stringify(DEFAULT_CARDIO));
  }
}

// ─── Utils ────────────────────────────────────────────────
function uid() {
  return 'sess_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
}

function todayISO() {
  return new Date().toISOString().split('T')[0];
}

function formatDate(isoStr) {
  if (!isoStr) return '';
  const d = new Date(isoStr + 'T12:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' });
}

function normalizeWeight(weight, unit) {
  const w = parseFloat(weight) || 0;
  return unit === 'each_side' ? w * 2 : w;
}

function parseNum(val) {
  const n = parseFloat(val);
  return isNaN(n) ? null : n;
}

function vibrateShort() {
  navigator.vibrate?.(30);
}

function vibrateDone() {
  navigator.vibrate?.([40, 60, 80]);
}

// ─── PR detection ─────────────────────────────────────────
function getHistoricalMax(exerciseName) {
  const sessions = getSessions().filter(s => s.completedAt);
  let max = 0;
  sessions.forEach(sess => {
    (sess.exercises || []).forEach(ex => {
      if (ex.type === 'strength' && ex.name.toLowerCase() === exerciseName.toLowerCase()) {
        (ex.sets || []).forEach(set => {
          const w = normalizeWeight(set.weight, set.weightUnit);
          if (w > max) max = w;
        });
      }
    });
  });
  return max;
}

function checkExercisePR(exerciseName, weight, unit) {
  const w = normalizeWeight(weight, unit);
  if (w <= 0) return false;
  const max = getHistoricalMax(exerciseName);
  return max > 0 && w > max;
}

function getLastSessionSet(exerciseName, setIndex) {
  const sessions = getSessions()
    .filter(s => s.completedAt)
    .sort((a, b) => b.completedAt - a.completedAt);
  for (const sess of sessions) {
    const ex = (sess.exercises || []).find(e =>
      e.type === 'strength' && e.name.toLowerCase() === exerciseName.toLowerCase()
    );
    if (ex && ex.sets && ex.sets[setIndex]) {
      return ex.sets[setIndex];
    }
  }
  return null;
}

// ─── Rest timer ───────────────────────────────────────────
let restTimerInterval = null;
let restSecondsLeft = 0;

function startRestTimer(seconds) {
  stopRestTimer();
  restSecondsLeft = seconds || 90;
  const bar = document.getElementById('rest-timer-bar');
  bar.classList.add('active');
  updateRestTimerDisplay();

  restTimerInterval = setInterval(() => {
    restSecondsLeft--;
    updateRestTimerDisplay();
    if (restSecondsLeft <= 0) {
      stopRestTimer();
      vibrateDone();
      toast('Rest done — next set!');
    }
  }, 1000);
}

function stopRestTimer() {
  if (restTimerInterval) {
    clearInterval(restTimerInterval);
    restTimerInterval = null;
  }
  const bar = document.getElementById('rest-timer-bar');
  if (bar) bar.classList.remove('active');
  restSecondsLeft = 0;
}

function updateRestTimerDisplay() {
  const el = document.getElementById('rest-timer-display');
  if (!el) return;
  const m = Math.floor(restSecondsLeft / 60);
  const s = restSecondsLeft % 60;
  el.textContent = `${m}:${s.toString().padStart(2, '0')}`;
}

// ─── Toast ────────────────────────────────────────────────
let toastTimer;
function toast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
}

// ─── Sheet management ─────────────────────────────────────
let activeSheet = null;

function openSheet(id) {
  if (activeSheet) closeSheet();
  const sheet = document.getElementById(id);
  const backdrop = document.getElementById('backdrop');
  if (!sheet) return;
  sheet.classList.add('open');
  backdrop.classList.add('open');
  activeSheet = id;
}

function closeSheet() {
  if (!activeSheet) return;
  document.getElementById(activeSheet)?.classList.remove('open');
  document.getElementById('backdrop').classList.remove('open');
  activeSheet = null;
}

// ─── Navigation ──────────────────────────────────────────
let currentView = 'history';

function showView(name) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  document.getElementById('view-' + name)?.classList.add('active');
  document.querySelector(`.nav-tab[data-view="${name}"]`)?.classList.add('active');
  currentView = name;

  if (name === 'history') renderHistory();
  if (name === 'progress') renderProgress();
  if (name === 'settings') renderSettings();
  if (name === 'log') renderLogView();
}

// ─── Auto-save (debounced) ────────────────────────────────
let saveTimer;
function scheduleAutoSave() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    commitActiveSession();
  }, 400);
}

// ─── Active session state ─────────────────────────────────
let activeSession = null;
let pendingWorkoutType = null;

function loadActiveSession() {
  const id = getActiveSessionId();
  if (!id) return null;
  const sessions = getSessions();
  return sessions.find(s => s.id === id && !s.completedAt) || null;
}

function commitActiveSession() {
  if (!activeSession) return;
  const sessions = getSessions();
  const idx = sessions.findIndex(s => s.id === activeSession.id);
  if (idx >= 0) sessions[idx] = activeSession;
  else sessions.push(activeSession);
  saveSessions(sessions);
}

function startNewSession(dayNumber, date, note, workoutType) {
  const session = {
    id: uid(),
    dayNumber: parseInt(dayNumber) || 1,
    date: date || todayISO(),
    note: note || '',
    workoutType: workoutType || null,
    completedAt: null,
    exercises: [],
  };
  activeSession = session;
  setActiveSessionId(session.id);
  commitActiveSession();
  return session;
}

function finishSession() {
  if (!activeSession) return;
  stopRestTimer();
  activeSession.completedAt = Date.now();
  commitActiveSession();
  setActiveSessionId(null);
  activeSession = null;
}

function discardActiveSession() {
  if (!activeSession) return;
  stopRestTimer();
  const sessions = getSessions().filter(s => s.id !== activeSession.id);
  saveSessions(sessions);
  setActiveSessionId(null);
  activeSession = null;
}

function nextDayNumber() {
  const sessions = getSessions().filter(s => s.completedAt);
  if (!sessions.length) return 1;
  return Math.max(...sessions.map(s => s.dayNumber || 0)) + 1;
}

// ─── Workout type picker flow ─────────────────────────────
function renderWorkoutTypeGrid() {
  const grid = document.getElementById('workout-type-grid');
  grid.innerHTML = WORKOUT_TYPES.map(t => `
    <button class="workout-type-card" data-type="${t.key}">
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

  if (typeKey === 'custom') {
    closeSheet();
    openSessionDetailsSheet();
    return;
  }

  const template = WORKOUT_TEMPLATES[typeKey] || [];
  document.getElementById('routine-preview-title').textContent =
    `${typeDef?.emoji || ''} ${typeDef?.label || typeKey} Day`;

  populateRoutinePreview(template);
  closeSheet();
  openSheet('sheet-routine-preview');
}

function populateRoutinePreview(template) {
  const list = document.getElementById('routine-preview-list');
  if (!template.length) {
    list.innerHTML = `<p style="color:var(--text-muted);font-size:14px;padding:16px 0;">No preset — you'll pick exercises after starting.</p>`;
    return;
  }

  list.innerHTML = template.map((ex, i) => {
    let lastInfo = '';
    if (ex.type === 'strength') {
      const lastSet = getLastSessionSet(ex.name, 0);
      if (lastSet && lastSet.weight != null) {
        const unit = lastSet.weightUnit === 'each_side' ? 'each side' : 'lbs';
        lastInfo = `${lastSet.weight} ${unit}`;
      }
    }
    return `
      <label class="routine-preview-row">
        <input type="checkbox" checked data-idx="${i}">
        <span>${escHtml(ex.name)}</span>
        ${lastInfo ? `<span class="ex-last">${escHtml(lastInfo)}</span>` : ''}
      </label>`;
  }).join('');
}

function openSessionDetailsSheet() {
  const nextDay = nextDayNumber();
  document.getElementById('new-session-day').value = nextDay;
  document.getElementById('new-session-date').value = todayISO();
  document.getElementById('new-session-note').value = '';
  openSheet('sheet-new-session');
  setTimeout(() => document.getElementById('new-session-day').focus(), 300);
}

function preloadTemplateExercises(template) {
  const checkboxes = document.querySelectorAll('#routine-preview-list input[type="checkbox"]');
  const checkedIndices = new Set();
  checkboxes.forEach(cb => {
    if (cb.checked) checkedIndices.add(parseInt(cb.dataset.idx));
  });

  const selected = template.filter((_, i) => checkedIndices.has(i));

  selected.forEach(ex => {
    if (ex.type === 'strength') {
      const lastSet = getLastSessionSet(ex.name, 0);
      const defaultUnit = lastSet?.weightUnit || 'lbs';
      activeSession.exercises.push({
        type: 'strength',
        name: ex.name,
        sets: [{ weight: null, weightUnit: defaultUnit, reps: null }],
      });
    } else if (ex.type === 'cardio') {
      activeSession.exercises.push({
        type: 'cardio',
        name: ex.name,
        incline: null, speed: null, duration: null, distance: null,
      });
    } else if (ex.type === 'recovery') {
      activeSession.exercises.push({
        type: 'recovery',
        name: ex.name,
        duration: null,
      });
    }
  });

  commitActiveSession();
}

// ─── History view ─────────────────────────────────────────
function renderHistory() {
  const list = document.getElementById('history-list');
  const sessions = getSessions()
    .filter(s => s.completedAt)
    .sort((a, b) => b.completedAt - a.completedAt);

  const banner = document.getElementById('resume-banner');
  const inProgress = loadActiveSession();
  if (inProgress) {
    banner.classList.add('visible');
    activeSession = inProgress;
  } else {
    banner.classList.remove('visible');
  }

  if (!sessions.length) {
    list.innerHTML = `
      <div class="empty-state" style="margin-top:40px;">
        <div class="icon">📋</div>
        <h3>No sessions yet</h3>
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

function getWorkoutTypeLabel(typeKey) {
  const t = WORKOUT_TYPES.find(t => t.key === typeKey);
  return t ? `${t.emoji} ${t.label}` : null;
}

function buildSessionCardHTML(sess) {
  const strengthExs = sess.exercises.filter(e => e.type === 'strength');
  const chips = strengthExs.slice(0, 4).map(e =>
    `<span class="exercise-chip">${e.name}</span>`
  ).join('');
  const more = strengthExs.length > 4
    ? `<span class="exercise-chip more">+${strengthExs.length - 4} more</span>`
    : '';

  const hasCardio = sess.exercises.some(e => e.type === 'cardio');
  const hasRecovery = sess.exercises.some(e => e.type === 'recovery');
  const extras = [
    hasCardio ? `<span class="exercise-chip">🏃 Cardio</span>` : '',
    hasRecovery ? `<span class="exercise-chip">♨️ Recovery</span>` : '',
  ].join('');

  const noteHtml = sess.note
    ? `<div class="session-note-preview">${escHtml(sess.note)}</div>`
    : '';

  const typeLabel = sess.workoutType ? getWorkoutTypeLabel(sess.workoutType) : null;
  const typeBadge = typeLabel
    ? `<span class="session-type-badge" style="display:inline-block;margin-top:4px;">${escHtml(typeLabel)}</span>`
    : '';

  return `
    <div class="card-top">
      <div class="session-meta-left">
        <div class="session-day">Day ${sess.dayNumber}</div>
        ${typeBadge}
        <div class="session-date">${formatDate(sess.date)}</div>
        ${noteHtml}
      </div>
    </div>
    <div class="session-exercises-summary">${chips}${more}${extras}</div>
  `;
}

function openSessionDetail(sess) {
  const content = document.getElementById('sheet-session-detail-content');
  content.innerHTML = buildSessionDetailHTML(sess);
  openSheet('sheet-session-detail');
}

function buildSessionDetailHTML(sess) {
  const typeLabel = sess.workoutType ? getWorkoutTypeLabel(sess.workoutType) : null;
  let html = `
    <div class="session-day" style="margin-bottom:4px;">Day ${sess.dayNumber}</div>
    ${typeLabel ? `<span class="session-type-badge" style="display:inline-block;margin-bottom:8px;">${escHtml(typeLabel)}</span>` : ''}
    <div style="font-size:17px;font-weight:700;letter-spacing:-0.02em;margin-bottom:4px;">${formatDate(sess.date)}</div>
  `;

  if (sess.note) {
    html += `<div style="font-size:15px;color:var(--text-secondary);margin-bottom:20px;line-height:1.6;font-style:italic;">"${escHtml(sess.note)}"</div>`;
  }

  const strength = sess.exercises.filter(e => e.type === 'strength');
  const cardio = sess.exercises.filter(e => e.type === 'cardio');
  const recovery = sess.exercises.filter(e => e.type === 'recovery');

  if (strength.length) {
    html += `<div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.07em;color:var(--text-muted);margin-bottom:10px;">Strength</div>`;
    strength.forEach(ex => {
      html += `<div class="detail-exercise-block">
        <div class="detail-exercise-name">
          <span>${escHtml(ex.name)}</span>
          <span style="color:var(--text-muted);font-size:12px;">${ex.sets.length} set${ex.sets.length !== 1 ? 's' : ''}</span>
        </div>`;
      ex.sets.forEach((set, i) => {
        const unit = set.weightUnit === 'each_side' ? 'each side' : 'lbs';
        html += `<div class="detail-set-row">
          <span style="color:var(--text-muted);">Set ${i + 1}</span>
          <span><span class="detail-set-weight">${set.weight} ${unit}</span> × ${set.reps} reps</span>
        </div>`;
      });
      html += `</div>`;
    });
  }

  if (cardio.length) {
    html += `<div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.07em;color:var(--text-muted);margin:12px 0 10px;">Cardio</div>`;
    cardio.forEach(ex => {
      const parts = [];
      if (ex.incline != null) parts.push(`Incline ${ex.incline}`);
      if (ex.speed != null) parts.push(`Speed ${ex.speed}`);
      if (ex.duration != null) parts.push(`${ex.duration} min`);
      if (ex.distance != null) parts.push(`${ex.distance} mi`);
      html += `<div class="detail-exercise-block">
        <div class="detail-exercise-name">${escHtml(ex.name)}</div>
        <div style="font-size:14px;color:var(--text-secondary);">${parts.join(' · ')}</div>
      </div>`;
    });
  }

  if (recovery.length) {
    html += `<div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.07em;color:var(--text-muted);margin:12px 0 10px;">Recovery</div>`;
    recovery.forEach(ex => {
      const dur = ex.duration ? ` · ${ex.duration} min` : '';
      html += `<div class="detail-exercise-block">
        <div class="detail-exercise-name">${escHtml(ex.name)}${dur}</div>
      </div>`;
    });
  }

  return html;
}

// ─── Log view ─────────────────────────────────────────────
function renderLogView() {
  const inProgress = loadActiveSession();
  if (inProgress) {
    activeSession = inProgress;
    showActiveSession();
  } else if (activeSession) {
    showActiveSession();
  } else {
    showNoSession();
  }
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
  if (typeLabel) {
    badge.textContent = typeLabel;
    badge.style.display = 'inline-block';
  } else {
    badge.style.display = 'none';
  }

  renderExerciseBlocks();
}

function renderExerciseBlocks() {
  const container = document.getElementById('exercise-blocks');
  container.innerHTML = '';
  (activeSession.exercises || []).forEach((ex, idx) => {
    container.appendChild(buildExerciseBlock(ex, idx));
  });
}

function buildExerciseBlock(ex, idx) {
  const block = document.createElement('div');
  block.className = 'exercise-block';
  block.dataset.idx = idx;

  if (ex.type === 'strength') {
    block.innerHTML = buildStrengthBlockHTML(ex, idx);
    block.querySelectorAll('.set-weight').forEach(input => {
      input.addEventListener('input', () => { syncSetFromInputs(block, idx); scheduleAutoSave(); });
    });
    block.querySelectorAll('.set-reps').forEach(input => {
      input.addEventListener('input', () => { syncSetFromInputs(block, idx); scheduleAutoSave(); });
    });
    block.querySelectorAll('.unit-toggle').forEach(btn => {
      btn.addEventListener('click', () => toggleUnit(btn, block, idx));
    });
    block.querySelector('.add-set-btn-el')?.addEventListener('click', () => addSet(idx));
    block.querySelector('.remove-set-btn')?.addEventListener('click', () => {
      if (ex.sets.length > 1) {
        ex.sets.pop();
        renderExerciseBlocks();
        scheduleAutoSave();
      }
    });
    block.querySelectorAll('.set-done-btn').forEach(btn => {
      btn.addEventListener('click', () => markSetDone(btn, idx));
    });
  } else if (ex.type === 'cardio') {
    block.innerHTML = buildCardioBlockHTML(ex, idx);
    block.querySelectorAll('input').forEach(input => {
      input.addEventListener('input', () => { syncCardioFromInputs(block, idx); scheduleAutoSave(); });
    });
  } else if (ex.type === 'recovery') {
    block.innerHTML = buildRecoveryBlockHTML(ex, idx);
    block.querySelector('.recovery-dur-input')?.addEventListener('input', e => {
      activeSession.exercises[idx].duration = parseNum(e.target.value);
      scheduleAutoSave();
    });
  }

  block.querySelector('.remove-exercise-btn')?.addEventListener('click', () => {
    activeSession.exercises.splice(idx, 1);
    renderExerciseBlocks();
    scheduleAutoSave();
  });

  return block;
}

function markSetDone(btn, exIdx) {
  const row = btn.closest('.set-row');
  const si = parseInt(row.dataset.set);
  const ex = activeSession?.exercises[exIdx];
  if (!ex || !ex.sets[si]) return;

  const isDone = !ex.sets[si].done;
  ex.sets[si].done = isDone;

  btn.classList.toggle('done', isDone);
  row.classList.toggle('done-state', isDone);

  if (isDone) {
    vibrateShort();
    startRestTimer(90);
    scheduleAutoSave();
  } else {
    stopRestTimer();
  }
}

function buildStrengthBlockHTML(ex, idx) {
  const setsHTML = ex.sets.map((set, si) => {
    const unitClass = set.weightUnit === 'each_side' ? 'each-side' : '';
    const unitLabel = set.weightUnit === 'each_side' ? 'each side' : 'lbs';
    const isDone = !!set.done;

    const lastSet = getLastSessionSet(ex.name, si);
    let weightPH = 'wt';
    let repsPH = 'reps';
    if (lastSet) {
      if (lastSet.weight != null) weightPH = String(lastSet.weight);
      if (lastSet.reps != null) repsPH = String(lastSet.reps);
    }

    const isPR = set.weight != null && checkExercisePR(ex.name, set.weight, set.weightUnit);
    const prBadge = isPR ? `<span class="pr-badge">PR</span>` : '';

    return `
      <div class="set-row${isDone ? ' done-state' : ''}" data-set="${si}">
        <span class="set-num">${si + 1}${prBadge}</span>
        <input class="set-weight" type="text" inputmode="decimal"
               value="${set.weight != null ? set.weight : ''}" placeholder="${escAttr(weightPH)}">
        <button class="unit-toggle ${unitClass}">${unitLabel}</button>
        <input class="set-reps" type="text" inputmode="numeric"
               value="${set.reps != null ? set.reps : ''}" placeholder="${escAttr(repsPH)}">
        <span class="reps-x">reps</span>
        <button class="set-done-btn${isDone ? ' done' : ''}" title="Mark done">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="14" height="14" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
        </button>
      </div>`;
  }).join('');

  return `
    <div class="exercise-block-header">
      <span>
        <span class="exercise-name">${escHtml(ex.name)}</span>
      </span>
      <button class="btn-icon danger remove-exercise-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="18" height="18"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div class="set-rows">${setsHTML}</div>
    <div class="add-set-btn">
      <button class="btn btn-ghost add-set-btn-el" style="font-size:13px;padding:6px 10px;min-height:32px;">+ Add Set</button>
      ${ex.sets.length > 1 ? `<button class="btn btn-danger remove-set-btn" style="font-size:13px;padding:6px 10px;min-height:32px;">− Remove</button>` : ''}
    </div>`;
}

function buildCardioBlockHTML(ex, idx) {
  return `
    <div class="exercise-block-header">
      <span class="exercise-name">${escHtml(ex.name)} <span class="exercise-type-badge">Cardio</span></span>
      <button class="btn-icon danger remove-exercise-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="18" height="18"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div class="inline-form">
      <div class="row-2">
        <div class="form-group">
          <label>Incline</label>
          <input class="cardio-field" data-field="incline" type="text" inputmode="decimal"
                 value="${ex.incline != null ? ex.incline : ''}" placeholder="—">
        </div>
        <div class="form-group">
          <label>Speed</label>
          <input class="cardio-field" data-field="speed" type="text" inputmode="decimal"
                 value="${ex.speed != null ? ex.speed : ''}" placeholder="—">
        </div>
        <div class="form-group">
          <label>Duration (min)</label>
          <input class="cardio-field" data-field="duration" type="text" inputmode="decimal"
                 value="${ex.duration != null ? ex.duration : ''}" placeholder="—">
        </div>
        <div class="form-group">
          <label>Distance (mi)</label>
          <input class="cardio-field" data-field="distance" type="text" inputmode="decimal"
                 value="${ex.distance != null ? ex.distance : ''}" placeholder="—">
        </div>
      </div>
    </div>`;
}

function buildRecoveryBlockHTML(ex, idx) {
  return `
    <div class="exercise-block-header">
      <span class="exercise-name">${escHtml(ex.name)} <span class="exercise-type-badge">Recovery</span></span>
      <button class="btn-icon danger remove-exercise-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="18" height="18"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div class="inline-form">
      <div class="form-group">
        <label>Duration (min)</label>
        <input class="recovery-dur-input" type="text" inputmode="numeric"
               value="${ex.duration != null ? ex.duration : ''}" placeholder="—">
      </div>
    </div>`;
}

function syncSetFromInputs(block, exIdx) {
  const ex = activeSession.exercises[exIdx];
  if (!ex || ex.type !== 'strength') return;
  block.querySelectorAll('.set-row').forEach((row, si) => {
    if (!ex.sets[si]) return;
    ex.sets[si].weight = parseNum(row.querySelector('.set-weight').value);
    ex.sets[si].reps = parseNum(row.querySelector('.set-reps').value);

    // Live PR badge update
    const setNum = row.querySelector('.set-num');
    if (setNum) {
      const isPR = ex.sets[si].weight != null &&
        checkExercisePR(ex.name, ex.sets[si].weight, ex.sets[si].weightUnit);
      const existing = setNum.querySelector('.pr-badge');
      if (isPR && !existing) {
        setNum.insertAdjacentHTML('beforeend', '<span class="pr-badge">PR</span>');
      } else if (!isPR && existing) {
        existing.remove();
      }
    }
  });
}

function syncCardioFromInputs(block, exIdx) {
  const ex = activeSession.exercises[exIdx];
  if (!ex || ex.type !== 'cardio') return;
  block.querySelectorAll('.cardio-field').forEach(input => {
    ex[input.dataset.field] = parseNum(input.value);
  });
}

function toggleUnit(btn, block, exIdx) {
  const row = btn.closest('.set-row');
  const si = parseInt(row.dataset.set);
  const ex = activeSession.exercises[exIdx];
  if (!ex || !ex.sets[si]) return;
  const current = ex.sets[si].weightUnit;
  const next = current === 'lbs' ? 'each_side' : 'lbs';
  ex.sets[si].weightUnit = next;
  btn.textContent = next === 'each_side' ? 'each side' : 'lbs';
  btn.classList.toggle('each-side', next === 'each_side');
  scheduleAutoSave();
}

function addSet(exIdx) {
  const ex = activeSession.exercises[exIdx];
  if (!ex || ex.type !== 'strength') return;
  const last = ex.sets[ex.sets.length - 1] || { weight: null, weightUnit: 'lbs', reps: null };
  ex.sets.push({ weight: last.weight, weightUnit: last.weightUnit, reps: null });
  renderExerciseBlocks();
  scheduleAutoSave();
  setTimeout(() => {
    const blocks = document.querySelectorAll('.exercise-block');
    const targetBlock = blocks[exIdx];
    if (!targetBlock) return;
    const rows = targetBlock.querySelectorAll('.set-row');
    const lastRow = rows[rows.length - 1];
    lastRow?.querySelector('.set-reps')?.focus();
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
  const groups = getExerciseGroups();
  const q = query.toLowerCase().trim();

  const grouped = {};
  groups.forEach(ex => {
    const name = ex.name;
    if (q && !name.toLowerCase().includes(q)) return;
    const g = ex.group || 'Custom';
    if (!grouped[g]) grouped[g] = [];
    grouped[g].push(name);
  });

  const storedNames = getAllExerciseNames();
  const defaultNames = DEFAULT_EXERCISES.map(e => e.name.toLowerCase());
  storedNames.forEach(name => {
    if (!defaultNames.includes(name.toLowerCase())) {
      if (!q || name.toLowerCase().includes(q)) {
        if (!grouped['Custom']) grouped['Custom'] = [];
        if (!grouped['Custom'].includes(name)) grouped['Custom'].push(name);
      }
    }
  });

  let html = '';
  const groupOrder = ['Chest','Shoulders','Triceps','Back','Biceps','Legs','Abs','Custom'];
  groupOrder.forEach(g => {
    if (!grouped[g] || !grouped[g].length) return;
    html += `<div class="exercise-group-header">${g}</div>`;
    grouped[g].forEach(name => {
      html += `<div class="exercise-pick-row" data-name="${escAttr(name)}">
        ${escHtml(name)}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
      </div>`;
    });
  });

  if (!html) {
    html = `
      <div class="exercise-pick-row" id="add-custom-exercise-row" data-name="${escAttr(query)}">
        Add "${escHtml(query)}"
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      </div>`;
  }

  container.innerHTML = html;
  container.querySelectorAll('.exercise-pick-row').forEach(row => {
    row.addEventListener('click', () => {
      const name = row.dataset.name;
      if (name) {
        closeSheet();
        if (pickerCallback) pickerCallback(name);
      }
    });
  });
}

// ─── Add exercise to session ──────────────────────────────
function addStrengthExercise(name) {
  if (!activeSession) return;
  const lastSet = getLastSessionSet(name, 0);
  const defaultUnit = lastSet?.weightUnit || 'lbs';
  activeSession.exercises.push({
    type: 'strength',
    name,
    sets: [{ weight: null, weightUnit: defaultUnit, reps: null }],
  });
  renderExerciseBlocks();
  scheduleAutoSave();
  setTimeout(() => {
    const blocks = document.querySelectorAll('.exercise-block');
    blocks[blocks.length - 1]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 50);
}

function addCardioExercise(name, incline, speed, duration, distance) {
  if (!activeSession) return;
  activeSession.exercises.push({
    type: 'cardio',
    name,
    incline: parseNum(incline),
    speed: parseNum(speed),
    duration: parseNum(duration),
    distance: parseNum(distance),
  });
  renderExerciseBlocks();
  scheduleAutoSave();
}

function addRecoveryExercise(name, duration) {
  if (!activeSession) return;
  activeSession.exercises.push({
    type: 'recovery',
    name,
    duration: parseNum(duration),
  });
  renderExerciseBlocks();
  scheduleAutoSave();
}

// ─── Progress view ────────────────────────────────────────
let progressChart = null;
let selectedExercise = null;

function renderProgress() {
  const sessions = getSessions().filter(s => s.completedAt);
  const exerciseNames = getExercisesWithData(sessions);

  const chipsContainer = document.getElementById('progress-exercise-chips');
  chipsContainer.innerHTML = '';

  if (!exerciseNames.length) {
    document.getElementById('chart-empty').style.display = 'flex';
    document.getElementById('chart-stats').innerHTML = '';
    if (progressChart) { progressChart.destroy(); progressChart = null; }
    return;
  }

  if (!selectedExercise || !exerciseNames.includes(selectedExercise)) {
    selectedExercise = exerciseNames[0];
  }

  exerciseNames.forEach(name => {
    const chip = document.createElement('button');
    chip.className = 'exercise-pick-chip' + (name === selectedExercise ? ' active' : '');
    chip.textContent = name;
    chip.addEventListener('click', () => {
      selectedExercise = name;
      renderProgress();
    });
    chipsContainer.appendChild(chip);
  });

  renderExerciseChart(selectedExercise, sessions);
}

function getExercisesWithData(sessions) {
  const names = new Set();
  sessions.forEach(sess => {
    sess.exercises.forEach(ex => {
      if (ex.type === 'strength' && ex.sets && ex.sets.length) {
        names.add(ex.name);
      }
    });
  });
  return Array.from(names).sort();
}

function renderExerciseChart(exerciseName, sessions) {
  const points = buildChartData(exerciseName, sessions);
  const chartEmpty = document.getElementById('chart-empty');
  const statsEl = document.getElementById('chart-stats');
  const logLabel = document.getElementById('progress-log-label');
  const logList = document.getElementById('progress-session-list');

  if (!points.length) {
    chartEmpty.style.display = 'flex';
    if (progressChart) { progressChart.destroy(); progressChart = null; }
    statsEl.innerHTML = '';
    logLabel.style.display = 'none';
    logList.innerHTML = '';
    return;
  }

  chartEmpty.style.display = 'none';

  const weights = points.map(p => p.y);
  const pr = Math.max(...weights);
  const recent = weights[weights.length - 1];
  const sessCount = points.length;

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
      <div class="stat-value">${sessCount}</div>
      <div class="stat-label">Sessions</div>
    </div>`;

  const ctx = document.getElementById('progress-chart').getContext('2d');
  if (progressChart) { progressChart.destroy(); progressChart = null; }

  try {
    progressChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: points.map(p => p.label),
        datasets: [{
          data: points.map(p => p.y),
          borderColor: '#D97757',
          backgroundColor: 'rgba(217, 119, 87, 0.08)',
          pointBackgroundColor: '#D97757',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7,
          tension: 0.3,
          fill: true,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#141413',
            titleColor: '#faf9f5',
            bodyColor: '#faf9f5',
            padding: 10,
            callbacks: {
              label: ctx => `${ctx.raw} lbs`,
            },
          },
        },
        scales: {
          x: {
            ticks: { color: '#8c8c8a', font: { size: 11, family: 'Inter' } },
            grid: { color: '#e5e4df' },
          },
          y: {
            ticks: { color: '#8c8c8a', font: { size: 11, family: 'Inter' } },
            grid: { color: '#e5e4df' },
            title: {
              display: true,
              text: 'lbs (total)',
              color: '#8c8c8a',
              font: { size: 11, family: 'Inter' },
            },
          },
        },
      },
    });
  } catch (err) {
    chartEmpty.style.display = 'flex';
    chartEmpty.innerHTML = `<span>Charts unavailable — connect to the internet once to load.</span>`;
  }

  logLabel.style.display = 'block';
  logList.innerHTML = points.map(p => `
    <div class="progress-session-row">
      <span style="color:var(--text-muted);font-size:13px;">${p.label}</span>
      <span style="font-weight:600;">${p.y} lbs</span>
    </div>`).join('');
}

function buildChartData(exerciseName, sessions) {
  const sorted = [...sessions].sort((a, b) => a.date.localeCompare(b.date));
  const points = [];

  sorted.forEach(sess => {
    const match = sess.exercises.find(e =>
      e.type === 'strength' &&
      e.name.toLowerCase() === exerciseName.toLowerCase()
    );
    if (!match || !match.sets.length) return;

    const maxW = Math.max(...match.sets.map(s =>
      normalizeWeight(s.weight, s.weightUnit)
    ));

    if (maxW > 0) {
      const d = new Date(sess.date + 'T12:00:00');
      points.push({
        label: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        y: maxW,
      });
    }
  });

  return points;
}

// ─── Settings view ────────────────────────────────────────
function renderSettings() {
  const listEl = document.getElementById('settings-exercise-list');
  const exercises = getAllExerciseNames();

  listEl.innerHTML = exercises.map((name, i) => `
    <div class="exercise-list-row">
      <span>${escHtml(name)}</span>
      <button class="btn-icon danger" data-idx="${i}" title="Remove">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>`).join('');

  listEl.querySelectorAll('.btn-icon.danger').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.idx);
      const list = getAllExerciseNames();
      list.splice(idx, 1);
      saveExercises(list);
      renderSettings();
      toast('Exercise removed');
    });
  });
}

// ─── Helpers ──────────────────────────────────────────────
function escHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escAttr(str) {
  return String(str ?? '').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// ─── Event bindings ───────────────────────────────────────
function bindEvents() {
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => showView(tab.dataset.view));
  });

  document.getElementById('backdrop').addEventListener('click', closeSheet);

  // ── New session: open type picker first ──
  function handleNewSession() {
    renderWorkoutTypeGrid();
    openSheet('sheet-type-picker');
  }

  document.getElementById('btn-new-session').addEventListener('click', handleNewSession);
  document.getElementById('btn-new-session-log').addEventListener('click', handleNewSession);

  // ── Routine preview back button ──
  document.getElementById('btn-routine-back').addEventListener('click', () => {
    closeSheet();
    renderWorkoutTypeGrid();
    openSheet('sheet-type-picker');
  });

  // ── Routine continue → open session details sheet ──
  document.getElementById('btn-routine-continue').addEventListener('click', () => {
    closeSheet();
    openSessionDetailsSheet();
  });

  // ── Start session ──
  document.getElementById('btn-start-session').addEventListener('click', () => {
    const day = document.getElementById('new-session-day').value;
    const date = document.getElementById('new-session-date').value;
    const note = document.getElementById('new-session-note').value.trim();
    if (!day) { toast('Enter a day number'); return; }
    closeSheet();

    startNewSession(day, date, note, pendingWorkoutType);

    const template = pendingWorkoutType && pendingWorkoutType !== 'custom'
      ? WORKOUT_TEMPLATES[pendingWorkoutType] || []
      : [];

    if (template.length) {
      preloadTemplateExercises(template);
    }

    pendingWorkoutType = null;
    showView('log');
  });

  // ── Cancel / resume session ──
  document.getElementById('btn-cancel-session').addEventListener('click', () => {
    if (!confirm('Discard this session?')) return;
    discardActiveSession();
    showNoSession();
    toast('Session discarded');
  });

  document.getElementById('btn-finish-session').addEventListener('click', () => {
    if (!activeSession) return;
    if (!activeSession.exercises.length) { toast('Add at least one exercise'); return; }
    finishSession();
    showNoSession();
    showView('history');
    toast('Session saved!');
  });

  // ── Resume / discard from banner ──
  document.getElementById('btn-resume-session').addEventListener('click', () => {
    showView('log');
  });

  document.getElementById('btn-discard-session').addEventListener('click', () => {
    if (!confirm('Discard the in-progress session?')) return;
    discardActiveSession();
    document.getElementById('resume-banner').classList.remove('visible');
    renderHistory();
    toast('Session discarded');
  });

  // ── Session note ──
  document.getElementById('session-note').addEventListener('input', e => {
    if (activeSession) {
      activeSession.note = e.target.value;
      scheduleAutoSave();
    }
  });

  // ── Add strength ──
  document.getElementById('btn-add-strength').addEventListener('click', () => {
    openExercisePicker(name => addStrengthExercise(name));
  });

  // ── Exercise search ──
  document.getElementById('exercise-search-input').addEventListener('input', e => {
    renderExercisePickList(e.target.value);
  });

  // ── Add cardio ──
  document.getElementById('btn-add-cardio').addEventListener('click', () => {
    const sel = document.getElementById('cardio-machine');
    sel.innerHTML = '<option value="">Select machine…</option>';
    getCardioMachines().forEach(m => {
      const opt = document.createElement('option');
      opt.value = m;
      opt.textContent = m;
      sel.appendChild(opt);
    });
    ['cardio-incline','cardio-speed','cardio-duration','cardio-distance'].forEach(id => {
      document.getElementById(id).value = '';
    });
    openSheet('sheet-cardio');
  });

  document.getElementById('btn-add-cardio-confirm').addEventListener('click', () => {
    const name = document.getElementById('cardio-machine').value;
    if (!name) { toast('Select a machine'); return; }
    addCardioExercise(
      name,
      document.getElementById('cardio-incline').value,
      document.getElementById('cardio-speed').value,
      document.getElementById('cardio-duration').value,
      document.getElementById('cardio-distance').value,
    );
    closeSheet();
  });

  // ── Add recovery ──
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

  // ── Rest timer skip ──
  document.getElementById('btn-skip-rest').addEventListener('click', () => {
    stopRestTimer();
  });

  // ── Settings: Export ──
  document.getElementById('btn-export').addEventListener('click', () => {
    const data = {
      exportedAt: new Date().toISOString(),
      sessions: getSessions(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `domino-workouts-${todayISO()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast('Exported!');
  });

  // ── Settings: Clear data ──
  document.getElementById('btn-clear-data').addEventListener('click', () => {
    if (!confirm('Delete ALL workout data? This cannot be undone.')) return;
    if (!confirm('Are you sure? All sessions will be permanently deleted.')) return;
    [LS.SESSIONS, LS.ACTIVE].forEach(k => localStorage.removeItem(k));
    activeSession = null;
    toast('All data cleared');
    renderSettings();
    renderHistory();
  });

  // ── Settings: Add custom exercise ──
  document.getElementById('btn-add-custom-exercise').addEventListener('click', () => {
    const name = prompt('Exercise name:');
    if (!name || !name.trim()) return;
    const list = getAllExerciseNames();
    if (list.some(e => e.toLowerCase() === name.trim().toLowerCase())) {
      toast('Already in list');
      return;
    }
    list.push(name.trim());
    saveExercises(list);
    renderSettings();
    toast('Exercise added');
  });
}

// ─── Service Worker ───────────────────────────────────────
function registerSW() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    });
  }
}

// ─── Boot ─────────────────────────────────────────────────
function init() {
  seedDefaults();
  bindEvents();
  registerSW();

  const inProgress = loadActiveSession();
  if (inProgress) {
    activeSession = inProgress;
  }

  showView('history');
}

document.addEventListener('DOMContentLoaded', init);
