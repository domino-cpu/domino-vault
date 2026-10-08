/* ══════════════════════════════════════════════════════
   DOMINO Workout Tracker — app.js
   ══════════════════════════════════════════════════════ */

const APP_VERSION = 98;

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
  ONBOARDED:      'g3_onboarded',
  BACKUP_COUNT:   'g3_backup_session_count',
  NUDGE_DISMISSED:'g3_nudge_dismissed_count',
  META:           'domino_workout_exercise_meta',
  TEMPLATES:      'domino_workout_custom_templates',
  PLAN:           'domino_workout_plan',
  MARKERS:        'domino_workout_markers',
  RECAP_ON:       'domino_workout_recap_on',
  RECAP_SEEN:     'domino_workout_recap_seen',
  BACKUP_AT:      'domino_workout_last_backup_at',
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
  // ── Muscle group splits ──
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
    { type:'strength', name:'Seated Row' },
    { type:'strength', name:'Dumbbell Row' },
    { type:'strength', name:'Face Pull' },
    { type:'strength', name:'Shrugs' },
  ],
  shoulders: [
    { type:'strength', name:'Shoulder Press' },
    { type:'strength', name:'Arnold Press' },
    { type:'strength', name:'Lateral Raise' },
    { type:'strength', name:'Front Raise' },
    { type:'strength', name:'Rear Delt Fly' },
    { type:'strength', name:'Face Pull' },
    { type:'strength', name:'Upright Row' },
  ],
  arms: [
    { type:'strength', name:'Bicep Curl' },
    { type:'strength', name:'Hammer Curl' },
    { type:'strength', name:'Incline Dumbbell Curl' },
    { type:'strength', name:'Preacher Curl' },
    { type:'strength', name:'Tricep Pushdown' },
    { type:'strength', name:'Overhead Tricep Extension' },
    { type:'strength', name:'Skull Crushers' },
    { type:'strength', name:'Close-Grip Bench Press' },
  ],
  legs: [
    { type:'strength', name:'Squat' },
    { type:'strength', name:'Leg Press' },
    { type:'strength', name:'Romanian Deadlift' },
    { type:'strength', name:'Bulgarian Split Squat' },
    { type:'strength', name:'Leg Curl' },
    { type:'strength', name:'Leg Extension' },
    { type:'strength', name:'Hip Thrust' },
    { type:'strength', name:'Calf Raise' },
  ],
  abs: [
    { type:'strength', name:'Cable Crunch' },
    { type:'strength', name:'Hanging Leg Raise' },
    { type:'strength', name:'Ab Rollout' },
    { type:'strength', name:'Bicycle Crunch' },
    { type:'strength', name:'Russian Twist' },
    { type:'strength', name:'Dead Bug' },
    { type:'strength', name:'Plank' },
    { type:'strength', name:'Side Plank' },
  ],
  // ── PPL split ──
  push: [
    { type:'strength', name:'Bench Press' },
    { type:'strength', name:'Incline Dumbbell Press' },
    { type:'strength', name:'Shoulder Press' },
    { type:'strength', name:'Lateral Raise' },
    { type:'strength', name:'Cable Fly' },
    { type:'strength', name:'Tricep Pushdown' },
    { type:'strength', name:'Overhead Tricep Extension' },
  ],
  pull: [
    { type:'strength', name:'Deadlift' },
    { type:'strength', name:'Pull-Up' },
    { type:'strength', name:'Lat Pull-Down' },
    { type:'strength', name:'Cable Row' },
    { type:'strength', name:'Face Pull' },
    { type:'strength', name:'Bicep Curl' },
    { type:'strength', name:'Hammer Curl' },
  ],
  // ── Bodyweight ──
  calisthenics: [
    { type:'strength', name:'Pull-Up' },
    { type:'strength', name:'Push-Up' },
    { type:'strength', name:'Dip' },
    { type:'strength', name:'Chin-Up' },
    { type:'strength', name:'Inverted Row' },
    { type:'strength', name:'Pike Push-Up' },
    { type:'strength', name:'Pistol Squat' },
    { type:'strength', name:'Hanging Leg Raise' },
    { type:'strength', name:'Hollow Body Hold' },
    { type:'strength', name:'L-Sit' },
  ],
  // ── Compound / other ──
  fullbody: [
    { type:'strength', name:'Squat' },
    { type:'strength', name:'Deadlift' },
    { type:'strength', name:'Bench Press' },
    { type:'strength', name:'Pull-Up' },
    { type:'strength', name:'Shoulder Press' },
    { type:'strength', name:'Romanian Deadlift' },
    { type:'strength', name:'Dips' },
  ],
  conditioning: [
    { type:'cardio', name:'Treadmill' },
    { type:'cardio', name:'Stairmaster' },
    { type:'cardio', name:'Rowing Machine' },
    { type:'cardio', name:'Jump Rope' },
  ],
  recovery: [
    { type:'recovery', name:'Sauna' },
    { type:'recovery', name:'Stretching' },
    { type:'recovery', name:'Foam Roll' },
    { type:'recovery', name:'Ice Bath' },
  ],
  custom: [],
};

const EXERCISE_GROUP_NAMES = ['Chest','Back','Shoulders','Biceps','Triceps','Legs','Abs','Calisthenics','Cardio','Custom'];
const DEFAULT_EXERCISES = [
  // Chest
  { group:'Chest', name:'Bench Press' },
  { group:'Chest', name:'Dumbbell Bench Press' },
  { group:'Chest', name:'Incline Press' },
  { group:'Chest', name:'Incline Dumbbell Press' },
  { group:'Chest', name:'Decline Press' },
  { group:'Chest', name:'Pectoral Fly' },
  { group:'Chest', name:'Cable Fly' },
  { group:'Chest', name:'Chest Dip' },
  { group:'Chest', name:'Push-Up' },
  // Shoulders
  { group:'Shoulders', name:'Shoulder Press' },
  { group:'Shoulders', name:'Arnold Press' },
  { group:'Shoulders', name:'ISO Lateral Shoulder Press' },
  { group:'Shoulders', name:'Lateral Raise' },
  { group:'Shoulders', name:'Front Raise' },
  { group:'Shoulders', name:'Rear Delt Fly' },
  { group:'Shoulders', name:'Face Pull' },
  { group:'Shoulders', name:'Upright Row' },
  // Triceps
  { group:'Triceps', name:'Tricep Pushdown' },
  { group:'Triceps', name:'Overhead Tricep Extension' },
  { group:'Triceps', name:'Skull Crushers' },
  { group:'Triceps', name:'Close-Grip Bench Press' },
  { group:'Triceps', name:'Tricep Kickback' },
  { group:'Triceps', name:'Dips' },
  // Back
  { group:'Back', name:'Deadlift' },
  { group:'Back', name:'Pull-Up' },
  { group:'Back', name:'Chin-Up' },
  { group:'Back', name:'Lat Pull-Down' },
  { group:'Back', name:'ISO Lateral Front Pull-Down' },
  { group:'Back', name:'Cable Row' },
  { group:'Back', name:'Seated Row' },
  { group:'Back', name:'Dumbbell Row' },
  { group:'Back', name:'Bent Over Row' },
  { group:'Back', name:'T-Bar Row' },
  { group:'Back', name:'Shrugs' },
  // Biceps
  { group:'Biceps', name:'Bicep Curl' },
  { group:'Biceps', name:'Hammer Curl' },
  { group:'Biceps', name:'Incline Dumbbell Curl' },
  { group:'Biceps', name:'Preacher Curl' },
  { group:'Biceps', name:'EZ Bar Curl' },
  { group:'Biceps', name:'Cable Curl' },
  { group:'Biceps', name:'Concentration Curl' },
  // Legs
  { group:'Legs', name:'Squat' },
  { group:'Legs', name:'Leg Press' },
  { group:'Legs', name:'Romanian Deadlift' },
  { group:'Legs', name:'Bulgarian Split Squat' },
  { group:'Legs', name:'Leg Curl' },
  { group:'Legs', name:'Leg Extension' },
  { group:'Legs', name:'Hip Thrust' },
  { group:'Legs', name:'Calf Raise' },
  { group:'Legs', name:'Seated Calf Raise' },
  { group:'Legs', name:'Lunges' },
  { group:'Legs', name:'Walking Lunges' },
  { group:'Legs', name:'Sumo Squat' },
  { group:'Legs', name:'Nordic Curl' },
  { group:'Legs', name:'Step-Up' },
  // Abs
  { group:'Abs', name:'Cable Crunch' },
  { group:'Abs', name:'Hanging Leg Raise' },
  { group:'Abs', name:'Ab Rollout' },
  { group:'Abs', name:'Bicycle Crunch' },
  { group:'Abs', name:'Russian Twist' },
  { group:'Abs', name:'Dead Bug' },
  { group:'Abs', name:'Plank' },
  { group:'Abs', name:'Side Plank' },
  { group:'Abs', name:'Crunches' },
  { group:'Abs', name:'Leg Raise' },
  { group:'Abs', name:'Toe Touches' },
  // Calisthenics
  { group:'Calisthenics', name:'Pull-Up' },
  { group:'Calisthenics', name:'Chin-Up' },
  { group:'Calisthenics', name:'Push-Up' },
  { group:'Calisthenics', name:'Dip' },
  { group:'Calisthenics', name:'Inverted Row' },
  { group:'Calisthenics', name:'Pike Push-Up' },
  { group:'Calisthenics', name:'Diamond Push-Up' },
  { group:'Calisthenics', name:'Archer Push-Up' },
  { group:'Calisthenics', name:'Pistol Squat' },
  { group:'Calisthenics', name:'Hollow Body Hold' },
  { group:'Calisthenics', name:'L-Sit' },
  { group:'Calisthenics', name:'Muscle-Up' },
  { group:'Calisthenics', name:'Handstand Push-Up' },
  { group:'Calisthenics', name:'Tuck Planche' },
];

const DEFAULT_CARDIO = ['Treadmill', 'Stairmaster', 'Elliptical', 'Stationary Bike', 'Rowing Machine', 'Jump Rope'];

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
  const custom = getExerciseGroupMap();
  // A group assigned by hand wins, then the built-in mapping, then Custom.
  const resolve = name => {
    const picked = custom[name];
    if (picked) return { group: picked, name };
    const d = DEFAULT_EXERCISES.find(e => e.name.toLowerCase() === name.toLowerCase());
    return d || { group: 'Custom', name };
  };
  if (stored) return stored.map(resolve);
  return DEFAULT_EXERCISES.map(e => custom[e.name] ? { group: custom[e.name], name: e.name } : e);
}

function seedDefaults() {
  const stored = getExercises();
  if (!stored) {
    saveExercises(DEFAULT_EXERCISES.map(e => e.name));
  } else {
    const storedLower = new Set(stored.map(n => n.toLowerCase()));
    const added = DEFAULT_EXERCISES.map(e => e.name).filter(n => !storedLower.has(n.toLowerCase()));
    if (added.length) saveExercises([...stored, ...added]);
  }
  if (!localStorage.getItem(LS.CARDIO)) localStorage.setItem(LS.CARDIO, JSON.stringify(DEFAULT_CARDIO));
}

// ─── Goals & weight log ───────────────────────────────────
function getGoals() {
  try {
    const g = JSON.parse(localStorage.getItem(LS.GOALS)) || {};
    if (!g.goalTypes) g.goalTypes = g.goalType ? [g.goalType] : [];
    return g;
  } catch { return { goalTypes: [] }; }
}
function saveGoals(g) { localStorage.setItem(LS.GOALS, JSON.stringify(g)); }
function getWeightLog() {
  try { return JSON.parse(localStorage.getItem(LS.WEIGHT_LOG)) || []; } catch { return []; }
}
function saveWeightLog(l) { localStorage.setItem(LS.WEIGHT_LOG, JSON.stringify(l)); }
function getProfile() {
  try { return JSON.parse(localStorage.getItem(LS.PROFILE)) || {}; } catch { return {}; }
}
function saveProfile(p) { localStorage.setItem(LS.PROFILE, JSON.stringify(p)); }
function getExerciseGroupMap() {
  try { return JSON.parse(localStorage.getItem(LS.EXERCISE_GROUPS)) || {}; } catch { return {}; }
}
function saveExerciseGroups(g) { localStorage.setItem(LS.EXERCISE_GROUPS, JSON.stringify(g)); }

// ─── Per-exercise metadata (image, video, targets, rest, favorite) ──
function getExerciseMeta()  { try { return JSON.parse(localStorage.getItem(LS.META)) || {}; } catch { return {}; } }
function saveExerciseMeta(m) { localStorage.setItem(LS.META, JSON.stringify(m)); }
function getMetaFor(name)   { return getExerciseMeta()[name.toLowerCase()] || {}; }
function setMetaFor(name, patch) {
  const m = getExerciseMeta();
  const k = name.toLowerCase();
  m[k] = { ...(m[k] || {}), ...patch };
  // Drop empty fields so the map stays lean
  Object.keys(m[k]).forEach(key => {
    const v = m[k][key];
    if (v === null || v === undefined || v === '' || v === false) delete m[k][key];
  });
  if (!Object.keys(m[k]).length) delete m[k];
  saveExerciseMeta(m);
}
function isFavorite(name)   { return !!getMetaFor(name).favorite; }
function toggleFavorite(name) { setMetaFor(name, { favorite: isFavorite(name) ? null : true }); }
function exerciseVideoUrl(name) {
  const meta = getMetaFor(name);
  if (meta.video) return meta.video;
  return 'https://www.youtube.com/results?search_query=' + encodeURIComponent('how to ' + name + ' proper form technique');
}

// ─── Custom workout templates ──────────────────────────────
function getCustomTemplates()  { try { return JSON.parse(localStorage.getItem(LS.TEMPLATES)) || []; } catch { return []; } }
function saveCustomTemplates(t) { localStorage.setItem(LS.TEMPLATES, JSON.stringify(t)); }

// ─── User Name ────────────────────────────────────────────
function loadUserName() {
  const name = localStorage.getItem(LS.NAME) || '';
  document.title = name ? `${name} · G3` : 'G3 Workout';
  const greetEl = document.getElementById('user-greeting');
  if (greetEl) { greetEl.textContent = name || ''; greetEl.style.display = name ? 'block' : 'none'; }
  const input = document.getElementById('settings-user-name');
  if (input && input !== document.activeElement) input.value = name;
}

function loadGoals() {
  const g = getGoals();
  const wtEl   = document.getElementById('goal-weight-input');
  const sessEl = document.getElementById('goal-sessions-input');
  if (wtEl   && g.goalWeight != null) wtEl.value = g.goalWeight;
  if (sessEl && g.weeklyTarget != null) sessEl.value = g.weeklyTarget;
  syncGoalTiles();
}

function loadProfile() {
  const p = getProfile();
  const set = (id, val) => { const el = document.getElementById(id); if (el && el !== document.activeElement && val != null) el.value = val; };
  set('profile-age',            p.age);
  set('profile-height-ft',      p.heightFt);
  set('profile-height-in',      p.heightIn);
  set('profile-current-weight', p.currentWeight);
  const sexEl = document.getElementById('profile-sex');
  if (sexEl && p.sex) sexEl.value = p.sex;
  // Auto-log current weight as today's entry if user updates it
}

// ─── Theme ────────────────────────────────────────────────
function loadTheme() {
  const saved = localStorage.getItem(LS.THEME) || 'dark';
  applyTheme(saved, false);
}

const DARK_THEMES = new Set(['dark', 'carbon', 'steel', 'titan', 'matrix']);

function applyTheme(theme, save = true) {
  document.documentElement.dataset.theme = theme;
  // dark-skin class drives card/shadow overrides for all dark themes
  document.documentElement.classList.toggle('dark-skin', DARK_THEMES.has(theme));
  if (save) localStorage.setItem(LS.THEME, theme);
  document.querySelectorAll('.skin-tile').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === theme);
  });
  if (progressChart && selectedExercise) {
    const sessions = getSessions().filter(s => s.completedAt);
    renderExerciseChart(selectedExercise, sessions);
  }
}

function isDark() { return DARK_THEMES.has(document.documentElement.dataset.theme); }

// ─── Chart color helper ───────────────────────────────────
function chartColors() {
  const t = document.documentElement.dataset.theme;
  const map = {
    dark:     { a: '#e08a62', f: 'rgba(224,138,98,0.12)' },
    carbon:   { a: '#4F9EF8', f: 'rgba(79,158,248,0.15)' },
    steel:    { a: '#F04040', f: 'rgba(240,64,64,0.15)' },
    titan:    { a: '#C8950A', f: 'rgba(200,149,10,0.18)' },
    matrix:   { a: '#00E83A', f: 'rgba(0,232,58,0.18)' },
    light:    { a: '#C4603A', f: 'rgba(196,96,58,0.10)' },
    rose:     { a: '#D84F7A', f: 'rgba(216,79,122,0.12)' },
    lavender: { a: '#7C3AED', f: 'rgba(124,58,237,0.12)' },
    glam:     { a: '#F0148B', f: 'rgba(240,20,139,0.12)' },
  };
  const c = map[t] || map.dark;
  const dark = isDark();
  return {
    accent:      c.a,
    accentFill:  c.f,
    grid:        dark ? '#2a2a28' : '#e2e1dc',
    tick:        dark ? '#686866' : '#9c9c9a',
    tooltip_bg:  dark ? '#f0efe9' : '#141413',
    tooltip_txt: dark ? '#141413' : '#f0efe9',
  };
}

// ─── Utils ────────────────────────────────────────────────
function uid()        { return 'sess_' + Date.now() + '_' + Math.random().toString(36).slice(2,7); }
function todayISO() { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }
function shortDateCaps(iso) {
  if (!iso) return '';
  const d = new Date(iso + 'T12:00:00');
  const opts = { weekday: 'short', month: 'short', day: 'numeric' };
  if (d.getFullYear() !== new Date().getFullYear()) opts.year = 'numeric';
  return d.toLocaleDateString('en-US', opts).replace(/,/g, '').toUpperCase();
}

function formatDate(iso) {
  if (!iso) return '';
  return new Date(iso + 'T12:00:00').toLocaleDateString('en-US', { weekday:'short', month:'long', day:'numeric', year:'numeric' });
}
function formatDuration(startedAt, completedAt) {
  if (!startedAt || !completedAt) return '';
  const min = Math.round((completedAt - startedAt) / 60000);
  if (min <= 0) return '';
  if (min < 60) return `${min}m`;
  const h = Math.floor(min / 60), m = min % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
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

function getHistoricalMaxVolume(exerciseName) {
  let max = 0;
  getSessions().filter(s => s.completedAt).forEach(sess => {
    (sess.exercises||[]).forEach(ex => {
      if (ex.type === 'strength' && ex.name.toLowerCase() === exerciseName.toLowerCase()) {
        (ex.sets||[]).forEach(set => {
          const v = normalizeWeight(set.weight, set.weightUnit) * (parseFloat(set.reps) || 0);
          if (v > max) max = v;
        });
      }
    });
  });
  return max;
}

function checkPR(exerciseName, weight, unit, reps) {
  const w = normalizeWeight(weight, unit);
  if (w <= 0) return false;
  const hMax = getHistoricalMax(exerciseName);
  if (hMax <= 0) return false;
  if (w > hMax) return true;
  if (reps != null) {
    const v = w * (parseFloat(reps) || 0);
    if (v <= 0) return false;
    return v > getHistoricalMaxVolume(exerciseName);
  }
  return false;
}

// The whole series from the last session that actually logged this lift. One
// session, so the numbers are comparable to each other and to what you're
// about to load.
function getLastSessionSeries(exerciseName) {
  const name = String(exerciseName || '').toLowerCase();
  const sessions = getSessions()
    .filter(s => s.completedAt && s.id !== activeSession?.id)
    .sort((a, b) => b.completedAt - a.completedAt);
  for (const sess of sessions) {
    const ex = (sess.exercises || []).find(e => e.type === 'strength' && e.name.toLowerCase() === name);
    const done = (ex?.sets || []).filter(s => s.weight != null && s.reps != null);
    if (done.length) return { date: sess.date, sets: done };
  }
  return null;
}

function daysAgoLabel(iso) {
  const d = Math.round((new Date(todayISO() + 'T12:00:00') - new Date(iso + 'T12:00:00')) / 86400000);
  if (d <= 0)  return 'today';
  if (d === 1) return 'yesterday';
  if (d < 7)   return `${d} days ago`;
  if (d < 14)  return 'last week';
  if (d < 60)  return `${Math.round(d / 7)} weeks ago`;
  return `${Math.round(d / 30)} months ago`;
}

function shortDate(iso) {
  return new Date(iso + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// A compact "last time" strip above the set rows, so you can see the whole
// previous series at once instead of reading it one row at a time.
function buildLastTimeHTML(exName) {
  const last = getLastSessionSeries(exName);
  if (!last) return '';
  let top = 0;
  last.sets.forEach(s => { top = Math.max(top, normalizeWeight(s.weight, s.weightUnit)); });
  const chips = last.sets.map(s => {
    const w = parseFloat(s.weight);
    const isTop = top > 0 && normalizeWeight(s.weight, s.weightUnit) === top;
    const unit = s.weightUnit === 'each_side' ? '/side' : '';
    // Bodyweight moves log 0 lb — show the reps alone rather than "0 × 8".
    const txt = w > 0
      ? `${escHtml(s.weight)}${unit}<i>×</i>${escHtml(s.reps)}`
      : `${escHtml(s.reps)} reps`;
    return `<span class="lt-set${isTop && w > 0 ? ' top' : ''}">${txt}</span>`;
  }).join('');
  return `<div class="last-time">
    <div class="last-time-head">Last time · ${escHtml(shortDate(last.date))} · ${escHtml(daysAgoLabel(last.date))}</div>
    <div class="last-time-sets">${chips}</div>
  </div>`;
}

function getLastSessionSet(exerciseName, setIndex) {
  const sessions = getSessions().filter(s => s.completedAt).sort((a,b) => b.completedAt - a.completedAt);
  for (const sess of sessions) {
    const ex = (sess.exercises||[]).find(e => e.type==='strength' && e.name.toLowerCase()===exerciseName.toLowerCase());
    if (ex?.sets?.[setIndex]) return ex.sets[setIndex];
  }
  return null;
}

// ─── PR Celebration ───────────────────────────────────────
let prCelebTimeout;
// Only celebrate once per exercise per session — avoids firing on every set
let prCelebShownThisSession = new Set();
function showPRCelebration(exerciseName) {
  const key = exerciseName.toLowerCase();
  if (prCelebShownThisSession.has(key)) return;
  prCelebShownThisSession.add(key);
  clearTimeout(prCelebTimeout);
  navigator.vibrate?.([80, 40, 80, 40, 200]);
  const el = document.getElementById('pr-celebration');
  if (!el) return;
  const nameEl = el.querySelector('.pr-celeb-exercise');
  if (nameEl) nameEl.textContent = exerciseName.toUpperCase();
  el.classList.remove('pr-celeb-exit');
  el.classList.add('pr-celeb-visible');
  prCelebTimeout = setTimeout(() => {
    el.classList.add('pr-celeb-exit');
    setTimeout(() => el.classList.remove('pr-celeb-visible', 'pr-celeb-exit'), 500);
  }, 2800);
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
  clearSheetKb(activeSheet);
  document.getElementById(activeSheet)?.classList.remove('open');
  document.getElementById('backdrop').classList.remove('open');
  activeSheet = null;
  kbAdjustedSheet = null;
}

// Keep whatever bottom-sheet is open above the on-screen keyboard. iOS home-screen PWAs
// do NOT shrink dvh/100vh when the keyboard opens, so a bottom-anchored sheet (the Add
// Exercise search, the custom-exercise form, the routine builder, etc.) gets covered.
// VisualViewport gives the real visible area; lift the open sheet by the keyboard height
// and cap its height to the visible area so its inputs/results stay above the keyboard.
let kbAdjustedSheet = null;

function onViewportChange() {
  adjustActiveSheetForKeyboard();
  adjustLogForKeyboard();
}

// The workout screen is not a sheet, so it needs its own keyboard handling:
// typing an exact weight must never push LOG SET out of reach.
let kbLogAdjusted = false;
function adjustLogForKeyboard() {
  const vv = window.visualViewport;
  const view = document.getElementById('view-log');
  if (!vv || !view) return;
  const keyboardH = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
  if (keyboardH > 80 && currentView === 'log') {
    view.style.paddingBottom = (keyboardH + 96) + 'px';
    kbLogAdjusted = true;
    const el = document.activeElement;
    if (el && el.classList && el.classList.contains('focus-num')) {
      const btn = document.querySelector('.focus-log');
      if (btn) setTimeout(() => btn.scrollIntoView({ block: 'nearest', behavior: 'smooth' }), 60);
    }
  } else if (kbLogAdjusted) {
    view.style.paddingBottom = '';
    kbLogAdjusted = false;
  }
}

function adjustActiveSheetForKeyboard() {
  const vv = window.visualViewport;
  const id = activeSheet;
  if (kbAdjustedSheet && kbAdjustedSheet !== id) { clearSheetKb(kbAdjustedSheet); kbAdjustedSheet = null; }
  const sheet = id ? document.getElementById(id) : null;
  if (!sheet || !vv) { if (kbAdjustedSheet) { clearSheetKb(kbAdjustedSheet); kbAdjustedSheet = null; } return; }
  const keyboardH = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
  if (keyboardH > 80) {
    sheet.style.bottom    = keyboardH + 'px';
    sheet.style.maxHeight = vv.height + 'px';
    // The Add Exercise picker uses a pinned-bottom search bar, so it needs to fill the height.
    if (id === 'sheet-exercise-picker') sheet.style.height = vv.height + 'px';
    kbAdjustedSheet = id;
  } else {
    clearSheetKb(id);
    if (kbAdjustedSheet === id) kbAdjustedSheet = null;
  }
}
function clearSheetKb(id) {
  const s = id ? document.getElementById(id) : null;
  if (!s) return;
  s.style.bottom = '';
  s.style.height = '';
  s.style.maxHeight = '';
}

// ─── Navigation ───────────────────────────────────────────
let currentView = 'history';
function showView(name) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  document.getElementById('view-' + name)?.classList.add('active');
  document.querySelector(`.nav-tab[data-view="${name}"]`)?.classList.add('active');
  currentView = name;
  try {
    if (name === 'today')    { renderToday(); renderActivityChart(); }
    if (name === 'history')  renderHistory();
    if (name === 'progress') renderProgress();
    if (name === 'settings') renderSettings();
    if (name === 'log')      renderLogView();
  } catch (e) { console.error('showView render error:', name, e); }
}

// ─── Auto-save ────────────────────────────────────────────
let saveTimer;
function scheduleAutoSave() { clearTimeout(saveTimer); saveTimer = setTimeout(commitActiveSession, 400); }

// ─── Session state ────────────────────────────────────────
let activeSession = null;
let pendingWorkoutType = null;
let routineExtraExercises = [];

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
  prCelebShownThisSession = new Set();
  const session = { id: uid(), dayNumber: parseInt(dayNumber)||1, date: date||todayISO(), note: note||'', workoutType: workoutType||null, completedAt: null, startedAt: Date.now(), exercises: [] };
  activeSession = session;
  setActiveSessionId(session.id);
  commitActiveSession();
  return session;
}
function finishSession() {
  if (!activeSession) return;
  const finishing = activeSession;
  finishing.completedAt = Date.now();
  commitActiveSession(); setActiveSessionId(null); activeSession = null;
  stopDurationClock();
  return finishing;
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
  // Quick-start: show last session's type as a one-tap button
  const lastSession = getSessions().filter(s => s.completedAt).sort((a,b) => b.completedAt - a.completedAt)[0];
  const qWrap = document.getElementById('quick-start-wrap');
  if (qWrap) {
    const typeDef = lastSession?.workoutType ? WORKOUT_TYPES.find(t => t.key === lastSession.workoutType) : null;
    if (typeDef) {
      document.getElementById('quick-start-emoji').textContent = typeDef.emoji;
      document.getElementById('quick-start-label').textContent = typeDef.label + ' Day';
      qWrap.style.display = 'block';
      document.getElementById('btn-quick-start').onclick = () => onWorkoutTypePicked(typeDef.key);
    } else {
      qWrap.style.display = 'none';
    }
  }
  // Clear note field each time sheet opens
  const noteEl = document.getElementById('new-session-note-inline');
  if (noteEl) noteEl.value = '';

  const grid = document.getElementById('workout-type-grid');
  grid.innerHTML = WORKOUT_TYPES.map(t =>
    `<button class="workout-type-card" data-type="${t.key}">
      <span class="type-emoji">${t.emoji}</span>
      <span class="type-label">${t.label}</span>
    </button>`).join('');
  grid.querySelectorAll('.workout-type-card').forEach(card => {
    card.addEventListener('click', () => onWorkoutTypePicked(card.dataset.type));
  });

  renderMyRoutines();
}

function onWorkoutTypePicked(typeKey) {
  const note = document.getElementById('new-session-note-inline')?.value.trim() || '';
  closeSheet();
  startNewSession(nextDayNumber(), todayISO(), note, typeKey);
  const template = typeKey !== 'custom' ? (WORKOUT_TEMPLATES[typeKey] || []) : [];
  if (template.length) preloadTemplateExercises(template);
  showView('log');
}

// ─── Custom routines (user-built templates) ────────────────
function renderMyRoutines() {
  const wrap = document.getElementById('my-routines-wrap');
  if (!wrap) return;
  const templates = getCustomTemplates();

  let html = `<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
    <span style="font-size:13px;font-weight:800;text-transform:uppercase;letter-spacing:0.06em;color:var(--text-muted);">My Routines</span>
  </div>`;

  if (templates.length) {
    html += `<div style="display:flex;flex-direction:column;gap:8px;margin-bottom:10px;">`;
    templates.forEach(t => {
      const count = (t.exercises || []).length;
      html += `<div class="my-routine-card" data-routine="${escAttr(t.id)}" style="display:flex;align-items:center;gap:10px;padding:12px 14px;border-radius:14px;background:var(--bg-secondary);border:1.5px solid var(--border-light);cursor:pointer;">
        <span style="font-size:20px;flex-shrink:0;">📋</span>
        <div style="flex:1;min-width:0;">
          <div style="font-weight:700;font-size:14px;color:var(--text-primary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${escHtml(t.name)}</div>
          <div style="font-size:11px;color:var(--text-muted);">${count} exercise${count!==1?'s':''}</div>
        </div>
        <button class="my-routine-edit" data-edit="${escAttr(t.id)}" title="Edit routine" style="background:none;border:none;cursor:pointer;padding:6px;color:var(--text-muted);flex-shrink:0;display:inline-flex;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        </button>
      </div>`;
    });
    html += `</div>`;
  }

  html += `<button id="btn-new-routine" class="btn btn-ghost" style="width:100%;justify-content:center;gap:6px;font-size:13px;min-height:44px;">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="15" height="15" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
    New routine
  </button>`;
  wrap.innerHTML = html;

  wrap.querySelectorAll('.my-routine-card').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.closest('.my-routine-edit')) return;
      onCustomRoutinePicked(card.dataset.routine);
    });
  });
  wrap.querySelectorAll('.my-routine-edit').forEach(btn => {
    btn.addEventListener('click', e => { e.stopPropagation(); openRoutineBuilder(btn.dataset.edit); });
  });
  document.getElementById('btn-new-routine')?.addEventListener('click', () => openRoutineBuilder(null));
}

function onCustomRoutinePicked(id) {
  const tpl = getCustomTemplates().find(t => t.id === id);
  if (!tpl) return;
  const note = document.getElementById('new-session-note-inline')?.value.trim() || '';
  closeSheet();
  startNewSession(nextDayNumber(), todayISO(), note, 'custom');
  activeSession.customName = tpl.name;
  commitActiveSession();
  if (tpl.exercises?.length) preloadTemplateExercises(tpl.exercises);
  showView('log');
}

// ─── Routine builder ───────────────────────────────────────
let builderExercises = [];
let builderEditId = null;

function openRoutineBuilder(id) {
  builderEditId = id;
  const nameInput = document.getElementById('routine-builder-name');
  if (id) {
    const t = getCustomTemplates().find(x => x.id === id);
    builderExercises = t ? (t.exercises || []).map(e => ({ ...e })) : [];
    if (nameInput) nameInput.value = t?.name || '';
  } else {
    builderExercises = [];
    if (nameInput) nameInput.value = '';
  }
  document.getElementById('routine-builder-title').textContent = id ? 'Edit Routine' : 'New Routine';
  document.getElementById('btn-routine-builder-delete').style.display = id ? 'block' : 'none';
  renderBuilderList();
  openSheet('sheet-routine-builder');
}

