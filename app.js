/* ══════════════════════════════════════════════════════
   DOMINO Workout Tracker — app.js
   ══════════════════════════════════════════════════════ */

const APP_VERSION = 29;

const LS = {
  SESSIONS:  'domino_workout_sessions',
  ACTIVE:    'domino_workout_active_session_id',
  EXERCISES: 'domino_workout_exercises',
  CARDIO:    'domino_workout_cardio_machines',
  THEME:     'domino_workout_theme',
  NAME:      'domino_workout_name',
  GOALS:          'domino_workout_goals',
  WEIGHT_LOG:     'domino_workout_weight_log',
  PROFILE:        'domino_workout_profile',
  EXERCISE_GROUPS:'domino_workout_exercise_groups',
};

const WORKOUT_TYPES = [
  { key: 'chest',        label: 'Chest',        emoji: '🫸' },
  { key: 'back',         label: 'Back',         emoji: '🦾' },
  { key: 'push',         label: 'Push',         emoji: '🤜' },
  { key: 'pull',         label: 'Pull',         emoji: '🤛' },
  { key: 'shoulders',    label: 'Shoulders',    emoji: '🏋️' },
  { key: 'arms',         label: 'Arms',         emoji: '💪' },
  { key: 'legs',         label: 'Legs',         emoji: '🦵' },
  { key: 'abs',          label: 'Abs',          emoji: '🔥' },
  { key: 'calisthenics', label: 'Calisthenics', emoji: '🤸' },
  { key: 'fullbody',     label: 'Full Body',    emoji: '⚡' },
  { key: 'conditioning', label: 'Conditioning', emoji: '🏃' },
  { key: 'recovery',     label: 'Recovery',     emoji: '♨️' },
  { key: 'custom',       label: 'Custom',       emoji: '✏️' },
];

const WORKOUT_TEMPLATES = {
  chest: [
    { type:'strength', name:'Bench Press' },
    { type:'strength', name:'Incline Dumbbell Press' },
    { type:'strength', name:'Incline Press' },
    { type:'strength', name:'Pectoral Fly' },
    { type:'strength', name:'Cable Fly' },
    { type:'strength', name:'Chest Dip' },
  ],
  back: [
    { type:'strength', name:'Deadlift' },
    { type:'strength', name:'Pull-Up' },
    { type:'strength', name:'Lat Pull-Down' },
    { type:'strength', name:'Seated Cable Row' },
    { type:'strength', name:'Barbell Row' },
    { type:'strength', name:'Single-Arm Dumbbell Row' },
  ],
  push: [
    { type:'strength', name:'Bench Press' },
    { type:'strength', name:'Overhead Press' },
    { type:'strength', name:'Lateral Raise' },
    { type:'strength', name:'Tricep Pushdown' },
    { type:'strength', name:'Incline Dumbbell Press' },
    { type:'strength', name:'Cable Fly' },
  ],
  pull: [
    { type:'strength', name:'Pull-Up' },
    { type:'strength', name:'Barbell Row' },
    { type:'strength', name:'Lat Pull-Down' },
    { type:'strength', name:'Seated Cable Row' },
    { type:'strength', name:'Face Pull' },
    { type:'strength', name:'Barbell Curl' },
  ],
  shoulders: [
    { type:'strength', name:'Overhead Press' },
    { type:'strength', name:'Lateral Raise' },
    { type:'strength', name:'Front Raise' },
    { type:'strength', name:'Face Pull' },
    { type:'strength', name:'Arnold Press' },
    { type:'strength', name:'Rear Delt Fly' },
  ],
  arms: [
    { type:'strength', name:'Barbell Curl' },
    { type:'strength', name:'Hammer Curl' },
    { type:'strength', name:'Tricep Pushdown' },
    { type:'strength', name:'Skull Crusher' },
    { type:'strength', name:'Preacher Curl' },
    { type:'strength', name:'Overhead Tricep Extension' },
  ],
  legs: [
    { type:'strength', name:'Squat' },
    { type:'strength', name:'Romanian Deadlift' },
    { type:'strength', name:'Leg Press' },
    { type:'strength', name:'Leg Curl' },
    { type:'strength', name:'Leg Extension' },
    { type:'strength', name:'Calf Raise' },
  ],
  abs: [
    { type:'strength', name:'Plank' },
    { type:'strength', name:'Cable Crunch' },
    { type:'strength', name:'Hanging Leg Raise' },
    { type:'strength', name:'Ab Wheel' },
    { type:'strength', name:'Russian Twist' },
  ],
  calisthenics: [
    { type:'strength', name:'Pull-Up' },
    { type:'strength', name:'Push-Up' },
    { type:'strength', name:'Dip' },
    { type:'strength', name:'Pistol Squat' },
    { type:'strength', name:'Muscle-Up' },
    { type:'strength', name:'L-Sit' },
  ],
  fullbody: [
    { type:'strength', name:'Deadlift' },
    { type:'strength', name:'Squat' },
    { type:'strength', name:'Bench Press' },
    { type:'strength', name:'Pull-Up' },
    { type:'strength', name:'Overhead Press' },
  ],
  conditioning: [
    { type:'cardio', name:'Treadmill' },
    { type:'cardio', name:'Stair Climber' },
    { type:'cardio', name:'Rowing Machine' },
  ],
  recovery: [
    { type:'recovery', name:'Sauna' },
    { type:'recovery', name:'Stretching' },
    { type:'recovery', name:'Foam Roll' },
  ],
  custom: [],
};

const DEFAULT_EXERCISES = [
  { name:'Bench Press',              category:'Chest' },
  { name:'Incline Press',            category:'Chest' },
  { name:'Incline Dumbbell Press',   category:'Chest' },
  { name:'Pectoral Fly',             category:'Chest' },
  { name:'Cable Fly',                category:'Chest' },
  { name:'Chest Dip',                category:'Chest' },
  { name:'Overhead Press',           category:'Shoulders' },
  { name:'Lateral Raise',            category:'Shoulders' },
  { name:'Front Raise',              category:'Shoulders' },
  { name:'Face Pull',                category:'Shoulders' },
  { name:'Arnold Press',             category:'Shoulders' },
  { name:'Rear Delt Fly',            category:'Shoulders' },
  { name:'Tricep Pushdown',          category:'Triceps' },
  { name:'Skull Crusher',            category:'Triceps' },
  { name:'Overhead Tricep Extension',category:'Triceps' },
  { name:'Close-Grip Bench Press',   category:'Triceps' },
  { name:'Deadlift',                 category:'Back' },
  { name:'Pull-Up',                  category:'Back' },
  { name:'Lat Pull-Down',            category:'Back' },
  { name:'Seated Cable Row',         category:'Back' },
  { name:'Barbell Row',              category:'Back' },
  { name:'Single-Arm Dumbbell Row',  category:'Back' },
  { name:'T-Bar Row',                category:'Back' },
  { name:'Barbell Curl',             category:'Biceps' },
  { name:'Hammer Curl',              category:'Biceps' },
  { name:'Preacher Curl',            category:'Biceps' },
  { name:'Incline Dumbbell Curl',    category:'Biceps' },
  { name:'Cable Curl',               category:'Biceps' },
  { name:'Squat',                    category:'Legs' },
  { name:'Romanian Deadlift',        category:'Legs' },
  { name:'Leg Press',                category:'Legs' },
  { name:'Leg Curl',                 category:'Legs' },
  { name:'Leg Extension',            category:'Legs' },
  { name:'Calf Raise',               category:'Legs' },
  { name:'Hip Thrust',               category:'Legs' },
  { name:'Bulgarian Split Squat',    category:'Legs' },
  { name:'Plank',                    category:'Abs' },
  { name:'Cable Crunch',             category:'Abs' },
  { name:'Hanging Leg Raise',        category:'Abs' },
  { name:'Ab Wheel',                 category:'Abs' },
  { name:'Russian Twist',            category:'Abs' },
  { name:'Dip',                      category:'Calisthenics' },
  { name:'Push-Up',                  category:'Calisthenics' },
  { name:'Muscle-Up',                category:'Calisthenics' },
  { name:'Pistol Squat',             category:'Calisthenics' },
  { name:'L-Sit',                    category:'Calisthenics' },
];

const DEFAULT_CARDIO_MACHINES = [
  'Treadmill','Stair Climber','Elliptical','Rowing Machine',
  'Stationary Bike','Arc Trainer','Ski Erg',
];

// ─── State ───────────────────────────────────────────────────────
let sessions       = [];
let activeSession  = null;
let exercises      = [];
let cardioMachines = [];
let progressChart  = null;
let bodyWeightChart = null;
let activityChart   = null;
let durationTimer  = null;
let restTimer      = null;
let restSecondsLeft = 0;
let restDefault    = 90;
let plateBarWeight = 45;
let progressExercise = null;
let editingSessionId = null;
let routineExercises = [];

// ─── Storage helpers ─────────────────────────────────────────────
const load  = k => { try { return JSON.parse(localStorage.getItem(k)) } catch { return null } };
const save  = (k,v) => localStorage.setItem(k, JSON.stringify(v));

