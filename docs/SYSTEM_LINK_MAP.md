# SYSTEM LINK MAP

This repository participates in the Founder-owned three-repository system. The canonical repositories below are the source of truth for names and responsibilities.

| Layer | Canonical repository | Owns |
|---|---|---|
| PUBLIC | [rllibo833-sudo/kawasan-masjid-public](https://github.com/rllibo833-sudo/kawasan-masjid-public) | Public discovery, storytelling, public-safe information, inbound collaboration |
| CORE | [rllibo833-sudo/kawasan-masjid-core](https://github.com/rllibo833-sudo/kawasan-masjid-core) | Runtime, backend, Supabase, operational data, evidence, economic truth, execution |
| MEMORY | [rllibo833-sudo/Founder-OS](https://github.com/rllibo833-sudo/Founder-OS) | Founder decisions, strategy, governance, constraints, verified continuity, recovery context |
| LANGUAGE | [rllibo833-sudo/pusingcuk](https://github.com/rllibo833-sudo/pusingcuk) | Pusingcuk language specification, runtime, CLI, conformance tests, and implementation compatibility |

Pusingcuk is a shared technical capability, not a fourth project authority. It does not replace the roles of MEMORY, CORE, or PUBLIC.

## One project, three canonical layers

These repositories are **one project, not three products**. Pusingcuk supports implementation across the layers while each layer retains its own authority.

## Authority

1. MEMORY is authoritative for durable Founder decisions, governance, strategy, constraints, and continuity.
2. CORE is authoritative for runtime capability, backend/data state, evidence, economic records, and operational execution.
3. PUBLIC is authoritative only for public presentation and the public-safe entry experience.
4. Pusingcuk is authoritative for language implementation and conformance; an implemented language feature does not prove a CORE service is integrated or deployed.
5. Public claims must be supported by CORE evidence and remain consistent with MEMORY decisions.

## Synchronization flow

`MEMORY decision → Pusingcuk implementation → CORE integration and verification → MEMORY evidence/decision record → PUBLIC-safe summary`

- MEMORY stores durable decisions and rationale; it is not a runtime database.
- Pusingcuk stores language implementation and tests; do not duplicate its source into other repositories.
- CORE owns operational integration, data boundaries, and runtime truth.
- PUBLIC receives only the verified and appropriate external subset.
- Consequential external commitments remain behind the Founder Gate.
- Apply the system rule: **NO PROOF, NO CLAIM**.

## Security and data boundaries

- No secrets, service-role keys, private memory, or privileged credentials belong in PUBLIC.
- MEMORY stores decisions and links, not operational secrets or a second database.
- CORE keeps privileged backend credentials server-side and enforces authorization, validation, and database policies.
- Pusingcuk programs must not receive ambient filesystem, process, network, database, or secret access. Capability boundaries and tests are required before untrusted source execution is considered safe.
- Pusingcuk native/runtime tests prove language behavior only; CORE integration tests must prove application behavior separately.

## Truth contract

No repository may invent or imply customers, partners, funding, revenue, payments, permits, land ownership, physical construction, or deployed capabilities that are not verified.

The project's existing baseline remains unchanged until CORE evidence verifies a change.

## Change protocol

When a material change occurs:

1. Implement and test language behavior in Pusingcuk.
2. Implement and verify operational integration in CORE when applicable.
3. Record durable decisions, constraints, and evidence references in MEMORY.
4. Update PUBLIC only with the verified public-safe subset.
5. Cross-check repository links and terminology before release.

## Canonical links

- PUBLIC: https://github.com/rllibo833-sudo/kawasan-masjid-public
- CORE: https://github.com/rllibo833-sudo/kawasan-masjid-core
- MEMORY: https://github.com/rllibo833-sudo/Founder-OS
- Pusingcuk: https://github.com/rllibo833-sudo/pusingcuk
- Published public website: https://rllibo833-sudo.github.io/kawasan-masjid-public/

This map is the synchronization contract, not duplicated project content.
