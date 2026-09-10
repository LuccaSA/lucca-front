# box

## Import

```typescript
import { BoxComponent } from '@lucca-front/ng/box';
```

## Basic Usage

```html
<lu-box (killed)="onKilled()">Lorem ipsum dolor sit amet</lu-box>
```

## API Reference

### BoxComponent (component)

**Selector:** `lu-box`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | — | — | — | — |
| `toggle` | `toggle` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `neutral` | `neutral` | `boolean` | `false` | — | `luBooleanAttribute` | Applique un fond gris. |
| `killable` | `killable` | `boolean` | `false` | — | `luBooleanAttribute` | Ajoute un bouton de fermeture. |
| `withArrow` | `withArrow` | `boolean` | `false` | — | `luBooleanAttribute` | — |

#### Outputs

| Property | Binding name | Type | Notes |
|----------|-------------|------|-------|
| `killed` | `killed` | `void` | — |

## Related files

- 📝 [Code & implementation](./box.component.md)

- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-structure-box-angular-basic--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.2` jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

~ `toggle` : transform booleanAttribute → luBooleanAttribute
~ `neutral` : transform booleanAttribute → luBooleanAttribute
~ `killable` : transform booleanAttribute → luBooleanAttribute
~ `withArrow` : transform booleanAttribute → luBooleanAttribute

### Notes de release (ZeroHeight)

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