// ─── Boot ────────────────────────────────────────────────────────
function init() {
  sessions       = load(LS.SESSIONS)  || [];
  exercises      = load(LS.EXERCISES) || [...DEFAULT_EXERCISES];
  cardioMachines = load(LS.CARDIO)    || [...DEFAULT_CARDIO_MACHINES];

  const theme = load(LS.THEME) || 'dark';
  document.documentElement.setAttribute('data-theme', theme);
  updateThemeButton(theme);

  const name = load(LS.NAME) || '';
  if (name) {
    const greet = document.getElementById('user-greeting');
    if (greet) { greet.textContent = name + "'s Gym"; greet.style.display = 'block'; }
  }

  // Populate settings name
  const nameInput = document.getElementById('settings-user-name');
  if (nameInput) nameInput.value = name;

  // Load profile
  const profile = load(LS.PROFILE) || {};
  const ageEl = document.getElementById('profile-age');
  const sexEl = document.getElementById('profile-sex');
  const htFt  = document.getElementById('profile-height-ft');
  const htIn  = document.getElementById('profile-height-in');
  const cwEl  = document.getElementById('profile-current-weight');
  if (ageEl) ageEl.value = profile.age || '';
  if (sexEl) sexEl.value = profile.sex || '';
  if (htFt)  htFt.value  = profile.heightFt || '';
  if (htIn)  htIn.value  = profile.heightIn || '';
  if (cwEl)  cwEl.value  = profile.currentWeight || '';

  // Load goals
  const goals = load(LS.GOALS) || {};
  const gtEl  = document.getElementById('goal-type-select');
  const gwEl  = document.getElementById('goal-weight-input');
  const gsEl  = document.getElementById('goal-sessions-input');
  if (gtEl) gtEl.value = goals.type     || 'muscle';
  if (gwEl) gwEl.value = goals.weight   || '';
  if (gsEl) gsEl.value = goals.sessions || '';

  // Resume banner
  const activeId = load(LS.ACTIVE);
  if (activeId) {
    activeSession = sessions.find(s => s.id === activeId) || null;
    if (activeSession) {
      document.getElementById('resume-banner').classList.add('visible');
    }
  }

  renderHistory();
  setupNav();
  setupSheets();
  setupLog();
  setupProgress();
  setupSettings();
  setupVersionCheck();

  document.getElementById('app-version-label').textContent = 'v' + APP_VERSION;
}

// ─── Version check ───────────────────────────────────────────────
function setupVersionCheck() {
  const check = () => {
    fetch('version.json?t=' + Date.now())
      .then(r => r.json())
      .then(data => {
        if (data.v && data.v > APP_VERSION) showToast('Update available — reload to get v' + data.v);
      })
      .catch(() => {});
  };
  check();
  setInterval(check, 5 * 60 * 1000);
}

// ─── Nav ─────────────────────────────────────────────────────────
function setupNav() {
  document.querySelectorAll('.nav-tab').forEach(btn => {
    btn.addEventListener('click', () => showView(btn.dataset.view));
  });
}

function showView(name) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById('view-' + name).classList.add('active');
  document.querySelectorAll('.nav-tab').forEach(b => {
    b.classList.toggle('active', b.dataset.view === name);
  });
  if (name === 'progress') refreshProgress();
}

// ─── Toast ───────────────────────────────────────────────────────
let toastTimer;
function showToast(msg, dur = 2400) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), dur);
}

// ─── Sheet helpers ───────────────────────────────────────────────
function openSheet(id) {
  document.getElementById('backdrop').classList.add('open');
  document.getElementById(id).classList.add('open');
}
function closeSheet(id) {
  document.getElementById(id).classList.remove('open');
  const anyOpen = document.querySelectorAll('.sheet.open').length > 0;
  if (!anyOpen) document.getElementById('backdrop').classList.remove('open');
}
function closeAllSheets() {
  document.querySelectorAll('.sheet.open').forEach(s => s.classList.remove('open'));
  document.getElementById('backdrop').classList.remove('open');
}

function setupSheets() {
  document.getElementById('backdrop').addEventListener('click', closeAllSheets);
}

// ─── History ─────────────────────────────────────────────────────
function renderHistory() {
  const list = document.getElementById('history-list');
  if (!sessions.length) {
    list.innerHTML = '<div class="empty-state"><div class="icon">📋</div><h3>No sessions yet</h3><p>Tap New Session to start logging your workouts</p></div>';
    return;
  }
  const sorted = [...sessions].sort((a,b) => b.date.localeCompare(a.date) || b.day - a.day);
  list.innerHTML = sorted.map(s => sessionCard(s)).join('');
  list.querySelectorAll('.session-card').forEach(card => {
    card.addEventListener('click', () => openSessionDetail(card.dataset.id));
  });
}

function sessionCard(s) {
  const d = new Date(s.date + 'T12:00:00');
  const dayNum  = d.getDate();
  const dayName = d.toLocaleDateString('en-US', { weekday:'short' }).toUpperCase();
  const mo      = d.toLocaleDateString('en-US', { month:'short' });
  const yr      = d.getFullYear();

  const strength = (s.exercises || []).filter(e => e.type === 'strength');
  const totalSets = strength.reduce((n, e) => n + (e.sets || []).length, 0);
  const cardio    = (s.exercises || []).filter(e => e.type === 'cardio');
  const recovery  = (s.exercises || []).filter(e => e.type === 'recovery');

  const allEx = (s.exercises || []);
  const chips = allEx.slice(0, 4).map(e => `<span class="exercise-chip">${e.name}</span>`).join('');
  const more  = allEx.length > 4 ? `<span class="exercise-chip more">+${allEx.length - 4} more</span>` : '';

  let meta = [];
  if (totalSets) meta.push(totalSets + ' sets');
  if (cardio.length) meta.push(cardio.length + ' cardio');
  if (recovery.length) meta.push(recovery.length + ' recovery');

  const typeBadge = s.workoutType
    ? `<span class="session-type-badge" style="display:inline-block;margin:4px 0 0;">${s.workoutType.charAt(0).toUpperCase()+s.workoutType.slice(1)}</span>`
    : '';

  return `<div class="session-card card" data-id="${s.id}">
    <div class="card-top">
      <div class="session-num-col">
        <div class="session-day-num">${dayNum}</div>
        <div class="session-day">${dayName}</div>
      </div>
      <div style="flex:1">
        <div class="session-set-count">${meta.join(' · ') || 'No exercises'}</div>
        <div class="session-date">Day ${s.day} · ${mo} ${yr}</div>
        ${typeBadge}
        ${s.note ? `<div class="session-note-preview">${s.note}</div>` : ''}
        <div class="session-exercises-summary">${chips}${more}</div>
      </div>
    </div>
  </div>`;
}

