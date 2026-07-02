# Task 02 — date2: date input, date range input, calendar

**Prerequisite reading**: `00-conventions.md` (provided alongside this file). Follow it.

## Scope

- `packages/ng/date2` — `LuDateInputComponent` (`lu-date-input`),
  `LuDateRangeInputComponent` (`lu-date-range-input`), `LuCalendar2Component`
  (`lu-calendar2`), and their granularity/week-mode options.

**Out of scope**: the legacy `packages/ng/date` entry point (fully deprecated).

**Warning**: this area has recent activity (week-mode handling, branch `feat/calendar-week`)
and the best existing spec coverage in the repo. Read
`packages/ng/date2/**/*.spec.ts` completely first and only fill gaps — much of the
value-parsing behavior is already tested.

## Before writing

1. Read all existing specs under `packages/ng/date2/` and list what they already cover
   (typing partial dates, clearing, min/max, granularity — verify).
2. Read `stories/documentation/forms/date2/*.stories.ts` and note existing play functions;
   `stories/helpers/test.ts` already has a `pickDay()` helper — reuse it.
3. Read the calendar template for the real grid roles (`grid`, `gridcell`) and the
   navigation button labels.

## Behaviors to cover

Mouse (Jest where jsdom suffices, otherwise play stories):
- Clicking the input's calendar affordance opens the calendar popover; picking a day sets
  the FormControl to that date and closes the popover.
- Month navigation (prev/next buttons) changes the displayed month without changing the
  value; year/month zoom-out views (if the calendar has them) navigate correctly on click.
- Range input: clicking a start day then an end day produces a `{start, end}` range value
  (check the exact value shape in the source); clicking an end day before the start
  reorders or restarts the range per the implementation — assert whichever the code does.
- Week mode (if `mode`/week-picking input exists — verify in source, it is recent): clicking
  any day selects the whole week; assert the emitted value.
- Days outside min/max are disabled: clicking them does nothing.

Keyboard:
- Typing a full date into the text input updates the FormControl; typing an invalid or
  partial date sets the control invalid/null per existing spec conventions (extend, don't
  duplicate — this is the best-covered area already).
- With the calendar open: arrow keys move day focus in the grid (left/right ±1 day,
  up/down ±7 days), PageUp/PageDown change month (verify these bindings exist in the
  source before testing; test exactly the keys the component handles).
- Enter/Space on a focused day selects it; Escape closes the calendar without changing the
  value and returns focus to the input.
- Tab order: input → calendar trigger → (open) calendar, and focus restoration on close.

Forms contract for both inputs per conventions, with date-specific edge cases: clearing
the text to empty → `null` (already covered for date-input — check), timezone-stable
values (assert with explicit UTC dates like the existing specs do).

## Storybook play functions

The calendar popover's focus management and grid keyboard navigation are the priority for
real-browser coverage. Extend `stories/documentation/forms/date2/` test stories using
`createTestStory` + `pickDay`.

## Definition of done

Per `00-conventions.md`. Fast loop:
`npx jest packages/ng/date2 --isolatedModules=true`
