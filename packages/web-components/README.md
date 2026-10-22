# Web components (experimental)

A standalone bundle (`bundle.js` + `bundle.css`) that renders Lucca Front's Angular-only components as custom elements in any HTML page, without Angular. Built for prototyping in Claude Design.

CSS-only components (`.button`, `.tag`…) are not included: use their HTML markup, which is also what ships in production.

## Build

```bash
npm run build:web-components   # → dist/web-components/bundle.{js,css}
```

`bundle.css` contains the whole design system CSS (all product palettes) with the icon and text fonts inlined, so the bundle needs no network access.

## Usage

```html
<html lang="fr">
  <link rel="stylesheet" href="bundle.css" />

  <lu-form-field label="City" error-inline-message="Choose a city">
    <lu-simple-select id="city" required placeholder="Choose a city"></lu-simple-select>
  </lu-form-field>

  <script src="bundle.js"></script>
  <script>
    city.options = [
      { id: 1, name: 'Paris' },
      { id: 2, name: 'Nantes' },
    ];
    city.value = city.options[0];
    city.addEventListener('valueChange', (event) => console.log(event.detail));
  </script>
</html>
```

- Tag and input names are the Angular ones. String inputs can be attributes (`placeholder`), objects and arrays must be properties (`options`).
- Form components expose `value` and a `valueChange` event, replacing `ngModel`. In a `lu-form-field`, the `required` attribute shows the required mark, and the field turns invalid once touched while empty, unless the page sets `invalid` on the field itself.
- Angular outputs are dispatched as `CustomEvent`s with the same name, once listened with `addEventListener`. As in a template, some components change when an output is listened: `clueChange` makes a select searchable, `deleteFile` shows the delete button of a file entry.
- Elements render once the page is parsed, so properties set by page scripts are there from the first render.
- Nested elements work as in a template (`lu-grid-column` in `lu-grid`).
- `<html lang>` sets the locale (translations, date formats).
- `window.Prisme` lists the available elements and the bundle `version`.

## Available elements

Forms: `lu-date-input`, `lu-date-range-input`, `lu-duration-picker`, `lu-form-field`, `lu-multi-select`, `lu-multilanguage-input`, `lu-phone-number-input`, `lu-simple-select`, `lu-time-picker`, `lu-time-range-picker`.

Files: `lu-file-entry`, `lu-multi-file-upload`, `lu-single-file-upload`.

Structure and content: `lu-empty-state-page`, `lu-empty-state-section`, `lu-grid`, `lu-grid-column`, `lu-read-more`, `lu-scroll-box`, `lu-skip-links`.

To add one, register it in `ELEMENTS` in [src/main.ts](src/main.ts).

## Release

On every stable tag (`vX.Y.Z`), [deploy.yml](../../.github/workflows/deploy.yml) builds the bundle and uploads it to R2 under `web-components/`, replacing the previous one. Only the latest version is kept: prereleases, `master` and backports (a tag lower than the published `version.txt`) never replace it.

## Limitations

- Relies on Angular internals (`injector`, `ngElementStrategy`, `ngElementEventsSubscription`, `__ngContext__`, see [src/define-element.ts](src/define-element.ts)): check them on each Angular major.
- No `disabled` state on form components yet, and `required` is the only validation.
- Not exposed yet: services (dialog, modal, toasts), directives (user popover), filter pills, `lu-color-input` and `lu-rich-text-input` (they need a host `ngModel` or directive), `lu-listbox`.