function renderBuilderList() {
  const list = document.getElementById('routine-builder-list');
  if (!list) return;
  if (!builderExercises.length) {
    list.innerHTML = `<p style="color:var(--text-muted);font-size:13px;padding:8px 0;">No exercises yet — tap "+ Add Exercise" to build the routine.</p>`;
    return;
  }
  list.innerHTML = builderExercises.map((ex, i) => `
    <div style="display:flex;align-items:center;gap:8px;padding:10px 12px;border-radius:12px;background:var(--bg-secondary);margin-bottom:6px;">
      <span style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:14px;font-weight:600;">${escHtml(ex.name)}</span>
      <span style="font-size:10px;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);">${escHtml(ex.type)}</span>
      <button class="builder-remove" data-i="${i}" title="Remove" style="background:none;border:none;cursor:pointer;color:var(--danger);font-size:18px;padding:2px 6px;">×</button>
    </div>`).join('');
  list.querySelectorAll('.builder-remove').forEach(btn => {
    btn.addEventListener('click', () => { builderExercises.splice(+btn.dataset.i, 1); renderBuilderList(); });
  });
}

function saveRoutineFromBuilder() {
  const name = document.getElementById('routine-builder-name').value.trim();
  if (!name) { toast('Name your routine'); return; }
  if (!builderExercises.length) { toast('Add at least one exercise'); return; }
  const templates = getCustomTemplates();
  if (builderEditId) {
    const t = templates.find(x => x.id === builderEditId);
    if (t) { t.name = name; t.exercises = builderExercises.map(e => ({ ...e })); }
  } else {
    templates.push({
      id: 'tpl_' + Date.now() + '_' + Math.random().toString(36).slice(2,6),
      name,
      exercises: builderExercises.map(e => ({ ...e })),
    });
  }
  saveCustomTemplates(templates);
  closeSheet();
  toast(builderEditId ? 'Routine updated ✓' : 'Routine saved ✓');
}

function deleteRoutineFromBuilder() {
  if (!builderEditId) return;
  if (!confirm('Delete this routine? This cannot be undone.')) return;
  saveCustomTemplates(getCustomTemplates().filter(t => t.id !== builderEditId));
  closeSheet();
  toast('Routine deleted');
}

function populateRoutinePreview(template) {
  const list = document.getElementById('routine-preview-list');

  // Preserve which exercises are currently unchecked before re-rendering
  const inactiveNames = new Set(
    [...list.querySelectorAll('.routine-item:not(.active)')].map(el => el.dataset.exName)
  );

  const chk = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="12" height="12" stroke-width="3.5"><polyline points="20 6 9 17 4 12"/></svg>`;

  let html = '';
  template.forEach((ex, i) => {
    let lastInfo = '';
    if (ex.type === 'strength') {
      const ls = getLastSessionSet(ex.name, 0);
      if (ls?.weight != null) {
        const inc = ls.weightUnit === 'each_side' ? 2.5 : 5;
        const unit = ls.weightUnit === 'each_side' ? '/side' : 'lbs';
        lastInfo = `${ls.weight} → ${ls.weight + inc} ${unit}?`;
      }
    }
    html += `<div class="routine-item active" data-idx="${i}" data-ex-type="${escAttr(ex.type)}" data-ex-name="${escAttr(ex.name)}">
      <div class="routine-item-check">${chk}</div>
      <span class="routine-item-name">${escHtml(ex.name)}</span>
      ${lastInfo ? `<span class="routine-item-last">${escHtml(lastInfo)}</span>` : ''}
    </div>`;
  });

  routineExtraExercises.forEach((ex, i) => {
    html += `<div class="routine-item active" data-extra="${i}" data-ex-type="${escAttr(ex.type)}" data-ex-name="${escAttr(ex.name)}">
      <div class="routine-item-check">${chk}</div>
      <span class="routine-item-name">${escHtml(ex.name)}</span>
      <button class="routine-item-remove" data-remove-extra="${i}" tabindex="-1">×</button>
    </div>`;
  });

  if (!html) html = `<p style="color:var(--text-muted);font-size:14px;padding:8px 0 4px;">No preset exercises — tap "+ Add Exercise" to build your list.</p>`;

  list.innerHTML = html;

  // Restore unchecked state
  list.querySelectorAll('.routine-item').forEach(item => {
    if (inactiveNames.has(item.dataset.exName)) item.classList.remove('active');
    item.addEventListener('click', e => {
      if (e.target.closest('.routine-item-remove')) return;
      item.classList.toggle('active');
    });
  });
  list.querySelectorAll('.routine-item-remove').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      routineExtraExercises.splice(parseInt(btn.dataset.removeExtra), 1);
      populateRoutinePreview(WORKOUT_TEMPLATES[pendingWorkoutType] || []);
    });
  });
}

function guessExerciseType(name) {
  if (getCardioMachines().some(m => m.toLowerCase() === name.toLowerCase())) return 'cardio';
  const rec = ['sauna','ice bath','stretching','foam roll','rest day','walk','massage'];
  if (rec.includes(name.toLowerCase())) return 'recovery';
  return 'strength';
}
function addRoutineExercise(name) {
  routineExtraExercises.push({ type: guessExerciseType(name), name });
  populateRoutinePreview(WORKOUT_TEMPLATES[pendingWorkoutType] || []);
  openSheet('sheet-routine-preview');
}

function openSessionDetailsSheet() {
  document.getElementById('new-session-day').value = nextDayNumber();
  document.getElementById('new-session-date').value = todayISO();
  document.getElementById('new-session-note').value = '';
  openSheet('sheet-new-session');
  setTimeout(() => document.getElementById('new-session-day').focus(), 300);
}

function preloadTemplateExercises(template) {
  template.forEach(ex => {
    if (ex.type === 'strength') {
      activeSession.exercises.push(makeStrengthExercise(ex.name));
    } else if (ex.type === 'cardio') {
      activeSession.exercises.push({ type:'cardio', name:ex.name, incline:null, speed:null, duration:null, distance:null });
    } else if (ex.type === 'recovery') {
      activeSession.exercises.push({ type:'recovery', name:ex.name, duration:null });
    }
  });
  commitActiveSession();
}

function renderBodyWeightChart() {
  const log     = getWeightLog().slice().sort((a,b) => a.date.localeCompare(b.date));
  const goals   = getGoals();
  const emptyEl = document.getElementById('body-weight-empty');
  const statsEl = document.getElementById('body-weight-stats');
  const listEl  = document.getElementById('body-weight-entries');
  const logWrap = document.getElementById('body-weight-log-list');

  if (!log.length) {
    if (emptyEl) emptyEl.style.display = 'flex';
    statsEl.innerHTML = '';
    if (logWrap) logWrap.style.display = 'none';
    if (bodyWtChart) { bodyWtChart.destroy(); bodyWtChart = null; }
    return;
  }

  if (emptyEl) emptyEl.style.display = 'none';

  const weights = log.map(e => parseFloat(e.weight));
  const current = weights[weights.length - 1];
  const start   = weights[0];
  const change  = (current - start).toFixed(1);
  const changeSign = change >= 0 ? '+' : '';
  const goalWt  = parseFloat(goals.goalWeight) || null;

  statsEl.innerHTML = `
    <div class="stat-card"><div class="stat-value">${current}</div><div class="stat-label">Current (lbs)</div></div>
    <div class="stat-card"><div class="stat-value" style="color:${change >= 0 ? 'var(--accent)' : 'var(--green)'}">${changeSign}${change}</div><div class="stat-label">Change</div></div>
    <div class="stat-card"><div class="stat-value">${goalWt || '—'}</div><div class="stat-label">Goal (lbs)</div></div>`;

  if (logWrap) logWrap.style.display = 'block';
  if (listEl) {
    listEl.innerHTML = [...log].reverse().map((e,i) => {
      const xSVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="14" height="14"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
      return `<div class="weight-entry-row">
        <span class="weight-entry-date">${formatDate(e.date)}</span>
        <div style="display:flex;align-items:center;gap:12px;">
          <span class="weight-entry-val">${e.weight} lbs</span>
          <button class="weight-entry-del" data-date="${escAttr(e.date)}">${xSVG}</button>
        </div>
      </div>`;
    }).join('');
    listEl.querySelectorAll('.weight-entry-del').forEach(btn => {
      btn.addEventListener('click', () => {
        const updated = getWeightLog().filter(e => e.date !== btn.dataset.date);
        saveWeightLog(updated);
        renderBodyWeightChart();
      });
    });
  }

  const labels  = log.map(e => formatDate(e.date));
  const c = chartColors();
  const canvas = document.getElementById('body-weight-chart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (bodyWtChart) { bodyWtChart.destroy(); bodyWtChart = null; }

  const datasets = [{
    data: weights, label: 'Weight',
    borderColor: c.accent, backgroundColor: c.accentFill,
    pointBackgroundColor: c.accent, pointBorderColor: '#fff', pointBorderWidth: 2,
    pointRadius: 4, pointHoverRadius: 7,
    tension: 0.35, fill: true, borderWidth: 2.5,
  }];

  if (goalWt) {
    datasets.push({
      data: Array(log.length).fill(goalWt), label: 'Goal',
      borderColor: 'rgba(217,119,87,0.4)', borderDash: [6, 4],
      backgroundColor: 'transparent', pointRadius: 0, borderWidth: 1.5, tension: 0,
    });
  }

  try {
    bodyWtChart = new Chart(ctx, {
      type: 'line',
      data: { labels, datasets },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: c.tooltip_bg, titleColor: c.tooltip_txt, bodyColor: c.tooltip_txt,
            padding: 12, cornerRadius: 10, filter: item => item.datasetIndex === 0,
            callbacks: { label: item => ` ${item.raw} lbs` },
          },
        },
        scales: {
          x: { ticks: { color: c.tick, font: { size: 11, family: 'Inter', weight: '600' }, maxRotation: 30 }, grid: { color: c.grid } },
          y: { ticks: { color: c.tick, font: { size: 11, family: 'Inter', weight: '600' } }, grid: { color: c.grid } },
        },
      },
    });
  } catch(e) {}
}

function renderCalendar(sessions, container, direction) {
  const today = todayISO();
  const now   = new Date();
  const year  = calMonth.getFullYear();
  const month = calMonth.getMonth();
  const isCurrentMonth = year === now.getFullYear() && month === now.getMonth();

  const dayCounts = {};
  sessions.forEach(s => { dayCounts[s.date] = (dayCounts[s.date] || 0) + 1; });

  const monthTitle = calMonth.toLocaleString('default', { month: 'long', year: 'numeric' });
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth  = new Date(year, month + 1, 0).getDate();

  const plan = getPlan();
  const markers = getMarkers();
  const nowMonth  = new Date(now.getFullYear(), now.getMonth(), 1);
  const dispMonth = new Date(year, month, 1);
  const monthsAhead   = (year - now.getFullYear()) * 12 + (month - now.getMonth());
  const isFutureMonth = dispMonth > nowMonth;

  // Stat under the month title.
  const monthPrefix   = `${year}-${String(month+1).padStart(2,'0')}-`;
  const monthSessions = sessions.filter(s => (s.date || '').startsWith(monthPrefix)).length;
  const isPastMonth   = dispMonth < nowMonth;
  const daysElapsed   = isCurrentMonth ? now.getDate() : (isPastMonth ? daysInMonth : 0);
  let plannedInMonth = 0;
  if (plan && plan.schedule) {
    for (let dd = 1; dd <= daysInMonth; dd++) { if (plan.schedule[new Date(year, month, dd).getDay()]) plannedInMonth++; }
  }
  const wk = n => `workout${n !== 1 ? 's' : ''}`;
  let statHTML;
  if (isFutureMonth) {
    statHTML = plan
      ? `<span class="cal-count-pill planned">${plannedInMonth}</span> ${wk(plannedInMonth)} planned`
      : 'Upcoming';
  } else {
    // Total workouts logged in the month on display, with elapsed-days context
    // only while the month is still in progress.
    const ctx = isCurrentMonth ? ` · ${daysElapsed} day${daysElapsed !== 1 ? 's' : ''} in` : '';
    statHTML = `<span class="cal-count-pill">${monthSessions}</span> ${wk(monthSessions)}${ctx}`;
  }

  // Build grid HTML only (nav stays persistent)
  let gridHTML = '<div class="cal-grid">';
  ['S','M','T','W','T','F','S'].forEach(d => { gridHTML += `<div class="cal-day-header">${d}</div>`; });
  for (let i = 0; i < firstWeekday; i++) gridHTML += '<div class="cal-cell filler"></div>';
  for (let day = 1; day <= daysInMonth; day++) {
    const iso   = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    const count = dayCounts[iso] || 0;
    const isFuture = iso > today;
    const isToday  = iso === today;
    const planned  = plan && plan.schedule ? plan.schedule[new Date(year, month, day).getDay()] : null;
    let cls = 'cal-cell';
    if (isFuture)         cls += ' future';
    else if (count >= 2)  cls += ' workout-2';
    else if (count === 1) cls += ' workout-1';
    if (isToday) cls += ' today';
    if (planned && count === 0) cls += ' planned';
    const dot = (planned && count === 0) ? '<span class="cal-plan-dot"></span>' : '';
    const dayMarkers = markers.filter(m => iso >= m.start && iso <= (m.end || m.start));
    let markerBar = '', markerStyle = '';
    if (dayMarkers.length) {
      const mc = dayMarkers[0].color;
      cls += ' has-marker';
      markerBar = `<span class="cal-marker-bar" style="background:${mc}"></span>`;
      // Tint the day itself when there's no workout shading to compete with, so a
      // multi-day range reads as a solid block on exactly the right days.
      if (count === 0) markerStyle = ` style="color:${mc};background:${mc}22"`;
    }
    gridHTML += `<div class="${cls}" data-date="${iso}"${markerStyle}>${markerBar}${day}${dot}</div>`;
  }
  gridHTML += '</div>';

  const existingWrap = container.querySelector('.cal-grid-wrap');

  if (!existingWrap) {
    // First render — build full structure
    container.innerHTML = `<div class="cal-nav">
      <button class="cal-nav-btn" id="cal-prev">&#8249;</button>
      <div class="cal-month-center">
        <span class="cal-month-title">${monthTitle}</span>
        <span class="cal-month-stat">${statHTML}</span>
      </div>
      <button class="cal-nav-btn" id="cal-next"${monthsAhead >= 24 ? ' disabled' : ''}>&#8250;</button>
    </div><div class="cal-grid-wrap">${gridHTML}</div>`;
  } else {
    // Update nav label + button state
    container.querySelector('.cal-month-title').textContent = monthTitle;
    container.querySelector('.cal-month-stat').innerHTML = statHTML;
    container.querySelector('#cal-next').disabled = monthsAhead >= 24;

    if (direction) {
      // Slide animation
      const wrap    = existingWrap;
      const oldGrid = wrap.querySelector('.cal-grid');
      const startX  = direction === 'next' ? '100%' : '-100%';
      const exitX   = direction === 'next' ? '-100%' : '100%';

      const tmp = document.createElement('div');
      tmp.innerHTML = gridHTML;
      const newGrid = tmp.firstElementChild;

      // Lock wrap height so it doesn't collapse during absolute positioning
      wrap.style.height = wrap.offsetHeight + 'px';
      wrap.style.position = 'relative';
      oldGrid.style.cssText = 'position:absolute;inset:0;width:100%;';
      newGrid.style.cssText = `position:absolute;inset:0;width:100%;transform:translateX(${startX});`;
      wrap.appendChild(newGrid);

      newGrid.getBoundingClientRect(); // force reflow

      const T = 'transform 270ms cubic-bezier(0.4,0,0.2,1)';
      oldGrid.style.transition = T;
      newGrid.style.transition = T;
      oldGrid.style.transform = `translateX(${exitX})`;
      newGrid.style.transform = 'translateX(0)';

      newGrid.addEventListener('transitionend', () => {
        oldGrid.remove();
        newGrid.style.cssText = '';
        wrap.style.height = '';
        wrap.style.position = '';
      }, { once: true });
    } else {
      existingWrap.innerHTML = gridHTML;
    }
  }

  // Re-attach nav button handlers each render (closures capture current year/month)
  const prevBtn = container.querySelector('#cal-prev');
  const nextBtn = container.querySelector('#cal-next');
  if (prevBtn) prevBtn.onclick = () => {
    calMonth = new Date(year, month - 1, 1);
    renderCalendar(getSessions().filter(s => s.completedAt), container, 'prev');
  };
  if (nextBtn) nextBtn.onclick = () => {
    if (monthsAhead >= 24) return;
    calMonth = new Date(year, month + 1, 1);
    renderCalendar(getSessions().filter(s => s.completedAt), container, 'next');
  };

  // Touch swipe + day tap — attach once per container lifetime
  if (!container.dataset.swipeInit) {
    container.dataset.swipeInit = '1';
    let tx = 0, ty = 0, didSwipe = false, lockedHoriz = false;
    container.addEventListener('touchstart', e => {
      tx = e.touches[0].clientX;
      ty = e.touches[0].clientY;
      didSwipe = false;
      lockedHoriz = false;
    }, { passive: true });
    container.addEventListener('touchmove', e => {
      const dx = Math.abs(e.touches[0].clientX - tx);
      const dy = Math.abs(e.touches[0].clientY - ty);
      if (!lockedHoriz && dx > dy && dx > 8) lockedHoriz = true;
      if (lockedHoriz) e.preventDefault();
    }, { passive: false });
    container.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - tx;
      if (!lockedHoriz || Math.abs(dx) < 40) return;
      didSwipe = true;
      const nowCheck = new Date();
      const aheadNow = (calMonth.getFullYear() - nowCheck.getFullYear()) * 12 + (calMonth.getMonth() - nowCheck.getMonth());
      if (dx < 0 && aheadNow >= 24) return;
      const dir = dx < 0 ? 'next' : 'prev';
      calMonth = dir === 'next'
        ? new Date(calMonth.getFullYear(), calMonth.getMonth() + 1, 1)
        : new Date(calMonth.getFullYear(), calMonth.getMonth() - 1, 1);
      renderCalendar(getSessions().filter(s => s.completedAt), container, dir);
    });
    container.addEventListener('click', e => {
      if (didSwipe) { didSwipe = false; return; }
      const cell = e.target.closest('.cal-cell[data-date]');
      if (!cell) return;
      const iso = cell.dataset.date;
      const daySessions = getSessions().filter(s => s.date === iso && s.completedAt);
      if (daySessions.length) { showWorkoutSummary(daySessions[0]); return; }
      // No workout that day — tap edits an existing marker or adds one for this date.
      const dayMarkers = markersOnDate(iso);
      if (dayMarkers.length) openMarkerEditor(dayMarkers[0].id);
      else openMarkerEditor(null, iso);
    });
  }
}

// ═══ Calendar markers (trips, goals, events) ══════════════
const MARKER_COLORS = ['#E5533D','#E8912D','#E0B000','#3DA35D','#2BB3A3','#3B82C4','#8B5CF6','#E0559B'];

function getMarkers()  { try { return JSON.parse(localStorage.getItem(LS.MARKERS)) || []; } catch { return []; } }
function saveMarkers(m) { localStorage.setItem(LS.MARKERS, JSON.stringify(m)); }
function markersOnDate(iso) { return getMarkers().filter(m => iso >= m.start && iso <= (m.end || m.start)); }

function fmtMarkerDate(iso) {
  const d = new Date(iso + 'T12:00:00');
  return isNaN(d) ? iso : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function refreshCalendarMarkers() {
  const heatmap = document.getElementById('activity-heatmap');
  if (heatmap && calMonth) renderCalendar(getSessions().filter(s => s.completedAt), heatmap);
  renderMarkers();
}

function renderMarkers() {
  const wrap = document.getElementById('activity-markers');
  if (!wrap) return;
  const markers = getMarkers().slice().sort((a, b) => a.start.localeCompare(b.start));

  let html = `<div class="markers-head">
    <span class="markers-title">📍 Markers</span>
    <button id="btn-add-marker" class="markers-add" type="button">+ Add</button>
  </div>`;
  if (markers.length) {
    html += `<div class="markers-list">`;
    markers.forEach(m => {
      const range = (m.end && m.end !== m.start) ? `${fmtMarkerDate(m.start)} – ${fmtMarkerDate(m.end)}` : fmtMarkerDate(m.start);
      html += `<div class="marker-row" data-id="${escAttr(m.id)}">
        <span class="marker-swatch" style="background:${m.color}"></span>
        <div class="marker-info">
          <span class="marker-name">${m.emoji ? escHtml(m.emoji) + ' ' : ''}${escHtml(m.title)}</span>
          <span class="marker-range">${range}</span>
        </div>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="15" height="15" stroke-width="2" style="color:var(--text-muted);flex-shrink:0;"><polyline points="9 18 15 12 9 6"/></svg>
      </div>`;
    });
    html += `</div>`;
  } else {
    html += `<p class="markers-empty">Mark trips, goals, race days & events — tap a calendar day or “+ Add”.</p>`;
  }
  wrap.innerHTML = html;

  wrap.querySelector('#btn-add-marker')?.addEventListener('click', () => openMarkerEditor(null));
  wrap.querySelectorAll('.marker-row').forEach(row => row.addEventListener('click', () => openMarkerEditor(row.dataset.id)));
}

let markerDraft = null;
let markerEditingId = null;

function openMarkerEditor(id, prefillDate) {
  markerEditingId = id;
  const m = id ? getMarkers().find(x => x.id === id) : null;
  markerDraft = m
    ? { ...m }
    : { title: '', emoji: '', start: prefillDate || todayISO(), end: '', color: MARKER_COLORS[0] };

  const c = document.getElementById('marker-editor-content');
  if (!c) return;
  const swatches = MARKER_COLORS.map(col =>
    `<button type="button" class="marker-color-swatch${col === markerDraft.color ? ' on' : ''}" data-color="${col}" style="background:${col}"></button>`
  ).join('');

  c.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
      <div class="sheet-title" style="margin-bottom:0;">${id ? 'Edit Marker' : 'New Marker'}</div>
      <button class="btn btn-ghost" type="button" onclick="closeSheet()" style="font-size:13px;padding:6px 12px;min-height:32px;">Cancel</button>
    </div>
    <div class="form-group"><label>Title</label>
      <input type="text" id="marker-title" placeholder="e.g. Hawaii Trip" value="${escAttr(markerDraft.title)}" autocomplete="off" autocorrect="off"></div>
    <div style="display:grid;grid-template-columns:78px 1fr;gap:12px;">
      <div class="form-group"><label>Emoji</label>
        <input type="text" id="marker-emoji" placeholder="🌴" value="${escAttr(markerDraft.emoji || '')}" maxlength="4" style="text-align:center;"></div>
      <div class="form-group"><label>Color</label>
        <div class="marker-colors" id="marker-colors">${swatches}</div></div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
      <div class="form-group"><label>Start date</label><input type="date" id="marker-start" value="${escAttr(markerDraft.start)}"></div>
      <div class="form-group"><label>End date (optional)</label><input type="date" id="marker-end" value="${escAttr(markerDraft.end || '')}"></div>
    </div>
    <button class="btn btn-primary" type="button" id="btn-save-marker" style="width:100%;justify-content:center;min-height:52px;border-radius:14px;font-weight:800;margin-top:8px;">${id ? 'Save' : 'Add Marker'}</button>
    ${id ? `<button class="btn btn-ghost" type="button" id="btn-delete-marker" style="width:100%;justify-content:center;min-height:40px;color:var(--danger);margin-top:8px;font-size:13px;">Delete Marker</button>` : ''}`;

  c.querySelectorAll('.marker-color-swatch').forEach(b => b.addEventListener('click', () => {
    markerDraft.color = b.dataset.color;
    c.querySelectorAll('.marker-color-swatch').forEach(x => x.classList.toggle('on', x.dataset.color === markerDraft.color));
  }));
  document.getElementById('btn-save-marker').addEventListener('click', saveMarkerFromEditor);
  document.getElementById('btn-delete-marker')?.addEventListener('click', deleteMarkerFromEditor);
  openSheet('sheet-marker-editor');
}

function saveMarkerFromEditor() {
  const title = document.getElementById('marker-title').value.trim();
  if (!title) { toast('Give it a title'); return; }
  const start = document.getElementById('marker-start').value;
  if (!start) { toast('Pick a start date'); return; }
  let end = document.getElementById('marker-end').value || start;
  if (end < start) end = start;
  const emoji = document.getElementById('marker-emoji').value.trim();
  const color = markerDraft.color;

  const markers = getMarkers();
  if (markerEditingId) {
    const m = markers.find(x => x.id === markerEditingId);
    if (m) Object.assign(m, { title, start, end, emoji, color });
  } else {
    markers.push({ id: 'mk_' + Date.now() + '_' + Math.random().toString(36).slice(2,6), title, start, end, emoji, color });
  }
  saveMarkers(markers);
  closeSheet();
  toast(markerEditingId ? 'Marker updated ✓' : 'Marker added ✓');
  refreshCalendarMarkers();
}

function deleteMarkerFromEditor() {
  if (!markerEditingId) return;
  if (!confirm('Delete this marker?')) return;
  saveMarkers(getMarkers().filter(m => m.id !== markerEditingId));
  closeSheet();
  toast('Marker deleted');
  refreshCalendarMarkers();
}

function renderActivityChart() {
  const sessions = getSessions().filter(s => s.completedAt);
  const goals    = getGoals();
  const target   = parseInt(goals.weeklyTarget) || 4;
  const statsEl  = document.getElementById('activity-stats');
  const now      = new Date();
  const total    = sessions.length;
  const streak   = getCurrentStreak();

  // This-week count for the stat card
  const weekStart = new Date(now); weekStart.setDate(now.getDate() - now.getDay()); weekStart.setHours(0,0,0,0);
  const weekEnd   = new Date(weekStart); weekEnd.setDate(weekStart.getDate() + 7);
  const thisWeek  = sessions.filter(s => { const d = new Date(s.date + 'T12:00:00'); return d >= weekStart && d < weekEnd; }).length;

  let totalVol = 0;
  sessions.forEach(s => (s.exercises||[]).forEach(ex => {
    if (ex.type==='strength') (ex.sets||[]).forEach(set => {
      if (set.weight!=null && set.reps!=null)
        totalVol += normalizeWeight(set.weight, set.weightUnit) * (parseFloat(set.reps)||0);
    });
  }));
  const volStr = totalVol >= 1000000 ? `${(totalVol/1000000).toFixed(1)}M`
               : totalVol >= 1000    ? `${Math.round(totalVol/1000)}k`
               : `${Math.round(totalVol)}`;

  if (statsEl) statsEl.innerHTML = `
    <div class="stat-card"><div class="stat-value">${total}</div><div class="stat-label">Sessions</div></div>
    <div class="stat-card"><div class="stat-value">${volStr}</div><div class="stat-label">Lbs Lifted</div></div>`;

  // ── Monthly calendar ─────────────────────────────────────
  const heatmap = document.getElementById('activity-heatmap');
  if (heatmap) {
    if (!calMonth) { calMonth = new Date(); calMonth.setDate(1); calMonth.setHours(0,0,0,0); }
    renderCalendar(sessions, heatmap);
  }
  try { renderMarkers(); } catch (_) {}

  // ── Workout type breakdown ────────────────────────────────
  const breakdown = document.getElementById('activity-type-breakdown');
  if (breakdown) {
    if (!sessions.length) { breakdown.innerHTML = ''; return; }
    const typeCounts = {};
    sessions.forEach(s => { const t = s.workoutType||'custom'; typeCounts[t]=(typeCounts[t]||0)+1; });
    const sorted = Object.entries(typeCounts).sort((a,b)=>b[1]-a[1]);
    breakdown.innerHTML = sorted.map(([type, count]) => {
      const def = WORKOUT_TYPES.find(t=>t.key===type);
      return `<span class="activity-type-chip"><span class="activity-type-emoji">${def?.emoji||'💪'}</span><span class="activity-type-label">${def?.label||type}</span><span class="activity-type-count">${count}</span></span>`;
    }).join('');
  }

  if (activityChart) { activityChart.destroy(); activityChart = null; }
}

// ─── History view ─────────────────────────────────────────
// ─── Backup nudge ─────────────────────────────────────────
const BACKUP_THRESHOLD_FIRST = 5;   // sessions before first nudge
const BACKUP_THRESHOLD       = 10;  // sessions between subsequent nudges

function backupSessionCount() {
  return parseInt(localStorage.getItem(LS.BACKUP_COUNT) || '-1');
}
function nudgeDismissedCount() {
  return parseInt(localStorage.getItem(LS.NUDGE_DISMISSED) || '-1');
}
function markBackupDone() {
  const count = getSessions().filter(s => s.completedAt).length;
  localStorage.setItem(LS.BACKUP_COUNT, String(count));
  localStorage.setItem(LS.NUDGE_DISMISSED, String(count));
  localStorage.setItem(LS.BACKUP_AT, String(Date.now()));
  try { renderBackupBanner(); } catch (_) {}
}

function lastBackupAt() { return parseInt(localStorage.getItem(LS.BACKUP_AT) || '0') || 0; }

// How far the data has drifted from the last real backup. Everything lives in
// this browser's storage, so this is the number that matters most.
function backupDebt() {
  const done  = getSessions().filter(s => s.completedAt).length;
  const saved = parseInt(localStorage.getItem(LS.BACKUP_COUNT) || '-1');
  const at    = lastBackupAt();
  return {
    unsaved: saved < 0 ? done : Math.max(0, done - saved),
    days: at ? Math.floor((Date.now() - at) / 86400000) : null,
    never: !at,
    total: done,
  };
}

// A standing, honest line on Today about how exposed the data is.
function renderBackupBanner() {
  const wrap = document.getElementById('today-backup');
  if (!wrap) return;
  const d = backupDebt();
  if (d.total === 0 || (d.unsaved === 0 && d.days !== null && d.days < 30)) { wrap.innerHTML = ''; return; }
  const urgent = d.never ? d.total >= 3 : (d.unsaved >= 5 || (d.days !== null && d.days >= 30));
  const detail = d.never
    ? `${d.total} session${d.total !== 1 ? 's' : ''} have never been backed up.`
    : d.unsaved > 0
      ? `${d.unsaved} session${d.unsaved !== 1 ? 's' : ''} since your last backup${d.days !== null ? `, ${d.days} day${d.days !== 1 ? 's' : ''} ago` : ''}.`
      : `Last backup was ${d.days} days ago.`;
  wrap.innerHTML = `<div class="backup-banner${urgent ? ' urgent' : ''}">
    <div class="backup-banner-text">
      <strong>${urgent ? 'Back up your training' : 'Backup due'}</strong>
      <span>${escHtml(detail)} It only lives on this device.</span>
    </div>
    <button type="button" class="btn btn-primary" id="today-backup-btn"
      style="font-size:12.5px;padding:8px 14px;min-height:36px;flex-shrink:0;">Back up</button>
  </div>`;
  document.getElementById('today-backup-btn')?.addEventListener('click', doBackupFromNudge);
}
function shouldShowBackupNudge() {
  const completed = getSessions().filter(s => s.completedAt).length;
  if (completed === 0) return false;
  const lastBackup = backupSessionCount();
  const dismissed  = nudgeDismissedCount();
  const threshold  = lastBackup < 0 ? BACKUP_THRESHOLD_FIRST : BACKUP_THRESHOLD;
  const baseline   = Math.max(lastBackup, dismissed, 0);
  return completed - baseline >= threshold;
}
function dismissBackupNudge() {
  const count = getSessions().filter(s => s.completedAt).length;
  localStorage.setItem(LS.NUDGE_DISMISSED, String(count));
  document.getElementById('backup-nudge')?.remove();
}
function autoBackupIfNeeded() {
  const completed = getSessions().filter(s => s.completedAt).length;
  if (completed <= 0 || completed % 5 !== 0) return;
  setTimeout(() => {
    const backup = { exportedAt: new Date().toISOString(), version: APP_VERSION, data: {} };
    Object.values(LS).forEach(key => { const v = localStorage.getItem(key); if (v !== null) backup.data[key] = v; });
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const file = new File([blob], `g3-backup-${todayISO()}.json`, { type: 'application/json' });
    if (navigator.canShare?.({ files: [file] })) {
      // Only a share that completes counts. Cancelling it used to be recorded as
      // a successful backup, leaving nothing saved and the app no longer asking.
      navigator.share({ files: [file], title: 'G3 Workout Backup' })
        .then(() => { markBackupDone(); toast('Backup saved \u2713'); })
        .catch(() => { try { renderBackupBanner(); } catch (_) {} });
    } else {
      const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
      a.download = `g3-backup-${todayISO()}.json`; a.click(); URL.revokeObjectURL(a.href);
      markBackupDone();
      toast('Backup saved \u2713');
    }
  }, 2000);
}

