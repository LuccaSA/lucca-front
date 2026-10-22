# Web components (experimental)

A standalone bundle (`bundle.js` + `bundle.css`) that renders Lucca Front's Angular-only components as custom elements in any HTML page, without Angular. Built for prototyping in Claude Design.

CSS-only components (`.button`, `.tag`…) are not included: use their HTML markup, which is also what ships in production.

## Build

```bash
npm run build:web-components   # → dist/web-components/bundle.{js,css}
```

`bundle.css` contains the whole design system CSS (all product palettes) with the icon and text fonts inlined. `bundle.js` embeds the images of the exposed components (flags, file icons, bubble and fancy dialog illustrations, empty state backgrounds) and serves them in place of the CDN. The bundle needs no network access, and the build downloads these fonts and images from the CDN.

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
- Nested elements work as in a template (`lu-grid-column` in `lu-grid`, an input in `lu-filter-pill`), and classes set by the page (`pr-u-*`…) are kept.
- Directives and formatters keep their Angular attribute: `luWithMarkdownFormatter` on `lu-rich-text-input`, `luUserPopover` on any element (see below).
- `<html lang>` sets the locale (translations, date formats).
- `window.Prisme` lists the available elements, the bundle `version`, and the `dialog` and `toasts` services.

## Dialogs and toasts

Write the dialog in a `<template>`, with the same markup as the Angular template, and open it with `luDialogOpen` (the template id) or `Prisme.dialog.open`:

```html
<button class="button" luDialogOpen="delete">Delete</button>

<template id="delete">
  <lu-dialog>
    <lu-dialog-header><h1>Delete the expense?</h1></lu-dialog-header>
    <lu-dialog-content><p>This cannot be undone.</p></lu-dialog-content>
    <lu-dialog-footer>
      <div class="footer-actions">
        <button class="button palette-critical" luDialogClose>Delete</button>
        <button class="button mod-ghost" luDialogDismiss>Cancel</button>
      </div>
    </lu-dialog-footer>
  </lu-dialog>
</template>

<script>
  const ref = Prisme.dialog.open('#delete', { size: 'S' }); // same options as LuDialogService.open: size, mode, alert…
  ref.closed.then((result) => console.log(result)); // undefined when dismissed
  Prisme.toasts.add({ type: 'Success', title: 'Deleted', message: 'The expense was deleted.' });
</script>
```

## User popover

Prototypes have no API: the card shows the data of the user given to the trigger, as a property or as JSON in the attribute. The trigger must be a native element: on a `lu-*` element, put it on an element inside.

```html
<span class="link" tabindex="0" luUserPopover id="marie">Marie Durand</span>
<script>
  marie.luUserPopover = { id: 1, firstName: 'Marie', lastName: 'Durand', jobTitle: 'HR manager', userDepartment: { id: 3, name: 'HR' } };
</script>
```

## Available elements

Forms: `lu-color-input`, `lu-date-input`, `lu-date-range-input`, `lu-duration-picker`, `lu-filter-bar`, `lu-filter-pill`, `lu-form-field`, `lu-listbox`, `lu-listbox-option`, `lu-multi-select`, `lu-multilanguage-input`, `lu-phone-number-input`, `lu-rich-text-input` (and its `lu-rich-text-input-toolbar` child), `lu-simple-select`, `lu-time-picker`, `lu-time-range-picker`.

Files: `lu-file-entry`, `lu-multi-file-upload`, `lu-single-file-upload`.

Structure and content: `lu-empty-state-page`, `lu-empty-state-section`, `lu-grid`, `lu-grid-column`, `lu-read-more`, `lu-scroll-box`, `lu-skip-links`.

Overlays: `lu-dialog`, `lu-dialog-header`, `lu-dialog-content`, `lu-dialog-footer` (in a dialog template), `lu-toasts` (added by `Prisme.toasts` if missing).

To add one, register it in `ELEMENTS` in [src/main.ts](src/main.ts).

## Release

On every stable tag (`vX.Y.Z`), [deploy.yml](../../.github/workflows/deploy.yml) builds the bundle and uploads it to R2 under `web-components/`, replacing the previous one. Only the latest version is kept: prereleases, `master` and backports (a tag lower than the published `version.txt`) never replace it.

## Limitations

- Relies on Angular internals (`injector`, `ngElementStrategy`, `ngElementEventsSubscription`, `__ngContext__`, see [src/define-element.ts](src/define-element.ts)): check them on each Angular major.
- No `disabled` state on form components yet, and `required` is the only validation.
- `lu-filter-bar` does not see `optional` pills, which it finds with a content query: they are not supported.
- Not exposed: the deprecated modal.
