# Task 04 — Basic form inputs

**Prerequisite reading**: `00-conventions.md` (provided alongside this file). Follow it.

## Scope (all in `packages/ng/forms` unless noted)

- `CheckboxInputComponent` (`lu-checkbox-input`)
- `RadioGroupInputComponent` (`lu-radio-group-input`)
- `SwitchInputComponent` (`lu-switch-input`)
- `NumberInputComponent` (`lu-number-input`)
- `PhoneNumberInputComponent` (`lu-phone-number-input`)
- `ColorInputComponent` (`lu-color-input`)
- `TextInputComponent` / `TextareaInputComponent` (only their non-trivial behaviors:
  clearability, suffix/prefix interactions if any — plain text pass-through is not worth a test)
- `NumberFormatDirective` (`input[luNumberFormatInput]`) in `packages/ng/number-format`
- `InputFramedComponent` and `form-field` integration (`packages/ng/form-field`): inputs
  wired through `lu-form-field` get label association and error display

**Out of scope**: the deprecated `input` entry point; rich-text and multilanguage inputs
(separate task 05).

## Before writing

Read existing specs in `packages/ng/forms/**/*.spec.ts` and `packages/ng/form-field/**/*.spec.ts`;
several inputs already have specs. List coverage per component, fill gaps only. Wrap each
host in `lu-form-field` the way the stories do (see `stories/documentation/forms/`), since
that is the supported usage.

## Behaviors to cover (all Jest — nothing here needs a real browser)

Checkbox / Switch:
- Click toggles the FormControl between `true`/`false`; Space toggles it when focused;
  Enter does **not** toggle a native checkbox (assert only if the component customizes this).
- Indeterminate state, if the checkbox supports it: what click does from indeterminate.
- Disabled: click and Space do nothing; control value unchanged.
- Label click toggles the input (form-field association working).

Radio group:
- Click on an option sets the FormControl to that option's value; clicking the selected
  option keeps it selected.
- Arrow keys move selection between radios (native roving behavior — assert selection
  follows focus, i.e. ArrowDown from option 1 both focuses and selects option 2).
- Tab enters the group on the checked (or first) radio and a second Tab leaves the group.
- Disabled single option is skipped; fully disabled group is inert.

Number input:
- Typing digits updates the FormControl as a **number** (not string); clearing → `null`.
- Non-numeric input is rejected/ignored per implementation; assert what happens.
- min/max/step inputs: values outside range mark the control invalid or are clamped —
  read the source, assert the real behavior.
- ArrowUp/ArrowDown stepping if implemented.

NumberFormatDirective:
- Typing `1234.5` displays the fr-FR formatted value (e.g. narrow-space grouping, comma
  decimal) while the FormControl holds the raw number — assert both sides.
- Pasting a formatted string parses back to a number.

Phone number input:
- Typing a national number produces the expected FormControl value (check the value type —
  string vs structured — in the source) and formats the display.
- Country/prefix selection (if a country selector exists): changing country reformats and
  updates the value.
- Invalid numbers mark the control invalid.

Color input:
- Selecting/typing a color updates the FormControl with the expected format (hex?);
  invalid strings rejected per implementation.

Form-field wiring (one small suite, not per input):
- The label is associated: clicking the `lu-form-field` label focuses the input;
  `aria-describedby` points at the error/hint when the control is invalid+touched.
- Required state is conveyed (`aria-required` or required marker) when the control has a
  required validator.

Forms contract per conventions for every CVA in scope.

## Definition of done

Per `00-conventions.md`. Fast loop:
`npx jest packages/ng/forms packages/ng/form-field packages/ng/number-format --isolatedModules=true`