function doBackupFromNudge() {
  const backup = { exportedAt: new Date().toISOString(), version: APP_VERSION, data: {} };
  Object.values(LS).forEach(key => {
    const v = localStorage.getItem(key);
    if (v !== null) backup.data[key] = v;
  });
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `g3-backup-${todayISO()}.json`;
  a.click(); URL.revokeObjectURL(a.href);
  markBackupDone();
  document.getElementById('backup-nudge')?.remove();
  toast('Full backup saved!');
}

function getCurrentStreak() {
  const dates = new Set(getSessions().filter(s => s.completedAt).map(s => s.date));
  let streak = 0;
  const d = new Date(todayISO());
  if (!dates.has(d.toISOString().split('T')[0])) d.setDate(d.getDate() - 1);
  while (dates.has(d.toISOString().split('T')[0])) {
    streak++;
    d.setDate(d.getDate() - 1);
  }
  return streak;
}

function getSessionPRNames(sess) {
  if (!sess.completedAt) return [];
  const prior = {};
  getSessions().filter(s => s.completedAt && s.completedAt < sess.completedAt).forEach(s => {
    (s.exercises||[]).forEach(ex => {
      if (ex.type !== 'strength') return;
      const key = ex.name.toLowerCase();
      (ex.sets||[]).forEach(set => {
        const w = normalizeWeight(set.weight, set.weightUnit);
        if (w > 0) prior[key] = Math.max(prior[key]||0, w);
      });
    });
  });
  const prs = [];
  (sess.exercises||[]).forEach(ex => {
    if (ex.type !== 'strength') return;
    const key = ex.name.toLowerCase();
    if (!prior[key]) return;
    const sessionMax = Math.max(0, ...(ex.sets||[]).map(s => normalizeWeight(s.weight, s.weightUnit)));
    if (sessionMax > prior[key]) prs.push(ex.name);
  });
  return prs;
}

function ensureDayNumbers() {
  const all = getSessions();
  const completed = all.filter(s => s.completedAt).sort((a,b) => a.completedAt - b.completedAt);
  let changed = false;
  let counter = 1;
  completed.forEach(s => {
    if (!s.dayNumber) { s.dayNumber = counter; changed = true; }
    counter = Math.max(counter, s.dayNumber) + 1;
  });
  if (changed) saveSessions(all);
}

const GOAL_META = {
  muscle:   { emoji: '💪', label: 'Build Muscle' },
  lose:     { emoji: '🔥', label: 'Lose Weight' },
  fitness:  { emoji: '🏃', label: 'Get Conditioned' },
  maintain: { emoji: '⚡', label: 'General Fitness' },
};

function renderGoalsCard() {
  const wrap = document.getElementById('goals-reminder-wrap');
  if (!wrap) return;
  const goals = getGoals();
  if (!goals.goalTypes?.length) { wrap.innerHTML = ''; return; }

  const sessions = getSessions().filter(s => s.completedAt);
  const streak = getCurrentStreak();
  const target = parseInt(goals.weeklyTarget) || 0;
  const now = new Date();
  const weekStart = new Date(now); weekStart.setDate(now.getDate() - now.getDay()); weekStart.setHours(0,0,0,0);
  const weekEnd = new Date(weekStart); weekEnd.setDate(weekStart.getDate() + 7);
  const thisWeek = sessions.filter(s => { const d = new Date(s.date + 'T12:00:00'); return d >= weekStart && d < weekEnd; }).length;

  const recentPRs = sessions.length ? getSessionPRNames(sessions[0]) : [];

  const goalTags = goals.goalTypes.map(k => {
    const m = GOAL_META[k] || { emoji: '🎯', label: k };
    return `${m.emoji} ${m.label}`;
  }).join('  ·  ');
  const pct = target ? Math.min(100, Math.round((thisWeek / target) * 100)) : 0;
  const winHtml = recentPRs.length
    ? `<div class="goal-remind-win">🏆 Last session PR: ${escHtml(recentPRs[0])}</div>`
    : '';

  wrap.innerHTML = `<div class="goal-remind-card">
    <div class="grc-top">
      <div class="grc-week">
        <span class="grc-week-val">${thisWeek}${target ? `<span class="grc-week-target">/${target}</span>` : ''}</span>
        <span class="grc-week-label">Workouts this week</span>
      </div>
      ${streak >= 2 ? `<span class="grc-streak">🔥 ${streak} day${streak > 1 ? 's' : ''}</span>` : ''}
    </div>
    ${target ? `<div class="grc-bar"><span style="width:${pct}%"></span></div>` : ''}
    <div class="grc-goals">${escHtml(goalTags)}</div>
    ${winHtml}
  </div>`;
}

function renderHistory() {
  const list = document.getElementById('history-list');
  ensureDayNumbers();
  const sessions = getSessions().filter(s => s.completedAt).sort((a,b) => b.completedAt - a.completedAt);
  const inProgress = loadActiveSession();
  const banner = document.getElementById('resume-banner');
  if (inProgress) { banner.classList.add('visible'); activeSession = inProgress; }
  else banner.classList.remove('visible');

  try { renderPlanToday(); } catch (_) {}
  try { renderGoalsCard(); } catch (_) {}

  const streak = getCurrentStreak();
  const streakEl = document.getElementById('history-streak');
  if (streakEl) streakEl.textContent = streak >= 2 ? `${streak}-day streak` : '';

  const nudgeContainer = document.getElementById('backup-nudge-wrap');
  if (nudgeContainer) {
    if (shouldShowBackupNudge()) {
      nudgeContainer.innerHTML = `<div id="backup-nudge" class="backup-nudge">
        <div class="backup-nudge-text">
          <strong>Back up your data</strong>
          <span>Keep your history safe — takes 2 seconds.</span>
        </div>
        <div class="backup-nudge-actions">
          <button class="btn btn-primary" onclick="doBackupFromNudge()" style="font-size:12px;padding:6px 14px;min-height:32px;">Backup</button>
          <button class="btn-icon" onclick="dismissBackupNudge()" style="padding:6px 10px;font-size:18px;color:var(--text-muted);background:none;border:none;cursor:pointer;">&times;</button>
        </div>
      </div>`;
    } else {
      nudgeContainer.innerHTML = '';
    }
  }

  if (!sessions.length) {
    list.innerHTML = `<div class="empty-state" style="margin-top:20px;">
      <div class="icon">📋</div><h3>No sessions yet</h3>
      <p>Tap "New Session" to log your first workout</p>
    </div>`;
    return;
  }
  // Remembered expand state — prune ids for sessions that no longer exist.
  const expanded = getExpandedSessions();
  const existingIds = new Set(sessions.map(s => s.id));
  let pruned = false;
  [...expanded].forEach(id => { if (!existingIds.has(id)) { expanded.delete(id); pruned = true; } });
  if (pruned) saveExpandedSessions(expanded);

  list.innerHTML = '';
  sessions.forEach(sess => {
    const card = document.createElement('div');
    card.className = 'card session-card' + (expanded.has(sess.id) ? ' expanded' : '');
    card.innerHTML = buildSessionCardHTML(sess);
    // Tap the header to expand/collapse the details dropdown (remembered).
    card.querySelector('.session-head')?.addEventListener('click', () => {
      const nowExpanded = card.classList.toggle('expanded');
      const set = getExpandedSessions();
      if (nowExpanded) set.add(sess.id); else set.delete(sess.id);
      saveExpandedSessions(set);
    });
    // "Details" opens the full per-set / edit sheet.
    card.querySelector('.session-details-btn')?.addEventListener('click', e => {
      e.stopPropagation();
      openSessionDetail(sess);
    });
    card.querySelector('.session-repeat-btn')?.addEventListener('click', e => {
      e.stopPropagation();
      repeatSession(sess);
    });
    card.querySelector('.session-share-btn')?.addEventListener('click', e => {
      e.stopPropagation();
      openShareCard(sess);
    });
    list.appendChild(card);
  });
}

function getExpandedSessions() {
  try { return new Set(JSON.parse(localStorage.getItem('g3_expanded_sessions')) || []); } catch { return new Set(); }
}
function saveExpandedSessions(set) {
  try { localStorage.setItem('g3_expanded_sessions', JSON.stringify([...set])); } catch {}
}

// ═══ Repeat a workout ═════════════════════════════════════
// Rebuilds the same exercises for today. Weights stay empty — last session's
// numbers surface automatically as placeholders (targets to beat).
function repeatSession(sess) {
  if (activeSession) {
    if (!confirm('You already have a session in progress. Discard it and start this repeat?')) return;
    stopRestTimer();
    discardActiveSession();
  }
  startNewSession(nextDayNumber(), todayISO(), '', sess.workoutType || 'custom');
  if (sess.customName) activeSession.customName = sess.customName;

  (sess.exercises || []).forEach(ex => {
    if (ex.type === 'strength') {
      const meta = getMetaFor(ex.name);
      const n = Math.max(1, (ex.sets || []).length);
      const sets = [];
      for (let i = 0; i < n; i++) {
        sets.push({ weight: null, weightUnit: ex.sets?.[i]?.weightUnit || 'lbs', reps: null });
      }
      const nx = { type: 'strength', name: ex.name, sets };
      const rest = ex.restSeconds || meta.restSeconds;
      if (rest) nx.restSeconds = rest;
      if (meta.targetReps) nx.targetReps = parseInt(meta.targetReps) || null;
      activeSession.exercises.push(nx);
    } else if (ex.type === 'cardio') {
      activeSession.exercises.push({ type:'cardio', name: ex.name, incline:null, speed:null, duration:null, distance:null });
    } else if (ex.type === 'recovery') {
      activeSession.exercises.push({ type:'recovery', name: ex.name, duration:null });
    }
  });
  commitActiveSession();
  showView('log');
  toast('Repeating — last numbers are your targets');
}

// ═══ Shareable workout card (1080×1920) ═══════════════════
// ═══ Shareable workout card ═══════════════════════════════
const CARD_ACCENTS = ['#E5533D','#E8912D','#E0B000','#3DA35D','#2BB3A3','#3B82C4','#8B5CF6','#E0559B'];
let shareCardSess = null;
let shareCardOpts = { accent: null, light: false };
let shareCardBlob = null;

function skinAccent() {
  return (getComputedStyle(document.documentElement).getPropertyValue('--accent') || '').trim() || '#C4603A';
}
function compactNum(v) {
  return v >= 1000 ? (v / 1000).toFixed(v >= 10000 ? 0 : 1) + 'k' : String(Math.round(v));
}
function allTimeStats() {
  const done = getSessions().filter(s => s.completedAt);
  let vol = 0;
  done.forEach(s => (s.exercises || []).forEach(ex => {
    if (ex.type !== 'strength') return;
    (ex.sets || []).forEach(set => {
      if (set.weight != null && set.reps != null) vol += normalizeWeight(set.weight, set.weightUnit) * (parseFloat(set.reps) || 0);
    });
  }));
  return { workouts: done.length, streak: getCurrentStreak(), volume: vol };
}
function monthStatsFor(dateISO) {
  const prefix = (dateISO || todayISO()).slice(0, 7); // YYYY-MM
  const inMonth = getSessions().filter(s => s.completedAt && (s.date || '').startsWith(prefix));
  let vol = 0, prs = 0;
  inMonth.forEach(s => {
    (s.exercises || []).forEach(ex => {
      if (ex.type !== 'strength') return;
      (ex.sets || []).forEach(set => {
        if (set.weight != null && set.reps != null) vol += normalizeWeight(set.weight, set.weightUnit) * (parseFloat(set.reps) || 0);
      });
    });
    prs += getSessionPRNames(s).length;
  });
  const d = new Date((dateISO || todayISO()) + 'T12:00:00');
  const label = isNaN(d) ? 'THIS MONTH' : d.toLocaleString('default', { month: 'long' }).toUpperCase();
  return { workouts: inMonth.length, volume: vol, prs, label };
}

function topLiftsAllTime(n) {
  const best = {};
  getSessions().filter(s => s.completedAt).forEach(s => (s.exercises || []).forEach(ex => {
    if (ex.type !== 'strength') return;
    (ex.sets || []).forEach(set => {
      const w = normalizeWeight(set.weight, set.weightUnit);
      if (w > 0) best[ex.name] = Math.max(best[ex.name] || 0, w);
    });
  }));
  return Object.entries(best).sort((a, b) => b[1] - a[1]).slice(0, n);
}

// Per-exercise line for the card: name + its top set (weight x reps).
function cardExerciseRows(sess) {
  return (sess.exercises || []).map(ex => {
    if (ex.type === 'strength') {
      const done = (ex.sets || []).filter(s => s.weight != null && s.reps != null);
      if (!done.length) {
        const n = (ex.sets || []).length;
        return { name: ex.name, detail: n ? `${n} set${n !== 1 ? 's' : ''}` : '' };
      }
      let best = done[0];
      done.forEach(s => {
        const w = normalizeWeight(s.weight, s.weightUnit);
        const bw = normalizeWeight(best.weight, best.weightUnit);
        if (w > bw || (w === bw && (parseInt(s.reps) || 0) > (parseInt(best.reps) || 0))) best = s;
      });
      const unit = best.weightUnit === 'each_side' ? '/side' : '';
      // Bodyweight moves log 0 lb — show reps alone rather than "0 × 20".
      if (!(parseFloat(best.weight) > 0)) return { name: ex.name, detail: `${best.reps} reps` };
      return { name: ex.name, detail: `${best.weight}${unit} × ${best.reps}` };
    }
    if (ex.type === 'cardio') {
      const parts = [];
      if (ex.duration != null) parts.push(`${ex.duration} min`);
      if (ex.distance != null) parts.push(`${ex.distance} mi`);
      return { name: ex.name, detail: parts.join('  ·  ') };
    }
    return { name: ex.name, detail: ex.duration != null ? `${ex.duration} min` : '' };
  });
}

// Draws the 1080x1920 card. opts: { accent (null = current skin), light }
async function buildWorkoutCard(sess, opts) {
  try { if (document.fonts?.ready) await document.fonts.ready; } catch {}
  const W = 1080, H = 1920, PAD = 80;
  const cv = document.createElement('canvas');
  cv.width = W; cv.height = H;
  const g = cv.getContext('2d');

  const accent = opts.accent || skinAccent();
  const light  = !!opts.light;
  const BG    = light ? '#F5F2EC' : '#0C0C0A';
  const FG    = light ? '#0C0C0A' : '#FFFFFF';
  const MUTED = light ? 'rgba(12,12,10,0.52)' : 'rgba(255,255,255,0.55)';
  const RULE  = light ? 'rgba(12,12,10,0.13)' : 'rgba(255,255,255,0.14)';
  const F = (w, s) => `${w} ${s}px Archivo, system-ui, sans-serif`;

  // ── Gather everything first so the layout can be measured, not guessed ──
  const typeLabel = (sessionTypeLabel(sess) || 'Training').replace(/[^\x20-\x7E]/g, '').trim() || 'Training';
  const strength = (sess.exercises || []).filter(e => e.type === 'strength');
  let vol = 0, setCount = 0;
  strength.forEach(ex => (ex.sets || []).forEach(s => {
    if (s.weight != null && s.reps != null) {
      vol += normalizeWeight(s.weight, s.weightUnit) * (parseFloat(s.reps) || 0);
      setCount++;
    }
  }));
  const prNames = getSessionPRNames(sess);
  const rows = cardExerciseRows(sess);

  const mo = monthStatsFor(sess.date);
  const at = allTimeStats();
  let tops = topLiftsAllTime(3);
  g.font = F(600, 26);
  let topsLine = tops.map(t => `${t[0]} ${Math.round(t[1])}`).join('   ·   ');
  while (tops.length > 1 && g.measureText(topsLine).width > W - PAD * 2) {
    tops = tops.slice(0, tops.length - 1);
    topsLine = tops.map(t => `${t[0]} ${Math.round(t[1])}`).join('   ·   ');
  }

  // ── Fit every exercise: shrink the hero, then the rows, until it all lands ──
  const BLOCK_H = 138, BLOCK_GAP = 50;
  const monthH   = BLOCK_H;
  const allTimeH = BLOCK_H + (tops.length ? 52 : 0);
  const headerH  = 424 + (prNames.length ? 102 : 0);
  const availBot = H - 150;
  const SCALES = [
    { h: 46, nf: 34, df: 28 }, { h: 42, nf: 31, df: 26 },
    { h: 38, nf: 29, df: 24 }, { h: 34, nf: 26, df: 22 }, { h: 30, nf: 23, df: 20 },
  ];
  const topFor  = hh => (hh ? hh + 120 : 300);
  const listFor = sc => (rows.length ? 46 + rows.length * sc.h : 0);
  const needFor = sc => headerH + listFor(sc) + monthH + BLOCK_GAP + allTimeH;

  let heroH = 0, scale = SCALES[SCALES.length - 1];
  const heroOptions = sess.photo ? [700, 560, 440, 0] : [0];
  let placed = false;
  for (const hh of heroOptions) {
    for (const sc of SCALES) {
      if ((availBot - topFor(hh)) - needFor(sc) >= 40) { heroH = hh; scale = sc; placed = true; break; }
    }
    if (placed) break;
  }
  if (!placed) heroH = sess.photo ? 440 : 0;

  g.fillStyle = BG; g.fillRect(0, 0, W, H);
  g.textAlign = 'left';

  let photoDrawn = false;
  if (sess.photo && heroH) {
    try {
      const img = new Image();
      img.src = sess.photo;
      await (img.decode ? img.decode() : new Promise(r => { img.onload = r; img.onerror = r; }));
      const sc = Math.max(W / img.width, heroH / img.height);
      const dw = img.width * sc, dh = img.height * sc;
      g.save(); g.beginPath(); g.rect(0, 0, W, heroH); g.clip();
      g.drawImage(img, (W - dw) / 2, (heroH - dh) / 2, dw, dh);
      const scrim = g.createLinearGradient(0, heroH * 0.45, 0, heroH);
      scrim.addColorStop(0, light ? 'rgba(245,242,236,0)' : 'rgba(12,12,10,0)');
      scrim.addColorStop(1, BG);
      g.fillStyle = scrim; g.fillRect(0, 0, W, heroH);
      g.restore();
      photoDrawn = true;
    } catch {}
  }
  if (!photoDrawn) {
    const grad = g.createLinearGradient(0, 0, 0, 900);
    grad.addColorStop(0, accent); grad.addColorStop(1, BG);
    g.save(); g.globalAlpha = light ? 0.24 : 0.34; g.fillStyle = grad; g.fillRect(0, 0, W, 900); g.restore();
  }

  const availTop = topFor(photoDrawn ? heroH : 0);
  const slack  = (availBot - availTop) - needFor(scale);
  const startY = availTop + (slack > 60 ? slack * 0.22 : 0);
  const gap    = slack > 60 ? slack * 0.46 : 46;

  // ── This workout ──
  let y = startY;
  g.fillStyle = accent; g.font = F(800, 38);
  g.fillText(typeLabel.toUpperCase(), PAD, y);
  y += 140;

  g.fillStyle = FG; g.font = '900 150px Archivo, system-ui, sans-serif';
  g.fillText(`DAY ${sess.dayNumber || 1}`, PAD, y);
  y += 56;

  g.fillStyle = MUTED; g.font = F(600, 34);
  g.fillText(formatDate(sess.date), PAD, y);
  y += 100;

  const statRow = (items, yy, valSize, labSize) => {
    const colW = (W - PAD * 2) / 3;
    items.forEach((it, i) => {
      const cx = PAD + colW * i;
      g.fillStyle = FG; g.font = F(800, valSize);
      g.fillText(it[0], cx, yy);
      g.fillStyle = MUTED; g.font = F(700, labSize);
      g.fillText(it[1], cx, yy + labSize + 14);
    });
  };
  statRow([[compactNum(vol), 'LBS MOVED'], [String(setCount), 'SETS'],
           [formatDuration(sess.startedAt, sess.completedAt) || '—', 'TIME']], y, 62, 24);
  y += 128;

  if (prNames.length) {
    g.fillStyle = accent; g.font = F(800, 34);
    g.fillText(`${prNames.length} NEW PR${prNames.length > 1 ? 'S' : ''}`, PAD, y);
    y += 44;
    g.fillStyle = MUTED; g.font = F(600, 28);
    g.fillText(prNames.slice(0, 3).join('  ·  '), PAD, y);
    y += 58;
  }

  // Every exercise, with its top set right-aligned.
  if (rows.length) {
    g.fillStyle = MUTED; g.font = F(700, 24);
    g.fillText('EXERCISES', PAD, y); y += 46;
    rows.forEach(r => {
      g.font = F(700, scale.df);
      const dw = r.detail ? g.measureText(r.detail).width : 0;
      g.font = F(600, scale.nf);
      let nm = r.name;
      const room = (W - PAD * 2) - dw - 26;
      if (g.measureText(nm).width > room) {
        while (nm.length > 3 && g.measureText(nm + '…').width > room) nm = nm.slice(0, -1);
        nm += '…';
      }
      g.fillStyle = FG; g.textAlign = 'left';
      g.fillText(nm, PAD, y);
      if (r.detail) {
        g.fillStyle = MUTED; g.font = F(700, scale.df); g.textAlign = 'right';
        g.fillText(r.detail, W - PAD, y);
        g.textAlign = 'left';
      }
      y += scale.h;
    });
  }

  // ── Rolled-up stat blocks: the month, then all time ──
  const drawStatBlock = (title, items, topY) => {
    g.strokeStyle = RULE; g.lineWidth = 2;
    g.beginPath(); g.moveTo(PAD, topY); g.lineTo(W - PAD, topY); g.stroke();
    let yy = topY + 48;
    g.fillStyle = accent; g.font = F(800, 24);
    g.fillText(title, PAD, yy);
    yy += 56;
    statRow(items, yy, 52, 21);
    return yy + 34;
  };

  const monthBottom = drawStatBlock(mo.label, [
    [String(mo.workouts), 'WORKOUTS'],
    [String(mo.prs), mo.prs === 1 ? 'PR' : 'PRS'],
    [compactNum(mo.volume), 'LBS LIFTED'],
  ], y + gap);

  const atBottom = drawStatBlock('ALL TIME', [
    [String(at.workouts), 'WORKOUTS'],
    [String(at.streak), 'DAY STREAK'],
    [compactNum(at.volume), 'LBS LIFTED'],
  ], monthBottom + BLOCK_GAP);

  if (tops.length) {
    g.fillStyle = MUTED; g.font = F(600, 26);
    g.fillText(topsLine, PAD, atBottom + 52);
  }

  g.fillStyle = accent; g.font = F(800, 30);
  g.fillText('G3 WORKOUT', PAD, H - 70);
  const who = localStorage.getItem(LS.NAME) || '';
  if (who) {
    g.fillStyle = MUTED; g.textAlign = 'right';
    g.fillText(who.toUpperCase(), W - PAD, H - 70);
    g.textAlign = 'left';
  }
  return cv;
}

function openShareCard(sess) {
  shareCardSess = sess;
  shareCardOpts = { accent: null, light: false };
  const wrap = document.getElementById('card-swatches');
  if (wrap) {
    wrap.innerHTML = [''].concat(CARD_ACCENTS).map((a, i) =>
      `<button type="button" class="card-swatch${i === 0 ? ' on' : ''}" data-accent="${a}" style="background:${a || skinAccent()}"></button>`
    ).join('');
    wrap.querySelectorAll('.card-swatch').forEach(btn => btn.addEventListener('click', () => {
      shareCardOpts.accent = btn.dataset.accent || null;
      wrap.querySelectorAll('.card-swatch').forEach(b => b.classList.toggle('on', b === btn));
      renderShareCardPreview();
    }));
  }
  const lightBtn = document.getElementById('btn-share-light');
  if (lightBtn) lightBtn.classList.remove('on');
  renderShareCardPreview();
  openSheet('sheet-share-card');
}

async function renderShareCardPreview() {
  const img = document.getElementById('share-card-preview');
  if (!img || !shareCardSess) return;
  try {
    const cv = await buildWorkoutCard(shareCardSess, shareCardOpts);
    img.src = cv.toDataURL('image/jpeg', 0.82);
    shareCardBlob = await new Promise(res => cv.toBlob(res, 'image/jpeg', 0.92));
  } catch { toast('Could not build card'); }
}

async function doShareCard() {
  const sess = shareCardSess;
  if (!shareCardBlob || !sess) { toast('Still building\u2026'); return; }
  const file = new File([shareCardBlob], `g3-day${sess.dayNumber || 1}.jpg`, { type: 'image/jpeg' });
  const typeLabel = (sessionTypeLabel(sess) || 'Training').replace(/[^\x20-\x7E]/g, '').trim() || 'Training';
  const text = `Day ${sess.dayNumber || 1} \u2014 ${typeLabel} \u2713`;
  if (navigator.canShare?.({ files: [file] })) {
    try { await navigator.share({ files: [file], text }); return; }
    catch (e) { if (e && e.name === 'AbortError') return; }
  }
  const a = document.createElement('a');
  a.href = URL.createObjectURL(shareCardBlob);
  a.download = file.name;
  a.click();
  URL.revokeObjectURL(a.href);
  toast('Card saved \u2713');
}

// ═══ Recap — Wrapped-style period stories ═════════════════
const RECAP_PERIODS = [
  { key: 'day',     label: 'Day' },
  { key: 'week',    label: 'Week' },
  { key: 'month',   label: 'Month' },
  { key: 'quarter', label: 'Quarter' },
  { key: 'year',    label: 'Year' },
];
// Card art: flat saturated colour fields + one bold geometric motif per card.
// bg = the field, ink = the headline, acc = the motif and the unit label.
const RECAP_THEMES = [
  { bg:'#C8F135', ink:'#141414', acc:'#FF4B2B' },
  { bg:'#FF2D87', ink:'#FFFFFF', acc:'#FFE14D' },
  { bg:'#1B3BFF', ink:'#FFFFFF', acc:'#C8F135' },
  { bg:'#FFD93D', ink:'#141414', acc:'#FF2D87' },
  { bg:'#7C2BFF', ink:'#FFFFFF', acc:'#C8F135' },
  { bg:'#FF5C1F', ink:'#141414', acc:'#1B3BFF' },
  { bg:'#00D1C1', ink:'#0A2E2B', acc:'#FF2D87' },
  { bg:'#121212', ink:'#FFFFFF', acc:'#C8F135' },
  { bg:'#EFE9DD', ink:'#141414', acc:'#FF4B2B' },
];
const RECAP_MOTIFS = ['burst','stack','rings','zigzag','checker','arcs','dots','burst','rings'];

// Things your total volume weighs as much as, heaviest first.
const WEIGHT_EQUIV = [
  { one:'blue whale',      many:'blue whales',      lb:300000, e:'\u{1F40B}' },
  { one:'school bus',      many:'school buses',     lb:24000,  e:'\u{1F68C}' },
  { one:'elephant',        many:'elephants',        lb:12000,  e:'\u{1F418}' },
  { one:'pickup truck',    many:'pickup trucks',    lb:5500,   e:'\u{1F6FB}' },
  { one:'grizzly bear',    many:'grizzly bears',    lb:800,    e:'\u{1F43B}' },
  { one:'washing machine', many:'washing machines', lb:200,    e:'\u{1F9FA}' },
];

