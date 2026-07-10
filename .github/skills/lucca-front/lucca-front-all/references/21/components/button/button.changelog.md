# button — Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v21.3.1`. Les versions sans changement d'API sont omises.

## 21.3.1

+ `disabled` : boolean

## 21.2.0

~ `prButton` : '' | 'outlined' | 'AI' | 'ghost' | 'ghost-invert' | 'text' | 'text-invert' → '' | 'outlined' | 'AI' | 'AI-invert' | 'ghost' | 'ghost-invert' | 'text' | 'text-invert'

## 21.1.1

~ `palette` : 'success' | 'warning' | 'error' | 'product' | 'neutral' | 'none' | 'primary' | 'grey' → 'success' | 'warning' | 'error' | 'product' | 'neutral' | 'none' | 'primary' | 'grey' | 'brand'

## 21.1.0

+ selector `button[prButton]`
+ selector `a[prButton]`
+ selector `span[prButton]`
+ `prButton` : '' | 'outlined' | 'AI' | 'ghost' | 'ghost-invert' | 'text' | 'text-invert'
~ `palette` : Palette → 'success' | 'warning' | 'error' | 'product' | 'neutral' | 'none' | 'primary' | 'grey'

## 21.0.4

+ selector `span[luButton]`

## 21.0.3

~ `delete` : devient déprécié (use `critical` input instead)

## 21.0.0

Composant introduit (`ButtonComponent`).

## Notes de release (ZeroHeight)

# button — Changelog

### 21.2.0

#### Added

- `BUTTON_SIZE`, `BUTTON_STATE`, and `BUTTON_TYPE` TypeScript constants are now publicly exported.

#### Fixed

- `AI` button loading animation now renders correctly.
- `disclosure` chevron rotation corrected when `[aria-expanded="true"]`.

### 20.3.0

#### Added

- `AI` button style (`luButton="AI"`) for AI-related actions, including the `AI-invert` variant for dark backgrounds.
- Support for a dedicated `mod-AI` icon-only variant.

### 20.2.0

#### Added

- `critical` input to flag actions with significant or irreversible consequences (hover/focus only). Only compatible with `outlined` and `ghost` styles. For buttons that must always appear in red, keep using `palette="critical"`.
- `state` input (`loading`, `error`, `success`) to reflect asynchronous action feedback. The `error` state triggers a shake animation.
- `mod-iconOnLeft` and `mod-iconOnRight` CSS classes are now applied automatically based on icon position inside the button.

#### Deprecated

- `delete` input — use `critical` instead.
- `.button.mod-text` class — use `luButton="ghost"`.
- `.button.mod-deleted` class — use the `critical` input.
- `.button.loading` class — use `state="loading"`.

### 20.1.0

#### Added

- `ghost-invert` and `text-invert` button types for use on dark backgrounds.

### 19.3.0

#### Added

- `disclosure` input to display a rotating chevron indicating an attached menu (`[aria-expanded]` driven).

### 19.1.0

#### Removed

- Deprecated `.button.mod-icon` combination (deprecated since `17.2.0`). Use `mod-onlyIcon` with `lu-icon` instead.

### 18.1.0

#### Added

- `delete` input to mark a button as destructive (applies `mod-delete`).

#### Changed

- `<button>` elements without an explicit `type` attribute now automatically receive `type="button"` to prevent accidental form submissions.

### 17.2.0

#### Deprecated

- `.button.mod-icon` CSS class combination in favour of `mod-onlyIcon`.