// ─── Session detail ──────────────────────────────────────────────
function openSessionDetail(id) {
  const s = sessions.find(x => x.id === id);
  if (!s) return;
  const d = new Date(s.date + 'T12:00:00');
  const dateStr = d.toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric', year:'numeric' });

  const exHtml = (s.exercises || []).map(e => {
    if (e.type === 'strength') {
      const setsHtml = (e.sets || []).map((set, i) => {
        const isPR = set.isPR;
        const w = set.eachSide ? set.weight + ' lbs/side' : set.weight + ' lbs';
        return `<div class="detail-set-row">
          <span>Set ${i+1}</span>
          <span class="detail-set-weight">${w} × ${set.reps} reps${isPR ? ' <span class="pr-badge">PR</span>' : ''}</span>
        </div>`;
      }).join('');
      return `<div class="detail-exercise-block">
        <div class="detail-exercise-name">${e.name} <span class="exercise-type-badge">Strength</span></div>
        ${setsHtml}
      </div>`;
    } else if (e.type === 'cardio') {
      const parts = [];
      if (e.incline)  parts.push('Incline: ' + e.incline);
      if (e.speed)    parts.push('Speed: ' + e.speed);
      if (e.duration) parts.push(e.duration + ' min');
      if (e.distance) parts.push(e.distance + ' mi');
      return `<div class="detail-exercise-block">
        <div class="detail-exercise-name">${e.name} <span class="exercise-type-badge">Cardio</span></div>
        <div class="detail-set-row"><span>${parts.join(' · ') || 'No details'}</span></div>
      </div>`;
    } else {
      return `<div class="detail-exercise-block">
        <div class="detail-exercise-name">${e.name} <span class="exercise-type-badge">Recovery</span></div>
        ${e.duration ? `<div class="detail-set-row"><span>${e.duration} min</span></div>` : ''}
      </div>`;
    }
  }).join('');

  const typeBadge = s.workoutType
    ? `<span class="session-type-badge" style="margin-bottom:12px;display:inline-block;">${s.workoutType.charAt(0).toUpperCase()+s.workoutType.slice(1)}</span><br>`
    : '';

  document.getElementById('sheet-session-detail-content').innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:20px;gap:12px;">
      <div>
        <div style="font-size:11px;font-weight:800;color:var(--accent);text-transform:uppercase;letter-spacing:0.09em;margin-bottom:4px;">Day ${s.day}</div>
        <div style="font-size:22px;font-weight:800;letter-spacing:-0.04em;">${dateStr}</div>
        ${typeBadge}
      </div>
      <button class="btn" id="btn-edit-this-session" data-id="${s.id}" style="font-size:13px;padding:8px 14px;min-height:36px;flex-shrink:0;">Edit</button>
    </div>
    ${s.note ? `<p style="font-size:14px;color:var(--text-secondary);margin-bottom:20px;font-style:italic;line-height:1.6;">${s.note}</p>` : ''}
    <div>${exHtml || '<div style="color:var(--text-muted);font-size:14px;">No exercises logged</div>'}</div>
  `;
  document.getElementById('btn-edit-this-session')?.addEventListener('click', e => {
    closeAllSheets();
    setTimeout(() => openEditSession(e.target.dataset.id), 100);
  });
  openSheet('sheet-session-detail');
}

// ─── Edit session ────────────────────────────────────────────────
function openEditSession(id) {
  const s = sessions.find(x => x.id === id);
  if (!s) return;
  editingSessionId = id;

  document.getElementById('edit-day-number').value = s.day || '';
  document.getElementById('edit-date').value        = s.date || '';
  document.getElementById('edit-note').value        = s.note || '';

  renderEditExercises(s.exercises || []);
  openSheet('sheet-edit-session');
}

function renderEditExercises(exList) {
  const container = document.getElementById('edit-exercises-list');
  container.innerHTML = exList.map((e, ei) => {
    if (e.type !== 'strength') {
      return `<div class="edit-exercise-block">
        <div class="edit-exercise-header">
          <span class="edit-exercise-name-label">${e.name}</span>
          <button class="btn-del-ex" data-ei="${ei}">Remove</button>
        </div>
      </div>`;
    }
    const setsHtml = (e.sets || []).map((set, si) => `
      <div class="edit-set-row" data-ei="${ei}" data-si="${si}">
        <span style="font-size:12px;color:var(--text-muted);font-weight:700;">${si+1}</span>
        <input type="text" inputmode="decimal" value="${set.weight||''}" placeholder="lbs" data-field="weight">
        <span style="font-size:12px;color:var(--text-muted);">×</span>
        <input type="text" inputmode="numeric" value="${set.reps||''}" placeholder="reps" data-field="reps">
        <span></span>
        <button class="btn-del-set" data-ei="${ei}" data-si="${si}">×</button>
      </div>`).join('');
    return `<div class="edit-exercise-block">
      <div class="edit-exercise-header">
        <span class="edit-exercise-name-label">${e.name}</span>
        <button class="btn-del-ex" data-ei="${ei}">Remove</button>
      </div>
      ${setsHtml}
    </div>`;
  }).join('');

  container.querySelectorAll('.btn-del-set').forEach(btn => {
    btn.addEventListener('click', () => {
      const s = sessions.find(x => x.id === editingSessionId);
      if (!s) return;
      const ei = +btn.dataset.ei, si = +btn.dataset.si;
      s.exercises[ei].sets.splice(si, 1);
      renderEditExercises(s.exercises);
    });
  });
  container.querySelectorAll('.btn-del-ex').forEach(btn => {
    btn.addEventListener('click', () => {
      const s = sessions.find(x => x.id === editingSessionId);
      if (!s) return;
      s.exercises.splice(+btn.dataset.ei, 1);
      renderEditExercises(s.exercises);
    });
  });
  container.querySelectorAll('input[data-field]').forEach(inp => {
    inp.addEventListener('change', () => {
      const row = inp.closest('[data-ei][data-si]');
      if (!row) return;
      const s = sessions.find(x => x.id === editingSessionId);
      if (!s) return;
      const set = s.exercises[+row.dataset.ei].sets[+row.dataset.si];
      if (inp.dataset.field === 'weight') set.weight = inp.value;
      if (inp.dataset.field === 'reps')   set.reps   = +inp.value || 0;
    });
  });
}

// ─── New session ─────────────────────────────────────────────────
function setupLog() {
  // New session buttons
  document.getElementById('btn-new-session').addEventListener('click', () => startNewSessionFlow());
  document.getElementById('btn-new-session-log').addEventListener('click', () => startNewSessionFlow());

  // Resume / Discard
  document.getElementById('btn-resume-session').addEventListener('click', () => {
    document.getElementById('resume-banner').classList.remove('visible');
    loadSessionIntoLog(activeSession);
    showView('log');
  });
  document.getElementById('btn-discard-session').addEventListener('click', () => {
    if (!confirm('Discard this in-progress session?')) return;
    if (activeSession) {
      sessions = sessions.filter(s => s.id !== activeSession.id);
      save(LS.SESSIONS, sessions);
    }
    localStorage.removeItem(LS.ACTIVE);
    activeSession = null;
    document.getElementById('resume-banner').classList.remove('visible');
    showView('history');
    renderHistory();
  });

  // Start session from new-session sheet
  document.getElementById('btn-start-session').addEventListener('click', () => {
    const day  = parseInt(document.getElementById('new-session-day').value) || (sessions.length + 1);
    const date = document.getElementById('new-session-date').value || todayStr();
    const note = document.getElementById('new-session-note').value.trim();
    closeAllSheets();
    beginSession({ day, date, note });
  });

  // Add exercise
  document.getElementById('btn-add-strength').addEventListener('click', () => openExercisePicker('strength'));
  document.getElementById('btn-add-cardio').addEventListener('click', () => {
    populateCardioMachines();
    openSheet('sheet-cardio');
  });
  document.getElementById('btn-add-recovery').addEventListener('click', () => openSheet('sheet-recovery'));

  // Finish / Cancel
  document.getElementById('btn-finish-session').addEventListener('click', finishSession);
  document.getElementById('btn-cancel-session').addEventListener('click', () => {
    if (!confirm('Discard this session?')) return;
    cancelSession();
  });

  // Cardio confirm
  document.getElementById('btn-add-cardio-confirm').addEventListener('click', addCardioEntry);

  // Recovery confirm
  document.getElementById('btn-add-recovery-confirm').addEventListener('click', addRecoveryEntry);

  // Exercise search
  document.getElementById('exercise-search-input').addEventListener('input', e => {
    renderExercisePickList(e.target.value);
  });

  // Rest timer skip
  document.getElementById('rest-timer-skip').addEventListener('click', stopRestTimer);

  // Plate calc
  document.getElementById('plate-calc-weight').addEventListener('input', updatePlateCalc);
  document.getElementById('plate-bar-toggle').addEventListener('click', () => {
    plateBarWeight = plateBarWeight === 45 ? 35 : 45;
    document.getElementById('plate-bar-toggle').textContent = plateBarWeight + ' lb bar';
    updatePlateCalc();
  });

  // Edit session save
  document.getElementById('btn-edit-session-save').addEventListener('click', saveEditedSession);
  document.getElementById('btn-edit-session-delete').addEventListener('click', deleteEditedSession);
  document.getElementById('btn-edit-session-close').addEventListener('click', () => closeSheet('sheet-edit-session'));

  // Type picker
  renderWorkoutTypeGrid();

  // Routine back
  document.getElementById('btn-routine-back').addEventListener('click', () => {
    closeSheet('sheet-routine-preview');
    setTimeout(() => openSheet('sheet-type-picker'), 120);
  });
  document.getElementById('btn-routine-start').addEventListener('click', startFromRoutine);
  document.getElementById('btn-routine-add-ex').addEventListener('click', () => {
    closeSheet('sheet-routine-preview');
    setTimeout(() => openExercisePicker('routine'), 200);
  });
}

function startNewSessionFlow() {
  openSheet('sheet-type-picker');
}

function renderWorkoutTypeGrid() {
  const grid = document.getElementById('workout-type-grid');
  grid.innerHTML = WORKOUT_TYPES.map(t => `
    <button class="workout-type-card" data-key="${t.key}">
      <span class="type-emoji">${t.emoji}</span>
      <span class="type-label">${t.label}</span>
    </button>
  `).join('');
  grid.querySelectorAll('.workout-type-card').forEach(btn => {
    btn.addEventListener('click', () => {
      closeSheet('sheet-type-picker');
      setTimeout(() => openRoutinePreview(btn.dataset.key), 120);
    });
  });
}

function openRoutinePreview(typeKey) {
  const type = WORKOUT_TYPES.find(t => t.key === typeKey);
  const template = WORKOUT_TEMPLATES[typeKey] || [];
  const allEx = exercises;

  routineExercises = template.map(t => {
    const match = allEx.find(e => e.name === t.name);
    return {
      type:    t.type,
      name:    t.name,
      active:  true,
      exists:  !!match,
    };
  });

  document.getElementById('routine-preview-title').textContent = (type?.label || typeKey) + ' Day';

  const day  = sessions.length + 1;
  const date = todayStr();
  document.getElementById('routine-day').value  = day;
  document.getElementById('routine-date').value = date;

  renderRoutineList();
  openSheet('sheet-routine-preview');

  // Store typeKey for later
  document.getElementById('btn-routine-start').dataset.typeKey = typeKey;
}

function renderRoutineList() {
  const list = document.getElementById('routine-preview-list');
  list.innerHTML = routineExercises.map((ex, i) => {
    const last = getLastBestSet(ex.name);
    const lastStr = last ? `${last.weight}lbs × ${last.reps}` : '';
    return `<div class="routine-item ${ex.active ? 'active' : ''}" data-idx="${i}">
      <div class="routine-item-check">
        <svg viewBox="0 0 24 24" fill="none" stroke-width="2.5" width="13" height="13"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <span class="routine-item-name">${ex.name}</span>
      ${lastStr ? `<span class="routine-item-last">${lastStr}</span>` : ''}
      <button class="routine-item-remove" data-idx="${i}" title="Remove">×</button>
    </div>`;
  }).join('');

  list.querySelectorAll('.routine-item').forEach(item => {
    item.addEventListener('click', e => {
      if (e.target.classList.contains('routine-item-remove')) return;
      const i = +item.dataset.idx;
      routineExercises[i].active = !routineExercises[i].active;
      renderRoutineList();
    });
  });
  list.querySelectorAll('.routine-item-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      routineExercises.splice(+btn.dataset.idx, 1);
      renderRoutineList();
    });
  });
}

function startFromRoutine() {
  const typeKey = document.getElementById('btn-routine-start').dataset.typeKey;
  const day  = parseInt(document.getElementById('routine-day').value)  || (sessions.length + 1);
  const date = document.getElementById('routine-date').value || todayStr();
  closeAllSheets();
  const activeExercises = routineExercises.filter(e => e.active);
  beginSession({ day, date, note: '', workoutType: typeKey, routineExercises: activeExercises });
}

function beginSession({ day, date, note = '', workoutType = null, routineExercises: routine = [] }) {
  const id = 'sess_' + Date.now();
  activeSession = { id, day, date, note, exercises: [], workoutType, startTime: Date.now() };
  sessions.push(activeSession);
  save(LS.SESSIONS, sessions);
  save(LS.ACTIVE, id);

  loadSessionIntoLog(activeSession);

  // Add routine exercises
  if (routine.length) {
    routine.forEach(ex => {
      if (ex.type === 'strength') addExerciseBlock(ex.name);
    });
  }

  showView('log');
}

function loadSessionIntoLog(s) {
  document.getElementById('log-no-session').classList.remove('visible');
  document.getElementById('log-active-session').classList.add('visible');

  document.getElementById('log-day-label').textContent  = 'Day ' + s.day;
  document.getElementById('log-date-label').textContent = formatDate(s.date);
  document.getElementById('session-note').value         = s.note || '';

  const typeBadge = document.getElementById('log-type-badge');
  if (s.workoutType) {
    typeBadge.textContent = s.workoutType.charAt(0).toUpperCase() + s.workoutType.slice(1);
    typeBadge.style.display = 'inline-block';
  } else {
    typeBadge.style.display = 'none';
  }

  // Note autosave
  document.getElementById('session-note').addEventListener('input', e => {
    if (activeSession) { activeSession.note = e.target.value; save(LS.SESSIONS, sessions); }
  });

  // Re-render existing exercise blocks
  document.getElementById('exercise-blocks').innerHTML = '';
  (s.exercises || []).forEach(ex => {
    if (ex.type === 'strength')  addExerciseBlock(ex.name, ex);
    else if (ex.type === 'cardio')   addCardioBlock(ex);
    else if (ex.type === 'recovery') addRecoveryBlock(ex);
  });

  startDurationTimer();
}

function cancelSession() {
  stopDurationTimer();
  stopRestTimer();
  if (activeSession) {
    sessions = sessions.filter(s => s.id !== activeSession.id);
    save(LS.SESSIONS, sessions);
  }
  localStorage.removeItem(LS.ACTIVE);
  activeSession = null;

  document.getElementById('log-no-session').classList.add('visible');
  document.getElementById('log-active-session').classList.remove('visible');
  document.getElementById('exercise-blocks').innerHTML = '';
  showView('history');
  renderHistory();
}

function finishSession() {
  stopDurationTimer();
  stopRestTimer();
  if (activeSession) {
    activeSession.note = document.getElementById('session-note').value.trim();
    activeSession.endTime = Date.now();
    save(LS.SESSIONS, sessions);
    localStorage.removeItem(LS.ACTIVE);

    // Show progression suggestions
    const suggestions = buildProgressionSuggestions(activeSession);
    if (suggestions.length) {
      showProgressionSheet(suggestions);
    }
  }
  activeSession = null;

  document.getElementById('log-no-session').classList.add('visible');
  document.getElementById('log-active-session').classList.remove('visible');
  document.getElementById('exercise-blocks').innerHTML = '';
  document.getElementById('resume-banner').classList.remove('visible');
  showView('history');
  renderHistory();
}

function buildProgressionSuggestions(session) {
  const suggestions = [];
  for (const ex of (session.exercises || [])) {
    if (ex.type !== 'strength') continue;
    const prevSessions = sessions.filter(s => s.id !== session.id);
    const prevBest = getLastBestSetFromSessions(ex.name, prevSessions);
    if (!prevBest) continue;
    const curBest = (ex.sets || []).reduce((best, s) => {
      const vol = (parseFloat(s.weight)||0) * (s.reps||0);
      return vol > ((parseFloat(best?.weight)||0) * (best?.reps||0)) ? s : best;
    }, null);
    if (!curBest) continue;
    const curW = parseFloat(curBest.weight) || 0;
    const prvW = parseFloat(prevBest.weight) || 0;
    if (curW >= prvW && curBest.reps >= 8) {
      suggestions.push({ name: ex.name, nextWeight: curW + 5, reps: curBest.reps });
    }
  }
  return suggestions.slice(0, 4);
}

function showProgressionSheet(suggestions) {
  const list = document.getElementById('progression-list');
  list.innerHTML = suggestions.map(s =>
    `<div style="display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid var(--border-light);">
      <span style="font-size:15px;font-weight:600;">${s.name}</span>
      <span style="font-size:15px;font-weight:700;color:var(--accent);">Try ${s.nextWeight} lbs</span>
    </div>`
  ).join('');
  document.getElementById('btn-progression-done').onclick = () => closeSheet('sheet-progression');
  setTimeout(() => openSheet('sheet-progression'), 400);
}

// ─── Duration timer ───────────────────────────────────────────────
function startDurationTimer() {
  stopDurationTimer();
  const el = document.getElementById('session-duration');
  const update = () => {
    if (!activeSession?.startTime) return;
    const secs = Math.floor((Date.now() - activeSession.startTime) / 1000);
    const m = Math.floor(secs / 60), s = secs % 60;
    el.textContent = m + ':' + String(s).padStart(2,'0');
  };
  update();
  durationTimer = setInterval(update, 1000);
}
function stopDurationTimer() {
  clearInterval(durationTimer);
  durationTimer = null;
}

// ─── Rest timer ──────────────────────────────────────────────────
function startRestTimer(seconds) {
  stopRestTimer();
  restSecondsLeft = seconds;
  const bar  = document.getElementById('rest-timer-bar');
  const text = document.getElementById('rest-timer-text');
  bar.classList.add('visible');
  const tick = () => {
    if (restSecondsLeft <= 0) { stopRestTimer(); return; }
    const m = Math.floor(restSecondsLeft / 60), s = restSecondsLeft % 60;
    text.textContent = 'Rest ' + m + ':' + String(s).padStart(2,'0');
    restSecondsLeft--;
  };
  tick();
  restTimer = setInterval(tick, 1000);
}
function stopRestTimer() {
  clearInterval(restTimer);
  restTimer = null;
  document.getElementById('rest-timer-bar').classList.remove('visible');
}

// ─── Exercise block ──────────────────────────────────────────────
function openExercisePicker(context = 'strength') {
  document.getElementById('exercise-search-input').value = '';
  renderExercisePickList('', context);
  openSheet('sheet-exercise-picker');
  document.getElementById('sheet-exercise-picker').dataset.context = context;
  setTimeout(() => document.getElementById('exercise-search-input').focus(), 300);
}

function renderExercisePickList(query = '', context = null) {
  const sheet = document.getElementById('sheet-exercise-picker');
  if (!context) context = sheet.dataset.context || 'strength';
  const q = query.toLowerCase();
  const filtered = exercises.filter(e => e.name.toLowerCase().includes(q));

  // Group by category
  const groups = {};
  filtered.forEach(ex => {
    const cat = ex.category || 'Custom';
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(ex);
  });

  const html = Object.keys(groups).sort().map(cat => {
    const rows = groups[cat].map(ex => {
      const activeEx = (activeSession?.exercises || []).find(e => e.name === ex.name);
      return `<div class="exercise-pick-row ${activeEx ? 'active-ex' : ''}" data-name="${ex.name}" data-context="${context}">
        ${ex.name}
        ${activeEx ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>' : ''}
      </div>`;
    }).join('');
    return `<div class="exercise-group-header">${cat}</div>${rows}`;
  }).join('');

  document.getElementById('exercise-pick-list').innerHTML = html ||
    '<div style="padding:20px;color:var(--text-muted);font-size:14px;">No exercises found</div>';

  document.querySelectorAll('.exercise-pick-row').forEach(row => {
    row.addEventListener('click', () => {
      const name = row.dataset.name;
      const ctx  = row.dataset.context;
      closeSheet('sheet-exercise-picker');
      if (ctx === 'routine') {
        routineExercises.push({ type:'strength', name, active:true, exists:true });
        renderRoutineList();
        setTimeout(() => openSheet('sheet-routine-preview'), 120);
      } else {
        addExerciseBlock(name);
      }
    });
  });
}

function addExerciseBlock(name, existingEx = null) {
  if (!activeSession) return;
  let ex = existingEx;
  if (!ex) {
    ex = { type:'strength', name, sets:[] };
    activeSession.exercises.push(ex);
    save(LS.SESSIONS, sessions);
  }

  const idx = activeSession.exercises.indexOf(ex);
  const container = document.getElementById('exercise-blocks');
  const block = document.createElement('div');
  block.className = 'exercise-block';
  block.id = 'ex-block-' + idx;

  const prevBestSet = getLastBestSet(name);

  block.innerHTML = `
    <div class="exercise-block-header">
      <div style="display:flex;align-items:center;flex:1;min-width:0;">
        <span class="exercise-name">${name}</span>
      </div>
      <div style="display:flex;align-items:center;gap:6px;">
        <button class="btn-superset" data-idx="${idx}" title="Superset">SS</button>
        <button class="btn-icon" id="plate-btn-${idx}" title="Plate calculator">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="18" height="18" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </button>
        <button class="btn-icon danger" id="del-btn-${idx}" title="Remove exercise">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="18" height="18"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/></svg>
        </button>
      </div>
    </div>
    <div class="set-rows" id="set-rows-${idx}">
      <div class="set-col-headers">
        <span></span><span>PREV</span><span>LBS</span><span></span><span>REPS</span><span></span>
      </div>
    </div>
    <div class="add-set-btn">
      <button class="btn-ghost" id="add-set-${idx}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="14" height="14" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        Add Set
      </button>
    </div>
    <div class="plate-calc-wrap" id="plate-wrap-${idx}" style="display:none;">
      <div class="plate-calc-row">
        <input class="plate-calc-input" id="plate-input-${idx}" type="text" inputmode="decimal" placeholder="Target lbs">
        <button class="plate-btn" id="plate-bar-btn-${idx}">45 lb bar</button>
      </div>
      <div class="plate-calc-result" id="plate-result-${idx}">Enter weight above</div>
    </div>
  `;
  container.appendChild(block);

  // Render existing sets
  (ex.sets || []).forEach((set, si) => addSetRow(idx, si, set, prevBestSet));

  // Add set
  document.getElementById('add-set-' + idx).addEventListener('click', () => {
    if (!activeSession) return;
    const setIdx = ex.sets.length;
    const newSet = { weight: '', reps: 0, done: false, eachSide: false };
    ex.sets.push(newSet);
    save(LS.SESSIONS, sessions);
    addSetRow(idx, setIdx, newSet, prevBestSet);
    // Focus weight input
    const rows = document.querySelectorAll(`#set-rows-${idx} .set-row`);
    const lastRow = rows[rows.length - 1];
    lastRow?.querySelector('input')?.focus();
  });

  // Delete exercise
  document.getElementById('del-btn-' + idx).addEventListener('click', () => {
    if (!confirm('Remove ' + name + '?')) return;
    block.remove();
    if (activeSession) {
      activeSession.exercises = activeSession.exercises.filter((_, i) => i !== idx);
      save(LS.SESSIONS, sessions);
    }
  });

  // Superset toggle
  block.querySelector('.btn-superset').addEventListener('click', btn => {
    block.classList.toggle('superset-block');
    btn.target.classList.toggle('active');
    const isSuper = block.classList.contains('superset-block');
    const badge = block.querySelector('.superset-badge');
    if (isSuper && !badge) {
      const namEl = block.querySelector('.exercise-name');
      const b = document.createElement('span');
      b.className = 'superset-badge'; b.textContent = 'SS';
      namEl.after(b);
    } else if (!isSuper && badge) {
      badge.remove();
    }
    if (activeSession) {
      ex.superset = isSuper;
      save(LS.SESSIONS, sessions);
    }
  });

  // Plate calc
  document.getElementById('plate-btn-' + idx).addEventListener('click', () => {
    const wrap = document.getElementById('plate-wrap-' + idx);
    wrap.style.display = wrap.style.display === 'none' ? 'block' : 'none';
  });
  document.getElementById('plate-input-' + idx).addEventListener('input', () => {
    const w = parseFloat(document.getElementById('plate-input-' + idx).value) || 0;
    const barW = parseInt(document.getElementById('plate-bar-btn-' + idx).dataset.bar || 45);
    document.getElementById('plate-result-' + idx).innerHTML = calcPlates(w, barW);
  });
  document.getElementById('plate-bar-btn-' + idx).addEventListener('click', btn => {
    const cur = parseInt(btn.target.dataset.bar || 45);
    const next = cur === 45 ? 35 : 45;
    btn.target.dataset.bar = next;
    btn.target.textContent = next + ' lb bar';
    const w = parseFloat(document.getElementById('plate-input-' + idx).value) || 0;
    document.getElementById('plate-result-' + idx).innerHTML = calcPlates(w, next);
  });

  // Auto-add first set
  if (!existingEx) {
    document.getElementById('add-set-' + idx).click();
  }
}