function fmtEquivCount(c) {
  return c >= 10 ? String(Math.round(c)) : String(Math.round(c * 10) / 10);
}
// Plural unless the number we actually print is exactly "1" — "1.8 blue whale" reads wrong.
function equivPhrase(c, u) {
  const n = fmtEquivCount(c);
  return `${n} ${n === '1' ? u.one : u.many}`;
}
function weightEquiv(lb) {
  if (!(lb > 0)) return null;
  for (const u of WEIGHT_EQUIV) {
    const c = lb / u.lb;
    if (c >= 1.2) return { text: equivPhrase(c, u), emoji: u.e };
  }
  const u = WEIGHT_EQUIV[WEIGHT_EQUIV.length - 1];
  const c = lb / u.lb;
  return c >= 0.4 ? { text: equivPhrase(c, u), emoji: u.e } : null;
}
function fmtDurMs(ms) {
  const mins = Math.max(0, Math.round(ms / 60000));
  const h = Math.floor(mins / 60), m = mins % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

function isoOf(dt) {
  return `${dt.getFullYear()}-${String(dt.getMonth()+1).padStart(2,'0')}-${String(dt.getDate()).padStart(2,'0')}`;
}

function recapRange(period, ref) {
  const d = new Date((ref || todayISO()) + 'T12:00:00');
  const y = d.getFullYear(), m = d.getMonth();
  const iso = isoOf;
  let start, end, title;
  if (period === 'day') {
    start = end = new Date(y, m, d.getDate());
    title = d.toLocaleDateString('default', { weekday:'long', month:'long', day:'numeric' });
  } else if (period === 'week') {
    start = new Date(y, m, d.getDate() - d.getDay());
    end = new Date(start); end.setDate(start.getDate() + 6);
    title = `Week of ${start.toLocaleDateString('default', { month:'short', day:'numeric' })}`;
  } else if (period === 'quarter') {
    const q = Math.floor(m / 3);
    start = new Date(y, q * 3, 1); end = new Date(y, q * 3 + 3, 0);
    title = `Q${q + 1} ${y}`;
  } else if (period === 'year') {
    start = new Date(y, 0, 1); end = new Date(y, 11, 31);
    title = String(y);
  } else {
    start = new Date(y, m, 1); end = new Date(y, m + 1, 0);
    title = d.toLocaleDateString('default', { month:'long', year:'numeric' });
  }
  return { start: iso(start), end: iso(end), title };
}

function recapStats(period, ref) {
  const { start, end, title } = recapRange(period, ref);
  const sessions = getSessions().filter(s => s.completedAt && s.date >= start && s.date <= end);
  let vol = 0, sets = 0, reps = 0, durMs = 0, prs = 0, miles = 0;
  const exCount = {}, typeCount = {}, dow = [0,0,0,0,0,0,0], days = new Set();
  let heaviest = null;
  sessions.forEach(s => {
    days.add(s.date);
    if (s.startedAt && s.completedAt > s.startedAt) durMs += s.completedAt - s.startedAt;
    prs += getSessionPRNames(s).length;
    dow[new Date(s.date + 'T12:00:00').getDay()]++;
    const t = s.workoutType || 'custom';
    typeCount[t] = (typeCount[t] || 0) + 1;
    (s.exercises || []).forEach(ex => {
      exCount[ex.name] = (exCount[ex.name] || 0) + 1;
      if (ex.type === 'strength') {
        (ex.sets || []).forEach(st => {
          if (st.weight != null && st.reps != null) {
            const w = normalizeWeight(st.weight, st.weightUnit);
            vol += w * (parseFloat(st.reps) || 0);
            sets++; reps += parseInt(st.reps) || 0;
            if (w > 0 && (!heaviest || w > heaviest.w)) heaviest = { name: ex.name, w, reps: st.reps };
          }
        });
      } else if (ex.type === 'cardio') {
        miles += parseFloat(ex.distance) || 0;
      }
    });
  });
  const topEx   = Object.entries(exCount).sort((a,b) => b[1] - a[1])[0] || null;
  const topType = Object.entries(typeCount).sort((a,b) => b[1] - a[1])[0] || null;
  const topDow  = dow.some(n => n > 0) ? dow.indexOf(Math.max(...dow)) : -1;
  return { period, title, start, end, count: sessions.length, vol, sets, reps, durMs,
           prs, miles, daysTrained: days.size, topEx, topType, topDow, dow, heaviest };
}

// One card per genuinely interesting number; anything without data is skipped.
function recapCards(st) {
  const cards = [];
  const DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const per = st.period;
  if (!st.count) return cards;   // nothing trained in this stretch — show the empty state instead

  cards.push({
    value: String(st.count),
    unit: st.count === 1 ? 'workout' : 'workouts',
    line: st.daysTrained === st.count
      ? `across ${st.daysTrained} day${st.daysTrained !== 1 ? 's' : ''}`
      : `on ${st.daysTrained} separate day${st.daysTrained !== 1 ? 's' : ''}`,
  });

  if (st.vol > 0) {
    const eq = weightEquiv(st.vol);
    cards.push({
      value: Math.round(st.vol).toLocaleString(),
      unit: 'pounds moved',
      line: eq ? `That's about ${eq.text}` : 'Every rep counted',
      big: eq ? eq.emoji : '\u{1F3CB}\u{FE0F}',
    });
  }

  if (st.durMs > 0) {
    const mins = st.durMs / 60000;
    const movies = fmtEquivCount(mins / 120);
    cards.push({
      value: fmtDurMs(st.durMs),
      unit: 'under the bar',
      line: mins / 120 >= 1
        ? `Long enough to watch ${movies} movie${movies === '1' ? '' : 's'}`
        : 'Every minute earned',
      big: '\u{23F1}\u{FE0F}',
    });
  }

  if (st.reps > 0) {
    cards.push({
      value: st.reps.toLocaleString(),
      unit: 'reps',
      line: `over ${st.sets.toLocaleString()} set${st.sets !== 1 ? 's' : ''}`,
      big: '\u{1F4AA}',
    });
  }

  if (st.topEx && st.topEx[1] > 1) {
    cards.push({
      value: st.topEx[0],
      unit: 'your signature move',
      line: `You did it ${st.topEx[1]} times`,
      small: true,
      big: '\u{2B50}',
    });
  }

  if (st.prs > 0) {
    cards.push({
      value: String(st.prs),
      unit: st.prs === 1 ? 'personal record' : 'personal records',
      line: st.heaviest ? `Heaviest: ${st.heaviest.name} at ${Math.round(st.heaviest.w)} lb` : 'New ground',
      big: '\u{1F3C6}',
    });
  }

  if (st.topType) {
    const label = (getWorkoutTypeLabel(st.topType[0]) || 'Training').replace(/^\S+\s/, '');
    const pct = Math.round((st.topType[1] / st.count) * 100);
    cards.push({
      value: label,
      unit: 'most trained',
      line: `${pct}% of your sessions`,
      small: true,
      big: '\u{1F525}',
    });
  }

  if (st.topDow >= 0 && per !== 'day' && st.dow[st.topDow] > 1) {
    cards.push({
      value: DAYS[st.topDow],
      unit: 'your strongest day',
      line: `${st.dow[st.topDow]} sessions landed here`,
      small: true,
      big: '\u{1F4C5}',
    });
  }

  if (st.miles > 0) {
    const mar = st.miles / 26.2, marN = fmtEquivCount(mar);
    cards.push({
      value: `${Math.round(st.miles * 10) / 10}`,
      unit: 'miles covered',
      line: mar >= 0.5 ? `That's ${marN} marathon${marN === '1' ? '' : 's'}` : 'Legs kept moving',
      big: '\u{1F3C3}',
    });
  }

  return cards;
}

let recapPeriod = 'month';
let recapIndex = 0;
let recapCurrentCards = [];
let recapStatsCache = null;
let recapShareBlob = null;
let recapRenderToken = 0;
let recapRef = null;   // a date inside the stretch being viewed; null = the current one

function openRecap(period) {
  if (!recapEnabled()) return;
  recapPeriod = period || recapPeriod;
  recapIndex = 0;
  recapRef = null;
  renderRecap();
  const ov = document.getElementById('recap-overlay');
  if (ov) ov.classList.add('open');
}
// Open the recap on a specific past stretch, for the prompts below.
function openRecapAt(period, refISO) {
  if (!recapEnabled()) return;
  recapPeriod = period;
  recapIndex = 0;
  recapRef = refISO || null;
  renderRecap();
  document.getElementById('recap-overlay')?.classList.add('open');
}

function closeRecap() {
  document.getElementById('recap-overlay')?.classList.remove('open');
}

// Step back or forward one stretch of whatever period is selected.
function recapShift(dir) {
  const d = new Date(recapRange(recapPeriod, recapRef).start + 'T12:00:00');
  if      (recapPeriod === 'day')     d.setDate(d.getDate() + dir);
  else if (recapPeriod === 'week')    d.setDate(d.getDate() + dir * 7);
  else if (recapPeriod === 'quarter') d.setMonth(d.getMonth() + dir * 3);
  else if (recapPeriod === 'year')    d.setFullYear(d.getFullYear() + dir);
  else                                d.setMonth(d.getMonth() + dir);
  recapRef = isoOf(d);
  recapIndex = 0;
  renderRecap();
}

// Recap is on unless it was explicitly switched off, so nothing changes for
// anyone who never touches the setting.
function recapEnabled() { return localStorage.getItem(LS.RECAP_ON) !== '0'; }

function applyRecapSetting() {
  const on = recapEnabled();
  const entry = document.getElementById('btn-open-recap');
  if (entry) entry.style.display = on ? '' : 'none';
  const sw = document.getElementById('toggle-recap');
  if (sw) { sw.classList.toggle('on', on); sw.setAttribute('aria-checked', on ? 'true' : 'false'); }
  if (!on) closeRecap();
}

function firstSessionDate() {
  const dates = getSessions().filter(s => s.completedAt && s.date).map(s => s.date).sort();
  return dates[0] || null;
}

function renderRecap() {
  const slider = document.getElementById('recap-slider');
  const dots   = document.getElementById('recap-dots');
  const chips  = document.getElementById('recap-periods');
  if (!slider || !chips) return;

  chips.innerHTML = RECAP_PERIODS.map(p =>
    `<button type="button" class="recap-chip${p.key === recapPeriod ? ' on' : ''}" data-period="${p.key}">${p.label}</button>`
  ).join('');
  chips.querySelectorAll('.recap-chip').forEach(b => b.addEventListener('click', () => {
    recapPeriod = b.dataset.period; recapIndex = 0; recapRef = null; renderRecap();
  }));

  recapStatsCache = recapStats(recapPeriod, recapRef);
  recapCurrentCards = recapCards(recapStatsCache);
  const st = recapStatsCache;
  recapRenderToken++;

  // Range header: forward stops at the current stretch, back stops at your first workout.
  const label = document.getElementById('recap-range');
  if (label) label.textContent = st.title;
  const first = firstSessionDate();
  const prevBtn = document.getElementById('recap-prev');
  const nextBtn = document.getElementById('recap-next');
  if (prevBtn) prevBtn.disabled = !first || st.start <= first;
  if (nextBtn) nextBtn.disabled = st.end >= todayISO();

  if (!recapCurrentCards.length) {
    slider.innerHTML = `<div class="recap-card"><div class="recap-empty">
      <div class="recap-empty-eyebrow">${escHtml(st.title.toUpperCase())}</div>
      <div class="recap-empty-value">Nothing<br>logged<br>yet</div>
      <div class="recap-empty-line">Train in this stretch and your recap fills in.</div>
    </div></div>`;
    if (dots) dots.innerHTML = '';
    document.getElementById('btn-recap-share')?.setAttribute('disabled', 'true');
    document.getElementById('btn-recap-share-all')?.setAttribute('disabled', 'true');
    return;
  }
  document.getElementById('btn-recap-share')?.removeAttribute('disabled');
  document.getElementById('btn-recap-share-all')?.removeAttribute('disabled');

  // Each slide is the real card art, so what you swipe is exactly what you share.
  slider.innerHTML = recapCurrentCards.map((c, i) =>
    `<div class="recap-card"><div class="recap-frame" style="background:${RECAP_THEMES[i % RECAP_THEMES.length].bg}">
       <img class="recap-img" alt="${escHtml(c.value + ' ' + c.unit)}">
     </div></div>`).join('');

  if (dots) dots.innerHTML = recapCurrentCards.map((_, i) =>
    `<span class="recap-dot${i === 0 ? ' on' : ''}"></span>`).join('');

  slider.scrollLeft = 0;
  paintRecapSlides(recapRenderToken);
  prepRecapShare();
}

// Draw the slide previews at reduced scale, one at a time, so the first card
// shows almost immediately and a period switch can abandon the rest.
async function paintRecapSlides(token) {
  const imgs = document.querySelectorAll('#recap-slider .recap-img');
  for (let i = 0; i < recapCurrentCards.length; i++) {
    if (token !== recapRenderToken) return;
    try {
      const cv = await buildRecapCard(recapCurrentCards[i], recapStatsCache, i, 0.5);
      if (token !== recapRenderToken) return;
      if (imgs[i]) imgs[i].src = cv.toDataURL('image/jpeg', 0.9);
    } catch {}
    await new Promise(r => setTimeout(r, 0));
  }
}

function syncRecapDots() {
  const slider = document.getElementById('recap-slider');
  if (!slider) return;
  const idx = Math.round(slider.scrollLeft / (slider.offsetWidth || 1));
  if (idx === recapIndex) return;
  recapIndex = idx;
  document.querySelectorAll('#recap-dots .recap-dot').forEach((d, i) => d.classList.toggle('on', i === idx));
  prepRecapShare();
}

// Pre-render the share image so the Share tap stays inside the user gesture.
async function prepRecapShare() {
  recapShareBlob = null;
  const card = recapCurrentCards[recapIndex];
  if (!card || !recapStatsCache) return;
  try {
    const cv = await buildRecapCard(card, recapStatsCache, recapIndex, 1);
    recapShareBlob = await new Promise(res => cv.toBlob(res, 'image/jpeg', 0.92));
  } catch {}
}

// ── Card art ──────────────────────────────────────────────
// Letter-spaced caps: canvas letterSpacing is too new to rely on, so step it out.
function trackedWidth(g, text, tracking) {
  const chars = Array.from(String(text));
  if (!chars.length) return 0;
  let w = -tracking;
  chars.forEach(c => { w += g.measureText(c).width + tracking; });
  return w;
}
function trackedText(g, text, x, y, tracking) {
  Array.from(String(text)).forEach(c => { g.fillText(c, x, y); x += g.measureText(c).width + tracking; });
}

// One bold shape per card, scaled to fill the art band above the copy.
// Returns the focal point the emoji badge should sit on.
function drawRecapMotif(g, kind, W, H, th, card, band) {
  const mid = (band.top + band.bot) / 2, h = Math.max(240, band.bot - band.top);
  let focus = { x: W * 0.5, y: mid };
  g.save();
  // Clip to the art band — no motif is allowed to run under the copy.
  g.beginPath(); g.rect(0, 0, W, band.bot); g.clip();
  g.fillStyle = th.acc; g.strokeStyle = th.acc;
  if (kind === 'burst') {
    const cx = W * 0.5, pts = 15, r1 = Math.min(400, h * 0.5), r2 = r1 * 0.64;
    g.beginPath();
    for (let i = 0; i < pts * 2; i++) {
      const r = i % 2 ? r2 : r1, a = (Math.PI / pts) * i - Math.PI / 2;
      g[i ? 'lineTo' : 'moveTo'](cx + Math.cos(a) * r, mid + Math.sin(a) * r);
    }
    g.closePath(); g.fill();
    focus = { x: cx, y: mid };
  } else if (kind === 'rings') {
    const cx = W * 0.5, step = Math.min(96, h * 0.115);
    g.lineWidth = Math.max(14, step * 0.2);
    for (let r = step; r <= h * 0.5; r += step) { g.beginPath(); g.arc(cx, mid, r, 0, Math.PI * 2); g.stroke(); }
    focus = { x: cx, y: mid };
  } else if (kind === 'arcs') {
    g.lineWidth = 24;
    for (let r = 260; r <= 1180; r += 170) { g.beginPath(); g.arc(0, band.bot + 60, r, -Math.PI / 2, Math.PI / 2); g.stroke(); }
    focus = { x: W * 0.62, y: mid };
  } else if (kind === 'zigzag') {
    const amp = Math.min(150, h * 0.2), step = W / 6;
    g.lineWidth = 32; g.lineJoin = 'round'; g.lineCap = 'round';
    g.beginPath(); g.moveTo(-40, mid - amp * 1.9);
    for (let i = 0; i <= 6; i++) g.lineTo(-40 + step * i, mid - amp * 1.9 + (i % 2 ? amp : -amp));
    g.stroke();
    g.beginPath(); g.moveTo(-40, mid + amp * 1.9);
    for (let i = 0; i <= 6; i++) g.lineTo(-40 + step * i, mid + amp * 1.9 + (i % 2 ? -amp : amp));
    g.stroke();
    focus = { x: W * 0.5, y: mid };
  } else if (kind === 'checker') {
    const s = Math.min(130, h / 3.4), y0 = mid - s * 1.5;
    for (let r = 0; r < 3; r++) for (let c = 0; c < Math.ceil(W / s); c++)
      if ((r + c) % 2 === 0) g.fillRect(c * s, y0 + r * s, s, s);
    focus = { x: W * 0.5, y: mid };
  } else if (kind === 'dots') {
    const step = Math.min(92, h / 6.4), r = step * 0.23;
    for (let row = 0; row < 6; row++) for (let c = 0; c < 7; c++) {
      g.beginPath(); g.arc(W - 90 - c * step, mid - step * 2.5 + row * step, r, 0, Math.PI * 2); g.fill();
    }
    focus = { x: W * 0.26, y: mid };
  } else if (kind === 'stack') {
    // The headline repeated down the whole card — Wrapped's loudest layout.
    g.textAlign = 'center';
    let s = 200;
    g.font = `900 ${s}px Archivo, system-ui, sans-serif`;
    const fit = g.measureText(card.value).width;
    if (fit > W - 40) { s = Math.floor(s * (W - 40) / fit); g.font = `900 ${s}px Archivo, system-ui, sans-serif`; }
    for (let y = 400; y < band.bot + s; y += s * 1.02) g.fillText(card.value, W / 2, y);
    g.textAlign = 'left';
    focus = { x: W * 0.5, y: mid };
  }
  g.restore();
  return focus;
}

async function buildRecapCard(card, st, idx, scale) {
  try { if (document.fonts?.ready) await document.fonts.ready; } catch {}
  const S = scale || 1, W = 1080, H = 1920, PAD = 84, MAXW = W - PAD * 2;
  const cv = document.createElement('canvas');
  cv.width = Math.round(W * S); cv.height = Math.round(H * S);
  const g = cv.getContext('2d');
  g.scale(S, S);
  const th    = RECAP_THEMES[idx % RECAP_THEMES.length];
  const motif = RECAP_MOTIFS[idx % RECAP_MOTIFS.length];
  const F = (w, s) => `${w} ${s}px Archivo, system-ui, sans-serif`;

  g.fillStyle = th.bg; g.fillRect(0, 0, W, H);
  g.textAlign = 'left'; g.textBaseline = 'alphabetic';

  // Headline grows until it spans the card — numbers that fill the frame.
  let heroLines = [String(card.value)];
  if (card.small) {
    const words = heroLines[0].split(' ');
    if (words.length > 1) {
      let best = null;
      for (let i = 1; i < words.length; i++) {
        const a = words.slice(0, i).join(' '), b = words.slice(i).join(' ');
        const d = Math.abs(a.length - b.length);
        if (!best || d < best.d) best = { d, lines: [a, b] };
      }
      heroLines = best.lines;
    }
  }
  g.font = F(800, 100);
  const widest = Math.max.apply(null, heroLines.map(l => g.measureText(l).width));
  const size = Math.max(52, Math.min(card.small ? 168 : 300, Math.floor(100 * MAXW / widest)));

  let lines = [];
  if (card.line) {
    g.font = F(600, 46);
    let cur = '';
    String(card.line).split(' ').forEach(w => {
      const t = cur ? cur + ' ' + w : w;
      if (g.measureText(t).width > MAXW) { lines.push(cur); cur = w; } else cur = t;
    });
    if (cur) lines.push(cur);
    lines = lines.slice(0, 3);
  }

  const UNIT = 44, LH = size * 1.02;
  const heroH  = heroLines.length * LH;
  const blockH = heroH + 26 + UNIT + (lines.length ? 50 + lines.length * 62 : 0);
  const y0 = Math.max(820, H - 290 - blockH);

  // Art fills everything between the eyebrow and the copy, so there is no void.
  const focus = drawRecapMotif(g, motif, W, H, th, card, { top: 250, bot: y0 - 80 });

  // The stacked-type motif runs under the copy, so clear the lower half for it.
  if (motif === 'stack') { g.fillStyle = th.bg; g.fillRect(0, y0 - 60, W, H - y0 + 60); }

  let y = y0;
  g.fillStyle = th.ink; g.font = F(800, size);
  heroLines.forEach((l, i) => g.fillText(l, PAD, y + LH * i + size * 0.8));
  y += heroH + 26;

  g.fillStyle = th.acc; g.font = F(800, UNIT);
  trackedText(g, card.unit.toUpperCase(), PAD, y + UNIT * 0.82, 5);
  y += UNIT + 50;

  if (lines.length) {
    g.fillStyle = th.ink; g.font = F(600, 46);
    lines.forEach((l, i) => g.fillText(l, PAD, y + 36 + i * 62));
  }

  // Emoji badge sits on the motif's focal point, on its own disc so it reads
  // as part of the art rather than floating on top of it.
  if (card.big && motif !== 'stack') {
    const R = 190;
    g.fillStyle = th.bg;
    g.beginPath(); g.arc(focus.x, focus.y, R, 0, Math.PI * 2); g.fill();
    g.save(); g.textAlign = 'center'; g.textBaseline = 'middle';
    g.font = '250px system-ui, "Apple Color Emoji", "Noto Color Emoji", sans-serif';
    g.fillText(card.big, focus.x, focus.y + 8);
    g.restore();
  }

  g.fillStyle = th.ink; g.font = F(800, 30);
  trackedText(g, st.title.toUpperCase(), PAD, 168, 7);

  g.globalAlpha = 0.72; g.font = F(800, 28);
  trackedText(g, 'G3 WORKOUT', PAD, H - 110, 7);
  const who = (localStorage.getItem(LS.NAME) || '').toUpperCase();
  if (who) trackedText(g, who, W - PAD - trackedWidth(g, who, 7), H - 110, 7);
  g.globalAlpha = 1;
  return cv;
}

// Share the whole recap in one go, as separate images — so they land in
// Photos or a story tray as individual cards you can post one by one.
async function shareAllRecapCards() {
  const cards = recapCurrentCards, st = recapStatsCache;
  if (!cards.length || !st) { toast('Nothing to share yet'); return; }
  const btn = document.getElementById('btn-recap-share-all');
  const label = btn ? btn.textContent : '';
  const slug = `${(st.period || 'month')}-${(st.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;

  if (btn) { btn.disabled = true; }
  const files = [];
  try {
    for (let i = 0; i < cards.length; i++) {
      if (btn) btn.textContent = `Building ${i + 1} of ${cards.length}…`;
      const cv = await buildRecapCard(cards[i], st, i, 1);
      const blob = await new Promise(res => cv.toBlob(res, 'image/jpeg', 0.92));
      if (blob) files.push(new File([blob],
        `g3-recap-${slug}-${String(i + 1).padStart(2, '0')}.jpg`, { type: 'image/jpeg' }));
      // Let the overlay repaint between cards so the count actually moves.
      await new Promise(r => setTimeout(r, 0));
    }
  } catch { /* fall through to whatever we managed to build */ }
  if (btn) { btn.textContent = label; btn.disabled = false; }

  if (!files.length) { toast('Could not build the cards'); return; }

  if (navigator.canShare?.({ files })) {
    try { await navigator.share({ files, text: `${st.title || ''} \u2014 G3 Workout` }); return; }
    catch (e) { if (e && e.name === 'AbortError') return; }
  }
  // No multi-file share: save them one after another instead.
  for (const f of files) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(f);
    a.download = f.name;
    a.click();
    URL.revokeObjectURL(a.href);
    await new Promise(r => setTimeout(r, 250));
  }
  toast(`${files.length} cards saved \u2713`);
}

async function shareRecapCard() {
  if (!recapShareBlob) { await prepRecapShare(); }
  if (!recapShareBlob) { toast('Could not build card'); return; }
  const st = recapStatsCache;
  const file = new File([recapShareBlob], `g3-recap-${(st?.period) || 'month'}.jpg`, { type: 'image/jpeg' });
  const text = `${st?.title || ''} \u2014 G3 Workout`;
  if (navigator.canShare?.({ files: [file] })) {
    try { await navigator.share({ files: [file], text }); return; }
    catch (e) { if (e && e.name === 'AbortError') return; }
  }
  const a = document.createElement('a');
  a.href = URL.createObjectURL(recapShareBlob);
  a.download = file.name;
  a.click();
  URL.revokeObjectURL(a.href);
  toast('Card saved \u2713');
}

// ═══ Estimated 1RM (Epley) ════════════════════════════════
function estimate1RM(weight, reps) {
  const w = parseFloat(weight), r = parseInt(reps);
  if (!(w > 0)) return 0;
  if (!(r > 0) || r === 1) return Math.round(w);
  return Math.round(w * (1 + r / 30));
}

// ═══ Smart Training Plan ══════════════════════════════════
const WEEKDAY_ABBR = ['Su','Mo','Tu','We','Th','Fr','Sa'];
const PLAN_GOALS = [
  { key:'muscle',   emoji:'💪', label:'Build Muscle' },
  { key:'strength', emoji:'🏋️', label:'Get Stronger' },
  { key:'lose',     emoji:'🔥', label:'Lose Fat' },
  { key:'fitness',  emoji:'🏃', label:'General Fitness' },
];
const PLAN_EXP = [
  { key:'beginner',     label:'Beginner' },
  { key:'intermediate', label:'Intermediate' },
  { key:'advanced',     label:'Advanced' },
];
const PLAN_FOCUS = ['chest','back','shoulders','arms','legs','abs','conditioning'];

function getPlan()   { try { return JSON.parse(localStorage.getItem(LS.PLAN)); } catch { return null; } }
function savePlan(p) { localStorage.setItem(LS.PLAN, JSON.stringify(p)); }

// Rule-based "smart" split selection from goal + days/week + experience.
function generateSplit(daysPerWeek, goal, experience) {
  const d = daysPerWeek;
  const beginner = experience === 'beginner';
  let split;
  if (d <= 1)       split = ['fullbody'];
  else if (d === 2) split = ['fullbody','fullbody'];
  else if (d === 3) split = (beginner || goal === 'fitness') ? ['fullbody','fullbody','fullbody'] : ['push','pull','legs'];
  else if (d === 4) split = goal === 'muscle' ? ['chest','back','legs','shoulders']
                          : beginner            ? ['fullbody','fullbody','fullbody','fullbody']
                          :                       ['push','pull','legs','fullbody'];
  else if (d === 5) split = goal === 'muscle' ? ['chest','back','shoulders','legs','arms']
                          :                       ['push','pull','legs','push','pull'];
  else              split = ['push','pull','legs','push','pull','legs'];
  split = split.slice(0, d);
  while (split.length < d) split.push('fullbody');
  // Fat-loss / general-fitness goals get a conditioning day
  if ((goal === 'lose' || goal === 'fitness') && split.length >= 3) split[split.length - 1] = 'conditioning';
  return split;
}

// Gently bias the split toward chosen emphasis areas.
function applyFocus(split, focus) {
  if (!focus || !focus.length) return split;
  const out = split.slice();
  focus.forEach(f => {
    if (out.includes(f)) return;
    let idx = out.indexOf('fullbody');
    if (idx === -1) {
      const seen = {};
      for (let i = 0; i < out.length; i++) { if (seen[out[i]]) { idx = i; break; } seen[out[i]] = 1; }
    }
    if (idx !== -1) out[idx] = f;
  });
  return out;
}

function buildSchedule(weekdays, split) {
  const sorted = weekdays.slice().sort((a,b) => a - b);
  const schedule = {};
  for (let wd = 0; wd < 7; wd++) schedule[wd] = null;
  sorted.forEach((wd, i) => { schedule[wd] = split[i] || 'fullbody'; });
  return schedule;
}

function generatePlan({ weekdays, goal, experience, focus, reminderTime }) {
  const daysPerWeek = weekdays.length;
  const split = applyFocus(generateSplit(daysPerWeek, goal, experience), focus);
  return {
    createdAt: Date.now(), updatedAt: Date.now(),
    daysPerWeek, goal, experience,
    focus: (focus || []).slice(),
    weekdays: weekdays.slice().sort((a,b) => a - b),
    reminderTime: reminderTime || '',
    schedule: buildSchedule(weekdays, split),
  };
}

function planRationale(plan) {
  const g = PLAN_GOALS.find(x => x.key === plan.goal);
  return `${plan.daysPerWeek} days/week tuned for ${g ? g.label.toLowerCase() : 'your goal'} · ${plan.experience}.`;
}

function pad2(n) { return String(n).padStart(2, '0'); }
function formatTime12(hhmm) {
  if (!hhmm) return '';
  const [h, m] = hhmm.split(':').map(Number);
  const ap = h >= 12 ? 'PM' : 'AM';
  return `${((h + 11) % 12) + 1}:${pad2(m)} ${ap}`;
}

// ── Today banner (History view) ──
function trainedToday() {
  const t = todayISO();
  return getSessions().some(s => s.completedAt && s.date === t);
}

// ═══ Recap prompts ════════════════════════════════════════
// A finished stretch is worth looking at once. Offer it at the top of the
// next week, month and year — once each, then never nag again.
function recapSeen() {
  try { return JSON.parse(localStorage.getItem(LS.RECAP_SEEN)) || {}; } catch { return {}; }
}
function markRecapSeen(key) {
  const m = recapSeen(); m[key] = Date.now();
  localStorage.setItem(LS.RECAP_SEEN, JSON.stringify(m));
}

// The stretch that just ended, for each cadence.
function lastClosedPeriods() {
  const d = new Date(todayISO() + 'T12:00:00');
  const wkStart = new Date(d); wkStart.setDate(d.getDate() - d.getDay());
  const prevWk  = new Date(wkStart); prevWk.setDate(wkStart.getDate() - 7);
  const prevMo  = new Date(d.getFullYear(), d.getMonth() - 1, 15);
  const prevYr  = new Date(d.getFullYear() - 1, 6, 1);
  return [
    { period: 'week',  ref: isoOf(prevWk), key: 'w' + isoOf(prevWk), label: 'week' },
    { period: 'month', ref: isoOf(prevMo), key: 'm' + prevMo.getFullYear() + '-' + (prevMo.getMonth() + 1), label: 'month' },
    { period: 'year',  ref: isoOf(prevYr), key: 'y' + prevYr.getFullYear(), label: 'year' },
  ];
}

// The biggest unseen stretch that actually has training in it.
function pendingRecap() {
  if (!recapEnabled()) return null;
  const seen = recapSeen();
  const all = lastClosedPeriods();
  for (const c of ['year', 'month', 'week']) {
    const cand = all.find(x => x.period === c);
    if (!cand || seen[cand.key]) continue;
    const st = recapStats(cand.period, cand.ref);
    if (st.count > 0) return Object.assign({}, cand, { title: st.title, count: st.count });
  }
  return null;
}

function renderRecapPrompt() {
  const wrap = document.getElementById('today-recap-prompt');
  if (!wrap) return;
  const r = pendingRecap();
  if (!r) { wrap.innerHTML = ''; return; }
  wrap.innerHTML = `<div class="recap-prompt">
    <div class="recap-prompt-text">
      <strong>Your ${escHtml(r.label)} is wrapped</strong>
      <span>${escHtml(r.title)} \u00b7 ${r.count} session${r.count !== 1 ? 's' : ''}</span>
    </div>
    <button type="button" class="recap-prompt-go" id="recap-prompt-go">See it</button>
    <button type="button" class="recap-prompt-x" id="recap-prompt-x" aria-label="Dismiss">\u2715</button>
  </div>`;
  document.getElementById('recap-prompt-go')?.addEventListener('click', () => {
    markRecapSeen(r.key);
    openRecapAt(r.period, r.ref);
    renderRecapPrompt();
  });
  document.getElementById('recap-prompt-x')?.addEventListener('click', () => {
    markRecapSeen(r.key);
    renderRecapPrompt();
  });
}

// ═══ Today ════════════════════════════════════════════════
// The front door. It answers one question — what am I doing right now —
// and gives you one button to do it.
function plannedTypeToday() {
  const plan = getPlan();
  if (!plan || !plan.schedule) return null;
  return plan.schedule[new Date(todayISO() + 'T12:00:00').getDay()] || null;
}

function weekSessionCount() {
  const d = new Date(todayISO() + 'T12:00:00');
  const start = new Date(d); start.setDate(d.getDate() - d.getDay());
  const iso = isoOf(start);
  return getSessions().filter(s => s.completedAt && s.date >= iso).length;
}

function renderToday() {
  const wrap = document.getElementById('today-hero');
  if (!wrap) return;

  const planned  = plannedTypeToday();
  const trained  = trainedToday();
  const resuming = !!activeSession;
  const streak   = getCurrentStreak();
  const target   = parseInt(getGoals().weekly) || 0;
  const thisWeek = weekSessionCount();
  const last     = getSessions().filter(s => s.completedAt)
                     .sort((a, b) => b.completedAt - a.completedAt)[0];

  const weekday = new Date(todayISO() + 'T12:00:00')
    .toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();

  // Headline + action change with the state of the day.
  let kicker = weekday, headline, sub = '', action, actionId;
  if (resuming) {
    const n = (activeSession.exercises || []).length;
    kicker   = 'In progress';
    headline = getWorkoutTypeLabelPlain(activeSession.workoutType) || 'Session';
    sub      = `${n} exercise${n !== 1 ? 's' : ''} so far`;
    action   = 'Resume'; actionId = 'today-resume';
  } else if (planned && !trained) {
    headline = getWorkoutTypeLabelPlain(planned) || 'Train';
    sub      = 'On your plan for today';
    action   = 'Start'; actionId = 'today-start-planned';
  } else if (trained) {
    headline = 'Done';
    sub      = 'You trained today. Rest up.';
    action   = 'Train again'; actionId = 'today-start-any';
  } else if (planned === null && getPlan()) {
    headline = 'Rest day';
    sub      = 'Nothing scheduled. Recover.';
    action   = 'Train anyway'; actionId = 'today-start-any';
  } else {
    headline = 'Ready?';
    sub      = 'Pick a workout and get after it.';
    action   = 'Start'; actionId = 'today-start-any';
  }

  const pct = target > 0 ? Math.min(100, Math.round((thisWeek / target) * 100)) : 0;
  const bars = target > 0
    ? Array.from({ length: target }, (_, i) =>
        `<span class="week-bar${i < thisWeek ? ' on' : ''}"></span>`).join('')
    : '';

  wrap.innerHTML = `
    <div class="today-kicker">${escHtml(kicker)}</div>
    <div class="today-headline">${escHtml(headline)}</div>
    ${sub ? `<div class="today-sub">${escHtml(sub)}</div>` : ''}
    <button type="button" class="today-cta" id="${actionId}">${escHtml(action)}</button>

    <div class="today-stats">
      <div class="today-stat">
        <div class="today-stat-val">${thisWeek}${target ? `<span>/${target}</span>` : ''}</div>
        <div class="today-stat-label">This week</div>
      </div>
      <div class="today-stat">
        <div class="today-stat-val">${streak}</div>
        <div class="today-stat-label">Day streak</div>
      </div>
    </div>
    ${bars ? `<div class="week-bars" title="${thisWeek} of ${target}">${bars}</div>` : ''}

    ${last ? `<button type="button" class="today-last" id="today-last">
      <span class="today-last-idx">${String(last.dayNumber || 1).padStart(2, '0')}</span>
      <span class="today-last-mid">
        <span class="today-last-date">${escHtml(shortDateCaps(last.date))}</span>
        <span class="today-last-meta">${escHtml([getWorkoutTypeLabelPlain(last.workoutType), formatDuration(last.startedAt, last.completedAt)].filter(Boolean).join(' · '))}</span>
      </span>
      <span class="today-last-go">Repeat</span>
    </button>` : ''}`;

  try { renderBackupBanner(); } catch (_) {}
  try { renderRecapPrompt(); } catch (_) {}

  document.getElementById('today-resume')?.addEventListener('click', () => showView('log'));
  document.getElementById('today-start-planned')?.addEventListener('click', () => startPlannedWorkout(planned));
  document.getElementById('today-start-any')?.addEventListener('click', () => {
    renderWorkoutTypeGrid(); openSheet('sheet-type-picker');
  });
  document.getElementById('today-last')?.addEventListener('click', () => { if (last) repeatSession(last); });
}

// Type label without the emoji, for headline use.
function getWorkoutTypeLabelPlain(key) {
  const t = WORKOUT_TYPES.find(t => t.key === key);
  return t ? t.label : null;
}

function renderPlanToday() {
  const wrap = document.getElementById('plan-today-wrap');
  if (!wrap) return;
  const plan = getPlan();
  if (!plan) { wrap.innerHTML = ''; return; }
  const wd = new Date(todayISO() + 'T12:00:00').getDay();
  const typeKey = plan.schedule ? plan.schedule[wd] : null;

  if (!typeKey) {
    wrap.innerHTML = `<div class="plan-today rest">😌 Rest day — recover and come back strong.</div>`;
    return;
  }
  const label = getWorkoutTypeLabel(typeKey) || 'Workout';
  if (trainedToday()) {
    wrap.innerHTML = `<div class="plan-today done">✓ ${escHtml(label)} done today. Nice work.</div>`;
    return;
  }
  wrap.innerHTML = `<div class="plan-today">
    <div class="plan-today-left">
      <span class="plan-today-eyebrow">Today's plan</span>
      <span class="plan-today-type">${escHtml(label)}</span>
    </div>
    <button class="btn btn-primary" id="btn-plan-start" style="font-size:13px;padding:9px 18px;min-height:40px;flex-shrink:0;">Start</button>
  </div>`;
  document.getElementById('btn-plan-start').addEventListener('click', () => startPlannedWorkout(typeKey));
}

function startPlannedWorkout(typeKey) {
  startNewSession(nextDayNumber(), todayISO(), '', typeKey);
  const template = typeKey !== 'custom' ? (WORKOUT_TEMPLATES[typeKey] || []) : [];
  if (template.length) preloadTemplateExercises(template);
  showView('log');
}

// ── Plan card (Settings view) ──
function renderPlanSettings() {
  const wrap = document.getElementById('plan-settings-wrap');
  if (!wrap) return;
  const plan = getPlan();
  if (!plan) {
    wrap.innerHTML = `<button class="btn btn-primary" id="btn-create-plan" style="width:100%;justify-content:center;gap:8px;min-height:52px;border-radius:14px;font-weight:800;">✨ Create a smart plan</button>
      <p style="font-size:12px;color:var(--text-muted);margin-top:10px;line-height:1.5;">Tell us your goal and training days — we'll build a weekly split and put it on your calendar.</p>`;
    document.getElementById('btn-create-plan').addEventListener('click', () => openPlanBuilder());
    return;
  }
  const g = PLAN_GOALS.find(x => x.key === plan.goal);
  const dayChips = plan.weekdays.map(wd => {
    const t = plan.schedule[wd];
    return `<div class="plan-day-chip"><span class="plan-day-name">${WEEKDAY_ABBR[wd]}</span><span class="plan-day-type">${escHtml(getWorkoutTypeLabel(t) || 'Rest')}</span></div>`;
  }).join('');
  wrap.innerHTML = `
    <div class="plan-summary-title">${g ? g.emoji : '📋'} ${plan.daysPerWeek}-day ${g ? g.label : ''} plan</div>
    <div class="plan-summary-sub">${plan.experience}${plan.reminderTime ? ' · reminder ' + formatTime12(plan.reminderTime) : ''}</div>
    <div class="plan-day-chips">${dayChips}</div>
    <div style="display:flex;gap:8px;margin-top:14px;">
      <button class="btn btn-ghost" id="btn-plan-edit" style="flex:1;justify-content:center;min-height:44px;">Edit</button>
      <button class="btn btn-ghost" id="btn-plan-ics" style="flex:1;justify-content:center;min-height:44px;gap:6px;">📅 Add to Calendar</button>
    </div>
    <button class="btn btn-ghost" id="btn-plan-remove" style="width:100%;justify-content:center;min-height:38px;color:var(--danger);margin-top:8px;font-size:13px;">Remove plan</button>`;
  document.getElementById('btn-plan-edit').addEventListener('click', () => openPlanBuilder());
  document.getElementById('btn-plan-ics').addEventListener('click', () => exportPlanICS());
  document.getElementById('btn-plan-remove').addEventListener('click', () => {
    if (!confirm('Remove your training plan?')) return;
    localStorage.removeItem(LS.PLAN);
    renderPlanSettings();
    toast('Plan removed');
  });
}

