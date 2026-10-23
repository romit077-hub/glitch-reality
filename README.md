# GLITCH//REALITY

An experimental browser lab exploring three visual interaction patterns: **Reality Tear**, **Reality Fracture**, and **Afterimage World**, plus a draft reusable agent skill.

> **Status: experimental prototype.** The effects are implemented in source, but this GitHub-only editing environment has not run a local build or real-browser QA. Do not treat the project as production-verified.

## Features
- **Reality Tear:** drag across the surface to reveal an alternate visual layer through a radial mask.
- **Reality Fracture:** toggle a stylized fractured state with offset layers and shard overlays.
- **Afterimage World:** move through the stage to leave bounded, fading visual traces.
- Responsive CSS, keyboard mode shortcuts (1/2/3), Escape to reset, and reduced-motion CSS.
- No required API keys, analytics, cloud services, or external image assets.

## Run locally

Requires Node.js compatible with the installed Next.js version.

```bash
npm install
npm run dev
```

Open http://localhost:3000. Before considering a release, run:

```bash
npm run build
npx tsc --noEmit
npm run lint
npm audit
```

These checks have **not** been executed by the remote GitHub file editor. Review audit output; a clean dependency audit does not prove the entire application secure.

## Try it
- Select a mode from the three tabs.
- In Reality Tear, drag over the demo surface.
- In Reality Fracture, press **FRACTURE SURFACE**, then reassemble.
- In Afterimage World, move the pointer through the stage.
- Press **Escape** to reset or **1**, **2**, **3** to switch modes.

Reality Tear is a visual mask prototype. Cross-browser mask rendering and touch behavior need real-browser verification. Masked areas are not guaranteed to pass pointer clicks to the alternate layer.

## Agent skill
Draft instructions live in `skills/glitch-reality/SKILL.md`. This folder does not automatically install the skill in Antigravity, Claude Code, Codex, or any other agent. Follow the chosen agent's current official skill-discovery conventions and verify that it loads.

## Safety and status
No production deployment or security certification is implied. Review current Next.js advisories and dependencies before deployment. Never commit `.env` files or paste credentials into prompts.

| Area | Status |
|---|---|
| Three visual modes | Implemented in source; runtime verification pending |
| Responsive/reduced motion | CSS added; manual QA pending |
| Agent skill | Draft added; agent-specific compatibility unverified |
| Build/typecheck/lint | Not run by the remote editor |
| Security audit | Not run by the remote editor |
| Production readiness | Not established |

Keep contributions focused and report what was actually tested.
