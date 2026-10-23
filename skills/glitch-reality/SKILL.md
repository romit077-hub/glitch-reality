---
name: glitch-reality
description: Add carefully scoped surreal interactive effects—Reality Tear, Reality Fracture, and Afterimage World—to an existing web interface while preserving architecture, accessibility, and behavior.
---

# GLITCH//REALITY Agent Skill

## Purpose
Help a coding agent implement polished, maintainable reality-bending interface effects in an existing project. This workflow specification is not proof that a given agent automatically discovers this file.

## Required workflow
1. **Inspect before editing.** Read package manifest, lockfile, framework version, app entry points, styles, design system, tests, and Git status. Preserve uncommitted work.
2. **Choose a bounded scope.** If the user has not selected an effect, choose the smallest coherent effect matching their request and explain the choice. Do not invent unrelated redesigns.
3. **Respect the project.** Reuse existing framework, language, styling, routes, and package manager. Avoid wholesale rewrites and unnecessary dependencies.
4. **Implement reversibly.** Isolate effect logic. Clean up event listeners, timers, observers, and animation frames.
5. **Preserve usability.** Provide keyboard-accessible controls, visible focus, touch-friendly interactions, reset/recovery, responsive layout, and a `prefers-reduced-motion` alternative. Avoid flashing and uncontrolled animation.
6. **Preserve security.** Do not add telemetry, remote scripts, API keys, secret collection, unsafe HTML injection, or unexpected network calls. Never expose environment values. Warn before destructive, paid, public, or security-sensitive actions.
7. **Test honestly.** Run available type check, lint, tests, and production build. If browser tooling is available, test desktop and mobile. Report skipped checks and why.
8. **Review the diff.** Confirm only intended files changed, remove debugging code, and document real status and limitations.

## Effect patterns

### Reality Tear
- Render the alternate layer beneath the surface layer.
- Reveal it with a CSS/SVG mask or another supported technique.
- Scope pointer tracking to the effect stage; support pointer cancellation and reset.
- Handle resize and cap stored strokes.
- Test whether revealed areas are interactive. Masks do not automatically guarantee click-through. If pointer routing is not implemented, disclose the visual-only limitation.
- Do not claim fluid simulation, physical tearing, or shader effects unless actually implemented.

### Reality Fracture
- Use a controlled, reversible state transition and a small number of visual shards/layers.
- Keep primary content readable and preserve semantics.
- Provide reassemble/reset and reduced-motion fallback.

### Afterimage World
- Use bounded, short-lived traces. Cap stored points and clean up timers/animation frames.
- Avoid unbounded DOM growth and performance degradation.
- Keep traces decorative and non-interactive unless requested otherwise.

## Compatibility and installation
This directory is a portable starting point. Before using it in Antigravity, Claude Code, Codex, or another agent, consult that agent's current official skill/custom-instruction format. Copy or adapt the file into the location the agent supports. Do not claim cross-agent auto-discovery without verification.

## Completion report template
- **Files changed:** paths and reasons.
- **Implemented:** actual behavior, not aspirations.
- **Checks run:** exact commands and result summaries.
- **Browser QA:** browsers/devices actually tested.
- **Accessibility:** keyboard, focus, touch, reduced-motion status.
- **Security:** dependency audit and source review results; never claim total security.
- **Limitations:** visual-only behavior, unsupported browsers, unverified items.
- **Git/deployment:** whether changes were committed, pushed, or deployed; these are separate operations.