// ── Plan builder (form sheet) ──
let planDraft = null;
let planEditing = false;

function openPlanBuilder() {
  const existing = getPlan();
  planEditing = !!existing;
  planDraft = existing
    ? { weekdays: existing.weekdays.slice(), goal: existing.goal, experience: existing.experience, focus: (existing.focus || []).slice(), reminderTime: existing.reminderTime || '' }
    : { weekdays: [1,3,5], goal: 'muscle', experience: 'intermediate', focus: [], reminderTime: '18:00' };
  renderPlanBuilder();
  openSheet('sheet-plan-builder');
}

function renderPlanBuilder() {
  const c = document.getElementById('plan-builder-content');
  if (!c || !planDraft) return;
  const d = planDraft;

  const weekdayChips = WEEKDAY_ABBR.map((ab, wd) => `<button class="pb-day${d.weekdays.includes(wd) ? ' on' : ''}" data-wd="${wd}">${ab}</button>`).join('');
  const goalBtns  = PLAN_GOALS.map(g => `<button class="pb-opt${d.goal === g.key ? ' on' : ''}" data-goal="${g.key}">${g.emoji} ${g.label}</button>`).join('');
  const expBtns   = PLAN_EXP.map(e => `<button class="pb-opt${d.experience === e.key ? ' on' : ''}" data-exp="${e.key}">${e.label}</button>`).join('');
  const focusChips= PLAN_FOCUS.map(f => `<button class="pb-chip${d.focus.includes(f) ? ' on' : ''}" data-focus="${f}">${escHtml(getWorkoutTypeLabel(f) || f)}</button>`).join('');

  let previewHtml = '';
  if (d.weekdays.length) {
    const plan = generatePlan(d);
    previewHtml = `<div class="pb-preview-title">Your week</div>
      <div class="plan-day-chips">${plan.weekdays.map(wd => `<div class="plan-day-chip"><span class="plan-day-name">${WEEKDAY_ABBR[wd]}</span><span class="plan-day-type">${escHtml(getWorkoutTypeLabel(plan.schedule[wd]) || '')}</span></div>`).join('')}</div>
      <div class="pb-rationale">${escHtml(planRationale(plan))}</div>`;
  } else {
    previewHtml = `<div class="pb-rationale" style="text-align:center;">Pick your training days to preview a plan.</div>`;
  }

  c.innerHTML = `
    <div class="pb-label">Which days do you train?</div>
    <div class="pb-days">${weekdayChips}</div>
    <div class="pb-label">Main goal</div>
    <div class="pb-opts">${goalBtns}</div>
    <div class="pb-label">Experience</div>
    <div class="pb-opts">${expBtns}</div>
    <div class="pb-label">Emphasis <span class="pb-optional">(optional)</span></div>
    <div class="pb-chips">${focusChips}</div>
    <div class="pb-label">Reminder time <span class="pb-optional">(optional)</span></div>
    <input type="time" id="pb-remind" value="${escAttr(d.reminderTime)}" class="input" style="width:100%;">
    <div class="pb-preview">${previewHtml}</div>
    <button class="btn btn-primary" id="btn-save-plan" style="width:100%;justify-content:center;min-height:52px;border-radius:14px;font-weight:800;margin-top:16px;">${planEditing ? 'Update Plan' : 'Save Plan'}</button>`;

  c.querySelectorAll('.pb-day').forEach(b => b.addEventListener('click', () => {
    const wd = +b.dataset.wd, i = d.weekdays.indexOf(wd);
    if (i >= 0) d.weekdays.splice(i, 1); else d.weekdays.push(wd);
    renderPlanBuilder();
  }));
  c.querySelectorAll('[data-goal]').forEach(b => b.addEventListener('click', () => { d.goal = b.dataset.goal; renderPlanBuilder(); }));
  c.querySelectorAll('[data-exp]').forEach(b => b.addEventListener('click', () => { d.experience = b.dataset.exp; renderPlanBuilder(); }));
  c.querySelectorAll('[data-focus]').forEach(b => b.addEventListener('click', () => {
    const f = b.dataset.focus, i = d.focus.indexOf(f);
    if (i >= 0) d.focus.splice(i, 1); else d.focus.push(f);
    renderPlanBuilder();
  }));
  document.getElementById('pb-remind')?.addEventListener('change', e => { d.reminderTime = e.target.value; });
  document.getElementById('btn-save-plan').addEventListener('click', savePlanFromBuilder);
}

function savePlanFromBuilder() {
  if (!planDraft.weekdays.length) { toast('Pick at least one training day'); return; }
  const rem = document.getElementById('pb-remind');
  if (rem) planDraft.reminderTime = rem.value;
  savePlan(generatePlan(planDraft));
  closeSheet();
  toast(planEditing ? 'Plan updated ✓' : 'Plan created ✓');
  if (currentView === 'settings') renderSettings();
  if (currentView === 'history')  renderHistory();
}

// ── Calendar (.ics) export → real native iPhone alerts ──
function exportPlanICS() {
  const plan = getPlan();
  if (!plan) return;
  const time = plan.reminderTime || '18:00';
  const [hh, mm] = time.split(':').map(Number);
  const ICS_DAYS = ['SU','MO','TU','WE','TH','FR','SA'];
  const now = new Date();
  const dtstamp = now.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  const ics = ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//G3 Workout//EN','CALSCALE:GREGORIAN'];
  plan.weekdays.forEach(wd => {
    const type = plan.schedule[wd];
    if (!type) return;
    const label = (getWorkoutTypeLabel(type) || 'Workout').replace(/[^\x20-\x7E]/g, '').trim() || 'Workout';
    const dt = new Date(now); dt.setHours(hh, mm, 0, 0);
    let add = (wd - dt.getDay() + 7) % 7;
    if (add === 0 && dt <= now) add = 7;
    dt.setDate(dt.getDate() + add);
    const dstart = dt.getFullYear() + pad2(dt.getMonth()+1) + pad2(dt.getDate()) + 'T' + pad2(hh) + pad2(mm) + '00';
    ics.push('BEGIN:VEVENT',
      `UID:g3-${wd}-${Date.now()}-${Math.random().toString(36).slice(2,7)}@g3workout`,
      `DTSTAMP:${dtstamp}`,
      `DTSTART:${dstart}`,
      `RRULE:FREQ=WEEKLY;BYDAY=${ICS_DAYS[wd]}`,
      `SUMMARY:G3 Workout — ${label}`,
      'BEGIN:VALARM','ACTION:DISPLAY',`DESCRIPTION:Time to train — ${label}`,'TRIGGER:PT0M','END:VALARM',
      'END:VEVENT');
  });
  ics.push('END:VCALENDAR');

  const blob = new Blob([ics.join('\r\n')], { type: 'text/calendar' });
  const file = new File([blob], 'g3-training-plan.ics', { type: 'text/calendar' });
  if (navigator.canShare?.({ files: [file] })) {
    navigator.share({ files: [file], title: 'G3 Training Plan' }).catch(() => {});
  } else {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'g3-training-plan.ics';
    a.click();
    URL.revokeObjectURL(a.href);
  }
}

function getWorkoutTypeLabel(key) {
  const t = WORKOUT_TYPES.find(t => t.key === key);
  return t ? `${t.emoji} ${t.label}` : null;
}
// Label for a session's type — a custom routine name wins over the preset type.
function sessionTypeLabel(sess) {
  if (sess?.customName) return `📋 ${sess.customName}`;
  return sess?.workoutType ? getWorkoutTypeLabel(sess.workoutType) : null;
}

function buildSessionCardHTML(sess) {
  const strengthExs = sess.exercises.filter(e => e.type === 'strength');
  const chips = strengthExs.slice(0,6).map(e => `<span class="exercise-chip">${escHtml(e.name)}</span>`).join('');
  const more  = strengthExs.length > 6 ? `<span class="exercise-chip more">+${strengthExs.length-6}</span>` : '';
  const extras = [
    sess.exercises.some(e => e.type==='cardio')   ? `<span class="exercise-chip">🏃 Cardio</span>` : '',
    sess.exercises.some(e => e.type==='recovery') ? `<span class="exercise-chip">♨️ Recovery</span>` : '',
  ].join('');

  const typeLabel = sessionTypeLabel(sess);
  const typeBadge = typeLabel ? `<span class="session-type-badge">${escHtml(typeLabel)}</span>` : '';
  const noteHtml  = sess.note ? `<div class="session-note-preview">"${escHtml(sess.note)}"</div>` : '';
  const totalSets = strengthExs.reduce((n,e) => n + (e.sets?.length||0), 0);
  const dayNum    = String(sess.dayNumber || 1).padStart(2, '0');

  let vol = 0;
  strengthExs.forEach(ex => (ex.sets||[]).forEach(set => {
    vol += normalizeWeight(set.weight, set.weightUnit) * (parseFloat(set.reps)||0);
  }));
  const volStr = vol > 0 ? `${vol >= 1000 ? (vol/1000).toFixed(1)+'k' : Math.round(vol).toLocaleString()} lbs` : '';

  const prNames = getSessionPRNames(sess);
  const prHtml  = prNames.length > 0 ? `<span class="session-pr-badge">🏆 PR${prNames.length > 1 ? ` ×${prNames.length}` : ''}</span>` : '';
  const dur     = formatDuration(sess.startedAt, sess.completedAt);

  const photoThumb = sess.photo ? `<img src="${sess.photo}" alt="" class="session-thumb">` : '';

  // Full stats live inside the collapsed body — kept out of the at-a-glance header.
  const statPills = [
    totalSets > 0 ? `<span class="session-stat-pill">${totalSets} sets</span>` : '',
    volStr ? `<span class="session-stat-pill">${volStr}</span>` : '',
    dur ? `<span class="session-stat-pill">⏱ ${dur}</span>` : '',
  ].join('');

  const chevron = `<svg class="session-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" width="18" height="18" stroke-width="2.2"><polyline points="6 9 12 15 18 9"/></svg>`;
  const chipsRow = (chips || more || extras) ? `<div class="session-exercises-summary">${chips}${more}${extras}</div>` : '';

  return `
    <div class="card-top session-head">
      <div class="session-index">${dayNum}</div>
      <div class="session-meta-left" style="flex:1;min-width:0;">
        <div class="session-date-row">
          <span class="session-date-primary">${escHtml(shortDateCaps(sess.date))}</span>
          ${prHtml}
        </div>
        <div class="session-sub-row">
          ${typeBadge}
          ${dur ? `<span class="session-day-secondary">${escHtml(dur)}</span>` : ''}
        </div>
      </div>
      ${photoThumb}
      ${chevron}
    </div>
    <div class="session-body-wrap">
      <div class="session-body">
        <div class="session-body-inner">
          ${statPills ? `<div class="session-stat-row">${statPills}</div>` : ''}
          ${noteHtml}
          ${chipsRow}
          <div class="session-body-actions">
            <button class="session-act-btn primary session-repeat-btn" type="button">🔁 Repeat</button>
            <button class="session-act-btn session-share-btn" type="button">📤 Share</button>
            <button class="session-details-btn" type="button" style="margin-left:auto;">Details →</button>
          </div>
        </div>
      </div>
    </div>`;
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
  const typeLabel = sessionTypeLabel(sess);
  let html = `
    <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:2px;">
      <div class="session-day">Day ${sess.dayNumber ?? '—'}</div>
      <button class="btn btn-ghost" id="btn-open-edit-session" style="font-size:13px;padding:6px 12px;min-height:32px;margin-top:-8px;">Edit</button>
    </div>
    <div class="detail-headline">${escHtml(shortDateCaps(sess.date))}</div>
    <div class="session-sub-row" style="margin-bottom:16px;">
      ${typeLabel ? `<span class="session-type-badge">${escHtml(typeLabel)}</span>` : ''}
      ${formatDuration(sess.startedAt, sess.completedAt) ? `<span class="session-day-secondary">${escHtml(formatDuration(sess.startedAt, sess.completedAt))}</span>` : ''}
    </div>`;
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
      if (ex.note) html += `<div class="exercise-note-detail">"${escHtml(ex.note)}"</div>`;
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
        <div style="font-size:14px;color:var(--text-secondary);">${parts.join(' · ')}</div>
        ${ex.note ? `<div class="exercise-note-detail">"${escHtml(ex.note)}"</div>` : ''}</div>`;
    });
  }
  if (recovery.length) {
    html += `<div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.07em;color:var(--text-muted);margin:14px 0 10px;">Recovery</div>`;
    recovery.forEach(ex => {
      html += `<div class="detail-exercise-block"><div class="detail-exercise-name">${escHtml(ex.name)}${ex.duration?` · ${ex.duration} min`:''}</div>
        ${ex.note ? `<div class="exercise-note-detail">"${escHtml(ex.note)}"</div>` : ''}</div>`;
    });
  }
  if (sess.photo) {
    html += `<div style="margin-top:20px;border-radius:16px;overflow:hidden;">
      <img src="${sess.photo}" alt="Workout photo" style="width:100%;display:block;max-height:300px;object-fit:cover;border-radius:16px;">
    </div>`;
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

  // Add exercise to past session
  document.getElementById('btn-edit-add-strength').addEventListener('click', () => {
    openExercisePicker(name => {
      const sessions = getSessions();
      const sess = sessions.find(s => s.id === editingSessionId);
      if (!sess) return;
      const ls = getLastSessionSet(name, 0);
      sess.exercises.push({ type: 'strength', name, sets: [{ weight: null, weightUnit: ls?.weightUnit || 'lbs', reps: null }] });
      saveSessions(sessions);
      renderEditExercises(sess);
    });
  });

  document.getElementById('btn-edit-add-cardio').addEventListener('click', () => {
    const name = prompt('Cardio machine name (e.g. Treadmill):')?.trim();
    if (!name) return;
    const sessions = getSessions();
    const sess = sessions.find(s => s.id === editingSessionId);
    if (!sess) return;
    sess.exercises.push({ type: 'cardio', name, incline: null, speed: null, duration: null, distance: null });
    saveSessions(sessions);
    renderEditExercises(sess);
  });

  document.getElementById('btn-edit-add-recovery').addEventListener('click', () => {
    const name = prompt('Recovery activity (e.g. Sauna):')?.trim();
    if (!name) return;
    const sessions = getSessions();
    const sess = sessions.find(s => s.id === editingSessionId);
    if (!sess) return;
    sess.exercises.push({ type: 'recovery', name, duration: null });
    saveSessions(sessions);
    renderEditExercises(sess);
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
  // Short form: the long date wraps to two lines at display size.
  document.getElementById('log-date-label').textContent = shortDateCaps(activeSession.date);
  document.getElementById('session-note').value = activeSession.note || '';
  const badge = document.getElementById('log-type-badge');
  const typeLabel = sessionTypeLabel(activeSession);
  if (typeLabel) { badge.textContent = typeLabel; badge.style.display = 'inline-block'; }
  else badge.style.display = 'none';
  renderExerciseBlocks();
  startDurationClock();
}

// ═══ Focused workout flow ═════════════════════════════════
// One exercise fills the screen. You dial the set in with your thumb and
// commit it, instead of filling a grid of inputs.
let focusExIdx = 0;          // which exercise is on screen
const focusSetSel = {};      // exIdx -> a set the user tapped back into

function focusCurrentSet(ex, idx) {
  const sel = focusSetSel[idx];
  if (sel != null && ex.sets && ex.sets[sel]) return sel;
  const i = (ex.sets || []).findIndex(st => st.weight == null || st.reps == null);
  return i === -1 ? Math.max(0, (ex.sets || []).length - 1) : i;
}

function setIsDone(st) {
  return !!st && st.weight != null && st.reps != null && st.logged !== false;
}

function renderExerciseBlocks() {
  const container = document.getElementById('exercise-blocks');
  if (!container) return;
  const list = (activeSession && activeSession.exercises) || [];
  container.innerHTML = '';
  if (!list.length) {
    container.innerHTML = `<div class="focus-empty">
      <div class="focus-empty-title">Nothing added yet</div>
      <div class="focus-empty-sub">Add your first exercise below and it will fill this screen.</div>
    </div>`;
    renderFocusRail();
    return;
  }
  focusExIdx = Math.max(0, Math.min(focusExIdx, list.length - 1));
  container.appendChild(buildExerciseBlock(list[focusExIdx], focusExIdx));
  renderFocusRail();
}

// Jump to an exercise and re-render the screen around it.
function focusGo(idx) {
  const list = (activeSession && activeSession.exercises) || [];
  if (!list.length) return;
  focusExIdx = Math.max(0, Math.min(idx, list.length - 1));
  renderExerciseBlocks();
  const v = document.getElementById('view-log');
  if (v) v.scrollTop = 0;
}

// The rail doubles as the session's progress: one pill per exercise,
// filled once every set in it is logged.
function renderFocusRail() {
  const rail = document.getElementById('focus-rail');
  if (!rail) return;
  const list = (activeSession && activeSession.exercises) || [];
  rail.innerHTML = list.map((ex, i) => {
    const done = ex.type === 'strength'
      ? (ex.sets || []).length > 0 && (ex.sets || []).every(setIsDone)
      : !!ex.logged || ex.duration != null || ex.distance != null;
    // Paired exercises read as one unit: square off the joined edges.
    const prevSame = i > 0 && ex.supersetId && list[i - 1].supersetId === ex.supersetId;
    const nextSame = ex.supersetId && list[i + 1] && list[i + 1].supersetId === ex.supersetId;
    const cls = `focus-pip${i === focusExIdx ? ' on' : ''}${done ? ' done' : ''}` +
                `${ex.supersetId ? ' ss' : ''}${prevSame ? ' ss-mid' : ''}${nextSame ? ' ss-start' : ''}`;
    return `${(ex.supersetId && !prevSame && i > 0) ? '<span class="focus-pip-gap"></span>' : ''}` +
           `<button type="button" class="${cls}" data-go="${i}" title="${escAttr(ex.name)}">${i + 1}</button>` +
           `${nextSame ? '<span class="focus-pip-link"></span>' : ''}`;
  }).join('');
  rail.querySelectorAll('.focus-pip').forEach(b =>
    b.addEventListener('click', () => focusGo(+b.dataset.go)));
}

function buildExerciseBlock(ex, idx) {
  const block = document.createElement('div');
  block.className = 'exercise-block focus-slide';
  block.dataset.idx = idx;
  const total = (activeSession.exercises || []).length;
  const typeTag = ex.type === 'cardio' ? 'Cardio' : ex.type === 'recovery' ? 'Recovery' : '';

  const body = ex.type === 'strength' ? buildStrengthBlockHTML(ex, idx)
             : ex.type === 'cardio'   ? buildCardioBlockHTML(ex, idx)
             :                          buildRecoveryBlockHTML(ex, idx);

  block.innerHTML = `
    <div class="focus-head">
      <button class="focus-nav" data-nav="-1" ${idx === 0 ? 'disabled' : ''} aria-label="Previous exercise">‹</button>
      <div class="focus-head-mid">
        <div class="exercise-name">${escHtml(ex.name)}${ex.supersetId ? '<span class="superset-badge">SUPERSET</span>' : ''}</div>
        <div class="focus-count">${idx + 1} of ${total}${typeTag ? ' · ' + typeTag : ''}</div>
      </div>
      <button class="focus-nav" data-nav="1" ${idx === total - 1 ? 'disabled' : ''} aria-label="Next exercise">›</button>
      <button class="focus-more" aria-label="Exercise tools">⋯</button>
    </div>
    ${body}
    <div class="inline-rest-timer" style="display:none;">
      <span class="inline-rest-text">Rest 1:30</span>
      <button class="inline-rest-done">Done ✓</button>
    </div>
    <textarea class="exercise-note-field" rows="1" placeholder="Notes on this one…">${escHtml(ex.note || '')}</textarea>`;

  if (ex.supersetId) block.classList.add('superset-block');

  block.querySelectorAll('.focus-nav').forEach(b =>
    b.addEventListener('click', () => focusGo(idx + (+b.dataset.nav))));
  block.querySelector('.focus-more')?.addEventListener('click', () => openExerciseTools(idx));

  if (ex.type === 'strength') {
    wireFocusStrength(block, ex, idx);
  } else if (ex.type === 'cardio') {
    block.querySelectorAll('.cardio-field').forEach(input =>
      input.addEventListener('input', () => { syncCardioFromInputs(block, idx); scheduleAutoSave(); }));
    wireSimpleSteppers(block, idx, sel => block.querySelector(`.cardio-field[data-field="${sel}"]`),
      () => syncCardioFromInputs(block, idx));
  } else if (ex.type === 'recovery') {
    block.querySelector('.recovery-dur-input')?.addEventListener('input', e => {
      activeSession.exercises[idx].duration = parseNum(e.target.value); scheduleAutoSave();
    });
    wireSimpleSteppers(block, idx, () => block.querySelector('.recovery-dur-input'),
      () => { activeSession.exercises[idx].duration = parseNum(block.querySelector('.recovery-dur-input').value); });
  }
  // Cardio and recovery commit the same way a set does.
  block.querySelector('.focus-log-simple')?.addEventListener('click', () => {
    const e2 = activeSession.exercises[idx];
    if (e2) e2.logged = true;
    scheduleAutoSave();
    renderExerciseBlocks();
    const total = activeSession.exercises.length;
    if (idx < total - 1) focusGo(idx + 1);
    else toast('Logged \u2713');
  });

  block.querySelector('.inline-rest-done')?.addEventListener('click', stopRestTimer);

  const noteField = block.querySelector('.exercise-note-field');
  if (noteField) {
    const autoResize = () => { noteField.style.height = 'auto'; noteField.style.height = noteField.scrollHeight + 'px'; };
    if (noteField.value) autoResize();
    noteField.addEventListener('input', e => {
      activeSession.exercises[idx].note = e.target.value;
      autoResize(); scheduleAutoSave();
    });
  }
  return block;
}

// Steppers for the plain numeric blocks (cardio, recovery).
function wireSimpleSteppers(block, idx, pick, commit) {
  block.querySelectorAll('.step-btn[data-fld]').forEach(btn => btn.addEventListener('click', () => {
    const input = pick(btn.dataset.fld);
    if (!input) return;
    const delta = parseFloat(btn.dataset.d);
    // An empty field steps off its placeholder — last time's number.
    const cur = parseFloat(input.value);
    const base = isNaN(cur) ? (parseFloat(input.placeholder) || 0) : cur;
    const next = Math.max(0, Math.round((base + delta) * 10) / 10);
    input.value = String(next);
    commit(); scheduleAutoSave();
  }));
  block.querySelectorAll('.focus-num').forEach(inp =>
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); inp.blur(); } }));
}

function wireFocusStrength(block, ex, idx) {
  const si = focusCurrentSet(ex, idx);
  block.dataset.si = String(si);

  const readBack = () => {
    const w = block.querySelector('.set-weight'), r = block.querySelector('.set-reps');
    if (!ex.sets[si]) return;
    ex.sets[si].weight = parseNum(w.value);
    ex.sets[si].reps   = parseNum(r.value);
  };

  // Steppers nudge the value and keep the model in step.
  block.querySelectorAll('.step-btn').forEach(btn => btn.addEventListener('click', () => {
    const field = btn.dataset.field, delta = parseFloat(btn.dataset.d);
    const input = block.querySelector(field === 'weight' ? '.set-weight' : '.set-reps');
    const cur = parseFloat(input.value);
    const base = isNaN(cur) ? (field === 'weight' ? focusSuggestWeight(ex, si) : focusSuggestReps(ex, si)) : cur;
    const next = Math.max(0, Math.round((base + delta) * 100) / 100);
    input.value = String(next);
    readBack(); scheduleAutoSave();
    refreshFocusPR(block, ex, si);
  }));

  block.querySelectorAll('.set-weight, .set-reps').forEach(input => {
    input.addEventListener('input', () => { readBack(); scheduleAutoSave(); refreshFocusPR(block, ex, si); });
    // The keyboard's Go/Done key commits, so you never have to dismiss it first.
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') { e.preventDefault(); input.blur(); logFocusSet(idx); }
    });
  });

  block.querySelector('.unit-toggle')?.addEventListener('click', e => {
    const next = ex.sets[si].weightUnit === 'lbs' ? 'each_side' : 'lbs';
    ex.sets[si].weightUnit = next;
    e.currentTarget.textContent = next === 'each_side' ? 'each side' : 'lbs';
    e.currentTarget.classList.toggle('each-side', next === 'each_side');
    scheduleAutoSave();
  });

  // Tapping the target loads it into the dials — it never logs on its own.
  block.querySelector('.focus-target')?.addEventListener('click', e => {
    const t = e.currentTarget;
    const w = block.querySelector('.set-weight'), r = block.querySelector('.set-reps');
    if (w) w.value = t.dataset.w;
    if (r) r.value = t.dataset.r;
    readBack(); scheduleAutoSave(); refreshFocusPR(block, ex, si);
  });
  block.querySelector('.focus-log')?.addEventListener('click', () => logFocusSet(idx));
  block.querySelector('.focus-next-ex')?.addEventListener('click', () => focusGo(idx + 1));
  block.querySelector('.focus-add-set')?.addEventListener('click', () => { delete focusSetSel[idx]; addSet(idx); });
  block.querySelectorAll('.done-chip').forEach(chip => chip.addEventListener('click', () => {
    focusSetSel[idx] = +chip.dataset.set;
    renderExerciseBlocks();
  }));
  // A set you have already banked stays banked while you adjust it.
  block.querySelectorAll('.set-weight, .set-reps, .step-btn').forEach(el =>
    el.addEventListener('change', () => { if (ex.sets[si]?.logged) scheduleAutoSave(); }));
  block.querySelector('.focus-drop-set')?.addEventListener('click', () => {
    if (ex.sets.length > 1) { ex.sets.pop(); delete focusSetSel[idx]; renderExerciseBlocks(); scheduleAutoSave(); }
  });
}

// A target for the set you are about to do, from what you did last time.
// Repeat the load until you beat the reps you hit, then add a little.
function focusSuggestion(ex, si) {
  const last = getLastSessionSeries(ex.name);
  if (!last) return null;
  const ref = last.sets[Math.min(si, last.sets.length - 1)];
  if (!ref || !(parseInt(ref.reps) > 0)) return null;
  const w = parseFloat(ref.weight) || 0;
  const reps = parseInt(ref.reps);
  const target = parseInt(ex.targetReps) || 0;

  if (w <= 0) return { weight: 0, reps: reps + 1, why: `Beat ${reps} reps` };
  // Hit the rep target last time → nudge the load. Otherwise chase the reps.
  if (target && reps >= target) {
    const step = w >= 200 ? 10 : w >= 100 ? 5 : 2.5;
    return { weight: Math.round((w + step) * 2) / 2, reps: target, why: `Up ${step} lb` };
  }
  if (!target && reps >= 8) {
    const step = w >= 200 ? 10 : w >= 100 ? 5 : 2.5;
    return { weight: Math.round((w + step) * 2) / 2, reps, why: `Up ${step} lb` };
  }
  return { weight: w, reps: reps + 1, why: `Beat ${reps} reps` };
}

// What to start from when a field is still blank: last time's number.
function focusSuggestWeight(ex, si) {
  const prev = ex.sets[si - 1];
  if (prev && prev.weight != null) return parseFloat(prev.weight) || 0;
  const ls = getLastSessionSet(ex.name, si);
  return ls && ls.weight != null ? parseFloat(ls.weight) || 0 : 0;
}
function focusSuggestReps(ex, si) {
  const prev = ex.sets[si - 1];
  if (prev && prev.reps != null) return parseInt(prev.reps) || 0;
  const ls = getLastSessionSet(ex.name, si);
  if (ls && ls.reps != null) return parseInt(ls.reps) || 0;
  return parseInt(ex.targetReps) || 0;
}

function refreshFocusPR(block, ex, si) {
  const badge = block.querySelector('.focus-pr');
  if (!badge) return;
  const st = ex.sets[si];
  const isPR = setIsDone(st) && checkPR(ex.name, st.weight, st.weightUnit, st.reps);
  badge.style.display = isPR ? 'inline-block' : 'none';
}