function addSetRow(exIdx, setIdx, set, prevBestSet) {
  const rows = document.getElementById('set-rows-' + exIdx);
  const row  = document.createElement('div');
  row.className = 'set-row' + (set.done ? ' done-state' : '');
  row.id = `set-${exIdx}-${setIdx}`;

  const prevStr = prevBestSet
    ? `${prevBestSet.weight}<br>${prevBestSet.reps}r`
    : '—';

  row.innerHTML = `
    <div class="set-num">${setIdx + 1}</div>
    <div class="set-prev">${prevStr}</div>
    <input type="text" inputmode="decimal" placeholder="lbs" value="${set.weight || ''}">
    <span class="reps-x">×</span>
    <input type="text" inputmode="numeric" placeholder="reps" value="${set.reps || ''}">
    <button class="unit-toggle${set.eachSide ? ' each-side' : ''}" title="Toggle each side">${set.eachSide ? 'ea/side' : 'total'}</button>
  `;
  rows.appendChild(row);

  const [wInput, rInput] = row.querySelectorAll('input');
  const unitBtn = row.querySelector('.unit-toggle');

  const saveSet = () => {
    if (!activeSession) return;
    const ex = activeSession.exercises.find((_, i) => i === exIdx);
    if (!ex) return;
    const s = ex.sets[setIdx];
    if (!s) return;
    s.weight = wInput.value;
    s.reps   = parseInt(rInput.value) || 0;
    // PR check
    const prevW = parseFloat(prevBestSet?.weight) || 0;
    const prevR = prevBestSet?.reps || 0;
    const curW  = parseFloat(s.weight) || 0;
    const curR  = s.reps;
    s.isPR = curW > prevW || (curW === prevW && curR > prevR);
    save(LS.SESSIONS, sessions);
  };

  const markDone = () => {
    if (!activeSession) return;
    const ex = activeSession.exercises.find((_, i) => i === exIdx);
    if (!ex?.sets[setIdx]) return;
    ex.sets[setIdx].done = !ex.sets[setIdx].done;
    row.classList.toggle('done-state', ex.sets[setIdx].done);
    save(LS.SESSIONS, sessions);
    if (ex.sets[setIdx].done) startRestTimer(restDefault);
  };

  row.querySelector('.set-num').addEventListener('click', markDone);

  wInput.addEventListener('blur', saveSet);
  rInput.addEventListener('blur', saveSet);
  rInput.addEventListener('keydown', e => { if (e.key === 'Enter') { saveSet(); markDone(); } });

  unitBtn.addEventListener('click', () => {
    if (!activeSession) return;
    const ex = activeSession.exercises.find((_, i) => i === exIdx);
    if (!ex?.sets[setIdx]) return;
    ex.sets[setIdx].eachSide = !ex.sets[setIdx].eachSide;
    unitBtn.classList.toggle('each-side', ex.sets[setIdx].eachSide);
    unitBtn.textContent = ex.sets[setIdx].eachSide ? 'ea/side' : 'total';
    save(LS.SESSIONS, sessions);
  });
}

