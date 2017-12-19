# Changelog

## In Dev
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
