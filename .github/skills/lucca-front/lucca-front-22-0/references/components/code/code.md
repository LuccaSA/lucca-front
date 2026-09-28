# code

## Import

```typescript
import { CodeComponent } from '@lucca-front/ng/code';
```

## API Reference

### CodeComponent (component)

**Selector:** `lu-code`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `block` | `block` | `boolean` | `false` | — | `luBooleanAttribute` | Permet un affichage sur plusieurs lignes. |

## Related files

- 📝 [Code & implementation](./code.component.md)

- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-texts-code-angular-basic--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.2` jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

~ `block` : transform booleanAttribute → luBooleanAttribute

### Notes de release (ZeroHeight)

#### 21.3.0

##### Changed

- `overflow-wrap` long content now wraps anywhere so that unbreakable strings (such as URLs) no longer overflow their container.

#### 21.0.0

##### Added

- Angular component (`lu-code`, `CodeComponent`) to display inline or block code snippets, with a `block` boolean input to switch to block display.