function getLastBestSet(name) {
  return getLastBestSetFromSessions(name, sessions);
}
function getLastBestSetFromSessions(name, sessionList) {
  const ex = sessionList
    .filter(s => s.id !== activeSession?.id)
    .flatMap(s => (s.exercises||[]).filter(e => e.name === name && e.type === 'strength'))
    .flatMap(e => e.sets || []);
  if (!ex.length) return null;
  return ex.reduce((best, s) => {
    const vol  = (parseFloat(s.weight)||0) * (s.reps||0);
    const bvol = (parseFloat(best.weight)||0) * (best.reps||0);
    return vol >= bvol ? s : best;
  });
}

// ─── Cardio ──────────────────────────────────────────────────────
function populateCardioMachines() {
  const sel = document.getElementById('cardio-machine');
  sel.innerHTML = '<option value="">Select machine…</option>';
  cardioMachines.forEach(m => sel.insertAdjacentHTML('beforeend', `<option>${m}</option>`));
}

function addCardioEntry() {
  if (!activeSession) return;
  const machine  = document.getElementById('cardio-machine').value;
  const incline  = document.getElementById('cardio-incline').value;
  const speed    = document.getElementById('cardio-speed').value;
  const duration = document.getElementById('cardio-duration').value;
  const distance = document.getElementById('cardio-distance').value;
  if (!machine) { showToast('Pick a machine'); return; }

  const ex = { type:'cardio', name:machine, incline, speed, duration, distance };
  activeSession.exercises.push(ex);
  save(LS.SESSIONS, sessions);
  addCardioBlock(ex);

  // Clear form
  ['cardio-machine','cardio-incline','cardio-speed','cardio-duration','cardio-distance']
    .forEach(id => { document.getElementById(id).value = ''; });
  closeSheet('sheet-cardio');
}

