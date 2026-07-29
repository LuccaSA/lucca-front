# box

## Import

```typescript
import { BoxComponent } from '@lucca-front/ng/box';
```

## Basic Usage

```html
<lu-box >Lorem ipsum dolor sit amet</lu-box>
```

## API Reference

### BoxComponent (component)

**Selector:** `lu-box`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `toggle` | `toggle` | `boolean` | `false` | — | `booleanAttribute` | — |
| `neutral` | `neutral` | `boolean` | `false` | — | `booleanAttribute` | Applique un fond gris. |
| `killable` | `killable` | `boolean` | `false` | — | `booleanAttribute` | Ajoute un bouton de fermeture. |
| `withArrow` | `withArrow` | `boolean` | `false` | — | `booleanAttribute` | — |

#### Outputs

| Property | Binding name | Type | Notes |
|----------|-------------|------|-------|
| `killed` | `killed` | `void` | — |

## Related files

- 📝 [Code & implementation](./box.component.md)

- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.1.4/storybook/?path=/docs/documentation-structure-box-angular-basic--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v21.1.4`. Les versions sans changement d'API sont omises.

### 21.1.1

+ (output) `killed` : void

### 21.0.1

+ `withArrow` : boolean

### 21.0.0

Composant introduit (`BoxComponent`).
