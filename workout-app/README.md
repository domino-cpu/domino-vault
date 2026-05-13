# G3 Workout App

A personal training tracker (the "G3 by FLOURISH" PWA).

## Where this lives — DO NOT MOVE

| | |
|---|---|
| **Repo** | `domino-cpu/domino-vault` |
| **Source path** | `workout-app/` (this folder) |
| **Deploy branch** | `gh-pages` (files copied to repo root) |
| **Live URL** | https://domino-cpu.github.io/domino-vault/ |

**This app is NOT part of `the-circle`.** `the-circle` is the public DOMINO website. The workout app is a separate PWA backed up here in the vault.

## Files

| File | Purpose |
|---|---|
| `index.html` | All HTML + CSS (single-file styling) |
| `app.js` | All JS — state, render, onboarding, SW registration |
| `sw.js` | Service worker (network-first cache) |
| `manifest.json` | PWA manifest |
| `version.json` | `{"v": N}` — bumped on every deploy to force PWA refresh |
| `icons/` | App icons + G3 logo SVG |

## Deploy checklist — read before pushing

Every deploy MUST:

1. Bump `APP_VERSION` in `app.js`
2. Bump the cache name + comment in `sw.js` (`domino-workout-vN`)
3. Bump `version.json` to `{"v": N}`
4. Bump `./sw.js?v=N` in `app.js` `registerSW()`

If those four numbers don't match, the PWA update detection breaks.

## Deploy mechanics

The `gh-pages` branch holds these files at the **repo root** (not under `workout-app/`). GitHub Pages serves them directly.

To deploy: copy `workout-app/*` to the `gh-pages` branch root, commit, push. (When done via the proxy, push to a `claude/...` branch and merge a PR into `gh-pages` — direct push to `gh-pages` is blocked.)

## Existing-user safety

Before shipping changes that touch the load path, trace what happens for a user with existing `localStorage` data. The keys are:

- `domino_workout_sessions` — workout history
- `domino_workout_active_session_id` — in-progress session
- `domino_workout_name` / `domino_workout_profile` / `domino_workout_goals` / `domino_workout_weight_log`
- `domino_workout_exercises` / `domino_workout_cardio_machines` / `domino_workout_exercise_groups`
- `domino_workout_theme`
- `g3_onboarded` — set once first-time onboarding completes (or auto-set if any data above exists)

**Never** rename these keys. Existing user data is sacred.
