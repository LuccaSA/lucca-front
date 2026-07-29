# section-empty-state

## Import

```typescript
import { EmptyStateSectionComponent } from '@lucca-front/ng/empty-state';
```

## API Reference

### EmptyStateSectionComponent (component)

**Selector:** `lu-empty-state-section`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `icon` | `icon` | `string \| null` | `null` | — | — | ⚠️ **Déprécié** : use illustration and action  |
| `illustration` | `illustration` | `BubbleIllustration \| string \| null` | `null` | — | — | — |
| `action` | `action` | `boolean` | `false` | — | `booleanAttribute` | — |
| `palette` | `palette` | `Palette` | `'none'` | — | — | — |
| `center` | `center` | `boolean` | `false` | — | `booleanAttribute` | — |
| `heading` | `heading` | `string` | — | — | — | — |
| `description` | `description` | `PortalContent` | — | — | — | — |
| `hx` | `hx` | `number` | `3` | — | `numberAttribute` | — |

## Related files

- 🎨 [Design guidelines](./section-empty-state.design.md)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v21.2.5`. Les versions sans changement d'API sont omises.

### 21.1.1

~ `illustration` : BubbleIllustration | null → BubbleIllustration | string | null

### 21.1.0

+ `illustration` : BubbleIllustration | null
+ `action` : boolean
~ `icon` : string → string | null, défaut 'https://cdn.lucca.fr/lucca-front/assets/empty-states/icons/iconBanknote.svg' → null, devient déprécié (use illustration and action)

### 21.0.0

Composant introduit (`EmptyStateSectionComponent`).