// Commit the set: this is the moment the rest timer is allowed to start.
function logFocusSet(idx) {
  const ex = activeSession.exercises[idx];
  if (!ex || ex.type !== 'strength') return;
  const block = document.querySelector(`.exercise-block[data-idx="${idx}"]`);
  // The set on screen is the set that gets logged.
  const pinned = block && block.dataset.si != null ? +block.dataset.si : null;
  const si = (pinned != null && ex.sets[pinned]) ? pinned : focusCurrentSet(ex, idx);
  const st = ex.sets[si];
  if (!st) return;
  if (block) {
    const w = block.querySelector('.set-weight'), r = block.querySelector('.set-reps');
    // Only pre-fill from a suggestion that actually exists — never log a 0×0 set.
    if (w && w.value === '') { const g = focusSuggestWeight(ex, si); if (g > 0) w.value = String(g); }
    if (r && r.value === '') { const g = focusSuggestReps(ex, si);   if (g > 0) r.value = String(g); }
    st.weight = parseNum(w.value);
    st.reps   = parseNum(r.value);
    w.blur(); r.blur();
  }
  // Weight may legitimately be 0 (bodyweight); reps may not.
  if (!((parseFloat(st.reps) || 0) > 0)) { toast('Add your reps first'); return; }
  if (st.weight == null) st.weight = 0;

  st.logged = true;
  if (checkPR(ex.name, st.weight, st.weightUnit, st.reps)) showPRCelebration(ex.name);
  delete focusSetSel[idx];
  scheduleAutoSave();

  // A superset is the one case where moving on is obviously right. Otherwise
  // stay put — the next set tees itself up, and finishing offers a Next button.
  const next = nextSupersetIdx(idx);
  if (next !== -1) focusGo(next); else renderExerciseBlocks();
  startRestTimer(ex.restSeconds ?? 90, focusExIdx);
}

// Reordering has to carry the user's place with it, or you lose the exercise
// you were looking at.
function moveExercise(idx, dir) {
  const list = activeSession?.exercises;
  const to = idx + dir;
  if (!list || to < 0 || to >= list.length) return;
  [list[idx], list[to]] = [list[to], list[idx]];
  const sel = focusSetSel[idx];
  focusSetSel[idx] = focusSetSel[to];
  focusSetSel[to] = sel;
  if (focusSetSel[idx] == null) delete focusSetSel[idx];
  if (focusSetSel[to] == null) delete focusSetSel[to];
  scheduleAutoSave();
  focusGo(to);
}

function nextSupersetIdx(exIdx) {
  const ex = activeSession.exercises[exIdx];
  if (!ex || !ex.supersetId) return -1;
  return activeSession.exercises.findIndex((e, i) => i > exIdx && e.supersetId === ex.supersetId);
}
// Kept for callers outside the focus flow.
function scrollToNextSuperset(exIdx) {
  const n = nextSupersetIdx(exIdx);
  if (n !== -1) focusGo(n);
}

// Everything the old block header crowded into its top-right corner now
// lives one tap away, so the screen stays about the set in front of you.
function openExerciseTools(idx) {
  const ex = activeSession?.exercises?.[idx];
  if (!ex) return;
  const wrap = document.getElementById('exercise-tools-content');
  if (!wrap) return;
  const restSec = ex.restSeconds ?? 90;
  const restLabel = restSec >= 60 ? `${Math.floor(restSec/60)}:${String(restSec%60).padStart(2,'0')}` : `${restSec}s`;
  const rows = [];
  if (ex.type === 'strength') {
    rows.push(['info',     '\u2139\uFE0F', 'How to do it',    'Form, video and per-exercise settings']);
    rows.push(['rest',     '\u23F1\uFE0F', 'Rest timer',      `Currently ${restLabel} — tap to change`]);
    rows.push(['plate',    '\u{1F3CB}\uFE0F', 'Plate calculator', 'What to load on the bar']);
    rows.push(['warmup',   '\u{1F525}', 'Warm-up sets',   'Build up to your working weight']);
    rows.push(['superset', '\u21C4', ex.supersetId ? 'Leave superset' : 'Make a superset', 'Pair with the next exercise']);
  }
  if ((activeSession.exercises || []).length > 1) {
    if (idx > 0) rows.push(['up',   '\u2191', 'Move earlier', 'Swap with the exercise before it']);
    if (idx < activeSession.exercises.length - 1)
      rows.push(['down', '\u2193', 'Move later', 'Swap with the exercise after it']);
  }
  rows.push(['remove', '\u2715', 'Remove exercise', 'Takes it out of this session']);

  wrap.innerHTML = `<div class="sheet-title">${escHtml(ex.name)}</div>` + rows.map(r =>
    `<button type="button" class="tool-row" data-act="${r[0]}">
       <span class="tool-emoji">${r[1]}</span>
       <span class="tool-text"><span class="tool-name">${escHtml(r[2])}</span><span class="tool-sub">${escHtml(r[3])}</span></span>
     </button>`).join('');

  wrap.querySelectorAll('.tool-row').forEach(btn => btn.addEventListener('click', () => {
    const act = btn.dataset.act;
    closeSheet();
    setTimeout(() => {
      if (act === 'info')          openExerciseInfo(ex.name);
      else if (act === 'rest')     { cycleRestTime(idx); toast('Rest time updated'); }
      else if (act === 'plate')    openPlateCalc(idx);
      else if (act === 'warmup')   openWarmup(idx);
      else if (act === 'superset') toggleSuperset(idx);
      else if (act === 'up')       moveExercise(idx, -1);
      else if (act === 'down')     moveExercise(idx, 1);
      else if (act === 'remove')   {
        activeSession.exercises.splice(idx, 1);
        delete focusSetSel[idx];
        focusExIdx = Math.max(0, idx - 1);
        renderExerciseBlocks(); scheduleAutoSave();
      }
    }, 260);
  }));
  openSheet('sheet-exercise-tools');
}

function buildStrengthBlockHTML(ex, idx) {
  const si = focusCurrentSet(ex, idx);
  const st = ex.sets[si] || { weight: null, weightUnit: 'lbs', reps: null };
  const unitLabel = st.weightUnit === 'each_side' ? 'each side' : 'lbs';
  const unitClass = st.weightUnit === 'each_side' ? ' each-side' : '';
  const isPR = setIsDone(st) && checkPR(ex.name, st.weight, st.weightUnit, st.reps);
  const sug  = focusSuggestion(ex, si);
  const done = ex.sets.filter(setIsDone).length;
  const allDone = ex.sets.length > 0 && done === ex.sets.length;
  const nextEx = (activeSession.exercises || [])[idx + 1] || null;

  const chips = ex.sets.map((s, i) => {
    if (!setIsDone(s)) return '';
    const unit = s.weightUnit === 'each_side' ? '/side' : '';
    const txt = parseFloat(s.weight) > 0 ? `${s.weight}${unit}×${s.reps}` : `${s.reps} reps`;
    return `<button type="button" class="done-chip${i === si ? ' editing' : ''}" data-set="${i}">
      <b>${i + 1}</b>${escHtml(txt)}</button>`;
  }).join('');

  return `
    ${buildLastTimeHTML(ex.name)}
    <div class="focus-set">
      <div class="focus-set-top">
        <span class="focus-set-label">Set ${si + 1} of ${ex.sets.length}</span>
        <span class="focus-pr pr-badge" style="display:${isPR ? 'inline-block' : 'none'};">PR</span>
      </div>
      ${(!setIsDone(st) && sug) ? `<button type="button" class="focus-target" data-w="${sug.weight}" data-r="${sug.reps}">
        Target ${sug.weight > 0 ? `${sug.weight}${st.weightUnit === 'each_side' ? '/side' : ''} × ${sug.reps}` : `${sug.reps} reps`}
        <i>${escHtml(sug.why)}</i></button>` : ''}

      <div class="stepper">
        <button type="button" class="step-btn" data-field="weight" data-d="-5" aria-label="Less weight">−</button>
        <input class="set-weight focus-num" type="text" inputmode="decimal" enterkeyhint="done"
               value="${st.weight != null ? st.weight : ''}" placeholder="${escAttr(String(focusSuggestWeight(ex, si) || 0))}">
        <button type="button" class="step-btn" data-field="weight" data-d="5" aria-label="More weight">+</button>
      </div>
      <button type="button" class="unit-toggle focus-unit${unitClass}">${unitLabel}</button>

      <div class="stepper">
        <button type="button" class="step-btn" data-field="reps" data-d="-1" aria-label="Fewer reps">−</button>
        <input class="set-reps focus-num" type="text" inputmode="numeric" enterkeyhint="done"
               value="${st.reps != null ? st.reps : ''}" placeholder="${escAttr(String(focusSuggestReps(ex, si) || 0))}">
        <button type="button" class="step-btn" data-field="reps" data-d="1" aria-label="More reps">+</button>
      </div>
      <div class="focus-unit-label">reps</div>

      <button type="button" class="focus-log">${setIsDone(st) ? 'Update set' : 'Log set'}</button>
      ${allDone && nextEx ? `<button type="button" class="focus-next-ex">Next · ${escHtml(nextEx.name)} →</button>` : ''}
    </div>

    <div class="focus-done-row">
      ${chips}
      <button type="button" class="focus-add-set">+ Set</button>
      ${ex.sets.length > 1 ? `<button type="button" class="focus-drop-set">− Set</button>` : ''}
      <span class="focus-done-count">${done}/${ex.sets.length}</span>
    </div>`;
}

// Cardio gets the same treatment as a set: the two numbers that matter are
// big and thumb-driven, and the rest stay out of the way.
function buildCardioBlockHTML(ex, idx) {
  const logged = !!ex.logged || ex.duration != null || ex.distance != null;
  const last = lastCardioFor(ex.name);
  return `
    ${last ? `<div class="last-time"><div class="last-time-head">Last time · ${escHtml(shortDateCaps(last.date))}</div>
      <div class="last-time-sets">
        ${last.duration != null ? `<span class="lt-set">${escHtml(last.duration)} min</span>` : ''}
        ${last.distance != null ? `<span class="lt-set">${escHtml(last.distance)} mi</span>` : ''}
      </div></div>` : ''}
    <div class="focus-set">
      <div class="stepper">
        <button type="button" class="step-btn" data-fld="duration" data-d="-1" aria-label="Less time">−</button>
        <input class="cardio-field focus-num" data-field="duration" type="text" inputmode="decimal" enterkeyhint="done"
               value="${ex.duration!=null?ex.duration:''}" placeholder="${escAttr(String(last?.duration ?? 0))}">
        <button type="button" class="step-btn" data-fld="duration" data-d="1" aria-label="More time">+</button>
      </div>
      <div class="focus-unit-label">minutes</div>

      <div class="stepper">
        <button type="button" class="step-btn" data-fld="distance" data-d="-0.1" aria-label="Less distance">−</button>
        <input class="cardio-field focus-num" data-field="distance" type="text" inputmode="decimal" enterkeyhint="done"
               value="${ex.distance!=null?ex.distance:''}" placeholder="${escAttr(String(last?.distance ?? 0))}">
        <button type="button" class="step-btn" data-fld="distance" data-d="0.1" aria-label="More distance">+</button>
      </div>
      <div class="focus-unit-label">miles</div>

      <button type="button" class="focus-log focus-log-simple">${logged ? 'Update' : 'Log it'}</button>
    </div>
    <div class="focus-extras">
      <label class="focus-extra"><span>Incline</span>
        <input class="cardio-field" data-field="incline" type="text" inputmode="decimal" value="${ex.incline!=null?ex.incline:''}" placeholder="—"></label>
      <label class="focus-extra"><span>Speed</span>
        <input class="cardio-field" data-field="speed" type="text" inputmode="decimal" value="${ex.speed!=null?ex.speed:''}" placeholder="—"></label>
    </div>`;
}

// What this machine looked like the last time you were on it.
function lastCardioFor(name) {
  const n = String(name || '').toLowerCase();
  const sessions = getSessions()
    .filter(s => s.completedAt && s.id !== activeSession?.id)
    .sort((a, b) => b.completedAt - a.completedAt);
  for (const sess of sessions) {
    const ex = (sess.exercises || []).find(e => e.type === 'cardio' && e.name.toLowerCase() === n);
    if (ex && (ex.duration != null || ex.distance != null)) return { ...ex, date: sess.date };
  }
  return null;
}

function buildRecoveryBlockHTML(ex, idx) {
  const logged = !!ex.logged || ex.duration != null;
  return `
    <div class="focus-set">
      <div class="stepper">
        <button type="button" class="step-btn" data-fld="duration" data-d="-1" aria-label="Less time">−</button>
        <input class="recovery-dur-input focus-num" type="text" inputmode="numeric" enterkeyhint="done"
               value="${ex.duration!=null?ex.duration:''}" placeholder="0">
        <button type="button" class="step-btn" data-fld="duration" data-d="1" aria-label="More time">+</button>
      </div>
      <div class="focus-unit-label">minutes</div>
      <button type="button" class="focus-log focus-log-simple">${logged ? 'Update' : 'Log it'}</button>
    </div>`;
}


function syncCardioFromInputs(block, exIdx) {
  const ex = activeSession.exercises[exIdx];
  if (!ex || ex.type !== 'cardio') return;
  block.querySelectorAll('.cardio-field').forEach(input => { ex[input.dataset.field] = parseNum(input.value); });
}


function addSet(exIdx) {
  const ex = activeSession.exercises[exIdx];
  if (!ex || ex.type !== 'strength') return;
  const last = ex.sets[ex.sets.length-1] || { weight:null, weightUnit:'lbs', reps:null };
  ex.sets.push({ weight: null, weightUnit: last.weightUnit, reps: null, logged: false });
  delete focusSetSel[exIdx];
  renderExerciseBlocks();
  scheduleAutoSave();
}

// ─── Exercise picker ──────────────────────────────────────
let pickerCallback = null;
function openExercisePicker(onSelect) {
  pickerCallback = onSelect;
  renderExercisePickList('');
  document.getElementById('exercise-search-input').value = '';
  openSheet('sheet-exercise-picker');
  setTimeout(() => {
    document.getElementById('exercise-search-input').focus();
    adjustActiveSheetForKeyboard();
  }, 300);
}

// ─── Exercise Info / Guide (image, how-to video, targets, rest) ──
let infoExerciseName = null;

function openExerciseInfo(name) {
  infoExerciseName = name;
  renderExerciseInfo();
  openSheet('sheet-exercise-info');
}

function renderExerciseInfo() {
  const name = infoExerciseName;
  const wrap = document.getElementById('exercise-info-content');
  if (!wrap || !name) return;
  const meta = getMetaFor(name);
  const fav  = !!meta.favorite;
  const restSec = meta.restSeconds ?? 90;
  const restLabel = restSec >= 60 ? `${Math.floor(restSec/60)}:${String(restSec%60).padStart(2,'0')}` : `${restSec}s`;

  const imgBlock = meta.image
    ? `<div style="position:relative;border-radius:16px;overflow:hidden;margin-bottom:12px;">
         <img src="${meta.image}" alt="${escAttr(name)} reference" style="width:100%;display:block;max-height:260px;object-fit:cover;">
         <button id="btn-info-remove-image" class="btn btn-ghost" style="position:absolute;top:8px;right:8px;font-size:12px;padding:5px 9px;min-height:28px;background:rgba(0,0,0,0.55);border-color:transparent;color:#fff;">Remove</button>
       </div>`
    : `<button id="btn-info-add-image" class="btn btn-ghost" style="width:100%;justify-content:center;gap:8px;margin-bottom:12px;padding:22px 12px;border-style:dashed;">
         <span style="font-size:20px;">📷</span> Add reference photo
       </button>`;

  wrap.innerHTML = `
    <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:10px;margin-bottom:14px;">
      <div class="sheet-title" style="margin-bottom:0;">${escHtml(name)}</div>
      <button id="btn-info-fav" class="btn btn-ghost" style="flex-shrink:0;font-size:20px;padding:4px 10px;min-height:36px;color:${fav ? '#F5B301' : 'var(--text-muted)'};">${fav ? '★' : '☆'}</button>
    </div>
    ${imgBlock}
    <button id="btn-info-watch" class="btn btn-primary" style="width:100%;justify-content:center;gap:8px;min-height:50px;border-radius:14px;font-weight:800;margin-bottom:14px;">
      <span style="font-size:16px;">▶</span> How-to video
    </button>
    <label class="field-label">Custom video link (optional)</label>
    <input id="info-video-url" class="input" type="url" inputmode="url" placeholder="Paste a YouTube/Vimeo link…" value="${escAttr(meta.video || '')}" style="margin-bottom:6px;">
    <p style="font-size:11px;color:var(--text-muted);margin-bottom:18px;line-height:1.5;">Leave blank to auto-search a form demo for this exercise.</p>

    <label class="field-label">Muscle group</label>
    <select id="info-group" class="input" style="margin-bottom:18px;">
      ${EXERCISE_GROUP_NAMES.map(g =>
        `<option value="${escAttr(g)}"${g === exerciseGroupOf(name) ? ' selected' : ''}>${escHtml(g)}</option>`).join('')}
    </select>

    <div class="section-label" style="margin:0 0 12px;padding:0;">Defaults when logging</div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;">
      <div>
        <label class="field-label">Target sets</label>
        <input id="info-target-sets" class="input" type="text" inputmode="numeric" placeholder="—" value="${meta.targetSets ?? ''}" style="text-align:center;">
      </div>
      <div>
        <label class="field-label">Target reps</label>
        <input id="info-target-reps" class="input" type="text" inputmode="numeric" placeholder="—" value="${meta.targetReps ?? ''}" style="text-align:center;">
      </div>
      <div>
        <label class="field-label">Rest</label>
        <button id="info-rest-cycle" class="btn btn-ghost" style="width:100%;justify-content:center;min-height:44px;font-weight:700;">⏱ ${restLabel}</button>
      </div>
    </div>
    <p style="font-size:11px;color:var(--text-muted);margin-top:10px;line-height:1.5;">Applied automatically the next time you add ${escHtml(name)} to a workout.</p>`;

  // Favorite toggle
  document.getElementById('btn-info-fav').addEventListener('click', () => {
    toggleFavorite(name);
    renderExerciseInfo();
    if (currentView === 'settings') renderSettings();
  });

  // Watch video
  document.getElementById('btn-info-watch').addEventListener('click', () => {
    window.open(exerciseVideoUrl(name), '_blank', 'noopener');
  });

  // Custom video link — save on change
  document.getElementById('info-video-url').addEventListener('change', e => {
    setMetaFor(name, { video: e.target.value.trim() });
  });

  // Muscle group — what the balance chart counts this toward.
  document.getElementById('info-group')?.addEventListener('change', e => {
    const groups = getExerciseGroupMap();
    groups[name] = e.target.value;
    saveExerciseGroups(groups);
    toast(`Counted as ${e.target.value}`);
  });

  // Targets — save on change
  document.getElementById('info-target-sets').addEventListener('change', e => {
    const n = parseInt(e.target.value);
    setMetaFor(name, { targetSets: (n > 0 && n <= 20) ? n : null });
  });
  document.getElementById('info-target-reps').addEventListener('change', e => {
    const n = parseInt(e.target.value);
    setMetaFor(name, { targetReps: (n > 0 && n <= 100) ? n : null });
  });

  // Rest cycle
  document.getElementById('info-rest-cycle').addEventListener('click', () => {
    const cur = getMetaFor(name).restSeconds ?? 90;
    const next = REST_PRESETS[(REST_PRESETS.indexOf(cur) + 1) % REST_PRESETS.length];
    setMetaFor(name, { restSeconds: next });
    renderExerciseInfo();
  });

  // Image add / change / remove
  const fileInput = ensureInfoImageInput();
  document.getElementById('btn-info-add-image')?.addEventListener('click', () => fileInput.click());
  document.getElementById('btn-info-remove-image')?.addEventListener('click', () => {
    setMetaFor(name, { image: null });
    renderExerciseInfo();
  });
}

function ensureInfoImageInput() {
  let input = document.getElementById('_info-image-input');
  if (!input) {
    input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.id = '_info-image-input';
    input.style.display = 'none';
    document.body.appendChild(input);
    input.addEventListener('change', async () => {
      const file = input.files?.[0];
      if (!file || !infoExerciseName) { input.value = ''; return; }
      try {
        const base64 = await compressImage(file, 500, 0.7);
        setMetaFor(infoExerciseName, { image: base64 });
        renderExerciseInfo();
        toast('Reference photo saved ✓');
      } catch { toast('Could not save photo'); }
      input.value = '';
    });
  }
  return input;
}

function pickRowHTML(name) {
  const fav = isFavorite(name);
  return `<div class="exercise-pick-row" data-name="${escAttr(name)}">
    <span style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${fav ? '★ ' : ''}${escHtml(name)}</span>
    <button class="epr-info-btn" data-info="${escAttr(name)}" title="How-to & settings" style="background:none;border:none;padding:4px 6px;cursor:pointer;color:var(--text-muted);flex-shrink:0;">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="18" height="18" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
    </button>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16" stroke-width="2" style="flex-shrink:0;"><polyline points="9 18 15 12 9 6"/></svg>
  </div>`;
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

  // Favorites pinned to top (only when not searching). Case-insensitive dedup.
  const favs = [];
  if (!q) {
    const seenFav = new Set();
    Object.values(grouped).flat().forEach(name => {
      if (isFavorite(name) && !seenFav.has(name.toLowerCase())) { seenFav.add(name.toLowerCase()); favs.push(name); }
    });
  }
  const favSet = new Set(favs.map(n => n.toLowerCase()));

  let html = '';
  if (favs.length) {
    html += `<div class="exercise-group-header">★ Favorites</div>`;
    favs.forEach(name => { html += pickRowHTML(name); });
  }
  ['Chest','Shoulders','Triceps','Back','Biceps','Legs','Abs','Calisthenics','Custom'].forEach(g => {
    if (!grouped[g]?.length) return;
    html += `<div class="exercise-group-header">${g}</div>`;
    grouped[g].forEach(name => {
      if (favSet.has(name.toLowerCase())) return; // already shown in Favorites
      html += pickRowHTML(name);
    });
  });

  if (!html) html = `<div class="exercise-pick-row" data-name="${escAttr(query)}">Add "${escHtml(query)}"
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
  </div>`;

  container.innerHTML = html;
  container.querySelectorAll('.epr-info-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      openExerciseInfo(btn.dataset.info);
    });
  });
  container.querySelectorAll('.exercise-pick-row').forEach(row => {
    row.addEventListener('click', () => {
      const name = row.dataset.name;
      if (name) { closeSheet(); if (pickerCallback) pickerCallback(name); }
    });
  });
}

// ─── Add exercises ────────────────────────────────────────
function makeStrengthExercise(name) {
  const meta = getMetaFor(name);
  const ls = getLastSessionSet(name, 0);
  // Default to however many sets you actually did last time, so the flow starts
  // where you left off instead of at a single empty set.
  const lastSeries = getLastSessionSeries(name);
  const nSets = Math.min(20, Math.max(1,
    parseInt(meta.targetSets) || (lastSeries ? lastSeries.sets.length : 0) || 3));
  const sets = [];
  for (let i = 0; i < nSets; i++) sets.push({ weight:null, weightUnit:ls?.weightUnit||'lbs', reps:null, logged:false });
  const ex = { type:'strength', name, sets };
  if (meta.restSeconds) ex.restSeconds = meta.restSeconds;
  if (meta.targetReps)  ex.targetReps  = parseInt(meta.targetReps) || null;
  return ex;
}

function addStrengthExercise(name) {
  if (!activeSession) return;
  activeSession.exercises.push(makeStrengthExercise(name));
  scheduleAutoSave();
  focusGo(activeSession.exercises.length - 1);
}

function addCardioExercise(name, incline, speed, duration, distance) {
  if (!activeSession) return;
  activeSession.exercises.push({ type:'cardio', name, incline:parseNum(incline), speed:parseNum(speed), duration:parseNum(duration), distance:parseNum(distance) });
  scheduleAutoSave();
  focusGo(activeSession.exercises.length - 1);
}

function addRecoveryExercise(name, duration) {
  if (!activeSession) return;
  activeSession.exercises.push({ type:'recovery', name, duration:parseNum(duration) });
  scheduleAutoSave();
  focusGo(activeSession.exercises.length - 1);
}

// ─── Session Duration Clock ───────────────────────────────
let durationInterval = null;

function startDurationClock() {
  clearInterval(durationInterval);
  updateDurationDisplay();
  durationInterval = setInterval(updateDurationDisplay, 1000);
}

function stopDurationClock() {
  clearInterval(durationInterval);
  durationInterval = null;
}

function updateDurationDisplay() {
  const el = document.getElementById('session-duration');
  if (!el || !activeSession) return;
  const start = activeSession.startedAt || (activeSession.id ? parseInt(activeSession.id.replace('sess_','')) : Date.now());
  const elapsed = Math.floor((Date.now() - start) / 1000);
  const h = Math.floor(elapsed / 3600);
  const m = Math.floor((elapsed % 3600) / 60);
  const s = elapsed % 60;
  el.textContent = h > 0
    ? `${h}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`
    : `${m}:${String(s).padStart(2,'0')}`;
}

// ─── Warm-up Generator ────────────────────────────────────
function openWarmup(exIdx) {
  const ex = activeSession?.exercises[exIdx];
  if (!ex) return;
  const maxW = Math.max(0, ...(ex.sets||[]).map(s => normalizeWeight(s.weight, s.weightUnit)));
  const workingWeight = maxW > 0 ? maxW : 135;

  const WARMUP_SCHEME = [
    { pct: 0,   reps: 10, label: 'Bar only' },
    { pct: 0.4, reps: 8,  label: '40%' },
    { pct: 0.6, reps: 5,  label: '60%' },
    { pct: 0.75,reps: 3,  label: '75%' },
    { pct: 0.9, reps: 1,  label: '90%' },
  ];

  const rows = WARMUP_SCHEME.map(({ pct, reps, label }) => {
    const w = pct === 0 ? 45 : Math.round(workingWeight * pct / 5) * 5;
    return `<div style="display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid var(--border-light);">
      <span style="color:var(--text-muted);font-size:13px;font-weight:700;">${label}</span>
      <span style="font-size:16px;font-weight:800;">${w} lbs × ${reps}</span>
    </div>`;
  }).join('');

  document.getElementById('warmup-content').innerHTML = `
    <p style="font-size:13px;color:var(--text-muted);margin-bottom:16px;">Working weight: <strong style="color:var(--text-primary);">${workingWeight} lbs</strong></p>
    ${rows}
    <p style="font-size:12px;color:var(--text-muted);margin-top:16px;line-height:1.6;">Rest 60–90s between warm-up sets. Do not log these — they don't count toward your session.</p>`;
  openSheet('sheet-warmup');
}

// ─── Workout Summary ──────────────────────────────────────
function showWorkoutSummary(sess) {
  const el = document.getElementById('sheet-session-summary');
  if (!el) return;

  const strengthExs = (sess.exercises||[]).filter(e => e.type==='strength');
  const cardioExs   = (sess.exercises||[]).filter(e => e.type==='cardio');
  const recoveryExs = (sess.exercises||[]).filter(e => e.type==='recovery');

  let totalVol = 0, totalSets = 0;
  strengthExs.forEach(ex => {
    (ex.sets||[]).filter(s => s.weight!=null && s.reps!=null).forEach(set => {
      totalVol += normalizeWeight(set.weight, set.weightUnit) * (parseFloat(set.reps)||0);
      totalSets++;
    });
  });

  const durationMs  = sess.completedAt - (sess.startedAt || sess.completedAt);
  const durationMin = Math.round(durationMs / 60000);
  const typeLabel   = sessionTypeLabel(sess);
  const prNames     = getSessionPRNames(sess);
  const volStr      = totalVol >= 1000 ? `${(totalVol/1000).toFixed(1)}k` : `${Math.round(totalVol).toLocaleString()}`;
  const userName    = localStorage.getItem(LS.NAME) || '';

  let html = `<div class="summary-header">
    <div class="summary-day">DAY ${String(sess.dayNumber||1).padStart(2,'0')}</div>
    <div class="summary-type">${typeLabel ? escHtml(typeLabel) : 'Training'} Complete</div>
    <div class="summary-date">${formatDate(sess.date)}</div>
  </div>`;

  html += `<div class="summary-stats">`;
  if (durationMin > 0) html += `<div class="summary-stat"><span class="summary-stat-val">${durationMin}</span><span class="summary-stat-label">min</span></div>`;
  if (totalVol > 0)    html += `<div class="summary-stat"><span class="summary-stat-val">${volStr}</span><span class="summary-stat-label">lbs moved</span></div>`;
  if (totalSets > 0)   html += `<div class="summary-stat"><span class="summary-stat-val">${totalSets}</span><span class="summary-stat-label">sets</span></div>`;
  if (prNames.length)  html += `<div class="summary-stat summary-stat-pr"><span class="summary-stat-val">${prNames.length}</span><span class="summary-stat-label">PR${prNames.length>1?'s':''}</span></div>`;
  html += `</div>`;

  if (prNames.length) {
    html += `<div class="summary-section-label">Personal Records</div>
    <div class="summary-pr-row">${prNames.map(n => `<span class="summary-pr-chip">🏆 ${escHtml(n)}</span>`).join('')}</div>`;
  }

  if (strengthExs.length) {
    html += `<div class="summary-section-label">Strength</div>`;
    strengthExs.forEach(ex => {
      const done = (ex.sets||[]).filter(s => s.weight!=null && s.reps!=null);
      if (!done.length) return;
      const isPRex = prNames.some(n => n.toLowerCase()===ex.name.toLowerCase());
      html += `<div class="summary-exercise">
        <div class="summary-ex-name">${escHtml(ex.name)}${isPRex ? ' <span class="summary-pr-badge">PR</span>' : ''}</div>
        <div class="summary-sets-row">${done.map((set,i) => {
          const unit = set.weightUnit==='each_side' ? '/side' : 'lbs';
          return `<span class="summary-set-chip">Set ${i+1}: ${set.weight} ${unit} × ${set.reps}</span>`;
        }).join('')}</div>
      </div>`;
    });
  }

  if (cardioExs.length) {
    html += `<div class="summary-section-label">Cardio</div>`;
    cardioExs.forEach(ex => {
      const parts = [];
      if (ex.duration) parts.push(`${ex.duration} min`);
      if (ex.distance) parts.push(`${ex.distance} mi`);
      if (ex.incline)  parts.push(`incline ${ex.incline}`);
      if (ex.speed)    parts.push(`${ex.speed} mph`);
      html += `<div class="summary-exercise">
        <div class="summary-ex-name">${escHtml(ex.name)}</div>
        ${parts.length ? `<div class="summary-sets-row">${parts.map(p=>`<span class="summary-set-chip">${escHtml(p)}</span>`).join('')}</div>` : ''}
      </div>`;
    });
  }

  if (recoveryExs.length) {
    html += `<div class="summary-section-label">Recovery</div>`;
    recoveryExs.forEach(ex => {
      html += `<div class="summary-exercise">
        <div class="summary-ex-name">${escHtml(ex.name)}${ex.duration ? `<span class="summary-ex-detail">${ex.duration} min</span>` : ''}</div>
      </div>`;
    });
  }

  if (sess.note) {
    html += `<div class="summary-section-label">Session Note</div>
    <div class="summary-note">"${escHtml(sess.note)}"</div>`;
  }

  const lines = ['That\'s how it\'s done.','Work speaks for itself.','Another day forward.','The grind continues.','Built different.','Stay locked in.','Earned it.'];
  html += `<div class="summary-closing">${userName ? `${escHtml(userName)} — ` : ''}${lines[Math.floor(Math.random()*lines.length)]}</div>`;

  // Photo section
  if (sess.photo) {
    html += `<div id="summary-photo-wrap" style="margin-top:16px;">${buildSummaryPhotoInnerHTML(sess)}</div>`;
  } else {
    html += `<div id="summary-photo-wrap" style="margin-top:16px;"><button class="btn btn-ghost" id="btn-add-workout-photo" style="width:100%;justify-content:center;gap:8px;"><span style="font-size:18px;">📸</span> Add Photo</button></div>`;
  }
  html += `<button class="btn btn-primary" id="btn-share-card" style="width:100%;justify-content:center;gap:8px;min-height:50px;border-radius:14px;font-weight:800;margin-top:10px;">📤 Share workout card</button>`;

  document.getElementById('session-summary-content').innerHTML = html;
  document.getElementById('btn-share-card')?.addEventListener('click', () => openShareCard(sess));

  // Photo input (persists across calls)
  let photoInput = document.getElementById('_summary-photo-input');
  if (!photoInput) {
    photoInput = document.createElement('input');
    photoInput.type = 'file';
    photoInput.accept = 'image/*';
    photoInput.id = '_summary-photo-input';
    photoInput.style.display = 'none';
    document.body.appendChild(photoInput);
  }
  photoInput.value = '';

  const refreshPhotoSection = () => {
    const wrap = document.getElementById('summary-photo-wrap');
    if (!wrap) return;
    wrap.innerHTML = sess.photo
      ? buildSummaryPhotoInnerHTML(sess)
      : `<button class="btn btn-ghost" id="btn-add-workout-photo" style="width:100%;justify-content:center;gap:8px;"><span style="font-size:18px;">📸</span> Add Photo</button>`;
    bindPhotoButtons();
  };

  const bindPhotoButtons = () => {
    document.getElementById('btn-add-workout-photo')?.addEventListener('click', () => photoInput.click());
    document.getElementById('btn-change-workout-photo')?.addEventListener('click', () => photoInput.click());
    document.getElementById('btn-share-workout-photo')?.addEventListener('click', () => shareWorkoutPhoto(sess));
  };

  photoInput.onchange = async () => {
    const file = photoInput.files?.[0];
    if (!file) return;
    try {
      const base64 = await compressImage(file, 600, 0.72);
      const sessions = getSessions();
      const idx = sessions.findIndex(s => s.id === sess.id);
      if (idx >= 0) { sessions[idx].photo = base64; saveSessions(sessions); }
      sess.photo = base64;
      refreshPhotoSection();
      toast('Photo saved ✓');
    } catch { toast('Could not save photo'); }
    photoInput.value = '';
  };

  bindPhotoButtons();

  const editBtn = document.getElementById('btn-summary-edit-session');
  if (editBtn) {
    editBtn.onclick = () => {
      closeSheet('sheet-session-summary');
      openEditSession(sess.id);
    };
  }

  openSheet('sheet-session-summary');
}