function addCardioBlock(ex) {
  const parts = [];
  if (ex.incline)  parts.push('Incline ' + ex.incline);
  if (ex.speed)    parts.push('Speed ' + ex.speed);
  if (ex.duration) parts.push(ex.duration + ' min');
  if (ex.distance) parts.push(ex.distance + ' mi');

  const container = document.getElementById('exercise-blocks');
  const block = document.createElement('div');
  block.className = 'exercise-block';
  block.innerHTML = `
    <div class="exercise-block-header">
      <span class="exercise-name">${ex.name}</span>
      <span class="exercise-type-badge">Cardio</span>
    </div>
    <div style="padding:10px 16px 14px;font-size:14px;color:var(--text-secondary);">${parts.join(' · ') || 'No details'}</div>
  `;
  container.appendChild(block);
}

// ─── Recovery ────────────────────────────────────────────────────
function addRecoveryEntry() {
  if (!activeSession) return;
  const type     = document.getElementById('recovery-type').value;
  const duration = document.getElementById('recovery-duration').value;
  if (!type) { showToast('Pick a recovery type'); return; }

  const ex = { type:'recovery', name:type, duration };
  activeSession.exercises.push(ex);
  save(LS.SESSIONS, sessions);
  addRecoveryBlock(ex);

  document.getElementById('recovery-type').value = '';
  document.getElementById('recovery-duration').value = '';
  closeSheet('sheet-recovery');
}

function addRecoveryBlock(ex) {
  const container = document.getElementById('exercise-blocks');
  const block = document.createElement('div');
  block.className = 'exercise-block';
  block.innerHTML = `
    <div class="exercise-block-header">
      <span class="exercise-name">${ex.name}</span>
      <span class="exercise-type-badge">Recovery</span>
    </div>
    ${ex.duration ? `<div style="padding:10px 16px 14px;font-size:14px;color:var(--text-secondary);">${ex.duration} min</div>` : ''}
  `;
  container.appendChild(block);
}

// ─── Plate calculator ────────────────────────────────────────────
function calcPlates(targetWeight, barWeight = 45) {
  const available = [45, 35, 25, 10, 5, 2.5];
  const half = (targetWeight - barWeight) / 2;
  if (half < 0) return '<span style="color:var(--danger)">Weight less than bar</span>';
  if (half === 0) return 'Just the bar';

  let remaining = half;
  const result = [];
  available.forEach(p => {
    const n = Math.floor(remaining / p);
    if (n > 0) { result.push({ plate: p, count: n }); remaining = +(remaining - n * p).toFixed(2); }
  });

  if (remaining > 0.1) return 'Cannot make exact weight with standard plates';
  if (!result.length) return 'Just the bar';

  return result.map(r =>
    `<span class="plate-chip">${r.count}×${r.plate}</span>`
  ).join(' ') + '<br><span style="font-size:12px;color:var(--text-muted);">per side</span>';
}

function updatePlateCalc() {
  const w   = parseFloat(document.getElementById('plate-calc-weight').value) || 0;
  document.getElementById('plate-calc-result').innerHTML = calcPlates(w, plateBarWeight);
}

// ─── Edit session save/delete ────────────────────────────────────
function saveEditedSession() {
  const s = sessions.find(x => x.id === editingSessionId);
  if (!s) return;
  s.day  = parseInt(document.getElementById('edit-day-number').value) || s.day;
  s.date = document.getElementById('edit-date').value || s.date;
  s.note = document.getElementById('edit-note').value.trim();
  save(LS.SESSIONS, sessions);
  closeSheet('sheet-edit-session');
  renderHistory();
  showToast('Session saved');
}

function deleteEditedSession() {
  if (!confirm('Delete this session permanently?')) return;
  sessions = sessions.filter(x => x.id !== editingSessionId);
  save(LS.SESSIONS, sessions);
  closeAllSheets();
  renderHistory();
  showToast('Session deleted');
}

// ─── Progress ────────────────────────────────────────────────────
function setupProgress() {
  document.getElementById('btn-progress-pick-exercise').addEventListener('click', () => {
    renderProgressPicker();
    openSheet('sheet-progress-pick');
  });
  document.getElementById('btn-log-weight').addEventListener('click', () => {
    document.getElementById('log-weight-date').value = todayStr();
    openSheet('sheet-log-weight');
  });
  document.getElementById('btn-log-weight-save').addEventListener('click', logWeight);

  // Tab switching
  const slider = document.getElementById('progress-slider');
  document.querySelectorAll('.progress-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.progress-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const slide = +tab.dataset.slide;
      slider.scrollTo({ left: slide * slider.offsetWidth, behavior: 'smooth' });
    });
  });
  // Sync tabs with swipe
  let scrollTimer;
  slider.addEventListener('scroll', () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      const idx = Math.round(slider.scrollLeft / slider.offsetWidth);
      document.querySelectorAll('.progress-tab').forEach((t, i) => t.classList.toggle('active', i === idx));
    }, 80);
  });
}

function logWeight() {
  const date = document.getElementById('log-weight-date').value;
  const val  = parseFloat(document.getElementById('log-weight-value').value);
  if (!date || isNaN(val)) { showToast('Enter date and weight'); return; }

  const log = load(LS.WEIGHT_LOG) || [];
  log.push({ date, weight: val });
  log.sort((a,b) => a.date.localeCompare(b.date));
  save(LS.WEIGHT_LOG, log);

  // Also update profile current weight
  const profile = load(LS.PROFILE) || {};
  profile.currentWeight = val;
  save(LS.PROFILE, profile);
  const cwEl = document.getElementById('profile-current-weight');
  if (cwEl) cwEl.value = val;

  document.getElementById('log-weight-value').value = '';
  closeSheet('sheet-log-weight');
  showToast('Weight logged');
  refreshProgress();
}

function renderProgressPicker() {
  const usedNames = new Set(
    sessions.flatMap(s => (s.exercises||[]).filter(e => e.type==='strength').map(e => e.name))
  );
  const list = document.getElementById('progress-pick-list');
  const items = [...usedNames].sort();
  if (!items.length) {
    list.innerHTML = '<div style="padding:20px;color:var(--text-muted);font-size:14px;">No strength exercises logged yet</div>';
    return;
  }
  list.innerHTML = items.map(name =>
    `<div class="exercise-pick-row" style="padding:14px 0;border-bottom:1px solid var(--border-light);cursor:pointer;" data-name="${name}">${name}</div>`
  ).join('');
  list.querySelectorAll('[data-name]').forEach(row => {
    row.addEventListener('click', () => {
      progressExercise = row.dataset.name;
      closeSheet('sheet-progress-pick');
      refreshProgress();
    });
  });
}

function refreshProgress() {
  refreshStrengthChart();
  refreshBodyWeightChart();
  refreshActivityChart();
}

