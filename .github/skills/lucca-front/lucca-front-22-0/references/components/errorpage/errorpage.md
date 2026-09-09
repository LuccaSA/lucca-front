# errorpage

## Import

```typescript
import { ErrorPageComponent } from '@lucca-front/ng/error-page';
```

## Basic Usage

```html
<lu-error-page heading="Erreur 404" illustration="404"> <p>La page que vous cherchez n’existe pas.</p> <p><a href="#">Revenir à la page précédente</a></p>
</lu-error-page>
```

## API Reference

### ErrorPageComponent (component)

**Selector:** `lu-error-page`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `heading` | `heading` | `string` | — | ✅ | — | Titre de la page d’erreur. |
| `illustration` | `illustration` | `'400' \| '403' \| '404' \| '429' \| '500' \| 'keyboard' \| 'lock' \| 'map'` | — | ✅ | — | Modifie l’illustration. |

## Related files

- 📝 [Code & implementation](./errorpage.component.md)

- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-feedback-errorpage-angular-basic--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

Composant introduit (`ErrorPageComponent`).

### Notes de release (ZeroHeight)

#### 21.3.0

##### Added

- `ERROR_PAGE_ILLUSTRATION` constant and `ErrorPageIllustration` type are now publicly exported and used to type the `illustration` input.

#### 21.2.2

##### Fixed

- Styles are no longer scoped by view encapsulation, so the error page renders correctly wherever it is used.

#### 21.2.0

##### Added

- `lu-error-page` component (`errorPage`) with the required `heading` and `illustration` inputs.

#### 21.0.3

##### Fixed

- Layout of the error page when displayed inside a `lu-app-layout`.

#### 19.2.0

##### Changed

- Titles no longer add their own spacing.

#### 18.1.0

##### Changed

- Title color and font size updated.