// ─── Supersets ────────────────────────────────────────────
let supersetCounter = 0;

function toggleSuperset(exIdx) {
  const ex = activeSession.exercises[exIdx];
  if (!ex) return;

  if (ex.supersetId) {
    // Remove from superset
    const groupId = ex.supersetId;
    activeSession.exercises.forEach(e => { if (e.supersetId === groupId) e.supersetId = null; });
  } else {
    // Find the next exercise to pair with, or create new group
    const next = activeSession.exercises[exIdx + 1];
    if (!next || next.type !== 'strength') { toast('Add another strength exercise below to pair'); return; }
    const groupId = `ss${++supersetCounter}`;
    ex.supersetId = groupId;
    next.supersetId = groupId;
  }
  scheduleAutoSave();
  renderExerciseBlocks();
}

function scrollToNextSuperset(exIdx) {
  const ex = activeSession.exercises[exIdx];
  if (!ex?.supersetId) return;
  const nextIdx = activeSession.exercises.findIndex((e, i) => i > exIdx && e.supersetId === ex.supersetId);
  if (nextIdx === -1) return;
  const nextBlock = document.querySelector(`.exercise-block[data-idx="${nextIdx}"]`);
  if (nextBlock) nextBlock.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ─── Rest Timer ───────────────────────────────────────────
let restTimerInterval = null;
let restTimerEnd = 0;
let restNotifTimeout = null;
let currentTimerExIdx = null;
let restWakeLock = null;
let restAudioCtx = null;

// A locked phone suspends both the interval and the timeout, so a plain
// setTimeout alert never fires. Holding the screen awake for the length of a
// rest keeps the countdown live and the alert honest.
async function acquireRestWakeLock() {
  try {
    if (navigator.wakeLock && !restWakeLock) {
      restWakeLock = await navigator.wakeLock.request('screen');
      restWakeLock.addEventListener?.('release', () => { restWakeLock = null; });
    }
  } catch { restWakeLock = null; }
}
function releaseRestWakeLock() {
  try { restWakeLock?.release?.(); } catch {}
  restWakeLock = null;
}

// An audible cue, so it lands even if notifications were never granted.
function playRestChime() {
  try {
    restAudioCtx = restAudioCtx || new (window.AudioContext || window.webkitAudioContext)();
    if (restAudioCtx.state === 'suspended') restAudioCtx.resume();
    const now = restAudioCtx.currentTime;
    [0, 0.18].forEach((offset, i) => {
      const osc = restAudioCtx.createOscillator(), gain = restAudioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.value = i === 0 ? 880 : 1175;
      gain.gain.setValueAtTime(0.0001, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.35, now + offset + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + offset + 0.16);
      osc.connect(gain); gain.connect(restAudioCtx.destination);
      osc.start(now + offset); osc.stop(now + offset + 0.18);
    });
  } catch {}
}

function restIsRunning() { return restTimerInterval !== null && restTimerEnd > 0; }

// Coming back from a locked screen: if rest finished while we were away,
// say so immediately instead of silently swallowing it.
function reconcileRestTimer() {
  if (!restIsRunning()) return;
  if (Date.now() >= restTimerEnd) {
    const lateBy = Math.round((Date.now() - restTimerEnd) / 1000);
    fireRestNotification(lateBy);
  } else {
    updateRestTimerDisplay();
  }
}

function startRestTimer(seconds, exIdx) {
  clearInterval(restTimerInterval);
  clearTimeout(restNotifTimeout);
  restTimerEnd = Date.now() + seconds * 1000;
  currentTimerExIdx = exIdx ?? null;

  // Hide any previously showing inline timer
  document.querySelectorAll('.inline-rest-timer').forEach(el => { el.style.display = 'none'; });

  // Show inline timer inside the exercise block that triggered it
  if (currentTimerExIdx !== null) {
    const block = document.querySelector(`.exercise-block[data-idx="${currentTimerExIdx}"]`);
    const inlineTimer = block?.querySelector('.inline-rest-timer');
    if (inlineTimer) {
      inlineTimer.style.display = 'flex';
      setTimeout(() => inlineTimer.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 80);
    }
  }

  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
  }

  acquireRestWakeLock();
  // Unlock audio while we still have the tap that started the rest.
  try {
    restAudioCtx = restAudioCtx || new (window.AudioContext || window.webkitAudioContext)();
    if (restAudioCtx.state === 'suspended') restAudioCtx.resume();
  } catch {}

  updateRestTimerDisplay();
  restTimerInterval = setInterval(() => {
    if (Date.now() >= restTimerEnd) fireRestNotification();
    else updateRestTimerDisplay();
  }, 500);

  restNotifTimeout = setTimeout(() => fireRestNotification(), seconds * 1000);
}

function stopRestTimer() {
  clearInterval(restTimerInterval);
  clearTimeout(restNotifTimeout);
  restTimerInterval = null;
  restNotifTimeout = null;
  restTimerEnd = 0;
  releaseRestWakeLock();
  document.querySelectorAll('.inline-rest-timer').forEach(el => { el.style.display = 'none'; });
  currentTimerExIdx = null;
}

function updateRestTimerDisplay() {
  const remaining = Math.max(0, Math.ceil((restTimerEnd - Date.now()) / 1000));
  const m = Math.floor(remaining / 60);
  const s = String(remaining % 60).padStart(2, '0');
  const timeStr = `Rest ${m}:${s}`;
  if (currentTimerExIdx !== null) {
    const block = document.querySelector(`.exercise-block[data-idx="${currentTimerExIdx}"]`);
    const textEl = block?.querySelector('.inline-rest-text');
    if (textEl) textEl.textContent = timeStr;
  }
}

function fireRestNotification(lateBySeconds) {
  stopRestTimer();
  playRestChime();
  navigator.vibrate?.([200, 100, 200]);
  const late = lateBySeconds > 5
    ? `Rest finished ${lateBySeconds >= 60 ? Math.round(lateBySeconds / 60) + 'm' : lateBySeconds + 's'} ago.`
    : 'Time to get back to it.';
  if ('Notification' in window && Notification.permission === 'granted') {
    try { new Notification('Rest done — next set!', { body: late, silent: false }); } catch {}
  }
  if (document.visibilityState === 'visible') toast('Rest done \u2014 next set');
}

// ─── Per-exercise rest time ────────────────────────────────
const REST_PRESETS = [30, 60, 90, 120, 180, 300];

function cycleRestTime(exIdx) {
  const ex = activeSession.exercises[exIdx];
  if (!ex) return;
  const current = ex.restSeconds ?? 90;
  const nextIdx = (REST_PRESETS.indexOf(current) + 1) % REST_PRESETS.length;
  ex.restSeconds = REST_PRESETS[nextIdx];
  scheduleAutoSave();
  // Update button label in place without full re-render
  const block = document.querySelector(`.exercise-block[data-idx="${exIdx}"]`);
  if (block) {
    const btn = block.querySelector('.rest-time-edit');
    const s = ex.restSeconds;
    const label = s >= 60
      ? `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`
      : `${s}s`;
    if (btn) btn.textContent = `⏱ ${label}`;
  }
  toast(`Rest: ${ex.restSeconds >= 60 ? Math.floor(ex.restSeconds/60) + 'm' + (ex.restSeconds%60 ? ex.restSeconds%60+'s' : '') : ex.restSeconds + 's'}`);
}

// ─── Plate Calculator ─────────────────────────────────────
let plateBarWeight = 45;
const PLATE_SIZES = [45, 35, 25, 10, 5, 2.5];

function openPlateCalc(exIdx) {
  const ex = activeSession.exercises[exIdx];
  // Whatever is dialled in right now is what you are about to load, so prefer
  // that over the heaviest weight already banked for this exercise.
  const block = document.querySelector(`.exercise-block[data-idx="${exIdx}"]`);
  const live  = parseFloat(block?.querySelector('.set-weight')?.value);
  const si    = block && block.dataset.si != null ? +block.dataset.si : -1;
  const unit  = ex?.sets?.[si]?.weightUnit || 'lbs';
  const maxW  = live > 0
    ? normalizeWeight(live, unit)
    : (ex?.sets ? Math.max(0, ...ex.sets.map(st => normalizeWeight(st.weight, st.weightUnit))) : 0);
  const input = document.getElementById('plate-calc-weight');
  input.value = maxW > 0 ? Math.round(maxW * 100) / 100 : '';
  document.getElementById('plate-bar-toggle').textContent = `${plateBarWeight} lb bar`;
  calcPlates();
  openSheet('sheet-plate-calc');
}

function calcPlates() {
  const raw = parseFloat(document.getElementById('plate-calc-weight').value);
  const result = document.getElementById('plate-calc-result');
  if (!raw || raw <= plateBarWeight) {
    result.innerHTML = raw && raw <= plateBarWeight
      ? `<span style="color:var(--text-muted);">Just the ${plateBarWeight} lb bar</span>`
      : `<span style="color:var(--text-muted);">Enter a weight above</span>`;
    return;
  }
  const perSide = (raw - plateBarWeight) / 2;
  let remaining = perSide;
  const plates = [];
  for (const p of PLATE_SIZES) {
    const count = Math.floor(remaining / p);
    if (count > 0) { plates.push({ p, count }); remaining = +(remaining - count * p).toFixed(2); }
  }
  if (Math.abs(remaining) > 0.1) {
    result.innerHTML = `<span style="color:var(--danger);">Can't make ${raw} lbs exactly with standard plates.<br>Closest: ${raw - remaining * 2} lbs</span>`;
    return;
  }
  const chips = plates.map(({ p, count }) =>
    `${Array(count).fill(`<span class="plate-chip">${p}</span>`).join('')}`
  ).join('');
  result.innerHTML = `<div style="margin-bottom:4px;font-size:12px;color:var(--text-muted);font-weight:600;">Each side:</div>${chips || '<span style="color:var(--text-muted);">Just the bar</span>'}`;
}

function bindPlateCalc() {
  document.getElementById('plate-calc-weight').addEventListener('input', calcPlates);
  document.getElementById('plate-bar-toggle').addEventListener('click', () => {
    plateBarWeight = plateBarWeight === 45 ? 35 : plateBarWeight === 35 ? 15 : 45;
    document.getElementById('plate-bar-toggle').textContent = `${plateBarWeight} lb bar`;
    calcPlates();
  });
  document.getElementById('log-rest-skip').addEventListener('click', stopRestTimer);
}

// ─── Progress view ────────────────────────────────────────
let progressChart  = null;
let bodyWtChart    = null;
let activityChart  = null;
let selectedExercise = null;
let chartMetric = 'weight'; // 'weight' = top set weight, 'e1rm' = estimated 1-rep max
let calMonth       = null; // currently displayed month in the training calendar

// ═══ Progress dashboard ═══════════════════════════════════
// Four things worth knowing at a glance: is volume going up, is the
// training balanced, what has been neglected, what is new.
function sessionVolume(sess) {
  let v = 0;
  (sess.exercises || []).forEach(ex => {
    if (ex.type !== 'strength') return;
    (ex.sets || []).forEach(st => {
      if (st.weight != null && st.reps != null)
        v += normalizeWeight(st.weight, st.weightUnit) * (parseFloat(st.reps) || 0);
    });
  });
  return v;
}

function exerciseGroupOf(name) {
  const custom = getExerciseGroupMap();
  if (custom[name]) return custom[name];
  const n = String(name || '').toLowerCase();
  const hit = getExerciseGroups().find(e => e.name.toLowerCase() === n);
  if (hit) return hit.group;
  const d = DEFAULT_EXERCISES.find(e => e.name.toLowerCase() === n);
  return d ? d.group : 'Other';
}

// ── 9. Did you actually do what the plan said? ──
function planAdherence(weeks) {
  const plan = getPlan();
  if (!plan || !plan.schedule) return null;
  const trained = new Set(getSessions().filter(s => s.completedAt).map(s => s.date));
  const today = new Date(todayISO() + 'T12:00:00');
  let planned = 0, hit = 0, extra = 0;
  for (let i = 1; i <= weeks * 7; i++) {
    const d = new Date(today); d.setDate(today.getDate() - i);
    const iso = isoOf(d);
    const want = plan.schedule[d.getDay()];
    const did = trained.has(iso);
    if (want) { planned++; if (did) hit++; }
    else if (did) extra++;
  }
  if (!planned) return null;
  return { planned, hit, extra, pct: Math.round((hit / planned) * 100), weeks };
}

// ── 10. Balance now vs the window before it ──
function groupVolumeBetween(startISO, endISO) {
  const out = {};
  getSessions().filter(s => s.completedAt && s.date >= startISO && s.date < endISO).forEach(sess => {
    (sess.exercises || []).forEach(ex => {
      if (ex.type !== 'strength') return;
      let v = 0;
      (ex.sets || []).forEach(st => {
        if (st.weight != null && st.reps != null)
          v += Math.max(1, normalizeWeight(st.weight, st.weightUnit)) * (parseFloat(st.reps) || 0);
      });
      if (v > 0) { const g = exerciseGroupOf(ex.name); out[g] = (out[g] || 0) + v; }
    });
  });
  return out;
}

function groupShare(map) {
  const total = Object.values(map).reduce((a, b) => a + b, 0);
  const out = {};
  if (total > 0) Object.entries(map).forEach(([g, v]) => { out[g] = (v / total) * 100; });
  return out;
}

// ── 11. Weekly volume, newest last, for the fatigue read ──
function weeklyVolumes(nWeeks) {
  const d = new Date(todayISO() + 'T12:00:00');
  const thisWkStart = new Date(d); thisWkStart.setDate(d.getDate() - d.getDay());
  const out = [];
  for (let i = nWeeks - 1; i >= 0; i--) {
    const a = new Date(thisWkStart); a.setDate(thisWkStart.getDate() - i * 7);
    const b = new Date(a); b.setDate(a.getDate() + 7);
    out.push(getSessions()
      .filter(s => s.completedAt && s.date >= isoOf(a) && s.date < isoOf(b))
      .reduce((n, s) => n + sessionVolume(s), 0));
  }
  return out;
}

// Three straight weeks of climbing, well above your own normal, is when a
// deload is worth taking. A long flat stretch is worth naming too.
function loadSignal() {
  const w = weeklyVolumes(7);
  const complete = w.slice(0, -1);             // the current week is still filling
  const live = complete.filter(v => v > 0);
  if (live.length < 4) return null;
  const recent = complete.slice(-3);
  const sorted = live.slice().sort((a, b) => a - b);
  const median = sorted[Math.floor(sorted.length / 2)] || 1;
  const rising = recent.length === 3 && recent[0] < recent[1] && recent[1] < recent[2];
  const last = recent[recent.length - 1];

  if (rising && last >= median * 1.35) {
    return { kind: 'deload', text: `Volume has climbed three weeks running and is ${Math.round((last / median - 1) * 100)}% over your normal. A lighter week would bank it.` };
  }
  if (last === 0) return { kind: 'off', text: 'No volume last week. Pick something small and get moving again.' };
  const flat = complete.slice(-4).every(v => v > 0 && Math.abs(v / median - 1) < 0.1);
  if (flat) return { kind: 'flat', text: 'Volume has been level for a month. If you want more, add a set before you add weight.' };
  return null;
}

function renderProgressDashboard() {
  const wrap = document.getElementById('progress-dashboard');
  if (!wrap) return;
  const sessions = getSessions().filter(s => s.completedAt)
    .sort((a, b) => a.completedAt - b.completedAt);

  if (sessions.length < 2) {
    wrap.innerHTML = `<div class="dash-block"><div class="dash-empty">
      Log a couple of sessions and this fills in with your volume trend, how
      balanced your training is, and what you have been neglecting.</div></div>`;
    return;
  }

  // ── Volume trend over the last 12 sessions, and this week vs last ──
  const recent = sessions.slice(-12);
  const vols = recent.map(sessionVolume);
  const peak = Math.max(...vols, 1);
  const spark = vols.map((v, i) =>
    `<span class="spark-bar${i >= vols.length - 3 ? ' recent' : ''}" style="height:${Math.max(4, Math.round((v / peak) * 100))}%"></span>`).join('');

  const d = new Date(todayISO() + 'T12:00:00');
  const wkStart = new Date(d); wkStart.setDate(d.getDate() - d.getDay());
  const prevStart = new Date(wkStart); prevStart.setDate(wkStart.getDate() - 7);
  const sumBetween = (a, b) => sessions
    .filter(x => x.date >= isoOf(a) && (b ? x.date < isoOf(b) : true))
    .reduce((n, x) => n + sessionVolume(x), 0);
  const thisWk = sumBetween(wkStart, null);
  const lastWk = sumBetween(prevStart, wkStart);
  let delta = '', dcls = 'flat';
  if (lastWk > 0) {
    const pc = Math.round(((thisWk - lastWk) / lastWk) * 100);
    dcls = pc > 2 ? 'up' : pc < -2 ? 'down' : 'flat';
    delta = `${pc > 0 ? '+' : ''}${pc}% vs last week`;
  } else if (thisWk > 0) { dcls = 'up'; delta = 'First week of volume'; }

  // ── Balance by muscle group, last 30 days ──
  const cutoff = new Date(d); cutoff.setDate(d.getDate() - 30);
  const byGroup = {}; let groupTotal = 0;
  const lastSeen = {};
  sessions.forEach(sess => {
    (sess.exercises || []).forEach(ex => {
      if (ex.type !== 'strength') return;
      const g = exerciseGroupOf(ex.name);
      if (!lastSeen[g] || sess.date > lastSeen[g]) lastSeen[g] = sess.date;
      if (sess.date < isoOf(cutoff)) return;
      let v = 0;
      (ex.sets || []).forEach(st => {
        if (st.weight != null && st.reps != null)
          v += Math.max(1, normalizeWeight(st.weight, st.weightUnit)) * (parseFloat(st.reps) || 0);
      });
      if (v > 0) { byGroup[g] = (byGroup[g] || 0) + v; groupTotal += v; }
    });
  });
  // Share of volume now, against the same length of time before it.
  const priorStart = new Date(d); priorStart.setDate(d.getDate() - 60);
  const nowShare  = groupShare(byGroup);
  const prevShare = groupShare(groupVolumeBetween(isoOf(priorStart), isoOf(cutoff)));
  const balance = Object.entries(byGroup).sort((a, b) => b[1] - a[1]).slice(0, 6);
  const balHTML = groupTotal > 0 ? balance.map(([g, v]) => {
    const pct = Math.round((v / groupTotal) * 100);
    const before = prevShare[g];
    let trend = '';
    if (before != null) {
      const diff = Math.round(nowShare[g] - before);
      if (Math.abs(diff) >= 4) {
        trend = `<span class="bal-trend ${diff > 0 ? 'up' : 'down'}">${diff > 0 ? '\u25B2' : '\u25BC'}${Math.abs(diff)}pt</span>`;
      }
    }
    return `<div class="bal-row">
      <span class="bal-name">${escHtml(g)}</span>
      <span class="bal-track"><span class="bal-fill" style="width:${Math.max(2, pct)}%"></span></span>
      <span class="bal-pct">${pct}%${trend}</span></div>`;
  }).join('') : '';

  // ── What has gone quiet: trained before, but not lately ──
  const today = new Date(todayISO() + 'T12:00:00');
  const stale = Object.entries(lastSeen)
    .map(([g, date]) => [g, Math.round((today - new Date(date + 'T12:00:00')) / 86400000)])
    .filter(([, days]) => days >= 10)
    .sort((a, b) => b[1] - a[1]).slice(0, 4);

  // ── Most recent PRs ──
  const prs = [];
  sessions.slice().reverse().some(sess => {
    getSessionPRNames(sess).forEach(name => {
      if (prs.length < 4 && !prs.some(p => p.name === name)) {
        const ex = (sess.exercises || []).find(e => e.name === name);
        let best = 0;
        (ex?.sets || []).forEach(st => { best = Math.max(best, normalizeWeight(st.weight, st.weightUnit)); });
        prs.push({ name, weight: Math.round(best), date: sess.date });
      }
    });
    return prs.length >= 4;
  });

  const adherence = planAdherence(4);
  const load = loadSignal();

  wrap.innerHTML = `
    <div class="dash-block">
      <div class="dash-head">
        <span class="dash-title">Volume</span>
        ${delta ? `<span class="dash-delta ${dcls}">${escHtml(delta)}</span>` : ''}
      </div>
      <div class="spark">${spark}</div>
      <div class="spark-foot"><span>${recent.length} sessions</span><span>${compactNum(vols[vols.length-1])} lbs last</span></div>
    </div>

    ${load ? `<div class="dash-block">
      <div class="dash-head"><span class="dash-title">Load</span></div>
      <div class="dash-note ${load.kind}">${escHtml(load.text)}</div>
    </div>` : ''}

    ${adherence ? `<div class="dash-block">
      <div class="dash-head">
        <span class="dash-title">Plan · last ${adherence.weeks} weeks</span>
        <span class="dash-delta ${adherence.pct >= 80 ? 'up' : adherence.pct >= 50 ? 'flat' : 'down'}">${adherence.pct}%</span>
      </div>
      <div class="dash-note">${adherence.hit} of ${adherence.planned} planned sessions${adherence.extra ? `, plus ${adherence.extra} unplanned` : ''}.</div>
    </div>` : ''}

    ${balHTML ? `<div class="dash-block">
      <div class="dash-head"><span class="dash-title">Balance · last 30 days</span><span class="dash-title">vs 30 before</span></div>
      ${balHTML}
    </div>` : ''}

    ${stale.length ? `<div class="dash-block">
      <div class="dash-head"><span class="dash-title">Gone quiet</span></div>
      ${stale.map(([g, days]) => `<div class="dash-row">
        <span class="dash-row-name">${escHtml(g)}</span>
        <span class="dash-row-meta warn">${days} days ago</span></div>`).join('')}
    </div>` : ''}

    ${prs.length ? `<div class="dash-block">
      <div class="dash-head"><span class="dash-title">Recent records</span></div>
      ${prs.map(p => `<div class="dash-row">
        <span class="dash-row-name">${escHtml(p.name)}</span>
        <span class="dash-row-val">${p.weight}</span>
        <span class="dash-row-meta">${escHtml(shortDateCaps(p.date))}</span></div>`).join('')}
    </div>` : ''}`;
}

function renderProgress() {
  const sessions  = getSessions().filter(s => s.completedAt);
  const exercises = getExercisesWithData(sessions);
  const emptyFull = document.getElementById('progress-empty-full');
  const content   = document.getElementById('progress-content');
  if (!emptyFull || !content) return;

  if (!exercises.length) {
    emptyFull.style.display = 'block';
    content.style.display = 'none';
    if (progressChart) { progressChart.destroy(); progressChart = null; }
  } else {
    emptyFull.style.display = 'none';
    content.style.display = 'block';
    if (!selectedExercise || !exercises.some(e => e.name.toLowerCase() === selectedExercise.toLowerCase())) {
      selectedExercise = exercises[0].name;
    }
    document.getElementById('progress-selected-name').textContent = selectedExercise;
    renderExerciseChart(selectedExercise, sessions);
  }

  renderProgressDashboard();

  // Render whichever slide is currently visible
  const slider = document.getElementById('progress-slider');
  const slideIdx = slider ? Math.round(slider.scrollLeft / (slider.offsetWidth || 1)) : 0;
  if (slideIdx === 1) renderBodyWeightChart();
}

function getExercisesWithData(sessions) {
  const seen = new Map();
  sessions.forEach(sess => (sess.exercises || []).forEach(ex => {
    const key = (ex.type || 'strength') + ':' + ex.name.toLowerCase();
    if (seen.has(key)) return;
    if (ex.type === 'strength' && ex.sets?.some(s => parseFloat(s.weight) > 0)) {
      seen.set(key, { name: ex.name, type: 'strength' });
    } else if (ex.type === 'cardio' && (ex.duration || ex.distance)) {
      seen.set(key, { name: ex.name, type: 'cardio' });
    } else if (ex.type === 'recovery' && ex.duration) {
      seen.set(key, { name: ex.name, type: 'recovery' });
    }
  }));
  return Array.from(seen.values()).sort((a,b) => a.name.localeCompare(b.name));
}

function openProgressPicker() {
  const sessions  = getSessions().filter(s => s.completedAt);
  const exercises = getExercisesWithData(sessions);
  const STRENGTH_ORDER = ['Chest','Shoulders','Triceps','Back','Biceps','Legs','Abs','Custom'];
  const ALL_ORDER = [...STRENGTH_ORDER, 'Cardio', 'Recovery'];

  const grouped = {};
  ALL_ORDER.forEach(g => grouped[g] = []);

  exercises.forEach(({ name, type }) => {
    if (type === 'cardio') { grouped['Cardio'].push(name); return; }
    if (type === 'recovery') { grouped['Recovery'].push(name); return; }
    const def = DEFAULT_EXERCISES.find(e => e.name.toLowerCase() === name.toLowerCase());
    const group = def?.group || 'Custom';
    if (!grouped[group]) grouped[group] = [];
    grouped[group].push(name);
  });

  let html = '';
  ALL_ORDER.forEach(g => {
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
  const exType = getExerciseTypeFromData(exerciseName, sessions);
  const metricToggle = document.getElementById('metric-toggle');
  if (exType === 'cardio' || exType === 'recovery') {
    if (metricToggle) metricToggle.style.display = 'none';
    renderCardioChart(exerciseName, exType, sessions);
    return;
  }
  if (metricToggle) metricToggle.style.display = 'flex';
  const useE1 = chartMetric === 'e1rm';
  const points    = buildChartData(exerciseName, sessions);
  const chartEmpty= document.getElementById('chart-empty');
  const statsEl   = document.getElementById('chart-stats');
  const logWrap   = document.getElementById('progress-log-wrap');
  const logList   = document.getElementById('progress-session-list');
  const titleEl   = document.getElementById('chart-exercise-title');

  if (!chartEmpty || !statsEl || !logWrap || !logList || !titleEl) return;
  titleEl.textContent = exerciseName;

  if (!points.length) {
    chartEmpty.style.display = 'flex';
    if (progressChart) { progressChart.destroy(); progressChart = null; }
    statsEl.innerHTML = '';
    logWrap.style.display = 'none';
    return;
  }

  // Only plot points that have data for the selected metric
  const chartPoints = points.filter(p => useE1 ? p.e1rm > 0 : p.hasWeight);
  const weights = chartPoints.map(p => useE1 ? p.e1rm : p.y);
  const pr      = weights.length ? Math.max(...weights) : 0;
  const recent  = weights.length ? weights[weights.length-1] : 0;
  const trend   = weights.length >= 2 ? ((recent - weights[weights.length-2]) >= 0 ? '↑' : '↓') : '—';
  const trendColor = trend === '↑' ? 'var(--green)' : trend === '↓' ? 'var(--danger)' : 'var(--text-muted)';

  if (!chartPoints.length) {
    chartEmpty.style.display = 'flex';
    chartEmpty.innerHTML = `<span>No weight data logged for this exercise yet</span>`;
    if (progressChart) { progressChart.destroy(); progressChart = null; }
  } else {
    chartEmpty.style.display = 'none';
    statsEl.innerHTML = `
      <div class="stat-card">
        <div class="stat-value">${pr}</div>
        <div class="stat-label">${useE1 ? 'Best 1RM (lbs)' : 'PR (lbs)'}</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${recent}</div>
        <div class="stat-label">${useE1 ? 'Last 1RM (lbs)' : 'Last (lbs)'}</div>
      </div>
      <div class="stat-card">
        <div class="stat-value" style="color:${trendColor}">${trend}</div>
        <div class="stat-label">${chartPoints.length} sessions</div>
      </div>`;

    const ctx = document.getElementById('progress-chart').getContext('2d');
    if (progressChart) { progressChart.destroy(); progressChart = null; }
    const c = chartColors();

    try {
      progressChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: chartPoints.map(p => p.label),
          datasets: [{
            data: chartPoints.map(p => useE1 ? p.e1rm : p.y),
            borderColor: c.accent,
            backgroundColor: c.accentFill,
            pointBackgroundColor: c.accent,
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: chartPoints.map(p => (useE1 ? p.e1rm : p.y) === pr ? 7 : 4),
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
                label: item => ` ${item.raw} lbs${item.raw === pr ? '  🏆' : ''}`,
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
              title: { display: true, text: 'lbs', color: c.tick, font: { size: 11, family: 'Inter' } },
            },
          },
          animation: { duration: 300 },
        },
      });
    } catch {
      chartEmpty.style.display = 'flex';
      chartEmpty.innerHTML = `<span>Charts unavailable — connect once to load Chart.js.</span>`;
    }
  }

  // Session log shows ALL sessions that contain the exercise, even if no weight was logged
  logWrap.style.display = 'block';
  logList.innerHTML = [...points].reverse().map(p => `
    <div class="progress-session-row">
      <span style="color:var(--text-muted);font-size:13px;">${p.label}</span>
      <span style="font-weight:700;${!p.hasWeight ? 'color:var(--text-muted);font-weight:500;' : ''}">
        ${p.hasWeight
          ? (useE1
              ? `${p.e1rm} lbs est. 1RM · ${p.y}×${p.reps || '?'}${p.e1rm===pr?' 🏆':''}`
              : `${p.y} lbs${p.reps ? ` × ${p.reps} reps` : ''} · ${p.sets} set${p.sets!==1?'s':''}${p.y===pr?' 🏆':''}`)
          : `${p.sets} set${p.sets!==1?'s':''} · no weight`}
      </span>
    </div>`).join('');
}

function buildChartData(exerciseName, sessions) {
  const sorted = [...sessions].sort((a,b) => (a.completedAt||0) - (b.completedAt||0));
  const pts = [];
  for (const sess of sorted) {
    const match = sess.exercises.find(e =>
      e.type === 'strength' && e.name.toLowerCase() === exerciseName.toLowerCase()
    );
    if (!match) continue;
    const sets = match.sets || [];
    // Best set = highest weight; if tied, highest reps
    let bestSet = null;
    for (const s of sets) {
      const w = normalizeWeight(s.weight, s.weightUnit);
      if (!bestSet || w > normalizeWeight(bestSet.weight, bestSet.weightUnit) ||
          (w === normalizeWeight(bestSet.weight, bestSet.weightUnit) && (parseInt(s.reps)||0) > (parseInt(bestSet.reps)||0))) {
        bestSet = s;
      }
    }
    const maxW = bestSet ? normalizeWeight(bestSet.weight, bestSet.weightUnit) : 0;
    const bestReps = bestSet ? (parseInt(bestSet.reps) || 0) : 0;
    // Best estimated 1RM across every set that session (Epley).
    let best1rm = 0;
    for (const s of sets) {
      const e = estimate1RM(normalizeWeight(s.weight, s.weightUnit), s.reps);
      if (e > best1rm) best1rm = e;
    }
    const d = new Date((sess.date || '') + 'T12:00:00');
    const dateStr = isNaN(d) ? sess.date : d.toLocaleDateString('en-US', { month:'short', day:'numeric' });
    const label = sess.dayNumber ? `Day ${sess.dayNumber} · ${dateStr}` : dateStr;
    pts.push({ label, y: maxW, e1rm: best1rm, reps: bestReps, hasWeight: maxW > 0, sets: sets.length });
  }
  return pts;
}

