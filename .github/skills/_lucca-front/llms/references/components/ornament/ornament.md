# ornament

## Import

```typescript
import { OrnamentComponent } from '@lucca-front/ng/ornament';
```

## Basic Usage

```html
<lu-ornament bubble="1" illustration="piggy-bank" />
```

## API Reference

### OrnamentComponent (component)

**Selector:** `lu-ornament`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `bubble` | `bubble` | `OrnamentBubble \| number` | `undefined` | — | `luOptionalNumberAttribute` | Bulle décorative affichée derrière l’illustration. |
| `illustration` | `illustration` | `OrnamentIllustration \| string` | — | — | — | Illustration affichée devant la bulle. Il est également possible de renseigner une URL. |

## Type definitions

- [`OrnamentIllustration`](../../types/OrnamentIllustration.md) — 14 available values

## Related files

- 📝 [Code & implementation](./ornament.component.md)

- 📖 [Storybook documentation](https://lucca-front.lucca.io/v{version}/storybook/?path=/docs/documentation-structure-ornament-angular-basic--docs)
