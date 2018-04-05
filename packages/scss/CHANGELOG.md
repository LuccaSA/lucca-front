# Changelog

## In Dev
### New features
### Breaking changes
- `titles` New titles hierarchy
### Adding
- `input file`
### Enhancements
### Fixes
- `navSide` Fix bottom link (safari)

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