// ─── Cardio / Recovery chart ─────────────────────────────
function getExerciseTypeFromData(exerciseName, sessions) {
  for (const sess of sessions) {
    for (const ex of (sess.exercises || [])) {
      if (ex.name.toLowerCase() === exerciseName.toLowerCase()) return ex.type || 'strength';
    }
  }
  return 'strength';
}

function buildCardioChartData(exerciseName, sessions) {
  const sorted = [...sessions].sort((a,b) => (a.completedAt||0) - (b.completedAt||0));
  const pts = [];
  for (const sess of sorted) {
    const match = sess.exercises.find(e =>
      (e.type === 'cardio' || e.type === 'recovery') && e.name.toLowerCase() === exerciseName.toLowerCase()
    );
    if (!match) continue;
    const duration = parseFloat(match.duration) || 0;
    const d = new Date((sess.date || '') + 'T12:00:00');
    const dateStr = isNaN(d) ? sess.date : d.toLocaleDateString('en-US', { month:'short', day:'numeric' });
    const label = sess.dayNumber ? `Day ${sess.dayNumber} · ${dateStr}` : dateStr;
    pts.push({ label, y: duration, distance: match.distance || null, speed: match.speed || null });
  }
  return pts;
}

function renderCardioChart(exerciseName, exType, sessions) {
  const points   = buildCardioChartData(exerciseName, sessions);
  const chartEmpty = document.getElementById('chart-empty');
  const statsEl  = document.getElementById('chart-stats');
  const logWrap  = document.getElementById('progress-log-wrap');
  const logList  = document.getElementById('progress-session-list');
  const titleEl  = document.getElementById('chart-exercise-title');

  if (!chartEmpty || !statsEl || !logWrap || !logList || !titleEl) return;
  titleEl.textContent = exerciseName;

  if (!points.length) {
    chartEmpty.style.display = 'flex';
    if (progressChart) { progressChart.destroy(); progressChart = null; }
    statsEl.innerHTML = '';
    logWrap.style.display = 'none';
    return;
  }

  const durations = points.filter(p => p.y > 0).map(p => p.y);
  const maxDur  = durations.length ? Math.max(...durations) : 0;
  const lastDur = durations.length ? durations[durations.length - 1] : 0;
  const trend   = durations.length >= 2 ? (durations[durations.length-1] >= durations[durations.length-2] ? '↑' : '↓') : '—';
  const trendColor = trend === '↑' ? 'var(--green)' : trend === '↓' ? 'var(--danger)' : 'var(--text-muted)';
  const bestDist = exType === 'cardio' ? Math.max(0, ...points.map(p => parseFloat(p.distance || 0))) : 0;

  chartEmpty.style.display = 'none';
  statsEl.innerHTML = `
    <div class="stat-card"><div class="stat-value">${maxDur}</div><div class="stat-label">Best (min)</div></div>
    <div class="stat-card"><div class="stat-value">${lastDur}</div><div class="stat-label">Last (min)</div></div>
    ${bestDist > 0
      ? `<div class="stat-card"><div class="stat-value">${bestDist}</div><div class="stat-label">Best (mi)</div></div>`
      : `<div class="stat-card"><div class="stat-value" style="color:${trendColor}">${trend}</div><div class="stat-label">${points.length} sessions</div></div>`}`;

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
          pointBackgroundColor: c.accent,
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: points.map(p => p.y === maxDur ? 7 : 4),
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
              label: item => ` ${item.raw} min${item.raw === maxDur ? '  ⭐' : ''}`,
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
            title: { display: true, text: 'min', color: c.tick, font: { size: 11, family: 'Inter' } },
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
      <span style="font-weight:700;">${p.y > 0 ? `${p.y} min` : 'no duration'}${p.distance ? ` · ${p.distance} mi` : ''}${p.speed ? ` · ${p.speed} mph` : ''}</span>
    </div>`).join('');
}

// ─── Photo helpers ────────────────────────────────────────
function compressImage(file, maxPx, quality) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxPx / Math.max(img.width, img.height));
        const canvas = document.createElement('canvas');
        canvas.width  = Math.round(img.width  * scale);
        canvas.height = Math.round(img.height * scale);
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function buildSummaryPhotoInnerHTML(sess) {
  return `<div style="position:relative;border-radius:16px;overflow:hidden;">
    <img src="${sess.photo}" alt="Workout photo" style="width:100%;display:block;max-height:260px;object-fit:cover;border-radius:16px;">
    <div style="position:absolute;bottom:10px;right:10px;display:flex;gap:8px;">
      <button id="btn-change-workout-photo" class="btn btn-ghost" style="font-size:12px;padding:6px 10px;min-height:30px;background:rgba(0,0,0,0.5);border-color:transparent;color:#fff;">Change</button>
    </div>
  </div>`;
}

function shareWorkoutPhoto(sess) {
  if (!sess.photo) return;
  const typeLabel = sessionTypeLabel(sess) || 'Training';
  const text = `Day ${sess.dayNumber || '?'} — ${typeLabel} ✓ #G3Workout`;
  try {
    const [header, data] = sess.photo.split(',');
    const mime = header.match(/:(.*?);/)[1];
    const binary = atob(data);
    const arr = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) arr[i] = binary.charCodeAt(i);
    const blob = new Blob([arr], { type: mime });
    const file = new File([blob], `g3-day${sess.dayNumber||1}.jpg`, { type: 'image/jpeg' });
    if (navigator.canShare?.({ files: [file] })) {
      navigator.share({ files: [file], text }).catch(() => {});
      return;
    }
  } catch {}
  if (navigator.share) { navigator.share({ text }).catch(() => {}); return; }
  const a = document.createElement('a');
  a.href = sess.photo;
  a.download = `g3-day${sess.dayNumber||1}.jpg`;
  a.click();
}

// ─── Settings view ────────────────────────────────────────
function renderSettings() {
  const listEl = document.getElementById('settings-exercise-list');
  const names  = getAllExerciseNames();
  const ORDER  = ['Chest','Shoulders','Triceps','Back','Biceps','Legs','Abs','Calisthenics','Custom'];

  const customGroups = getExerciseGroupMap();
  const grouped = {};
  ORDER.forEach(g => grouped[g] = []);
  names.forEach(name => {
    const def = DEFAULT_EXERCISES.find(e => e.name.toLowerCase() === name.toLowerCase());
    const g = def?.group || customGroups[name] || 'Custom';
    if (!grouped[g]) grouped[g] = [];
    grouped[g].push(name);
  });

  // Preserve which groups are open across re-renders
  const openGroups = new Set(
    [...listEl.querySelectorAll('.settings-ex-group.open')].map(el => el.dataset.group)
  );

  const chevron = `<span class="settings-ex-group-chevron"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="15" height="15" stroke-width="2.2"><polyline points="6 9 12 15 18 9"/></svg></span>`;
  const xIcon  = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="14" height="14" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

  let html = '';
  ORDER.forEach(g => {
    if (!grouped[g]?.length) return;
    const isOpen = openGroups.has(g) ? ' open' : '';
    html += `<div class="settings-ex-group${isOpen}" data-group="${escAttr(g)}">
      <div class="settings-ex-group-header">
        <span class="settings-ex-group-title">${g}</span>
        <div class="settings-ex-group-meta">
          <span class="settings-ex-group-count">${grouped[g].length}</span>
          ${chevron}
        </div>
      </div>
      <div class="settings-ex-group-body">`;
    grouped[g].forEach(name => {
      const fav = isFavorite(name);
      html += `<div class="exercise-list-row">
        <button class="ex-fav-btn" data-fav="${escAttr(name)}" title="Favorite" style="background:none;border:none;cursor:pointer;font-size:17px;padding:2px 4px;color:${fav ? '#F5B301' : 'var(--text-muted)'};flex-shrink:0;">${fav ? '★' : '☆'}</button>
        <span style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${escHtml(name)}</span>
        <button class="ex-info-btn" data-info="${escAttr(name)}" title="How-to & settings" style="background:none;border:none;cursor:pointer;padding:4px 6px;color:var(--text-muted);flex-shrink:0;display:inline-flex;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="17" height="17" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
        </button>
        <button class="btn-icon danger" data-name="${escAttr(name)}">${xIcon}</button>
      </div>`;
    });
    html += `</div></div>`;
  });

  listEl.innerHTML = html;

  listEl.querySelectorAll('.settings-ex-group-header').forEach(header => {
    header.addEventListener('click', () => header.closest('.settings-ex-group').classList.toggle('open'));
  });

  listEl.querySelectorAll('.ex-fav-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      toggleFavorite(btn.dataset.fav);
      renderSettings();
    });
  });

  listEl.querySelectorAll('.ex-info-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      openExerciseInfo(btn.dataset.info);
    });
  });

  listEl.querySelectorAll('.btn-icon.danger').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const n = btn.dataset.name;
      saveExercises(getAllExerciseNames().filter(x => x !== n));
      renderSettings(); toast('Exercise removed');
    });
  });

  document.getElementById('app-version-label').textContent = `v${APP_VERSION}`;
  try { renderPlanSettings(); } catch (_) {}
  loadUserName();
}

// ─── Event bindings ───────────────────────────────────────
function bindEvents() {
  document.querySelectorAll('.nav-tab').forEach(tab => tab.addEventListener('click', () => showView(tab.dataset.view)));
  document.getElementById('backdrop').addEventListener('click', closeSheet);
  // Every sheet's grabber bar dismisses it — a consistent escape hatch on all sheets.
  document.querySelectorAll('.sheet-handle').forEach(h => h.addEventListener('click', closeSheet));

  // Share card: light/dark base toggle + share action
  document.getElementById('btn-share-light')?.addEventListener('click', e => {
    shareCardOpts.light = !shareCardOpts.light;
    e.currentTarget.classList.toggle('on', shareCardOpts.light);
    renderShareCardPreview();
  });
  document.getElementById('btn-do-share-card')?.addEventListener('click', doShareCard);

  document.getElementById('btn-open-settings')?.addEventListener('click', () => showView('settings'));

  document.getElementById('btn-toggle-note')?.addEventListener('click', () => {
    const h = document.getElementById('log-session-header');
    h.classList.toggle('note-open');
    if (h.classList.contains('note-open')) document.getElementById('session-note')?.focus();
  });

  // Recap (Wrapped-style period stories)
  document.getElementById('btn-open-recap')?.addEventListener('click', () => openRecap());
  document.getElementById('recap-close')?.addEventListener('click', closeRecap);
  document.getElementById('recap-prev')?.addEventListener('click', () => recapShift(-1));
  document.getElementById('recap-next')?.addEventListener('click', () => recapShift(1));
  document.getElementById('toggle-recap')?.addEventListener('click', () => {
    localStorage.setItem(LS.RECAP_ON, recapEnabled() ? '0' : '1');
    applyRecapSetting();
  });
  document.getElementById('btn-recap-share')?.addEventListener('click', shareRecapCard);
  document.getElementById('btn-recap-share-all')?.addEventListener('click', shareAllRecapCards);
  const recapSlider = document.getElementById('recap-slider');
  if (recapSlider) {
    let recapScrollT = null;
    recapSlider.addEventListener('scroll', () => {
      clearTimeout(recapScrollT);
      recapScrollT = setTimeout(syncRecapDots, 90);
    }, { passive: true });
  }

  // Keep the open sheet above the on-screen keyboard (iOS VisualViewport).
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', onViewportChange);
    window.visualViewport.addEventListener('scroll', onViewportChange);
  }
  // Also react the moment a field in any sheet is focused (keyboard is about to open).
  document.addEventListener('focusin', e => {
    if (activeSheet && e.target.closest('.sheet')) setTimeout(adjustActiveSheetForKeyboard, 100);
  });

  // Progress exercise picker
  document.getElementById('btn-progress-pick-exercise').addEventListener('click', openProgressPicker);

  // Chart metric toggle: top-set weight vs estimated 1RM
  document.querySelectorAll('#metric-toggle button').forEach(btn => {
    btn.addEventListener('click', () => {
      chartMetric = btn.dataset.metric;
      document.querySelectorAll('#metric-toggle button').forEach(b => b.classList.toggle('on', b === btn));
      renderProgress();
    });
  });

  // Theme segmented control
  document.querySelectorAll('.skin-tile').forEach(btn => {
    btn.addEventListener('click', () => applyTheme(btn.dataset.theme));
  });

  // Progress tabs + swipe
  const progressSlider = document.getElementById('progress-slider');
  const progressTabs   = document.querySelectorAll('.progress-tab');

  function setProgressTab(idx) {
    progressTabs.forEach((t,i) => t.classList.toggle('active', i === idx));
    if (idx === 1) renderBodyWeightChart();
  }

  progressTabs.forEach((tab, i) => {
    tab.addEventListener('click', () => {
      progressSlider.scrollTo({ left: i * progressSlider.offsetWidth, behavior: 'smooth' });
      setProgressTab(i);
    });
  });

  let slideScrollDebounce;
  progressSlider.addEventListener('scroll', () => {
    clearTimeout(slideScrollDebounce);
    slideScrollDebounce = setTimeout(() => {
      const idx = Math.round(progressSlider.scrollLeft / (progressSlider.offsetWidth || 1));
      setProgressTab(idx);
    }, 80);
  }, { passive: true });

  // Log weight sheet
  document.getElementById('btn-log-weight').addEventListener('click', () => {
    document.getElementById('log-weight-date').value = todayISO();
    document.getElementById('log-weight-value').value = '';
    openSheet('sheet-log-weight');
    setTimeout(() => document.getElementById('log-weight-value').focus(), 300);
  });

  document.getElementById('btn-log-weight-save').addEventListener('click', () => {
    const date = document.getElementById('log-weight-date').value || todayISO();
    const wt   = parseFloat(document.getElementById('log-weight-value').value);
    if (!wt || wt <= 0) { toast('Enter a valid weight'); return; }
    const log = getWeightLog().filter(e => e.date !== date);
    log.push({ date, weight: wt });
    log.sort((a,b) => a.date.localeCompare(b.date));
    saveWeightLog(log);
    closeSheet();
    renderBodyWeightChart();
    toast('Weight logged');
  });

  // Goals settings
  function saveGoalField() {
    const g = getGoals();
    g.goalWeight   = document.getElementById('goal-weight-input')?.value || '';
    g.weeklyTarget = document.getElementById('goal-sessions-input')?.value || '';
    saveGoals(g);
  }
  document.getElementById('goal-weight-input').addEventListener('input', saveGoalField);
  document.getElementById('goal-sessions-input').addEventListener('input', saveGoalField);

  // Settings goal tiles — toggle goalTypes
  document.querySelectorAll('.settings-goal-tile').forEach(tile => {
    tile.addEventListener('click', () => {
      const goals = getGoals();
      const key = tile.dataset.goal;
      const idx = goals.goalTypes.indexOf(key);
      if (idx === -1) goals.goalTypes.push(key);
      else goals.goalTypes.splice(idx, 1);
      saveGoals(goals);
      syncGoalTiles();
      renderHistory();
    });
  });

  // User name
  let nameDebounce;
  document.getElementById('settings-user-name').addEventListener('input', e => {
    clearTimeout(nameDebounce);
    nameDebounce = setTimeout(() => {
      const val = e.target.value.trim();
      if (val) localStorage.setItem(LS.NAME, val); else localStorage.removeItem(LS.NAME);
      loadUserName();
    }, 400);
  });

  // Profile fields
  function saveProfileField() {
    const age = document.getElementById('profile-age')?.value.trim() || '';
    const sex = document.getElementById('profile-sex')?.value || '';
    const heightFt = document.getElementById('profile-height-ft')?.value.trim() || '';
    const heightIn = document.getElementById('profile-height-in')?.value.trim() || '';
    const currentWeight = document.getElementById('profile-current-weight')?.value.trim() || '';
    saveProfile({ age, sex, heightFt, heightIn, currentWeight });
    // When current weight changes, log it for today so Body chart updates
    if (currentWeight) {
      const today = todayISO();
      const wt = parseFloat(currentWeight);
      if (wt > 0) {
        const log = getWeightLog().filter(e => e.date !== today);
        log.push({ date: today, weight: wt });
        log.sort((a, b) => a.date.localeCompare(b.date));
        saveWeightLog(log);
        renderBodyWeightChart();
      }
    }
  }
  let profileDebounce;
  ['profile-age','profile-height-ft','profile-height-in','profile-current-weight'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', () => {
      clearTimeout(profileDebounce);
      profileDebounce = setTimeout(saveProfileField, 500);
    });
  });
  document.getElementById('profile-sex')?.addEventListener('change', saveProfileField);

  // New session
  const handleNewSession = () => { renderWorkoutTypeGrid(); openSheet('sheet-type-picker'); };
  document.getElementById('btn-new-session').addEventListener('click', handleNewSession);
  document.getElementById('btn-new-session-log').addEventListener('click', handleNewSession);

  document.getElementById('btn-routine-back').addEventListener('click', () => { closeSheet(); renderWorkoutTypeGrid(); openSheet('sheet-type-picker'); });

  document.getElementById('btn-routine-add-ex').addEventListener('click', () => openExercisePicker(addRoutineExercise));

  document.getElementById('btn-routine-start').addEventListener('click', () => {
    const day  = document.getElementById('routine-day').value;
    const date = document.getElementById('routine-date').value || todayISO();
    if (!day) { toast('Enter a day number'); document.getElementById('routine-day').focus(); return; }
    const selectedExercises = [];
    document.querySelectorAll('#routine-preview-list .routine-item.active').forEach(item => {
      selectedExercises.push({ type: item.dataset.exType, name: item.dataset.exName });
    });
    closeSheet();
    startNewSession(day, date, '', pendingWorkoutType);
    selectedExercises.forEach(ex => {
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
    pendingWorkoutType = null;
    showView('log');
  });

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
    stopRestTimer(); stopDurationClock(); discardActiveSession(); showNoSession(); toast('Session discarded');
  });
  document.getElementById('btn-finish-session').addEventListener('click', () => {
    if (!activeSession) return;
    if (!activeSession.exercises.length) { toast('Add at least one exercise'); return; }
    const done = activeSession;
    stopRestTimer(); finishSession(); showNoSession(); showView('history');
    showWorkoutSummary(done);
    autoBackupIfNeeded();
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
  // Routine builder
  document.getElementById('btn-routine-builder-add').addEventListener('click', () => {
    openExercisePicker(name => {
      builderExercises.push({ type: guessExerciseType(name), name });
      renderBuilderList();
      openSheet('sheet-routine-builder');
    });
  });
  document.getElementById('btn-routine-builder-save').addEventListener('click', saveRoutineFromBuilder);
  document.getElementById('btn-routine-builder-delete').addEventListener('click', deleteRoutineFromBuilder);

  document.getElementById('btn-add-recovery-confirm').addEventListener('click', () => {
    const name = document.getElementById('recovery-type').value;
    if (!name) { toast('Select a recovery type'); return; }
    addRecoveryExercise(name, document.getElementById('recovery-duration').value);
    closeSheet();
  });

  document.getElementById('btn-export').addEventListener('click', () => {
    const backup = { exportedAt: new Date().toISOString(), version: APP_VERSION, data: {} };
    Object.values(LS).forEach(key => {
      const v = localStorage.getItem(key);
      if (v !== null) backup.data[key] = v;
    });
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `g3-backup-${todayISO()}.json`;
    a.click(); URL.revokeObjectURL(a.href);
    markBackupDone();
    toast('Full backup saved!');
  });

  document.getElementById('btn-export-csv').addEventListener('click', () => {
    const rows = [['Date','Day','Workout Type','Exercise','Type','Set','Weight','Unit','Reps','Incline','Speed','Duration (min)','Distance (mi)','Note']];
    getSessions().filter(s => s.completedAt).sort((a,b) => a.completedAt - b.completedAt).forEach(sess => {
      (sess.exercises || []).forEach(ex => {
        if (ex.type === 'strength') {
          (ex.sets || []).forEach((set, si) => {
            rows.push([sess.date, sess.dayNumber, sess.workoutType||'', ex.name, 'strength', si+1, set.weight??'', set.weightUnit||'lbs', set.reps??'', '', '', '', '', sess.note||'']);
          });
        } else if (ex.type === 'cardio') {
          rows.push([sess.date, sess.dayNumber, sess.workoutType||'', ex.name, 'cardio', '', '', '', '', ex.incline??'', ex.speed??'', ex.duration??'', ex.distance??'', sess.note||'']);
        } else if (ex.type === 'recovery') {
          rows.push([sess.date, sess.dayNumber, sess.workoutType||'', ex.name, 'recovery', '', '', '', '', '', '', ex.duration??'', '', sess.note||'']);
        }
      });
    });
    const csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g,'""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `domino-workouts-${todayISO()}.csv`;
    a.click(); URL.revokeObjectURL(a.href);
    toast('CSV exported!');
  });

  document.getElementById('btn-summary-done').addEventListener('click', closeSheet);

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
        // Full backup format: { data: { "domino_workout_sessions": "...", ... } }
        if (data.data && typeof data.data === 'object' && !Array.isArray(data.data)) {
          let restored = 0;
          Object.values(LS).forEach(key => {
            if (data.data[key] !== undefined) { localStorage.setItem(key, data.data[key]); restored++; }
          });
          renderHistory(); renderSettings();
          toast(`Backup restored!`);
          return;
        }
        // Sessions-only format: { sessions: [...] } or [...]
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

  document.getElementById('btn-force-refresh').addEventListener('click', async () => {
    try {
      if ('serviceWorker' in navigator) {
        const regs = await navigator.serviceWorker.getRegistrations();
        await Promise.all(regs.map(r => r.unregister()));
      }
      if ('caches' in window) {
        const keys = await caches.keys();
        await Promise.all(keys.map(k => caches.delete(k)));
      }
    } catch {}
    const base = window.location.href.split('?')[0].replace(/#.*/, '');
    window.location.replace(base + '?bust=' + Date.now());
  });

  document.getElementById('btn-clear-data').addEventListener('click', () => {
    if (!confirm('Delete ALL workout data? This cannot be undone.')) return;
    if (!confirm('Are you sure? All sessions will be permanently deleted.')) return;
    [LS.SESSIONS, LS.ACTIVE].forEach(k => localStorage.removeItem(k));
    activeSession = null; toast('All data cleared');
    renderSettings(); renderHistory();
  });

  document.getElementById('btn-add-custom-exercise').addEventListener('click', () => {
    document.getElementById('add-exercise-name').value = '';
    document.getElementById('add-exercise-category').value = 'Custom';
    openSheet('sheet-add-exercise');
    setTimeout(() => document.getElementById('add-exercise-name').focus(), 300);
  });

  document.getElementById('btn-add-exercise-save').addEventListener('click', () => {
    const name = document.getElementById('add-exercise-name').value.trim();
    const category = document.getElementById('add-exercise-category').value;
    if (!name) { toast('Enter a name'); return; }
    const list = getAllExerciseNames();
    if (list.some(e => e.toLowerCase() === name.toLowerCase())) { toast('Already in list'); return; }
    list.push(name);
    saveExercises(list);
    // Store category mapping for non-default exercises
    const groups = getExerciseGroupMap();
    groups[name] = category;
    saveExerciseGroups(groups);
    closeSheet();
    renderSettings();
    // Auto-open the target category group so user sees their new exercise
    const targetGroup = document.querySelector(`#settings-exercise-list .settings-ex-group[data-group="${category}"]`);
    if (targetGroup && !targetGroup.classList.contains('open')) targetGroup.classList.add('open');
    toast(`Added to ${category}`);
  });
}

// ─── Service Worker ───────────────────────────────────────

let swRegistration = null;
let lastUpdateCheck = 0;

// Fetch version.json bypassing every cache layer.
// Navigate to a timestamped URL so the SW can't serve a cached page on reload.
async function checkAppVersion() {
  try {
    const res = await fetch('./version.json?t=' + Date.now(), { cache: 'no-store' });
    if (!res.ok) return;
    const { v } = await res.json();
    if (v && v > APP_VERSION) {
      // Loop guard: if we just navigated to bust the cache, don't immediately do it
      // again (in case fresh content is still propagating).
      const lastBust = +(sessionStorage.getItem('g3_last_bust') || 0);
      if (Date.now() - lastBust < 12000) return;
      try { sessionStorage.setItem('g3_last_bust', String(Date.now())); } catch {}
      // Navigate to a timestamped URL so the SW fetch misses every cache layer.
      const base = window.location.href.split('?')[0].replace(/#.*/, '');
      window.location.replace(base + '?bust=' + Date.now());
    }
  } catch {}
}

// Re-check for a new version + refresh the service worker. Throttled so rapid
// foreground/blur toggles don't hammer the network.
function triggerUpdateChecks() {
  const now = Date.now();
  if (now - lastUpdateCheck < 4000) return;
  lastUpdateCheck = now;
  checkAppVersion();
  if (swRegistration) {
    swRegistration.update().catch(() => {});
    activateWaitingSW(swRegistration); // in case a new SW installed but got stuck waiting
  }
}

// If a new service worker has installed but is waiting (iOS sometimes ignores
// skipWaiting on install), tell it to take over now. controllerchange then reloads.
function activateWaitingSW(reg) {
  if (reg && reg.waiting) reg.waiting.postMessage({ type: 'SKIP_WAITING' });
}

function registerSW() {
  if (!('serviceWorker' in navigator)) return;
  checkAppVersion();
  let reloading = false;
  // controllerchange fires when a new SW takes control — most reliable on iOS
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (reloading) return;
    reloading = true;
    window.location.reload();
  });
  window.addEventListener('load', () => {
    // updateViaCache:'none' tells the browser to bypass HTTP cache when checking for SW updates
    navigator.serviceWorker.register('./sw.js?v=98', { updateViaCache: 'none' }).then(reg => {
      swRegistration = reg;
      reg.update();
      activateWaitingSW(reg); // a version could already be waiting from a prior visit
      reg.addEventListener('updatefound', () => {
        const newSW = reg.installing;
        newSW.addEventListener('statechange', () => {
          // Installed-but-waiting (a controller already exists) → push it to activate.
          if (newSW.state === 'installed' && navigator.serviceWorker.controller) {
            activateWaitingSW(reg);
          }
          if (newSW.state === 'activated' && !reloading) {
            reloading = true;
            window.location.reload();
          }
        });
      });
    }).catch(() => {});
  });

  // CRITICAL for iOS home-screen PWAs: iOS suspends the page and *resumes* it on
  // reopen rather than reloading, so a load-time-only check never re-runs. Re-check
  // whenever the app comes back to the foreground, plus a periodic backstop.
  // Coming back to the app: settle the rest timer before anything else, and
  // re-take the wake lock, which the system drops whenever the page is hidden.
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      reconcileRestTimer();
      if (restIsRunning()) acquireRestWakeLock();
    }
  });
  window.addEventListener('pageshow', () => { reconcileRestTimer(); });

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') triggerUpdateChecks();
  });
  window.addEventListener('pageshow', triggerUpdateChecks);
  window.addEventListener('focus', triggerUpdateChecks);
  setInterval(() => { if (document.visibilityState === 'visible') triggerUpdateChecks(); }, 60000);
}

// ─── Boot ─────────────────────────────────────────────────
/* ══════════════════════════════════════════════════════
   ONBOARDING
   ══════════════════════════════════════════════════════ */

let obSlideIdx = 0;
const OB_TOTAL = 5;

function showSplash() {
  // CSS handles the splash fade automatically — JS only triggers onboarding
  // for true first-time users. Existing users always skip.
  if (localStorage.getItem(LS.ONBOARDED)) return;
  const hasData = getSessions().length > 0
    || !!localStorage.getItem(LS.NAME)
    || !!localStorage.getItem(LS.PROFILE)
    || !!localStorage.getItem(LS.GOALS)
    || !!localStorage.getItem(LS.ACTIVE);
  if (hasData) { localStorage.setItem(LS.ONBOARDED, '1'); return; }
  setTimeout(() => {
    const ob = document.getElementById('onboarding');
    if (ob) ob.style.display = 'flex';
  }, 2000);
}

function obGoTo(idx) {
  const slides = document.querySelectorAll('.ob-slide');
  const dots   = document.querySelectorAll('.ob-dot');

  slides[obSlideIdx].classList.remove('ob-active');
  slides[obSlideIdx].classList.add('ob-exiting');
  const exitIdx = obSlideIdx;
  setTimeout(() => slides[exitIdx].classList.remove('ob-exiting'), 360);

  slides[idx].classList.add('ob-active');
  dots.forEach((d, i) => d.classList.toggle('ob-active', i === idx));
  obSlideIdx = idx;
}

function obNext() {
  if (obSlideIdx === 1) {
    const name = (document.getElementById('ob-name')?.value || '').trim();
    if (name) {
      localStorage.setItem(LS.NAME, name);
      loadUserName();
      const h = document.getElementById('ob-done-heading');
      if (h) h.innerHTML = `YOU'RE<br>READY,<br>${name.toUpperCase().split(' ')[0]}.`;
    }
  }
  if (obSlideIdx < OB_TOTAL - 1) obGoTo(obSlideIdx + 1);
}

function obSelectGoal(btn) {
  const goals = getGoals();
  const key = btn.dataset.goal;
  const idx = goals.goalTypes.indexOf(key);
  if (idx === -1) goals.goalTypes.push(key);
  else goals.goalTypes.splice(idx, 1);
  saveGoals(goals);
  syncGoalTiles();
}

function syncGoalTiles() {
  const goals = getGoals();
  document.querySelectorAll('.ob-goal-tile, .settings-goal-tile').forEach(t => {
    t.classList.toggle('ob-selected', goals.goalTypes.includes(t.dataset.goal));
  });
}

function obFinishProfile() {
  const sex        = document.getElementById('ob-sex')?.value || '';
  const age        = document.getElementById('ob-age')?.value.trim() || '';
  const heightFt   = document.getElementById('ob-height-ft')?.value.trim() || '';
  const heightIn   = document.getElementById('ob-height-in')?.value.trim() || '';
  const weight     = document.getElementById('ob-weight')?.value.trim() || '';

  if (sex || age || heightFt || weight) {
    saveProfile({ sex, age, heightFt, heightIn, currentWeight: weight });
    loadProfile();
    if (weight) {
      const today = todayISO();
      const wt = parseFloat(weight);
      if (wt > 0) {
        const log = getWeightLog().filter(e => e.date !== today);
        log.push({ date: today, weight: wt });
        log.sort((a, b) => a.date.localeCompare(b.date));
        saveWeightLog(log);
      }
    }
  }
  obGoTo(obSlideIdx + 1);
}

function obFinish() {
  localStorage.setItem(LS.ONBOARDED, '1');
  const ob = document.getElementById('onboarding');
  if (!ob) return;
  ob.style.transition = 'opacity 0.4s ease';
  ob.style.opacity = '0';
  setTimeout(() => { ob.style.display = 'none'; ob.style.opacity = ''; }, 420);
}

function init() {
  try {
    loadTheme();
    loadUserName();
    loadGoals();
    loadProfile();
    applyRecapSetting();
    seedDefaults();
    bindEvents();
    bindEditSessionSheet();
    bindPlateCalc();
    registerSW();
    const inProgress = loadActiveSession();
    if (inProgress) activeSession = inProgress;
    showView('today');
    showSplash();
  } catch (err) {
    // If init crashes (usually a stale cached file after a deploy), hard-reload once.
    const CRASH_KEY = 'g3_crash_reload';
    const last = parseInt(localStorage.getItem(CRASH_KEY) || '0');
    if (Date.now() - last > 30000) {
      localStorage.setItem(CRASH_KEY, String(Date.now()));
      window.location.reload();
    }
  }
}

document.addEventListener('DOMContentLoaded', init);
