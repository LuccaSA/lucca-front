# link

**Sommaire**

- Import
- API Reference
  - LinkComponent (component)
  - LuRouterLink (directive)
  - Injection tokens
- Related files
- Changelog
  - 22.1.0
  - 22.0.5
  - 22.0.0
  - Notes de release (ZeroHeight)

## Import

```typescript
import { LinkComponent, LuRouterLink } from '@lucca-front/ng/link';
```

## API Reference

### LinkComponent (component)

**Selectors:** `a[luLink]`, `button[luLink]`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | — | — | — | — |
| `luHref` | `href` | `string` | `''` | — | — | Adresse de la page cible. À n’utiliser qu’en lien externe ou non connu par le routeur. |
| `routerLinkCommands` | `luLink` | `LuRouterLink['routerLink'] \| null` | `null` | — | — | Adresse de la page cible (commandes du routeur). |
| `disabled` | `disabled` | `boolean` | `false` | — | `luBooleanAttribute` | Désactive le lien. |
| `decorationHover` | `decorationHover` | `boolean` | `false` | — | `luBooleanAttribute` | Souligne le lien seulement au survol. |
| `external` | `external` | `boolean` | `false` | — | `luBooleanAttribute` | Ouvre le lien dans un nouvel onglet et affiche une icône. |
| `hiddenIcon` | `hiddenIcon` | `boolean` | `false` | — | `luBooleanAttribute` | N’affiche l’icône de lien externe qu’au survol, focus ou touch. |
| `neutral` | `neutral` | `boolean` | `false` | — | `luBooleanAttribute` | Affiche le lien dans la couleur de texte par défaut plutôt que dans la couleur de lien. |

### LuRouterLink (directive)

**Selector:** `[luRouterLink]`

### Injection tokens

| Token | Type | Description |
|-------|------|-------------|
| `LU_LINK_INSTANCE` | `boolean` | — |
| `LU_LINK_TRANSLATIONS` | `unknown` | — |

## Related files

- 📝 [Code & implementation](./link.component.md)
- 🎨 [Design guidelines](./link.design.md)
- 🎯 [Figma design tokens](./link.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v{version}/storybook/?path=/docs/documentation-actions-link-angular-test--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.4` jusqu'à `v22.1.1`. Les versions sans changement d'API sont omises.

### 22.1.0

`LinkComponent` :
  + `neutral` : boolean

### 22.0.5

+ token `LU_LINK_TRANSLATIONS` : unknown

### 22.0.0

`LinkComponent` :
  ~ `disabled` : transform booleanAttribute → luBooleanAttribute
  ~ `decorationHover` : transform booleanAttribute → luBooleanAttribute
  ~ `external` : transform booleanAttribute → luBooleanAttribute
  ~ `hiddenIcon` : transform booleanAttribute → luBooleanAttribute

### Notes de release (ZeroHeight)

#### 21.3.1

##### Fixed

- `external` router links now render an `href` attribute, making them reachable via keyboard navigation and showing their destination on hover.

#### 21.3.0

##### Added

- `hiddenIcon` input to display the external icon only on hover/focus. It is also applied automatically when the link is used inside a `data-table` or `index-table`.

#### 21.2.0

##### Changed

- Reworked component styling: theming now relies on dedicated `--components-link-*` CSS custom properties, with support for a `.link-text` inner element.

#### 21.1.2

##### Fixed

- `external` links now prepare the URL with the application base href before opening, fixing external redirection for array link commands.

#### 21.1.0

##### Added

- `intl` input to override the component's translations.

##### Fixed

- `external` links now honor `navigationExtras` and support `UrlTree` link commands.

#### 20.3.3

##### Fixed

- `external` router links (`external` + `luLink` commands) now open correctly in a new tab.

#### 20.1.1

##### Fixed

- `luLink` no longer breaks with Angular 20.

#### 19.1.6

##### Added

- `button[luLink]` selector support, allowing the directive to be used on `<button>` elements.

##### Removed

- Required `label` input removed; the link content is now projected via `ng-content` instead.

#### 19.1.0

##### Added

- Angular component (`lu-link` / `luLink`).

#### 18.2.1

##### Fixed

- `link` spacing: corrected the spacing and alignment of the external icon.
