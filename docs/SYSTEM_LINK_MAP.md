# SYSTEM LINK MAP

This repository participates in the Founder-owned three-repository system.

| Layer | Repository | Owns |
|---|---|---|
| PUBLIC | rllibo833-sudo/Landing-page-prototype | Public discovery, storytelling, inbound entry |
| CORE | rllibo833-sudo/kawasan-masjid-1000ha | Runtime, backend, Supabase, evidence, economics |
| MEMORY | rllibo833-sudo/Founder-ai-memory | Durable decisions, constraints, verified continuity |

## Synchronization contract

1. CORE is authoritative for runtime, backend, database, evidence, and economic truth.
2. MEMORY records durable decisions, constraints, and recovery context.
3. PUBLIC exposes only information safe and intended for external visitors.
4. PUBLIC never stores Supabase secrets or service/secret keys.
5. Runtime changes are implemented and verified in CORE first when they affect canonical system behavior.
6. Cross-repository links must point to the canonical repositories above.
7. No repository may invent customers, partners, payments, revenue, physical implementation, or capabilities without evidence.

## Data boundary

PUBLIC may use only public-safe data. Supabase privileged credentials remain server-side in CORE. Browser code may use only a Supabase publishable key with appropriate RLS policies.

## Change flow

CORE runtime truth → MEMORY durable record → PUBLIC public-facing update.

For a PUBLIC-only presentation fix, PUBLIC may change independently, but it must remain consistent with CORE and MEMORY.
