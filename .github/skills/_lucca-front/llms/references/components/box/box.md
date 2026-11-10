# box

**Sommaire**

- Import
- Basic Usage
- API Reference
  - BoxDisclosureComponent (component)
  - BoxComponent (component)
  - Injection tokens
- Type definitions
- Related files
- Changelog
  - 22.0.5
  - 22.0.0
  - Notes de release (ZeroHeight)

## Import

```typescript
import { BoxDisclosureComponent, BoxComponent } from '@lucca-front/ng/box';
```

## Basic Usage

```html
<lu-box headingLevel="3" heading="Title" subheading="Subheading">Custom content</lu-box>
```

## API Reference

### BoxDisclosureComponent (component)

**Selector:** `lu-box-disclosure`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `theme` | `theme` | `'white' \| 'neutral' \| 'sunken' \| 'fancyWhite' \| 'fancyLight' \| 'fancyDark'` | `'white'` | — | — | Couleur de fond de la box. Les thèmes fancy* mettent la box en avant. |
| `heading` | `heading` | `PortalContent` | — | ✅ | — | Titre de la box. [PortalContent] |
| `subheading` | `subheading` | `PortalContent` | — | — | — | Sous-titre affiché sous le titre. [PortalContent] |
| `metadata` | `metadata` | `string[] \| PortalContent` | — | — | — | — |

#### Models (two-way binding)

| Property | Type | Required | Notes |
|----------|------|----------|-------|
| `open` | `unknown` | — | — |

### BoxComponent (component)

**Selector:** `lu-box`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | — | — | — | — |
| `theme` | `theme` | `'white' \| 'neutral' \| 'sunken' \| 'fancyWhite' \| 'fancyLight' \| 'fancyDark'` | `'white'` | — | — | Couleur de fond de la box. Les thèmes fancy* mettent la box en avant. |
| `size` | `size` | `'M' \| 'S'` | `'M'` | — | — | Taille de la box. La taille S réduit le titre, le sous-titre et l’illustration. |
| `heading` | `heading` | `PortalContent` | — | — | — | Titre de la box. [PortalContent] |
| `subheading` | `subheading` | `PortalContent` | — | — | — | Sous-titre affiché sous le titre. [PortalContent] |
| `bubbleIcon` | `bubbleIcon` | `LuccaIcon` | — | — | — | Icône décorative affichée dans une bulle avant le titre. Pour un autre contenu, projeter un élément portant l’attribut b… |
| `headingLevel` | `headingLevel` | `number` | `3` | — | `luNumberAttribute` | Niveau sémantique du titre, exposé comme un titre (role="heading"). Vaut 3 par défaut : à définir si le titre de la box … |
| `bubble` | `bubble` | `OrnamentBubble \| number` | `undefined` | — | `luOptionalNumberAttribute` | Bulle décorative affichée à droite. Disponible uniquement sur les thèmes fancy*. |
| `illustration` | `illustration` | `OrnamentIllustration \| string` | — | — | — | Illustration affichée à droite. Disponible uniquement sur les thèmes fancy*. Il est également possible de renseigner une… |
| `neutral` | `neutral` | `boolean` | `false` | — | `luBooleanAttribute` | ⚠️ **Déprécié** : use `theme="neutral"` instead Applique un fond gris. |
| `toggle` | `toggle` | `boolean` | `false` | — | `luBooleanAttribute` | ⚠️ **Déprécié** : the box is not interactive anymore  |
| `killable` | `killable` | `boolean` | `false` | — | `luBooleanAttribute` | ⚠️ **Déprécié** : the box is not interactive anymore  |
| `withArrow` | `withArrow` | `boolean` | `false` | — | `luBooleanAttribute` | ⚠️ **Déprécié** : the box doesn't point to another element anymore  |

#### Outputs

| Property | Binding name | Type | Notes |
|----------|-------------|------|-------|
| `killed` | `killed` | `void` | ⚠️ **Déprécié** : the box is not interactive anymore |

### Injection tokens

| Token | Type | Description |
|-------|------|-------------|
| `LU_BOX_TRANSLATIONS` | `unknown` | — |

## Type definitions

- [`LuccaIcon`](../../types/LuccaIcon.md) — 600 available values

## Related files

- 📝 [Code & implementation](./box.component.md)

- 📖 [Storybook documentation](https://lucca-front.lucca.io/v{version}/storybook/?path=/docs/documentation-structure-box-angular-arrow--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.4` jusqu'à `v22.1.2`. Les versions sans changement d'API sont omises.

### 22.0.5

+ token `LU_BOX_TRANSLATIONS` : unknown

### 22.0.0

~ `toggle` : transform booleanAttribute → luBooleanAttribute
~ `neutral` : transform booleanAttribute → luBooleanAttribute
~ `killable` : transform booleanAttribute → luBooleanAttribute
~ `withArrow` : transform booleanAttribute → luBooleanAttribute

### Notes de release (ZeroHeight)

#### 22.0.0

##### Removed

- `mod-grey` variant — use `mod-neutral` instead.

#### 21.3.1

##### Added

- `intl` input to override the component's translations, used for the close button's alternative text (previously hardcoded to `Close`).

#### 21.1.1

##### Added

- `killed` output, emitted when the close button of a `killable` box is clicked.

#### 21.0.1

##### Added

- `withArrow` input to display the box with an arrow (`mod-withArrow`).

#### 20.2.2

##### Fixed

- `border-radius` no longer overflows the box content.

#### 20.1.0

##### Added

- `lu-box` component (`box`) with the `toggle`, `neutral` and `killable` inputs.

##### Changed

- The box no longer applies a bottom margin — spacing is now up to the parent layout.
