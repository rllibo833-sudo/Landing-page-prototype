# Three-repository synchronization contract

## Repository roles

- **Founder-ai-memory** = Founder AI second brain / durable orchestration memory.
- **kawasan-masjid-1000ha** = canonical Project OS: backend, Supabase, agents, migrations, internal workflows, evidence contracts and economic operations.
- **Landing-page-prototype** = public discovery and storytelling website.

## Public boundary

The public site is optimized for human understanding, not internal system inspection.

It may expose:
- vision;
- project story;
- ecosystem concepts;
- development journey;
- conceptual future experience;
- safe public navigation.

It must not expose:
- private agent prompts;
- service-role credentials;
- SQL migrations;
- Founder analytics;
- internal revenue operations;
- private opportunity records;
- internal evidence ledgers;
- operational secrets;
- authenticated Founder workflows.

## Data rule

If public data is later read from Supabase, it must come from the canonical Project OS backend through a safe public/publishable boundary and RLS-protected public records. No second database is created for the public site.

## Claim rule

No Proof, No Claim.

The public site must distinguish the long-term vision from what has actually been built, tested or externally verified. Internal evidence machinery can support claims behind the scenes without becoming the public user experience.

## Deployment rule

A deployment is not considered complete merely because the build succeeds. The release gate requires:

1. build success;
2. deployment success;
3. public URL availability;
4. human-reviewable rendering.

No paid plan or trial is required as an architectural dependency.
