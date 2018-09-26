# Changelog

## In Dev
### Breaking changes
- `transparent` key in palettes is now `see-through`
- `titles` adding one title level

## 1.0.1
### New features
- `loading` Full page
- `label` new UI
### Fixes
- `table` sortable arrow direction
- `button` mod-link vertical alignment
- :hammer: link hover color is themable, not just opacity .85
- :bug: icon sizing broken

## 1.0.0
The library has been revamped to use CSSVars by default.
If you want to disable it, just add this at the top of your main stylesheet, before any import.
```
$noCssVar: true;
```

We avoid as much breaking changes as possible, but here's a few:
### Breaking changes
- You need to add this in your main CSS to generate the CSS vars from the theme:
```
:root {
  @include generateCSSVarsFromTheme($theme);
}
```
- Palettes now needs 5 new properties:
  - `darker`
  - `dark`
  - `light`
  - `lighter`
  - `transparent`
- The `colors.text` children are now maps with at least a `color` property
- The getter functions returns CSS vars by default.
  - if you need to access a map, use the new `_getMap("keys")` function
  - if you need to get the value, set the last parameter to `true` in getter functions (eg. `_color("palette", "key", true)`). It comes handy wherever your using SCSS variable manipulation

### Adding
- `utility` ellipsis
### Enhancements
- `loading` Inverted colors
### Fixes
- `table` sortable arrow always stay on the last line

## 0.7.1
### Adding
- `breadcrumb`
### Enhancements
- `tables` sortable
- `textfield` Supports inside radio label display
- `textfields` / `form` Improve margin system
- `card` Disabled status
### Fixes
- `textfields` Show all borders even with browser zoom

## 0.7.0
### Fixes
- `navSide` toggle height on small resolutions
- `tables` fix borders alignment

## 0.6.0
### Breaking changes
- `titles` New titles hierarchy
### Adding
- `input file`
### Enhancements
- `icons` path target cdn by default
### Fixes
- `buttons` Fix height on checkbox / radio buttons
- `navSide` Fix bottom link (safari)
- `link` Use link style even with classes

## 0.4.1
### Updated peerDependencies
- `@lucca-front\icons` - update to version 0.4.1
- `@lucca-front\scss` - update to version 0.4.1

## V0.3.3
### Adding
- `table` small table mode
### Enhancements
- `emptystate` increase margin bottom
- `form-group-label` supports is-required state
### Fixes
- `label` vertical alignment
- `callout` links colors
- `callout` icon positioning

## V0.3.0
### Adding
- `progress` component
- `toasts` sass component

## V0.2.2
### New features
### Breaking changes
### Adding
### Enhancements
- `callout` new UI + killable + callout icon
### Fixes
- `mods` Alignment issues on mod-framed

## v0.1.7
### Adding
- `collapse` component
- `emptystate` component
- `filters` component
### Enhancements
- `table` row can now be set has a filter row with .mod-filters
- `navSide` compact mode width & fonts are smaller
### Fixes
- `table` head has now a correct font weight
- `navSide` is now a block element
- `menu` has now a line-height
- `textfield` inline validation

## v0.1.6
### New features
- `navSide` can now have a `navSide-bottomSection` to add navSide items fixed to the bottom of the screen.
### Breaking changes
- `textfield` default look is now classic. Use `mod-material` to get the material default look.
- `navSide` supports mobile view but needs a `.navSide-item.mod-mobileToggle` that can toggle a `.is-open` state on `.navSide` to work.
### Adding
- `Radio/Checkbox buttons` supports radio & checkbox form with button group layout.
### Enhancements
- `textfield-suffix` has better support accross all `textfield` mods.

## v0.1.2

### Breaking changes
- `input` & `textarea` are now merged in a single component : `textfield`
- `main` layout structure is simplified : `main-content-spacing` has been removed and margins are now placed on `container`. `mod-sections` & `mod-header` doesn't exist anymore.

### Enhancements
- `navSide` now supports placeholders
- `navSide` improved states and theming
- `box` now contains a closing element
- `textfield` now supports framed display modifier
- `textfield` now supports an `is-loading` state on parent
- `textfield` now supports suffix on each modifiers
- Reduce font-weight of &lt;b&gt; HTML element
- Utilities now supports text font-size
- Background / hover colors are now defined on commons variables

### Fixes
- `textfield.mod-compact` background color
- `textfield.mod-compact` right border
- `textfield` search icon position