function refreshStrengthChart() {
  const hasStrength = sessions.some(s => (s.exercises||[]).some(e => e.type === 'strength'));
  document.getElementById('progress-empty-full').style.display = hasStrength ? 'none' : 'block';
  document.getElementById('progress-content').style.display   = hasStrength ? 'block' : 'none';
  if (!hasStrength) return;

  if (!progressExercise) {
    const names = [...new Set(sessions.flatMap(s => (s.exercises||[]).filter(e=>e.type==='strength').map(e=>e.name)))];
    if (names.length) progressExercise = names[0];
    else return;
  }

  document.getElementById('progress-selected-name').textContent = progressExercise;
  document.getElementById('chart-exercise-title').textContent   = progressExercise;

  // Build chart data
  const points = sessions
    .filter(s => (s.exercises||[]).some(e => e.name===progressExercise && e.type==='strength'))
    .sort((a,b) => a.date.localeCompare(b.date))
    .map(s => {
      const ex = (s.exercises||[]).find(e => e.name===progressExercise);
      const best = (ex?.sets||[]).reduce((b,set) => {
        const v = (parseFloat(set.weight)||0) * (set.reps||0);
        return v > ((parseFloat(b?.weight)||0)*(b?.reps||0)) ? set : b;
      }, null);
      return { date: s.date, weight: parseFloat(best?.weight)||0, reps: best?.reps||0 };
    })
    .filter(p => p.weight > 0);

  const empty = document.getElementById('chart-empty');
  const canvas = document.getElementById('progress-chart');
  if (!points.length) {
    empty.style.display  = 'flex';
    canvas.style.display = 'none';
    document.getElementById('chart-stats').innerHTML = '';
    document.getElementById('progress-log-wrap').style.display = 'none';
    return;
  }
  empty.style.display  = 'none';
  canvas.style.display = 'block';

  const labels = points.map(p => {
    const d = new Date(p.date + 'T12:00:00');
    return d.toLocaleDateString('en-US', { month:'short', day:'numeric' });
  });
  const data = points.map(p => p.weight);

  if (progressChart) { progressChart.destroy(); progressChart = null; }
  const ctx = canvas.getContext('2d');
  const accent = '#D97757';
  progressChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        data,
        borderColor: accent,
        backgroundColor: 'rgba(217,119,87,0.10)',
        borderWidth: 2.5,
        fill: true,
        tension: 0.35,
        pointBackgroundColor: accent,
        pointRadius: 4,
        pointHoverRadius: 6,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: {
        callbacks: { label: ctx => ctx.parsed.y + ' lbs' }
      }},
      scales: {
        x: { grid: { display: false }, ticks: { font:{ size:11 }, color:'#888' } },
        y: { grid: { color:'rgba(128,128,128,0.12)' }, ticks: { font:{ size:11 }, color:'#888' } }
      }
    }
  });

  // Stats
  const max  = Math.max(...data);
  const last = data[data.length - 1];
  const diff = data.length > 1 ? last - data[0] : 0;
  document.getElementById('chart-stats').innerHTML = [
    `<div class="stat-card"><div class="stat-value">${max}</div><div class="stat-label">Best (lbs)</div></div>`,
    `<div class="stat-card"><div class="stat-value">${last}</div><div class="stat-label">Latest</div></div>`,
    `<div class="stat-card"><div class="stat-value">${diff >= 0 ? '+' : ''}${diff}</div><div class="stat-label">Change</div></div>`,
  ].join('');

  // Session history log
  const logWrap = document.getElementById('progress-log-wrap');
  const logList = document.getElementById('progress-session-list');
  logWrap.style.display = 'block';
  logList.innerHTML = [...points].reverse().map(p => {
    const d = new Date(p.date + 'T12:00:00');
    const ds = d.toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' });
    return `<div class="progress-session-row">
      <span>${ds}</span>
      <span style="font-weight:700;color:var(--text-primary);">${p.weight} lbs × ${p.reps} reps</span>
    </div>`;
  }).join('');
}

function refreshBodyWeightChart() {
  const log = (load(LS.WEIGHT_LOG) || []).sort((a,b) => a.date.localeCompare(b.date));
  const statsEl   = document.getElementById('body-weight-stats');
  const chartWrap = document.getElementById('body-weight-chart-wrap');
  const emptyEl   = document.getElementById('body-weight-empty');
  const logList   = document.getElementById('body-weight-log-list');
  const entries   = document.getElementById('body-weight-entries');
  const canvas    = document.getElementById('body-weight-chart');

  if (!log.length) {
    emptyEl.style.display   = 'flex';
    canvas.style.display    = 'none';
    statsEl.innerHTML       = '';
    logList.style.display   = 'none';
    return;
  }
  emptyEl.style.display  = 'none';
  canvas.style.display   = 'block';
  logList.style.display  = 'block';

  const labels = log.map(e => {
    const d = new Date(e.date + 'T12:00:00');
    return d.toLocaleDateString('en-US', { month:'short', day:'numeric' });
  });
  const data = log.map(e => e.weight);

  if (bodyWeightChart) { bodyWeightChart.destroy(); bodyWeightChart = null; }
  const ctx = canvas.getContext('2d');
  const accent = '#D97757';
  bodyWeightChart = new Chart(ctx, {
    type: 'line',
    data: { labels, datasets: [{
      data, borderColor: accent,
      backgroundColor: 'rgba(217,119,87,0.10)',
      borderWidth: 2.5, fill: true, tension: 0.35,
      pointBackgroundColor: accent, pointRadius: 4, pointHoverRadius: 6,
    }]},
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend:{ display:false }, tooltip:{ callbacks:{ label: c => c.parsed.y + ' lbs' }}},
      scales: {
        x: { grid:{ display:false }, ticks:{ font:{ size:11 }, color:'#888' }},
        y: { grid:{ color:'rgba(128,128,128,0.12)' }, ticks:{ font:{ size:11 }, color:'#888' }},
      }
    }
  });

  const first = data[0], last = data[data.length-1];
  const diff  = +(last - first).toFixed(1);
  statsEl.innerHTML = [
    `<div class="stat-card"><div class="stat-value">${last}</div><div class="stat-label">Current (lbs)</div></div>`,
    `<div class="stat-card"><div class="stat-value">${Math.min(...data)}</div><div class="stat-label">Lowest</div></div>`,
    `<div class="stat-card"><div class="stat-value">${diff >= 0 ? '+':'' }${diff}</div><div class="stat-label">Change</div></div>`,
  ].join('');

  entries.innerHTML = [...log].reverse().map(e => {
    const d = new Date(e.date + 'T12:00:00');
    const ds = d.toLocaleDateString('en-US',{ month:'short', day:'numeric', year:'numeric' });
    return `<div class="weight-entry-row">
      <span class="weight-entry-val">${e.weight} lbs</span>
      <span class="weight-entry-date">${ds}</span>
      <button class="weight-entry-del" data-date="${e.date}" data-weight="${e.weight}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16" stroke-width="1.8">
          <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/>
        </svg>
      </button>
    </div>`;
  }).join('');
  entries.querySelectorAll('.weight-entry-del').forEach(btn => {
    btn.addEventListener('click', () => {
      const wlog = load(LS.WEIGHT_LOG) || [];
      const idx = wlog.findIndex(e => e.date === btn.dataset.date && String(e.weight) === btn.dataset.weight);
      if (idx >= 0) { wlog.splice(idx, 1); save(LS.WEIGHT_LOG, wlog); refreshBodyWeightChart(); }
    });
  });
}

function refreshActivityChart() {
  const now   = new Date();
  const weeks = 8;
  const labels = [], counts = [];

  for (let w = weeks - 1; w >= 0; w--) {
    const start = new Date(now);
    start.setDate(start.getDate() - start.getDay() - w * 7);
    start.setHours(0,0,0,0);
    const end = new Date(start); end.setDate(end.getDate() + 7);
    const cnt = sessions.filter(s => {
      const d = new Date(s.date + 'T12:00:00');
      return d >= start && d < end;
    }).length;
    const mo = start.toLocaleDateString('en-US',{ month:'short' });
    const dy = start.getDate();
    labels.push(mo + ' ' + dy);
    counts.push(cnt);
  }

  const canvas  = document.getElementById('activity-chart');
  const emptyEl = document.getElementById('activity-empty');
  const statsEl = document.getElementById('activity-stats');

  if (!sessions.length) {
    emptyEl.style.display = 'flex'; canvas.style.display = 'none'; statsEl.innerHTML = ''; return;
  }
  emptyEl.style.display = 'none'; canvas.style.display = 'block';

  if (activityChart) { activityChart.destroy(); activityChart = null; }
  const ctx = canvas.getContext('2d');
  activityChart = new Chart(ctx, {
    type: 'bar',
    data: { labels, datasets: [{
      data: counts, backgroundColor: 'rgba(217,119,87,0.75)',
      borderRadius: 6, borderSkipped: false,
    }]},
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend:{ display:false }, tooltip:{ callbacks:{ label: c => c.parsed.y + ' sessions' }}},
      scales: {
        x: { grid:{ display:false }, ticks:{ font:{ size:10 }, color:'#888' }},
        y: { grid:{ color:'rgba(128,128,128,0.12)' }, ticks:{ font:{ size:11 }, color:'#888', stepSize:1 }, min:0 },
      }
    }
  });

  const total = sessions.length;
  const thisWeekStart = new Date(now); thisWeekStart.setDate(thisWeekStart.getDate() - thisWeekStart.getDay()); thisWeekStart.setHours(0,0,0,0);
  const thisWeek = sessions.filter(s => new Date(s.date+'T12:00:00') >= thisWeekStart).length;
  const streak = calcStreak();
  statsEl.innerHTML = [
    `<div class="stat-card"><div class="stat-value">${total}</div><div class="stat-label">Total Sessions</div></div>`,
    `<div class="stat-card"><div class="stat-value">${thisWeek}</div><div class="stat-label">This Week</div></div>`,
    `<div class="stat-card"><div class="stat-value">${streak}</div><div class="stat-label">Week Streak</div></div>`,
  ].join('');
}

