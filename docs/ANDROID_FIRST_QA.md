# ANDROID-FIRST HUMAN QA — THREE REPOSITORY SYSTEM

## Purpose
This is the acceptance standard for reviewing the system as a real human using only an Android phone.
The test is not a code review. It asks whether a person can discover, understand, navigate, use, and enter the project without a desktop computer or private Founder explanation.

## Primary user
- Android phone
- mobile browser
- touch input
- normal mobile network
- no developer tools
- no terminal
- no local database
- no assumption of programming knowledge

## Pass criteria
A first-time visitor must be able to:
1. understand what the project is within a few minutes;
2. distinguish PUBLIC, CORE, and MEMORY;
3. identify what exists now versus future plans;
4. find the live public experience;
5. inspect evidence without needing a desktop;
6. understand how to participate;
7. understand the paid/request pathway;
8. understand when Founder approval is required;
9. recover from a dead end using documented navigation;
10. use the important public flows without asking the Founder basic questions.

## Mobile usability checks
### A. First load
- page loads on mobile;
- no horizontal overflow;
- primary content is readable without zoom;
- headings and buttons are tappable;
- navigation does not require hover;
- loading/error states are understandable.

### B. Discovery
- project identity is visible immediately;
- three pillars are understandable;
- current truth is distinguishable from roadmap;
- public entry point is obvious.

### C. Navigation
- all critical links are reachable by touch;
- links do not depend on desktop-only UI;
- back navigation does not strand the user;
- external GitHub links clearly state why they are being opened.

### D. Participation
- a newcomer can identify the correct path for customer/request, collaboration, research, or code contribution;
- qualification rules are visible;
- Founder Gate is explicit;
- no secret or undocumented step is required.

### E. Trust
- verified and unverified claims are clearly separated;
- current economic truth is visible;
- no credentials, secrets, or private data are exposed.

## Repository-specific acceptance
### PUBLIC
Primary mobile destination. A stranger should not need GitHub to understand the project.
### CORE
A serious visitor must be able to inspect system truth, participation rules, and evidence from a phone.
### MEMORY
A visitor must understand that MEMORY is an internal continuity layer and not the public product or entry point.

## Synchronization acceptance
The three repositories must preserve one identity:
**PUBLIC = discovery**
**CORE = runtime/evidence/economics**
**MEMORY = durable decisions/continuity**
When truth changes: **CORE → MEMORY → PUBLIC**.
Only verified, externally appropriate information may cross into PUBLIC.

## Current acceptance snapshot
As of 2026-10-07:
- PUBLIC deployment commit 60461dc7: GitHub Actions success.
- CORE commit 92d9b51f: Quality Gate, GitHub Pages deployment, and Supabase migration workflows success.
- Android-only visual/manual acceptance still requires a real mobile browser session; repository/CI checks cannot honestly substitute for human touch testing.

**NO PROOF, NO CLAIM.**