/* ══════════════════════════════════════════════════════
   DOMINO Workout Tracker — app.js
   ══════════════════════════════════════════════════════ */

const APP_VERSION = 31;

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
