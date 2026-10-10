# PUBLIC and Pusingcuk Migration Boundary

## Goal

Move the system toward Pusingcuk as a shared implementation language without confusing language adoption with public-site runtime support.

## Responsibilities

- Pusingcuk owns the language, runtime/compiler, CLI, and compatibility tests.
- CORE owns authoritative APIs, operational data, access control, and evidence.
- PUBLIC owns the public-facing experience and may consume only approved public-safe API responses.
- Founder-OS owns migration decisions and verified continuity.

## PUBLIC migration rule

Do not replace the current web frontend wholesale until a supported browser target has been implemented and tested. Viable paths to evaluate include compiling Pusingcuk to JavaScript/WebAssembly or keeping the frontend as a presentation client that calls CORE APIs. Select based on demonstrated compatibility, accessibility, performance, maintainability, and security—not language purity.

PUBLIC must never contain secrets, privileged database credentials, private Founder memory, or a second copy of operational truth.

## Release gates

Before a Pusingcuk-powered PUBLIC feature is described as shipped:
1. Its supported runtime target is documented.
2. A reproducible build succeeds from a pinned compiler/runtime version.
3. Browser behavior and accessibility are tested.
4. API data is authorized and public-safe at the CORE boundary.
5. Deployment succeeds and is tied to the exact commit.
6. Public claims match verified CORE evidence.

## Current status

The system link map establishes repository ownership and synchronization. Native Pusingcuk CI is not evidence that Pusingcuk can currently run in a browser. No full PUBLIC runtime migration is claimed by this document.
