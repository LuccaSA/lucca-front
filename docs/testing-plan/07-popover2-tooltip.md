# Task 07 — Popover2 & Tooltip

**Prerequisite reading**: `00-conventions.md` (provided alongside this file). Follow it.

## Scope

- `packages/ng/popover2` — `LuPopover2Directive` (`[luPopover2]`) + `lu-popover-content`
- `packages/ng/tooltip` — `LuTooltipTriggerDirective` (`[luTooltip]`) +
  `LuTooltipPanelComponent`

**Out of scope**: the legacy `popover` (v1) and `popup` entry points; the deprecated
tooltip **NgModules** (`LuTooltipModule`, `LuTooltipTriggerModule`) — use the standalone
directive in fixtures.

Note: popover2 is the foundation for several other components (date2 calendar, callout
popover, user-popover). Solid coverage here de-risks all of them.

## Before writing

1. Read both directives' sources to enumerate: trigger modes (click? hover? focus?),
   open/close delays, disabled input, position inputs, and any outputs.
2. Read existing specs (`packages/ng/popover2/**/*.spec.ts`,
   `packages/ng/tooltip/**/*.spec.ts`) and stories with play functions
   (`stories/documentation/overlays/`).
3. jsdom rule of thumb: open/close state and ARIA wiring are Jest-testable; positioning
   and hover with delays are Storybook material. Hover in jsdom via `userEvent.hover`
   works for simple cases — use `fakeAsync`/`tick` for delay logic.

## Behaviors to cover

Popover2 — mouse (Jest):
- Trigger click opens the popover (content rendered in the overlay container); second
  click closes it; click outside closes it; click inside content does not.
- Disabled trigger opens nothing.

Popover2 — keyboard (Jest + play stories):
- Trigger is focusable; Enter/Space opens (if click-triggered — match the real trigger
  events); Escape closes and returns focus to the trigger (focus return in a play story).
- If the popover content contains focusables: Tab from the trigger reaches them (play
  story — real sequential focus navigation).

Tooltip — mouse (Jest with fakeAsync):
- Hover shows the panel after the configured delay; unhover hides it (tick through both
  delays); moving from trigger onto the panel keeps it open if the implementation
  supports that — check.
- Tooltip does not open on hover when disabled or when content is empty (check the
  directive's guard conditions — empty-content suppression is common; assert what exists).

Tooltip — keyboard/a11y (Jest):
- Focusing the trigger (keyboard focus, not click) shows the tooltip; blur hides it.
- Escape while visible hides it.
- The trigger gets `aria-describedby` pointing at the panel content while open —
  assert the actual ARIA strategy from the source.
- Standard single axe check with an open tooltip.

## Definition of done

Per `00-conventions.md`. Fast loop:
`npx jest packages/ng/popover2 packages/ng/tooltip --isolatedModules=true`
