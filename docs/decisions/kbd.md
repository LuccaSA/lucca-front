# kbd

## 2026-10-12 — No help for compact keyboards

Status: deferred

**Context** — On compact keyboards (Mac laptops in particular), some displayed keys do not exist and are typed with Fn: Fn + arrow for Page Up / Page Down, Fn + ⌫ for ⌦.

**Decision** — No help for now. Displaying the logical key, without Fn, is a design choice (Prisme).

**Consequences** — Compact keyboard users have to know the Fn equivalent, which concerns most Mac users: about 86% of Macs sold are laptops (CIRP, 2025).

**Rejected options** — None of the help options considered fits:

- Detecting the keyboard type: impossible, no API exposes it.
- Tooltip (`title` or `luTooltip`): our tooltips go through `luTooltip` to be accessible, and a tooltip cannot be nested in a `button` (menu option).
- Visually hidden text: only screen reader users would benefit from it, not sighted compact keyboard users.

**Revisit if** — A real need comes up from a product team or from users.

## 2026-10-13 — Mac platform detection through the userAgent

Status: accepted · PR #5468

**Context** — On Apple platforms, modifiers come in a different order and Option / Command are displayed as icons. So we need to know whether the page runs on Mac, iPhone or iPad.

**Decision** — `/Mac|iPhone|iPad/` is tested against `navigator.userAgent`.

**Rejected options** — No better option today:

- `navigator.platform`: deprecated;
- `navigator.userAgentData.platform`: only available in Chromium browsers.

**Revisit if** — A standard API exposes the platform in all browsers.

**Sources** — MDN: [`Navigator.platform`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/platform), [`Navigator.userAgentData`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/userAgentData).

## 2026-10-13 — Animations limited to 5 keys

Status: accepted · PR #5468

**Context** — Each key of a shortcut is pressed in turn. The offset of each key and the total duration of the cycle depend on the number of keys. Without a counting function, one selector has to be generated per case.

**Decision** — Two SCSS loops generate these selectors up to `$keysMax: 5`: `:nth-of-type()` for the offset of each key, `:has(.kbd:nth-of-type(n))` on the wrapper for the duration. 5 = 4 modifiers + 1 key, the longest real shortcut since Fn is no longer displayed.

**Consequences** — `@keyframes` steps are percentages of a duration that varies with the number of keys, whereas the offsets between keys are fixed: the rhythm changes with the number of keys (slight overlap accepted at 5, about 60 ms). Changing `$keysMax` or the steps requires reviewing them, as well as the animation freeze in the QA story (negative delay at -0.2).

**Rejected options** — `sibling-index()` / `sibling-count()` would remove the limit and the loops, but their support is still insufficient (Baseline only since August 2026, with Firefox 154).

**Revisit if** — `sibling-index()` / `sibling-count()` are supported widely enough to replace the loops: a good lead to improve the animations if needed.
