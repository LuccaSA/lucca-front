# Task 06 — Dialog (modern LuDialog)

**Prerequisite reading**: `00-conventions.md` (provided alongside this file). Follow it.

## Scope

- `packages/ng/dialog` — `LuDialogService` (open/close API), `lu-dialog`,
  `lu-dialog-content/-header/-footer`, `lu-dialog-routing-container`, sidepanel mode.

**Out of scope**: legacy `modal`, `popup`, `sidepanel` entry points (all deprecated).
The `defaultOnClosedFn<_C>` generic overload is deprecated — don't use it in fixtures.

## Before writing

1. Read `packages/ng/dialog/**/*.spec.ts` — service-level specs may exist; list coverage.
2. Read the service API: config options (dismissability, size, mode, data injection,
   result typing) from `packages/ng/dialog/dialog.models.ts` (or equivalent — locate it).
3. This is a CDK Dialog wrapper: focus trapping and backdrop behavior come from CDK and
   work partially in jsdom. Test the **wiring**, not CDK itself: put behaviors that need
   real focus-trap semantics into Storybook play functions
   (`stories/documentation/overlays/dialog*` — check for existing play functions first).

## Behaviors to cover

Service contract (Jest):
- `open()` renders the component/template in an overlay with the injected data available;
  the returned ref's `closed` (or equivalent — check the API) emits the result passed to
  `close(result)`.
- A dialog opened with `canClose`/dismissible disabled (find the real option name) does
  not close on backdrop click or Escape.
- Opening a second dialog stacks; closing the top one leaves the first open.
- Routing container: navigating to a dialog route opens it; closing navigates back
  (testable with RouterTestingHarness — only if the wiring is non-trivial; skip if it
  reduces to CDK passthrough).

Mouse:
- Backdrop click closes a dismissible dialog and the ref resolves with the dismissed
  result (check what value dismissal produces — `undefined`? a sentinel?).
- Close button in `lu-dialog-header` closes the dialog.
- Clicks inside the dialog content do not close it.

Keyboard (Storybook play functions for the focus behaviors):
- Escape closes a dismissible dialog; with dismiss disabled, Escape does nothing.
- On open, focus moves into the dialog (to the configured auto-focus target — check config).
- Tab cycles within the dialog (focus trap) — real browser only.
- On close, focus returns to the element that had focus before opening — real browser only.

A11y (Jest, one test): the dialog container has `role="dialog"`, `aria-modal="true"`, and
is labelled by the header (`aria-labelledby` or `aria-label`) — assert the actual wiring,
plus the standard single axe check.

## Definition of done

Per `00-conventions.md`. Fast loop: `npx jest packages/ng/dialog --isolatedModules=true`,
plus the Storybook test-runner flow for the focus-trap stories.
