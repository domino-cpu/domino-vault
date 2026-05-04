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

const DEFAULT_EXERCISES = [
  // Chest
  { group: 'Chest', name: 'Bench Press' },
  { group: 'Chest', name: 'Incline Press' },
  { group: 'Chest', name: 'Decline Press' },
  { group: 'Chest', name: 'Pectoral Fly' },
  { group: 'Chest', name: 'Cable Fly' },
  { group: 'Chest', name: 'Push-Up' },
  // Shoulders
  { group: 'Shoulders', name: 'Shoulder Press' },
  { group: 'Shoulders', name: 'ISO Lateral Shoulder Press' },
  { group: 'Shoulders', name: 'Lateral Raise' },
  { group: 'Shoulders', name: 'Front Raise' },
  { group: 'Shoulders', name: 'Face Pull' },
  // Triceps
  { group: 'Triceps', name: 'Tricep Pushdown' },
  { group: 'Triceps', name: 'Skull Crushers' },
  { group: 'Triceps', name: 'Overhead Tricep Extension' },
  { group: 'Triceps', name: 'Dips' },
  // Back
  { group: 'Back', name: 'Lat Pull-Down' },
  { group: 'Back', name: 'ISO Lateral Front Pull-Down' },
  { group: 'Back', name: 'Cable Row' },
  { group: 'Back', name: 'Seated Row' },
  { group: 'Back', name: 'T-Bar Row' },
  { group: 'Back', name: 'Pull-Up' },
  { group: 'Back', name: 'Deadlift' },
  // Biceps
  { group: 'Biceps', name: 'Bicep Curl' },
  { group: 'Biceps', name: 'Hammer Curl' },
  { group: 'Biceps', name: 'Incline Dumbbell Curl' },
  { group: 'Biceps', name: 'Preacher Curl' },
  // Legs
  { group: 'Legs', name: 'Squat' },
  { group: 'Legs', name: 'Leg Press' },
  { group: 'Legs', name: 'Romanian Deadlift' },
  { group: 'Legs', name: 'Leg Curl' },
  { group: 'Legs', name: 'Leg Extension' },
  { group: 'Legs', name: 'Calf Raise' },
  { group: 'Legs', name: 'Lunges' },
  { group: 'Legs', name: 'Hip Thrust' },
  { group: 'Legs', name: 'Sumo Squat' },
  // Abs
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
    // stored is just names — map to flat group "Custom"
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
let activeSession = null;  // in-memory working copy

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

function startNewSession(dayNumber, date, note) {
  const session = {
    id: uid(),
    dayNumber: parseInt(dayNumber) || 1,
    date: date || todayISO(),
    note: note || '',
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
  activeSession.completedAt = Date.now();
  commitActiveSession();
  setActiveSessionId(null);
  activeSession = null;
}

function discardActiveSession() {
  if (!activeSession) return;
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

  return `
    <div class="card-top">
      <div class="session-meta-left">
        <div class="session-day">Day ${sess.dayNumber}</div>
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
  let html = `
    <div class="session-day" style="margin-bottom:4px;">Day ${sess.dayNumber}</div>
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
    // bind set inputs
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

function buildStrengthBlockHTML(ex, idx) {
  const setsHTML = ex.sets.map((set, si) => {
    const unitClass = set.weightUnit === 'each_side' ? 'each-side' : '';
    const unitLabel = set.weightUnit === 'each_side' ? 'each side' : 'lbs';
    return `
      <div class="set-row" data-set="${si}">
        <span class="set-num">${si + 1}</span>
        <input class="set-weight" type="text" inputmode="decimal"
               value="${set.weight != null ? set.weight : ''}" placeholder="wt">
        <button class="unit-toggle ${unitClass}">${unitLabel}</button>
        <input class="set-reps" type="text" inputmode="numeric"
               value="${set.reps != null ? set.reps : ''}" placeholder="reps">
        <span class="reps-x">reps</span>
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
  // focus new reps input
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

  // group by muscle group
  const grouped = {};
  groups.forEach(ex => {
    const name = ex.name;
    if (q && !name.toLowerCase().includes(q)) return;
    const g = ex.group || 'Custom';
    if (!grouped[g]) grouped[g] = [];
    grouped[g].push(name);
  });

  // also add custom exercises from stored list that aren't in defaults
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
  activeSession.exercises.push({
    type: 'strength',
    name,
    sets: [{ weight: null, weightUnit: 'lbs', reps: null }],
  });
  renderExerciseBlocks();
  scheduleAutoSave();
  // scroll to bottom
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

  // Stats
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

  // Chart
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

  // Session log table
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

// ─── Helper ───────────────────────────────────────────────
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
  // Nav
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => showView(tab.dataset.view));
  });

  // Backdrop close
  document.getElementById('backdrop').addEventListener('click', closeSheet);

  // ── New session ──
  function handleNewSession() {
    const nextDay = nextDayNumber();
    document.getElementById('new-session-day').value = nextDay;
    document.getElementById('new-session-date').value = todayISO();
    document.getElementById('new-session-note').value = '';
    openSheet('sheet-new-session');
    setTimeout(() => document.getElementById('new-session-day').focus(), 300);
  }

  document.getElementById('btn-new-session').addEventListener('click', handleNewSession);
  document.getElementById('btn-new-session-log').addEventListener('click', handleNewSession);

  document.getElementById('btn-start-session').addEventListener('click', () => {
    const day = document.getElementById('new-session-day').value;
    const date = document.getElementById('new-session-date').value;
    const note = document.getElementById('new-session-note').value.trim();
    if (!day) { toast('Enter a day number'); return; }
    closeSheet();
    startNewSession(day, date, note);
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

  // Check for in-progress session on load
  const inProgress = loadActiveSession();
  if (inProgress) {
    activeSession = inProgress;
  }

  showView('history');
}

document.addEventListener('DOMContentLoaded', init);
