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

  <lu-simple-select id="city" placeholder="Choose a city"></lu-simple-select>

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
- Form components expose `value` and a `valueChange` event, replacing `ngModel`.
- Angular outputs are dispatched as `CustomEvent`s with the same name.
- `<html lang>` sets the locale (translations, date formats).
- `window.Prisme` lists the available elements and the bundle `version`.

## Available elements

| Element            | Component                      |
| ------------------ | ------------------------------ |
| `lu-date-input`    | `DateInputComponent`           |
| `lu-simple-select` | `LuSimpleSelectInputComponent` |

To add one, register it in `ELEMENTS` in [src/main.ts](src/main.ts).

## Release

On every stable tag (`vX.Y.Z`), [deploy.yml](../../.github/workflows/deploy.yml) builds the bundle and uploads it to R2 under `web-components/`, replacing the previous one. Only the latest version is kept: prereleases, `master` and backports (a tag lower than the published `version.txt`) never replace it.

## Limitations

- Relies on two Angular Elements internals (`injector`, `ngElementStrategy.componentRef`, see [src/define-element.ts](src/define-element.ts)): check them on each Angular major.
- No `disabled` state or validation on form components yet.
- Services (dialog, toasts) are not exposed yet.
