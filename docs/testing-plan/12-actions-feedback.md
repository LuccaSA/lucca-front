# Task 12 — Actions & feedback components

**Prerequisite reading**: `00-conventions.md` (provided alongside this file). Follow it.

## Scope

- `button` (prisme/ng `LuButtonDirective` — `button[luButton]`, `a[luButton]`)
- `chip` (`lu-chip`, `button[luChip]`)
- `clear` (`lu-clear`)
- `toast` — **only** `LuToastsComponent` (the `LuToastModule` is deprecated)
- `callout` — `LuCalloutDisclosureComponent`, `LuCalloutPopoverComponent`,
  `LuCalloutActionsComponent` (the static callout body is presentational — skip it)
- `read-more` (`lu-read-more`)
- `user-popover` (`[luUserPopover]` — active parts only; skip `@deprecated` APIs inside)
- `impersonation` (`lu-impersonation`)
- `file-upload` — `LuFileDropzoneComponent`, `LuFileEntryComponent` (skip the
  `@deprecated` invoice-related API)

These are small; the task is one agent-session covering all of them. For each, enumerate
outputs/interactive inputs first; skip any that turn out non-interactive and say so.

## Behaviors to cover

Button directive:
- Loading/busy state if the directive has one (check inputs): while loading, clicks emit
  nothing and the button is `aria-busy`/disabled; keyboard activation equally blocked.
- Only behaviors the **directive adds** — do not test native button semantics.

Chip:
- Dismissible chip: clicking the remove affordance emits the dismiss output; Delete/
  Backspace or Enter on the remove button does the same (assert the keys actually handled).
- Clickable chip (`button[luChip]`): click and Enter/Space emit; disabled chip inert.

Clear:
- Click emits the clear output/clears the associated control; reachable and activatable
  by keyboard; hidden when there is nothing to clear (if the source implements that guard).

Toasts (`LuToastsComponent`):
- Adding a toast through the service/input API renders it in the live region
  (`role="status"`/`aria-live` — assert the wiring); the dismiss button removes that toast
  and emits.
- Auto-dismiss timers (`fakeAsync`): toast disappears after its duration; hover pausing
  the timer if implemented.
- Keyboard: dismiss button reachable and Enter/Space works; multiple toasts each dismissible.

Callout disclosure:
- Click on the disclosure toggle expands/collapses the extra content; `aria-expanded`
  updates; Enter/Space parity; collapsed content out of the accessibility tree/Tab order.

Callout popover / user popover:
- Built on popover2 (task 07 owns the overlay mechanics) — test only the wiring: trigger
  opens with the right content (e.g. user data rendered), Escape closes. One mouse + one
  keyboard path each.

Read more:
- Click on the "read more" affordance expands the full text and the affordance updates
  ("read less" or disappears — assert actual behavior); keyboard activation parity;
  content beyond the clamp is hidden from screen readers when collapsed if implemented.

Impersonation:
- There is an existing play-function story (`impersonation-basic.stories.ts` was cited as a
  play-function example) — read it first. Cover its action affordances (stop impersonation
  button → output emitted) by mouse and keyboard if not already done.

File dropzone / entry:
- Dropping a file (dispatch a `drop` event with a `DataTransfer` containing a `File`)
  emits the file output; the hidden input path (click → file picker) emits the same output
  when the input's `change` fires with files.
- Rejected files (wrong type/size, if validation inputs exist) emit the rejection output
  or error state — assert the real API.
- Keyboard: the dropzone's browse affordance is focusable and Enter/Space opens the file
  input (assert the input's click is triggered).
- File entry: delete/retry affordances emit their outputs by mouse and keyboard.

## Definition of done

Per `00-conventions.md`. Fast loop:
`npx jest packages/ng/chip packages/ng/clear packages/ng/toast packages/ng/callout packages/ng/read-more packages/ng/user-popover packages/ng/impersonation packages/ng/file-upload packages/prisme/button --isolatedModules=true`
