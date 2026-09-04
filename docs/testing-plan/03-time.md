# Task 03 — time: time picker & time range picker

**Prerequisite reading**: `00-conventions.md` (provided alongside this file). Follow it.

## Scope

- `packages/ng/time` — `TimePickerComponent` and `TimeRangePickerComponent`
  (verify exact selectors in `packages/ng/time/public-api.ts`).

## Before writing

1. Read `packages/ng/time/**/*.spec.ts` — time specs exist; list current coverage and only
   fill gaps.
2. Read the component source to establish: the value type (ISO duration string? `{hours,
   minutes}`? — assert the real one), whether fields are separate hour/minute segments or
   one masked input, and which keys the component explicitly handles.
3. Check `stories/documentation/forms/time*/` for existing play functions.

## Behaviors to cover

Mouse:
- Clicking a segment (hours/minutes) focuses/selects it.
- If there are increment/decrement affordances or an options dropdown, clicking them
  changes the value accordingly (wrap-around at 23→0 hours and 59→0 minutes if the
  implementation wraps — assert what the code does).
- Disabled picker ignores clicks.

Keyboard (the core of this component — be thorough):
- Typing digits fills the focused segment and auto-advances to the next segment when the
  segment is complete (e.g. typing "9" vs "09" in hours — check the source for the
  auto-advance rule and test it precisely).
- ArrowUp/ArrowDown increment/decrement the focused segment, respecting any `step` input;
  assert wrap-around behavior at boundaries.
- ArrowLeft/ArrowRight move between segments; Backspace/Delete clears the segment.
- Invalid input (e.g. "77" minutes) is rejected or clamped per the implementation — assert
  the actual behavior.
- Tab moves out of the whole control, not between inner segments, unless the
  implementation deliberately does otherwise — assert whichever it is.

Range picker:
- Start/end interaction updates the combined range value; whether end < start is possible,
  rejected, or marks the control invalid — read the validator and assert it.
- Everything above applies to both sub-pickers.

Forms contract per conventions (both components are CVAs): FormControl value shape,
`writeValue` renders segments, `disable()`, `null` handling on clear.

## Storybook play functions

Only needed if the picker uses an overlay for option lists; otherwise Jest covers this
component fully.

## Definition of done

Per `00-conventions.md`. Fast loop: `npx jest packages/ng/time --isolatedModules=true`