function calcStreak() {
  let streak = 0, w = 0;
  const now = new Date();
  while (true) {
    const start = new Date(now);
    start.setDate(start.getDate() - start.getDay() - w * 7);
    start.setHours(0,0,0,0);
    const end = new Date(start); end.setDate(end.getDate() + 7);
    const cnt = sessions.filter(s => { const d = new Date(s.date+'T12:00:00'); return d >= start && d < end; }).length;
    if (!cnt) break;
    streak++; w++;
    if (w > 52) break;
  }
  return streak;
}

// ─── Settings ────────────────────────────────────────────────────
function setupSettings() {
  // Name
  document.getElementById('settings-user-name').addEventListener('change', e => {
    const name = e.target.value.trim();
    save(LS.NAME, name);
    const greet = document.getElementById('user-greeting');
    if (name) { greet.textContent = name + "'s Gym"; greet.style.display='block'; }
    else greet.style.display = 'none';
  });

  // Profile fields
  ['profile-age','profile-sex','profile-height-ft','profile-height-in','profile-current-weight'].forEach(id => {
    document.getElementById(id)?.addEventListener('change', () => saveProfile());
  });

  // Goals
  ['goal-type-select','goal-weight-input','goal-sessions-input'].forEach(id => {
    document.getElementById(id)?.addEventListener('change', () => saveGoals());
  });

  // Theme
  document.getElementById('btn-toggle-theme').addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme');
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    save(LS.THEME, next);
    updateThemeButton(next);
  });

  // Export / Import / Clear
  document.getElementById('btn-export').addEventListener('click', exportData);
  document.getElementById('btn-export-csv').addEventListener('click', exportCSV);
  document.getElementById('btn-import').addEventListener('click', () => document.getElementById('import-file-input').click());
  document.getElementById('import-file-input').addEventListener('change', importData);
  document.getElementById('btn-clear-data').addEventListener('click', clearData);

  // Add custom exercise
  document.getElementById('btn-add-custom-exercise').addEventListener('click', () => openSheet('sheet-add-exercise'));
  document.getElementById('btn-add-exercise-save').addEventListener('click', saveCustomExercise);

  renderSettingsExercises();
}

function saveProfile() {
  const profile = {
    age:           document.getElementById('profile-age')?.value || '',
    sex:           document.getElementById('profile-sex')?.value || '',
    heightFt:      document.getElementById('profile-height-ft')?.value || '',
    heightIn:      document.getElementById('profile-height-in')?.value || '',
    currentWeight: document.getElementById('profile-current-weight')?.value || '',
  };
  save(LS.PROFILE, profile);
}

function saveGoals() {
  const goals = {
    type:     document.getElementById('goal-type-select')?.value || 'muscle',
    weight:   document.getElementById('goal-weight-input')?.value || '',
    sessions: document.getElementById('goal-sessions-input')?.value || '',
  };
  save(LS.GOALS, goals);
}

function updateThemeButton(theme) {
  document.getElementById('theme-icon').textContent  = theme === 'dark' ? '🌙' : '☀️';
  document.getElementById('theme-label').textContent = theme === 'dark' ? 'Dark' : 'Light';
}

function renderSettingsExercises() {
  const container = document.getElementById('settings-exercise-list');
  const groups = {};
  exercises.forEach(ex => {
    const cat = ex.category || 'Custom';
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(ex);
  });

  container.innerHTML = Object.keys(groups).sort().map(cat => {
    const exList = groups[cat];
    const rows = exList.map(ex => `
      <div class="exercise-list-row">
        <span>${ex.name}</span>
        <button class="btn-icon danger" data-name="${ex.name}" title="Delete">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16">
            <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/>
          </svg>
        </button>
      </div>`).join('');
    return `<div class="settings-ex-group" id="grp-${cat}">
      <div class="settings-ex-group-header">
        <span class="settings-ex-group-title">${cat}</span>
        <div class="settings-ex-group-meta">
          <span class="settings-ex-group-count">${exList.length}</span>
          <span class="settings-ex-group-chevron">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
          </span>
        </div>
      </div>
      <div class="settings-ex-group-body">${rows}</div>
    </div>`;
  }).join('');

  // Collapsible groups
  container.querySelectorAll('.settings-ex-group-header').forEach(hdr => {
    hdr.addEventListener('click', () => hdr.closest('.settings-ex-group').classList.toggle('open'));
  });

  // Delete buttons
  container.querySelectorAll('[data-name]').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.dataset.name;
      if (!confirm('Delete "' + name + '" from exercise list?')) return;
      exercises = exercises.filter(e => e.name !== name);
      save(LS.EXERCISES, exercises);
      renderSettingsExercises();
    });
  });
}

function saveCustomExercise() {
  const name = document.getElementById('add-exercise-name').value.trim();
  const cat  = document.getElementById('add-exercise-category').value;
  if (!name) { showToast('Enter exercise name'); return; }
  if (exercises.find(e => e.name.toLowerCase() === name.toLowerCase())) {
    showToast('Already exists'); return;
  }
  exercises.push({ name, category: cat });
  exercises.sort((a,b) => a.name.localeCompare(b.name));
  save(LS.EXERCISES, exercises);
  renderSettingsExercises();
  document.getElementById('add-exercise-name').value = '';
  closeSheet('sheet-add-exercise');
  showToast('Exercise added');
}

function exportData() {
  const blob = new Blob([JSON.stringify({ sessions, exercises }, null, 2)], { type:'application/json' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = 'g3-workout-backup.json'; a.click();
  URL.revokeObjectURL(url);
}

function exportCSV() {
  const rows = [['Day','Date','Exercise','Type','Set','Weight (lbs)','Reps','Each Side','Note']];
  sessions.sort((a,b) => a.date.localeCompare(b.date)).forEach(s => {
    (s.exercises||[]).forEach(ex => {
      if (ex.type === 'strength') {
        (ex.sets||[]).forEach((set,i) => {
          rows.push([s.day, s.date, ex.name, 'Strength', i+1, set.weight||'', set.reps||'', set.eachSide?'yes':'no', s.note||'']);
        });
      } else if (ex.type === 'cardio') {
        rows.push([s.day, s.date, ex.name, 'Cardio', '', ex.speed||'', ex.duration||'', '', s.note||'']);
      } else {
        rows.push([s.day, s.date, ex.name, 'Recovery', '', '', ex.duration||'', '', s.note||'']);
      }
    });
  });
  const csv  = rows.map(r => r.map(v => '"' + String(v).replace(/"/g,'""') + '"').join(',')).join('\n');
  const blob = new Blob([csv], { type:'text/csv' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = 'g3-workout.csv'; a.click();
  URL.revokeObjectURL(url);
}

function importData(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    try {
      const data = JSON.parse(ev.target.result);
      if (data.sessions) {
        const existing = new Set(sessions.map(s => s.id));
        let added = 0;
        (data.sessions||[]).forEach(s => { if (!existing.has(s.id)) { sessions.push(s); added++; } });
        save(LS.SESSIONS, sessions);
        showToast(added + ' sessions imported');
        renderHistory();
      }
      if (data.exercises) {
        const existingNames = new Set(exercises.map(e => e.name.toLowerCase()));
        let added = 0;
        (data.exercises||[]).forEach(ex => { if (!existingNames.has(ex.name.toLowerCase())) { exercises.push(ex); added++; } });
        save(LS.EXERCISES, exercises);
        if (added) { renderSettingsExercises(); showToast(added + ' exercises imported'); }
      }
    } catch { showToast('Invalid backup file'); }
  };
  reader.readAsText(file);
  e.target.value = '';
}

function clearData() {
  if (!confirm('Delete ALL sessions permanently? This cannot be undone.')) return;
  sessions = [];
  save(LS.SESSIONS, sessions);
  localStorage.removeItem(LS.ACTIVE);
  activeSession = null;
  document.getElementById('resume-banner').classList.remove('visible');
  renderHistory();
  showToast('All data cleared');
}

// ─── Helpers ─────────────────────────────────────────────────────
function todayStr() {
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric' });
}

// ─── Resume in-progress session from history view ────────────────
function resumeInProgressSession(session) {
  activeSession = session;
  save(LS.ACTIVE, session.id);
  loadSessionIntoLog(session);
  showView('history');
}

document.addEventListener('DOMContentLoaded', init);
