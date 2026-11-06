# Decisions

## 2026-10-14 — Record the technical decisions of maintainers

Status: accepted

**Context** — The reasons behind technical choices, the limitations accepted and what was set aside only live in the maintainers’ memory. The code tells how, rarely why.

**Decision** — We record them in `docs/decisions/`, one entry per decision: a dated title and its sections. An entry is written in the same PR as the code it covers, or afterwards when we have to piece a reason back together.

**Consequences** — Out of scope:

- design decisions (Prisme);
- usage and API (Storybook, `docs/*.md`);
- changes per version (`CHANGELOG.md`);
- the explanation of a single line (code comment);
- ideas with no decision.

A code comment can point to the relevant entry. Known but unprioritized work can be recorded with the `deferred` status.

## 2026-10-14 — Format: one file per subject, dated and immutable entries

Status: accepted

**Context** — We need to get back into the context of a component quickly, and to keep a reliable trace of how decisions change.

**Decision** — One file per subject, dated and immutable entries, each with a status:

- One file per entrypoint (kebab-case name, like commit scopes) or per cross-cutting topic, in `docs/decisions/`. No README nor index: the file list serves that purpose, and a new entry reuses the structure of an existing one.
- Dated entries, in chronological order (most recent at the bottom): Context, Decision, Consequences, Rejected options, “Revisit if” when a condition may call the decision into question (mandatory for `deferred`), Sources. Each section starts with a summary sentence, optionally followed by a list. An entry is 10 to 25 lines long.
- An entry is never edited: a changed decision becomes a new entry, and the previous one becomes `superseded` with a link.
- Statuses: `proposed`, `accepted`, `deferred`, `superseded`.
- A component affected by a cross-cutting decision links to it in one line, without copying it.

**Consequences** — From ADRs, we keep the date, the status, the rejected options, immutability and chronological order. We leave out one file per decision, numbering and a dedicated approval process: the PR review is enough.

**Rejected options** — Three other ways to organize files and another order for entries:

- Classic ADRs, one file per decision: reading up on a component gets scattered.
- A living document per component: the current state gets rewritten, and the history is lost.
- Files next to the code: a component often spans several packages (`ng` + `scss`), and cross-cutting topics have no place.
- Most recent first, like a changelog: the current state is visible at once, but a decision is read before the context of the previous ones.

**Sources** — Primer (`primer/react/contributor-docs/adrs`), GOV.UK (`alphagov/govuk-design-system-architecture`), M. Nygard, _Documenting Architecture Decisions_ (2011).

## 2026-10-14 — Language of entries

Status: accepted

**Context** — The repository is in English (code, comments, commits) and public.

**Decision** — Committed entries are in English.

**Rejected options** — Everything in French: more natural for the current team, but inconsistent with the rest of the repository and closed to external contributors.
